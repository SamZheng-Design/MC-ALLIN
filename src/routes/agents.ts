import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

export const agentRoutes = new Hono<{ Bindings: Bindings }>()

// ==================== 方案智能体 ====================
agentRoutes.post('/scheme/calculate', async (c) => {
  const { projectId, formData, trackId } = await c.req.json()
  
  // 基于表单数据计算分成方案
  const fundingAmount = formData.funding_funding_amount || formData.budget_total_budget || 0
  const lastYearRevenue = formData.finance_last_year_revenue || formData.history_annual_revenue || 0
  const grossMargin = formData.finance_gross_margin || 50
  const storeCount = formData.operation_store_count || 1
  
  // 分成比例计算逻辑
  let baseShareRate = 10
  if (storeCount > 10) baseShareRate -= 1
  if (storeCount > 50) baseShareRate -= 1
  if (lastYearRevenue > 1000) baseShareRate -= 0.5
  if (grossMargin < 30) baseShareRate += 1
  if (grossMargin > 60) baseShareRate -= 0.5
  
  baseShareRate = Math.max(5, Math.min(15, baseShareRate))
  
  // 计算置信度
  const filledFields = Object.keys(formData).filter(k => formData[k] && formData[k] !== '').length
  const confidence = Math.min(95, Math.max(30, filledFields * 5))
  
  // 计算完善度
  const completeness = Math.min(100, filledFields * 4)
  
  const result = {
    fundingAmount: fundingAmount > 0 ? `¥${fundingAmount}万` : '¥100-500万',
    fundingAmountMin: fundingAmount * 0.8 || 100,
    fundingAmountMax: fundingAmount * 1.2 || 500,
    shareRate: baseShareRate.toFixed(1),
    shareRateMin: (baseShareRate - 2).toFixed(1),
    shareRateMax: (baseShareRate + 2).toFixed(1),
    fundingCost: (baseShareRate + 2).toFixed(1),
    sharePeriod: fundingAmount > 500 ? '季度结算' : '月度结算',
    confidence,
    completeness,
    suggestion: confidence < 80 
      ? '建议补充财务数据和经营数据以获得更精准的方案'
      : '方案数据充分，建议可直接提交审核'
  }
  
  // 保存结果到数据库
  try {
    await saveAgentResult(c.env.DB, projectId, 'scheme', result, confidence)
  } catch (e) {
    console.error('保存方案智能体结果失败', e)
  }
  
  return c.json(result)
})

// ==================== 法律合约智能体 ====================
agentRoutes.post('/legal/calculate', async (c) => {
  const { projectId, formData, trackId } = await c.req.json()
  
  // 根据赛道选择合同模板
  const templateMap: Record<number, string> = {
    1: '连锁实体店收入分成协议',
    2: '商业活动票房分成协议',
    3: '景区收入分成协议',
    4: '项目制服务分成协议'
  }
  
  const templateName = templateMap[trackId] || '收入分成协议'
  
  // 生成核心条款
  const clauses: string[] = []
  const missingClauses: string[] = []
  
  // 基础条款
  clauses.push('第一条：定义与解释')
  clauses.push('第二条：融资金额与期限')
  
  // 根据填报数据判断条款
  if (formData.funding_funding_amount) {
    clauses.push(`第三条：收入分成比例（基于融资金额¥${formData.funding_funding_amount}万计算）`)
  } else {
    missingClauses.push('融资金额未确定，分成条款待完善')
  }
  
  if (formData.funding_collateral && formData.funding_collateral !== '无担保') {
    clauses.push(`第四条：担保条款（${formData.funding_collateral}）`)
  }
  
  clauses.push('第五条：账户监管与资金划转')
  clauses.push('第六条：违约责任')
  clauses.push('第七条：争议解决')
  
  // 检查必要信息
  if (!formData.entity_company_name) {
    missingClauses.push('缺少企业名称，合同主体待确认')
  }
  if (!formData.entity_legal_person) {
    missingClauses.push('缺少法定代表人信息')
  }
  
  // 计算完备度
  const completeness = Math.max(60, 100 - missingClauses.length * 10)
  
  const result = {
    templateName,
    templateId: `TPL-${trackId}-001`,
    clauses,
    missingClauses,
    completeness,
    fundingAmount: formData.funding_funding_amount ? `¥${formData.funding_funding_amount}万` : '待确定',
    shareRate: '根据方案智能体计算',
    period: '24个月',
    settlementCycle: '月度结算',
    accountType: formData.funding_funding_amount > 500 ? '共管账户' : '独立账户'
  }
  
  try {
    await saveAgentResult(c.env.DB, projectId, 'legal', result, completeness)
  } catch (e) {
    console.error('保存法律智能体结果失败', e)
  }
  
  return c.json(result)
})

// ==================== 风控智能体 ====================
agentRoutes.post('/risk/calculate', async (c) => {
  const { projectId, formData, trackId } = await c.req.json()
  
  // 多维度风险评分
  const dimensions: Array<{name: string, score: number, weight: number}> = []
  
  // 经营稳定性（30%权重）
  let operationScore = 60
  const operatingYears = formData.operation_operating_years || 0
  const storeCount = formData.operation_store_count || 0
  if (operatingYears >= 5) operationScore += 20
  else if (operatingYears >= 3) operationScore += 10
  if (storeCount >= 10) operationScore += 10
  if (storeCount >= 50) operationScore += 10
  dimensions.push({ name: '经营稳定性', score: Math.min(100, operationScore), weight: 30 })
  
  // 财务健康度（30%权重）
  let financeScore = 60
  const grossMargin = formData.finance_gross_margin || 0
  const netMargin = formData.finance_net_margin || 0
  const debtRatio = formData.finance_debt_ratio || 50
  if (grossMargin >= 50) financeScore += 15
  if (netMargin >= 10) financeScore += 15
  if (debtRatio < 60) financeScore += 10
  dimensions.push({ name: '财务健康度', score: Math.min(100, financeScore), weight: 30 })
  
  // 行业前景（20%权重）
  let industryScore = 70
  const industryCategory = formData.operation_industry_category
  const highGrowthIndustries = ['餐饮', '美业', '健身']
  if (highGrowthIndustries.includes(industryCategory)) industryScore += 15
  dimensions.push({ name: '行业前景', score: industryScore, weight: 20 })
  
  // 管理能力（20%权重）
  let managementScore = 65
  const employeeCount = formData.operation_employee_count || 0
  if (employeeCount >= 50) managementScore += 10
  if (formData.documents_business_license) managementScore += 10
  if (formData.documents_financial_statements) managementScore += 15
  dimensions.push({ name: '管理能力', score: Math.min(100, managementScore), weight: 20 })
  
  // 计算综合分数
  const totalScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score * d.weight / 100, 0)
  )
  
  // 黑名单校验（模拟）
  const blacklistStatus = 'pass'
  
  // 风险提示
  const warnings: string[] = []
  if (debtRatio > 70) warnings.push('资产负债率偏高')
  if (operatingYears < 2) warnings.push('经营年限较短')
  if (!formData.documents_financial_statements) warnings.push('缺少财务报表')
  
  const result = {
    score: totalScore,
    dimensions,
    blacklistStatus,
    warnings,
    riskLevel: totalScore >= 80 ? 'low' : totalScore >= 60 ? 'medium' : 'high'
  }
  
  try {
    await saveAgentResult(c.env.DB, projectId, 'risk', result, totalScore)
  } catch (e) {
    console.error('保存风控智能体结果失败', e)
  }
  
  return c.json(result)
})

// ==================== 财务智能体 ====================
agentRoutes.post('/finance/calculate', async (c) => {
  const { projectId, formData, trackId } = await c.req.json()
  
  const fundingAmount = formData.funding_funding_amount || 100
  
  // 根据融资金额推荐账户类型
  let accountType = '独立账户'
  if (fundingAmount >= 500) accountType = '分级共管账户'
  else if (fundingAmount >= 100) accountType = '共管账户'
  
  // 资金流对接方式
  const fundFlow = formData.operation_store_count > 10 ? 'API自动对接' : '银行代扣'
  
  // 分账规则
  const splitRule = '按日收入 × 分成比例自动计算，T+1结算至共管账户'
  
  // 结算周期
  const settlementCycle = fundingAmount > 300 ? 'T+1' : 'T+3'
  
  // 监管要求
  const requirements = fundingAmount >= 500 
    ? '需开设三方共管账户，设置资金监管条件'
    : '标准共管账户即可满足要求'
  
  const result = {
    accountType,
    fundFlow,
    splitRule,
    settlementCycle,
    requirements,
    recommendedBank: '招商银行/平安银行',
    minimumBalance: Math.round(fundingAmount * 0.1) + '万'
  }
  
  try {
    await saveAgentResult(c.env.DB, projectId, 'finance', result, 85)
  } catch (e) {
    console.error('保存财务智能体结果失败', e)
  }
  
  return c.json(result)
})

// ==================== 利益一致性智能体 ====================
agentRoutes.post('/interest/calculate', async (c) => {
  const { projectId, formData, trackId } = await c.req.json()
  
  // 分成比例合理性（40%）
  let shareRationalityScore = 70
  const fundingAmount = formData.funding_funding_amount || 0
  const lastYearRevenue = formData.finance_last_year_revenue || 0
  if (fundingAmount > 0 && lastYearRevenue > 0) {
    const ratio = fundingAmount / lastYearRevenue
    if (ratio <= 0.3) shareRationalityScore = 90
    else if (ratio <= 0.5) shareRationalityScore = 75
    else shareRationalityScore = 60
  }
  
  // 激励机制（30%）
  let incentiveScore = 65
  const collateral = formData.funding_collateral
  if (collateral === '个人担保' || collateral === '企业担保') {
    incentiveScore = 85
  } else if (collateral === '资产抵押') {
    incentiveScore = 90
  }
  
  // 退出条款（30%）
  let exitScore = 70
  const expectedPayback = formData.funding_expected_payback_months || 24
  if (expectedPayback <= 18) exitScore = 85
  else if (expectedPayback <= 24) exitScore = 75
  
  // 综合评分
  const score = Math.round(
    shareRationalityScore * 0.4 + incentiveScore * 0.3 + exitScore * 0.3
  )
  
  // 激励匹配度
  const incentiveMatch = incentiveScore
  
  // 一致性说明
  let explanation = '融资方与投资方利益'
  if (score >= 80) {
    explanation = '融资方与投资方利益高度一致，风险共担机制完善'
  } else if (score >= 60) {
    explanation = '融资方与投资方利益基本一致，部分条款可优化'
  } else {
    explanation = '融资方与投资方利益绑定程度较低，建议加强风险共担机制'
  }
  
  // 优化建议
  let suggestions = ''
  if (incentiveScore < 75) {
    suggestions = '建议增加担保措施以提升利益绑定程度'
  }
  if (shareRationalityScore < 75) {
    suggestions += suggestions ? '；' : ''
    suggestions += '建议根据营收规模调整融资金额'
  }
  
  const result = {
    score,
    incentiveMatch,
    explanation,
    suggestions: suggestions || '当前方案利益一致性良好',
    dimensions: {
      shareRationality: shareRationalityScore,
      incentive: incentiveScore,
      exit: exitScore
    }
  }
  
  try {
    await saveAgentResult(c.env.DB, projectId, 'interest', result, score)
  } catch (e) {
    console.error('保存利益智能体结果失败', e)
  }
  
  return c.json(result)
})

// ==================== 获取智能体结果 ====================
agentRoutes.get('/:agentType/result/:projectId', async (c) => {
  const agentType = c.req.param('agentType')
  const projectId = c.req.param('projectId')
  
  try {
    const result = await c.env.DB.prepare(`
      SELECT * FROM agent_results 
      WHERE project_id = ? AND agent_type = ?
      ORDER BY created_at DESC LIMIT 1
    `).bind(projectId, agentType).first()
    
    if (!result) {
      // 返回默认数据
      return c.json(getDefaultResult(agentType))
    }
    
    return c.json({
      ...JSON.parse((result as any).result_data || '{}'),
      confidence: (result as any).confidence,
      kbVersion: (result as any).kb_version
    })
  } catch (e: any) {
    return c.json(getDefaultResult(agentType))
  }
})

// 保存智能体结果
async function saveAgentResult(
  db: D1Database,
  projectId: number | string,
  agentType: string,
  result: any,
  confidence: number
) {
  if (!projectId) return
  
  await db.prepare(`
    INSERT INTO agent_results (project_id, agent_type, result_data, confidence, kb_version)
    VALUES (?, ?, ?, ?, 'v1.0')
  `).bind(projectId, agentType, JSON.stringify(result), confidence).run()
}

// 获取默认结果
function getDefaultResult(agentType: string): any {
  const defaults: Record<string, any> = {
    scheme: {
      fundingAmount: '¥100-500万',
      shareRate: '8-12',
      fundingCost: '10-15',
      sharePeriod: '月度结算',
      confidence: 50
    },
    legal: {
      templateName: '收入分成协议',
      completeness: 60,
      clauses: ['基础条款已配置'],
      missingClauses: ['请补充企业信息']
    },
    risk: {
      score: 70,
      blacklistStatus: 'pass',
      dimensions: [
        { name: '经营稳定性', score: 70 },
        { name: '财务健康度', score: 70 },
        { name: '行业前景', score: 70 },
        { name: '管理能力', score: 70 }
      ],
      warnings: []
    },
    finance: {
      accountType: '共管账户',
      fundFlow: '银行代扣',
      settlementCycle: 'T+1',
      splitRule: '按日收入×分成比例计算'
    },
    interest: {
      score: 70,
      incentiveMatch: 70,
      explanation: '融资方与投资方利益基本一致',
      suggestions: '请补充更多信息以获得精准评估'
    }
  }
  
  return defaults[agentType] || {}
}
