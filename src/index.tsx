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
import { renderInvestorOverview } from './pages/investor/overview'
import { renderInvestorPortfolio } from './pages/investor/portfolio'
import { renderInvestorPipeline } from './pages/investor/pipeline'
import { renderStaffConsole } from './pages/staff/console'

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

// 内部员工门户
app.get('/staff/:department/agent-console', (c) => {
  const department = c.req.param('department')
  return c.html(renderStaffConsole(department))
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
