import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { authRoutes } from './routes/auth'
import { financerRoutes } from './routes/financer'
import { investorRoutes } from './routes/investor'
import { staffRoutes } from './routes/staff'
import { agentRoutes } from './routes/agents'
import { renderHomePage } from './pages/home'
import { renderLoginPage } from './pages/login'
import { renderFinancerDashboard } from './pages/financer/dashboard'
import { renderFinancerReport } from './pages/financer/report'
import { renderFinancerConfirm } from './pages/financer/confirm'
import { renderFinancerProjects } from './pages/financer/projects'
import { renderFinancerMessages } from './pages/financer/messages'
import { renderFinancerSettings } from './pages/financer/settings'
import { renderInvestorOverview } from './pages/investor/overview'
import { renderInvestorPortfolio } from './pages/investor/portfolio'
import { renderInvestorPipeline } from './pages/investor/pipeline'
import { renderInvestorProject } from './pages/investor/project'
import { renderStaffConsole } from './pages/staff/console'
import { renderStaffKnowledge } from './pages/staff/knowledge'
import { renderStaffLogs } from './pages/staff/logs'
import { renderStaffCompleted } from './pages/staff/completed'
import { renderPrivacyPage } from './pages/legal/privacy'
import { renderTermsPage } from './pages/legal/terms'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// 中间件
app.use('*', logger())
app.use('/api/*', cors())

// ==================== 页面路由 ====================

// 首页
app.get('/', (c) => {
  return c.html(renderHomePage())
})

// 登录/注册页
app.get('/auth/login', (c) => {
  return c.html(renderLoginPage())
})

// 融资者门户
app.get('/financer/dashboard', (c) => {
  return c.html(renderFinancerDashboard())
})

app.get('/financer/report/:trackId', (c) => {
  const trackId = c.req.param('trackId')
  return c.html(renderFinancerReport(trackId))
})

app.get('/financer/confirm/:projectId', (c) => {
  const projectId = c.req.param('projectId')
  return c.html(renderFinancerConfirm(projectId))
})

app.get('/financer/projects', (c) => {
  return c.html(renderFinancerProjects())
})

app.get('/financer/messages', (c) => {
  return c.html(renderFinancerMessages())
})

app.get('/financer/settings', (c) => {
  return c.html(renderFinancerSettings())
})

// 投资者门户
app.get('/investor/market-overview', (c) => {
  return c.html(renderInvestorOverview())
})

app.get('/investor/portfolio', (c) => {
  return c.html(renderInvestorPortfolio())
})

app.get('/investor/pipeline', (c) => {
  return c.html(renderInvestorPipeline())
})

app.get('/investor/project/:projectId', (c) => {
  const projectId = c.req.param('projectId')
  return c.html(renderInvestorProject(projectId))
})

// 法律页面
app.get('/legal/privacy', (c) => {
  return c.html(renderPrivacyPage())
})

app.get('/legal/terms', (c) => {
  return c.html(renderTermsPage())
})

// 内部员工门户
app.get('/staff/:department/agent-console', (c) => {
  const department = c.req.param('department')
  return c.html(renderStaffConsole(department))
})

app.get('/staff/:department/knowledge', (c) => {
  const department = c.req.param('department')
  return c.html(renderStaffKnowledge(department))
})

app.get('/staff/:department/logs', (c) => {
  const department = c.req.param('department')
  return c.html(renderStaffLogs(department))
})

app.get('/staff/:department/completed', (c) => {
  const department = c.req.param('department')
  return c.html(renderStaffCompleted(department))
})

// ==================== API路由 ====================

// 认证相关
app.route('/api/auth', authRoutes)

// 融资者API
app.route('/api/financer', financerRoutes)

// 投资者API
app.route('/api/investor', investorRoutes)

// 内部员工API
app.route('/api/staff', staffRoutes)

// AI智能体API
app.route('/api/agent', agentRoutes)

// ==================== 健康检查 ====================
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
