-- ========================================
-- 滴灌通收入分成投资系统 - 数据库Schema
-- ========================================

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT,
  email TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN (
    'ROLE_FINANCER',
    'ROLE_INVESTOR',
    'ROLE_INVESTOR_OVERSEAS_LICENSED',
    'ROLE_INVESTOR_OVERSEAS_PI_INDIVIDUAL',
    'ROLE_INVESTOR_OVERSEAS_PI_COMPANY',
    'ROLE_STAFF_LEGAL',
    'ROLE_STAFF_RISK',
    'ROLE_STAFF_FINANCE',
    'ROLE_STAFF_INVEST_SCHEME',
    'ROLE_STAFF_INTEREST'
  )),
  department TEXT,
  name TEXT,
  company_name TEXT,
  qualification_files TEXT,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 赛道配置表
CREATE TABLE IF NOT EXISTS tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  field_schema TEXT NOT NULL, -- JSON: 该赛道的字段配置
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 项目申报表
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_no TEXT UNIQUE NOT NULL,
  financer_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  form_data TEXT DEFAULT '{}', -- JSON: 动态表单数据
  completeness INTEGER DEFAULT 0, -- 信息完善度 0-100
  status TEXT DEFAULT 'draft' CHECK(status IN (
    'draft', 'submitted', 'reviewing', 'approved', 'rejected', 'signed', 'active', 'completed'
  )),
  submitted_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (financer_id) REFERENCES users(id),
  FOREIGN KEY (track_id) REFERENCES tracks(id)
);

-- AI智能体计算结果表
CREATE TABLE IF NOT EXISTS agent_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  agent_type TEXT NOT NULL CHECK(agent_type IN (
    'scheme', 'legal', 'risk', 'finance', 'interest'
  )),
  result_data TEXT NOT NULL, -- JSON: 计算结果
  confidence INTEGER DEFAULT 0, -- 置信度 0-100
  version INTEGER DEFAULT 1,
  kb_version TEXT, -- 知识库版本
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- 知识库表
CREATE TABLE IF NOT EXISTS knowledge_base (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_type TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT, -- JSON
  version TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 合同表
CREATE TABLE IF NOT EXISTS contracts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  template_id TEXT,
  contract_text TEXT NOT NULL,
  clauses TEXT, -- JSON: 条款明细
  completeness INTEGER DEFAULT 0,
  financer_signed INTEGER DEFAULT 0,
  financer_signed_at DATETIME,
  investor_signed INTEGER DEFAULT 0,
  investor_signed_at DATETIME,
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- 投资记录表
CREATE TABLE IF NOT EXISTS investments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  investor_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  layer TEXT CHECK(layer IN ('senior', 'mezzanine', 'subordinate')),
  expected_return_rate REAL,
  status TEXT DEFAULT 'pending',
  signed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (investor_id) REFERENCES users(id)
);

-- 分成流水表
CREATE TABLE IF NOT EXISTS revenue_shares (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  investment_id INTEGER NOT NULL,
  period TEXT NOT NULL,
  revenue REAL NOT NULL,
  share_amount REAL NOT NULL,
  share_rate REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  settled_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (investment_id) REFERENCES investments(id)
);

-- 审核流程表
CREATE TABLE IF NOT EXISTS review_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  department TEXT NOT NULL,
  reviewer_id INTEGER,
  agent_type TEXT NOT NULL,
  original_result TEXT, -- JSON: AI原始结果
  adjusted_result TEXT, -- JSON: 人工调整后结果
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'in_progress', 'approved', 'rejected')),
  comments TEXT,
  reviewed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

-- 验证码表
CREATE TABLE IF NOT EXISTS verification_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  target TEXT NOT NULL, -- 手机号或邮箱
  code TEXT NOT NULL,
  type TEXT NOT NULL, -- sms/email
  expires_at DATETIME NOT NULL,
  used INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_projects_financer ON projects(financer_id);
CREATE INDEX IF NOT EXISTS idx_projects_track ON projects(track_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_agent_results_project ON agent_results(project_id);
CREATE INDEX IF NOT EXISTS idx_agent_results_type ON agent_results(agent_type);
CREATE INDEX IF NOT EXISTS idx_investments_project ON investments(project_id);
CREATE INDEX IF NOT EXISTS idx_investments_investor ON investments(investor_id);
CREATE INDEX IF NOT EXISTS idx_review_tasks_project ON review_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_review_tasks_department ON review_tasks(department);
