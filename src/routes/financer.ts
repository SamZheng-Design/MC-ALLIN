import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

export const financerRoutes = new Hono<{ Bindings: Bindings }>()

// 生成项目编号
function generateProjectNo() {
  const date = new Date()
  const year = date.getFullYear()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `DGT-${year}-${random}`
}

// 计算完善度
function calculateCompleteness(formData: any, schema: any): number {
  if (!schema || !schema.groups) return 0
  
  let totalRequired = 0
  let filledRequired = 0
  
  for (const group of schema.groups) {
    for (const field of group.fields) {
      if (field.required) {
        totalRequired++
        const key = `${group.key}_${field.key}`
        if (formData[key] && formData[key] !== '') {
          filledRequired++
        }
      }
    }
  }
  
  return totalRequired > 0 ? Math.round((filledRequired / totalRequired) * 100) : 0
}

// 获取赛道列表
financerRoutes.get('/tracks', async (c) => {
  try {
    const tracks = await c.env.DB.prepare(
      'SELECT id, name, code, description, icon FROM tracks WHERE status = ?'
    ).bind('active').all()
    
    return c.json({ tracks: tracks.results })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取单个赛道详情
financerRoutes.get('/tracks/:id', async (c) => {
  const id = c.req.param('id')
  
  try {
    const track = await c.env.DB.prepare(
      'SELECT * FROM tracks WHERE id = ?'
    ).bind(id).first()
    
    if (!track) {
      return c.json({ message: '赛道不存在' }, 404)
    }
    
    return c.json({ track })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 创建新项目
financerRoutes.post('/projects', async (c) => {
  const { trackId, financerId = 1 } = await c.req.json()
  
  try {
    const projectNo = generateProjectNo()
    
    const result = await c.env.DB.prepare(
      'INSERT INTO projects (project_no, financer_id, track_id, form_data, completeness, status) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(projectNo, financerId, trackId, '{}', 0, 'draft').run()
    
    return c.json({
      projectId: result.meta.last_row_id,
      projectNo
    })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取项目列表
financerRoutes.get('/projects', async (c) => {
  const financerId = c.req.query('financerId') || '1'
  
  try {
    const projects = await c.env.DB.prepare(`
      SELECT p.*, t.name as track_name 
      FROM projects p 
      LEFT JOIN tracks t ON p.track_id = t.id 
      WHERE p.financer_id = ?
      ORDER BY p.created_at DESC
    `).bind(financerId).all()
    
    return c.json({ projects: projects.results })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取单个项目详情
financerRoutes.get('/projects/:id', async (c) => {
  const id = c.req.param('id')
  
  try {
    const project = await c.env.DB.prepare(`
      SELECT p.*, t.name as track_name, t.field_schema
      FROM projects p 
      LEFT JOIN tracks t ON p.track_id = t.id 
      WHERE p.id = ?
    `).bind(id).first()
    
    if (!project) {
      return c.json({ message: '项目不存在' }, 404)
    }
    
    return c.json({ project })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 更新项目
financerRoutes.put('/projects/:id', async (c) => {
  const id = c.req.param('id')
  const { formData, status } = await c.req.json()
  
  try {
    // 获取赛道schema计算完善度
    const project = await c.env.DB.prepare(
      'SELECT p.*, t.field_schema FROM projects p LEFT JOIN tracks t ON p.track_id = t.id WHERE p.id = ?'
    ).bind(id).first<any>()
    
    if (!project) {
      return c.json({ message: '项目不存在' }, 404)
    }
    
    let schema = null
    try {
      schema = JSON.parse(project.field_schema || '{}')
    } catch (e) {}
    
    const completeness = calculateCompleteness(formData, schema)
    
    await c.env.DB.prepare(
      'UPDATE projects SET form_data = ?, completeness = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(JSON.stringify(formData), completeness, status || project.status, id).run()
    
    return c.json({ success: true, completeness })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 同步字段变更（实时联动核心接口）
financerRoutes.post('/projects/:id/sync', async (c) => {
  const id = c.req.param('id')
  const { fieldKey, oldValue, newValue, formData, trackId } = await c.req.json()
  
  try {
    // 获取赛道schema
    const track = await c.env.DB.prepare(
      'SELECT field_schema FROM tracks WHERE id = ?'
    ).bind(trackId).first<any>()
    
    let schema = null
    try {
      schema = JSON.parse(track?.field_schema || '{}')
    } catch (e) {}
    
    // 计算完善度
    const completeness = calculateCompleteness(formData, schema)
    
    // 更新项目数据
    await c.env.DB.prepare(
      'UPDATE projects SET form_data = ?, completeness = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(JSON.stringify(formData), completeness, id).run()
    
    return c.json({
      success: true,
      completeness,
      fieldKey,
      timestamp: new Date().toISOString()
    })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 提交签约
financerRoutes.post('/projects/:id/sign', async (c) => {
  const id = c.req.param('id')
  const { signature } = await c.req.json()
  
  try {
    await c.env.DB.prepare(
      'UPDATE projects SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind('signed', id).run()
    
    // 更新合同表
    await c.env.DB.prepare(`
      UPDATE contracts 
      SET financer_signed = 1, financer_signed_at = CURRENT_TIMESTAMP, status = 'financer_signed'
      WHERE project_id = ?
    `).bind(id).run()
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})
