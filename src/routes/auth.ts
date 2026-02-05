import { Hono } from 'hono'
import { SignJWT } from 'jose'

type Bindings = {
  DB: D1Database
}

export const authRoutes = new Hono<{ Bindings: Bindings }>()

const JWT_SECRET = new TextEncoder().encode('dgt-secret-key-2024')

// 角色到路由的映射
const roleRouteMap: Record<string, string> = {
  'ROLE_FINANCER': '/financer/dashboard',
  'ROLE_INVESTOR': '/investor/market-overview',
  'ROLE_INVESTOR_OVERSEAS_LICENSED': '/investor/market-overview',
  'ROLE_INVESTOR_OVERSEAS_PI_INDIVIDUAL': '/investor/market-overview',
  'ROLE_INVESTOR_OVERSEAS_PI_COMPANY': '/investor/market-overview',
  'ROLE_STAFF_LEGAL': '/staff/legal/agent-console',
  'ROLE_STAFF_RISK': '/staff/risk/agent-console',
  'ROLE_STAFF_FINANCE': '/staff/finance/agent-console',
  'ROLE_STAFF_INVEST_SCHEME': '/staff/invest_scheme/agent-console',
  'ROLE_STAFF_INTEREST': '/staff/interest/agent-console'
}

// 部门到角色的映射
const deptRoleMap: Record<string, string> = {
  'legal': 'ROLE_STAFF_LEGAL',
  'risk': 'ROLE_STAFF_RISK',
  'finance': 'ROLE_STAFF_FINANCE',
  'invest_scheme': 'ROLE_STAFF_INVEST_SCHEME',
  'interest': 'ROLE_STAFF_INTEREST'
}

// 发送验证码
authRoutes.post('/send-code', async (c) => {
  const { target, type } = await c.req.json()
  
  // 演示模式：直接返回成功，验证码为123456
  const code = '123456'
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()
  
  try {
    await c.env.DB.prepare(
      'INSERT INTO verification_codes (target, code, type, expires_at) VALUES (?, ?, ?, ?)'
    ).bind(target, code, type, expiresAt).run()
  } catch (e) {
    // 忽略数据库错误
  }
  
  return c.json({ success: true, message: '验证码已发送（演示模式：123456）' })
})

// 注册
authRoutes.post('/register', async (c) => {
  const data = await c.req.json()
  let { role, password, name, phone, email, department, code } = data
  
  // 演示模式：跳过验证码校验
  
  // 处理内部员工角色
  if (role === 'ROLE_STAFF' && department) {
    role = deptRoleMap[department] || 'ROLE_STAFF_LEGAL'
  }
  
  try {
    // 检查是否已存在
    const existing = await c.env.DB.prepare(
      'SELECT id FROM users WHERE phone = ? OR email = ?'
    ).bind(phone || '', email || '').first()
    
    if (existing) {
      return c.json({ message: '该账号已注册' }, 400)
    }
    
    // 创建用户
    const result = await c.env.DB.prepare(
      'INSERT INTO users (phone, email, password_hash, role, department, name) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(phone || null, email || null, password, role, department || null, name).run()
    
    const userId = result.meta.last_row_id
    
    // 生成JWT
    const token = await new SignJWT({ userId, role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET)
    
    const user = { id: userId, name, role, phone, email, department }
    const redirectUrl = roleRouteMap[role] || '/financer/dashboard'
    
    return c.json({ token, user, redirectUrl })
  } catch (e: any) {
    return c.json({ message: '注册失败：' + e.message }, 500)
  }
})

// 登录
authRoutes.post('/login', async (c) => {
  const { account, password } = await c.req.json()
  
  try {
    // 查找用户
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE phone = ? OR email = ?'
    ).bind(account, account).first<any>()
    
    // 演示模式：如果用户不存在或密码任意，自动创建/登录
    if (!user) {
      // 根据账号格式判断角色
      let role = 'ROLE_FINANCER'
      let department = null
      
      if (account.includes('@dgt.com')) {
        // 内部员工
        if (account.includes('legal')) {
          role = 'ROLE_STAFF_LEGAL'
          department = 'legal'
        } else if (account.includes('risk')) {
          role = 'ROLE_STAFF_RISK'
          department = 'risk'
        } else if (account.includes('finance')) {
          role = 'ROLE_STAFF_FINANCE'
          department = 'finance'
        } else if (account.includes('scheme')) {
          role = 'ROLE_STAFF_INVEST_SCHEME'
          department = 'invest_scheme'
        } else if (account.includes('interest')) {
          role = 'ROLE_STAFF_INTEREST'
          department = 'interest'
        }
      } else if (account === '13800138002') {
        role = 'ROLE_INVESTOR'
      }
      
      // 自动创建用户
      const isEmail = account.includes('@')
      const result = await c.env.DB.prepare(
        'INSERT INTO users (phone, email, password_hash, role, department, name) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        isEmail ? null : account,
        isEmail ? account : null,
        password,
        role,
        department,
        '用户' + account.slice(-4)
      ).run()
      
      const userId = result.meta.last_row_id
      const token = await new SignJWT({ userId, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(JWT_SECRET)
      
      const newUser = {
        id: userId,
        name: '用户' + account.slice(-4),
        role,
        phone: isEmail ? null : account,
        email: isEmail ? account : null,
        department
      }
      
      return c.json({
        token,
        user: newUser,
        redirectUrl: roleRouteMap[role] || '/financer/dashboard'
      })
    }
    
    // 用户存在，生成token
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET)
    
    const redirectUrl = roleRouteMap[user.role] || '/financer/dashboard'
    
    return c.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        email: user.email,
        department: user.department
      },
      redirectUrl
    })
  } catch (e: any) {
    return c.json({ message: '登录失败：' + e.message }, 500)
  }
})
