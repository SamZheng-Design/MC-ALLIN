import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

export const investorRoutes = new Hono<{ Bindings: Bindings }>()

// 获取市场总览数据
investorRoutes.get('/overview', async (c) => {
  try {
    // 模拟统计数据
    const stats = {
      totalProjects: 1280,
      investedAmount: 29.6,
      pipelineAmount: 5.2,
      payoutAmount: 18.9,
      payoutRate: 98.5
    }
    
    // 行业分布
    const industryDistribution = [
      { name: '连锁实体店', value: 42, amount: 12.5 },
      { name: '演唱会/商业活动', value: 20, amount: 5.8 },
      { name: '旅游景区', value: 28, amount: 8.2 },
      { name: '项目制非标服务', value: 10, amount: 3.1 }
    ]
    
    // 层级分布
    const layerDistribution = [
      { name: 'senior', label: '优先级', amount: 15.2 },
      { name: 'mezzanine', label: '夹层', amount: 8.5 },
      { name: 'subordinate', label: '劣后级', amount: 5.9 }
    ]
    
    return c.json({
      stats,
      industryDistribution,
      layerDistribution
    })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取已投资项目列表
investorRoutes.get('/investments', async (c) => {
  const investorId = c.req.query('investorId') || '2'
  
  try {
    const investments = await c.env.DB.prepare(`
      SELECT i.*, p.project_no, p.form_data, t.name as track_name
      FROM investments i
      LEFT JOIN projects p ON i.project_id = p.id
      LEFT JOIN tracks t ON p.track_id = t.id
      WHERE i.investor_id = ?
      ORDER BY i.created_at DESC
    `).bind(investorId).all()
    
    return c.json({ investments: investments.results })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取Pipeline项目列表
investorRoutes.get('/pipeline', async (c) => {
  const trackId = c.req.query('trackId')
  
  try {
    let query = `
      SELECT p.*, t.name as track_name, t.code as track_code,
             ar_scheme.result_data as scheme_result,
             ar_risk.result_data as risk_result
      FROM projects p
      LEFT JOIN tracks t ON p.track_id = t.id
      LEFT JOIN agent_results ar_scheme ON p.id = ar_scheme.project_id AND ar_scheme.agent_type = 'scheme'
      LEFT JOIN agent_results ar_risk ON p.id = ar_risk.project_id AND ar_risk.agent_type = 'risk'
      WHERE p.status IN ('submitted', 'approved')
    `
    
    if (trackId) {
      query += ` AND p.track_id = ${trackId}`
    }
    
    query += ' ORDER BY p.created_at DESC LIMIT 50'
    
    const projects = await c.env.DB.prepare(query).all()
    
    return c.json({ projects: projects.results })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取项目AI评估详情（投资者视角）
investorRoutes.get('/project/:id/evaluation', async (c) => {
  const id = c.req.param('id')
  
  try {
    // 获取项目基本信息
    const project = await c.env.DB.prepare(`
      SELECT p.*, t.name as track_name
      FROM projects p
      LEFT JOIN tracks t ON p.track_id = t.id
      WHERE p.id = ?
    `).bind(id).first()
    
    if (!project) {
      return c.json({ message: '项目不存在' }, 404)
    }
    
    // 获取所有智能体评估结果
    const agentResults = await c.env.DB.prepare(`
      SELECT agent_type, result_data, confidence, kb_version, created_at
      FROM agent_results
      WHERE project_id = ?
      ORDER BY created_at DESC
    `).bind(id).all()
    
    // 整理结果
    const evaluation: Record<string, any> = {}
    for (const result of agentResults.results as any[]) {
      if (!evaluation[result.agent_type]) {
        evaluation[result.agent_type] = {
          ...JSON.parse(result.result_data || '{}'),
          confidence: result.confidence,
          kbVersion: result.kb_version,
          updatedAt: result.created_at
        }
      }
    }
    
    return c.json({ project, evaluation })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 提交投资意向
investorRoutes.post('/invest', async (c) => {
  const { projectId, investorId, amount, layer } = await c.req.json()
  
  try {
    // 计算预期收益率
    const expectedReturnRates: Record<string, number> = {
      'senior': 8.5,
      'mezzanine': 12.5,
      'subordinate': 18.0
    }
    
    const result = await c.env.DB.prepare(`
      INSERT INTO investments (project_id, investor_id, amount, layer, expected_return_rate, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `).bind(
      projectId,
      investorId || 2,
      amount,
      layer,
      expectedReturnRates[layer] || 10
    ).run()
    
    return c.json({
      success: true,
      investmentId: result.meta.last_row_id
    })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})

// 获取投资组合统计
investorRoutes.get('/portfolio/stats', async (c) => {
  const investorId = c.req.query('investorId') || '2'
  
  try {
    // 模拟统计数据
    const stats = {
      totalInvested: 1800,
      totalReturn: 216.8,
      annualizedReturn: 12.04,
      pendingPayout: 45.2,
      activeInvestments: 6,
      activeCapital: 1200
    }
    
    return c.json({ stats })
  } catch (e: any) {
    return c.json({ message: e.message }, 500)
  }
})
