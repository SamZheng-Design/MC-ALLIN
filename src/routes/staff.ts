import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

export const staffRoutes = new Hono<{ Bindings: Bindings }>()

// 获取待办任务列表
staffRoutes.get('/tasks', async (c) => {
  const department = c.req.query('department')
  const status = c.req.query('status') || 'pending'
  
  try {
    const tasks = await c.env.DB.prepare(`
      SELECT rt.*, p.project_no, p.form_data, p.completeness, t.name as track_name
      FROM review_tasks rt
      LEFT JOIN projects p ON rt.project_id = p.id
      LEFT JOIN tracks t ON p.track_id = t.id
      WHERE rt.department = ? AND rt.status = ?
      ORDER BY rt.created_at DESC
    `).bind(department, status).all()
    
    return c.json({ tasks: tasks.results })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取单个任务详情
staffRoutes.get('/tasks/:id', async (c) => {
  const id = c.req.param('id')
  
  try {
    const task = await c.env.DB.prepare(`
      SELECT rt.*, p.project_no, p.form_data, p.completeness,
             t.name as track_name, t.field_schema
      FROM review_tasks rt
      LEFT JOIN projects p ON rt.project_id = p.id
      LEFT JOIN tracks t ON p.track_id = t.id
      WHERE rt.id = ?
    `).bind(id).first()
    
    if (!task) {
      return c.json({ message: '任务不存在' }, 404)
    }
    
    return c.json({ task })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 提交审核结果
staffRoutes.post('/tasks/:id/review', async (c) => {
  const id = c.req.param('id')
  const { status, adjustedResult, comments, reviewerId } = await c.req.json()
  
  try {
    await c.env.DB.prepare(`
      UPDATE review_tasks
      SET status = ?, adjusted_result = ?, comments = ?, reviewer_id = ?, reviewed_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      status,
      JSON.stringify(adjustedResult || {}),
      comments || '',
      reviewerId || 1,
      id
    ).run()
    
    // 如果通过，检查是否所有部门都已通过
    if (status === 'approved') {
      const task = await c.env.DB.prepare(
        'SELECT project_id FROM review_tasks WHERE id = ?'
      ).bind(id).first<any>()
      
      if (task) {
        const pendingTasks = await c.env.DB.prepare(`
          SELECT COUNT(*) as count FROM review_tasks
          WHERE project_id = ? AND status != 'approved'
        `).bind(task.project_id).first<any>()
        
        // 如果所有任务都已通过，更新项目状态
        if (pendingTasks?.count === 0) {
          await c.env.DB.prepare(
            'UPDATE projects SET status = ? WHERE id = ?'
          ).bind('approved', task.project_id).run()
        }
      }
    }
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取知识库列表
staffRoutes.get('/knowledge-base', async (c) => {
  const agentType = c.req.query('agentType')
  const category = c.req.query('category')
  
  try {
    let query = 'SELECT * FROM knowledge_base WHERE is_active = 1'
    const params: any[] = []
    
    if (agentType) {
      query += ' AND agent_type = ?'
      params.push(agentType)
    }
    
    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    
    query += ' ORDER BY updated_at DESC'
    
    const stmt = c.env.DB.prepare(query)
    const kb = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all()
    
    return c.json({ knowledgeBase: kb.results })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 更新知识库
staffRoutes.post('/knowledge-base', async (c) => {
  const { agentType, category, title, content, metadata, userId } = await c.req.json()
  
  try {
    // 生成新版本号
    const latestVersion = await c.env.DB.prepare(
      'SELECT version FROM knowledge_base WHERE agent_type = ? ORDER BY created_at DESC LIMIT 1'
    ).bind(agentType).first<any>()
    
    let newVersion = 'v1.0'
    if (latestVersion?.version) {
      const vNum = parseFloat(latestVersion.version.replace('v', ''))
      newVersion = `v${(vNum + 0.1).toFixed(1)}`
    }
    
    const result = await c.env.DB.prepare(`
      INSERT INTO knowledge_base (agent_type, category, title, content, metadata, version, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      agentType,
      category,
      title,
      content,
      JSON.stringify(metadata || {}),
      newVersion,
      userId || 1
    ).run()
    
    return c.json({
      success: true,
      id: result.meta.last_row_id,
      version: newVersion
    })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 知识库回流（项目签约后自动调用）
staffRoutes.post('/knowledge-base/feedback', async (c) => {
  const { projectId, agentType, adjustedContent, userId } = await c.req.json()
  
  try {
    // 获取项目信息用于脱敏
    const project = await c.env.DB.prepare(
      'SELECT * FROM projects WHERE id = ?'
    ).bind(projectId).first<any>()
    
    if (!project || project.status !== 'signed') {
      return c.json({ message: '仅签约项目可回流知识库' }, 400)
    }
    
    // 脱敏处理（示例：移除敏感信息）
    const desensitizedContent = adjustedContent
      .replace(/\d{11}/g, '***')  // 手机号
      .replace(/[\w.-]+@[\w.-]+/g, '***@***')  // 邮箱
    
    // 写入知识库
    const latestVersion = await c.env.DB.prepare(
      'SELECT version FROM knowledge_base WHERE agent_type = ? ORDER BY created_at DESC LIMIT 1'
    ).bind(agentType).first<any>()
    
    let newVersion = 'v1.0'
    if (latestVersion?.version) {
      const vNum = parseFloat(latestVersion.version.replace('v', ''))
      newVersion = `v${(vNum + 0.1).toFixed(1)}`
    }
    
    await c.env.DB.prepare(`
      INSERT INTO knowledge_base (agent_type, category, title, content, metadata, version, created_by)
      VALUES (?, 'feedback', ?, ?, ?, ?, ?)
    `).bind(
      agentType,
      `项目${project.project_no}校准记录`,
      desensitizedContent,
      JSON.stringify({ projectId, feedbackType: 'manual_adjustment' }),
      newVersion,
      userId || 1
    ).run()
    
    return c.json({ success: true, version: newVersion })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})
