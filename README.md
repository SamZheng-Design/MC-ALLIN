# 滴灌通收入分成投资系统

## 项目概述
- **名称**: 滴灌通AI智能体驱动收入分成投资大系统
- **目标**: 基于五大AI智能体实时计算，为融资方提供精准分成方案，为投资者提供透明的ETF化投资机会
- **核心特性**: 实时动态数据联动、多AI智能体并行运算、知识库自动回流、角色隔离门户

## 公网访问URL
- **演示地址**: https://3000-imb0g7y1yns9v1mqwpnk7-2b54fc91.sandbox.novita.ai

## 技术架构
- **前端**: 原生HTML + TailwindCSS + Chart.js + Axios
- **后端**: Hono (Cloudflare Workers兼容)
- **数据库**: Cloudflare D1 (SQLite)
- **认证**: JWT (jose库)
- **部署**: Cloudflare Pages

## 系统角色
| 角色代码 | 角色名称 | 门户入口 |
|---------|---------|---------|
| ROLE_FINANCER | 融资者 | /financer/dashboard |
| ROLE_INVESTOR | 投资者 | /investor/market-overview |
| ROLE_STAFF_LEGAL | 法务 | /staff/legal/agent-console |
| ROLE_STAFF_RISK | 风控 | /staff/risk/agent-console |
| ROLE_STAFF_FINANCE | 财务 | /staff/finance/agent-console |
| ROLE_STAFF_INVEST_SCHEME | 投委方案组 | /staff/invest_scheme/agent-console |
| ROLE_STAFF_INTEREST | 投委利益组 | /staff/interest/agent-console |

## 已完成功能

### 1. 统一认证模块
- ✅ 登录/注册Tab切换
- ✅ 6种角色选择（融资者、境内投资者、境外投资者3类、内部员工）
- ✅ 动态表单联动（不同角色显示不同认证字段）
- ✅ 快捷演示登录（一键体验各角色）
- ✅ JWT认证与角色路由

### 2. 融资者门户（核心模块）
- ✅ **赛道选择页** `/financer/dashboard`
  - 4大融资赛道卡片展示
  - 我的项目列表
  
- ✅ **动态信息填报页** `/financer/report/:trackId` (系统核心)
  - 赛道配置驱动的动态表单
  - **字段级实时保存**：任意字段变更立即同步
  - **5大AI智能体并行计算**：每次字段变更触发重算
  - **右侧实时评估面板**：无刷新更新
    - 收入分成方案（融资金额/分成比例/资金成本/置信度）
    - 法律合同（模板匹配/条款预览/完备度）
    - 风控评分（综合评分/多维度分析/黑名单校验）
    - 财务架构（账户类型/分账规则/结算周期）
    - 利益一致性（绑定评分/激励匹配度）
  
- ✅ **方案确认页** `/financer/confirm/:projectId`
  - 完整方案展示
  - 法律合同预览
  - 电子签名功能
  - 签约确认流程

### 3. 投资者门户
- ✅ **ETF化市场总览** `/investor/market-overview`
  - 大盘指标统计（项目数/已投规模/Pipeline/兑付）
  - 行业分布饼图
  - 产品层级分布图
  - 已投资/在评估项目Tab切换
  - 多维筛选器

- ✅ **投资组合** `/investor/portfolio`
  - 组合统计（累计投资/收益/待兑付）
  - 项目明细列表

- ✅ **Pipeline评估** `/investor/pipeline`
  - 赛道历史数据展示
  - 待投项目列表
  - **AI智能体评估详情弹窗**（5大智能体完整展示）
  - 投资意向提交

### 4. 内部员工门户
- ✅ **智能体控制台** `/staff/:department/agent-console`
  - 待办项目列表
  - AI处理状态展示
  - 待复核项标记
  - 项目复核弹窗
    - 原始申报信息展示
    - AI智能体输出展示
    - 人工校准编辑器
    - 审核通过/驳回操作
  - 知识库快捷入口
  - 最近校准记录

### 5. AI智能体系统
- ✅ **方案智能体** `/api/agent/scheme/calculate`
  - 基于门店数、营收、毛利率计算分成比例
  - 动态调整建议融资金额
  - 置信度评估

- ✅ **法律合约智能体** `/api/agent/legal/calculate`
  - 赛道模板匹配
  - 动态条款生成
  - 缺失条款检测
  - 完备度计算

- ✅ **风控智能体** `/api/agent/risk/calculate`
  - 多维度评分（经营稳定性/财务健康度/行业前景/管理能力）
  - 黑名单校验
  - 风险预警

- ✅ **财务智能体** `/api/agent/finance/calculate`
  - 账户类型推荐
  - 分账规则生成
  - 结算周期建议

- ✅ **利益一致性智能体** `/api/agent/interest/calculate`
  - 利益绑定评分
  - 激励机制分析
  - 优化建议

## 数据模型

### 核心表结构
- `users` - 用户表（多角色支持）
- `tracks` - 赛道配置表（动态字段Schema）
- `projects` - 项目申报表
- `agent_results` - AI智能体计算结果表
- `knowledge_base` - 知识库表
- `contracts` - 合同表
- `investments` - 投资记录表
- `review_tasks` - 审核任务表

### 赛道配置
- 连锁实体店（chain_store）
- 演唱会/商业活动（commercial_event）
- 旅游景区（tourism）
- 项目制非标服务（project_service）

## API接口

### 认证接口
- `POST /api/auth/send-code` - 发送验证码
- `POST /api/auth/register` - 注册
- `POST /api/auth/login` - 登录

### 融资者接口
- `GET /api/financer/tracks` - 获取赛道列表
- `GET /api/financer/tracks/:id` - 获取赛道详情
- `POST /api/financer/projects` - 创建项目
- `GET /api/financer/projects` - 获取项目列表
- `GET /api/financer/projects/:id` - 获取项目详情
- `PUT /api/financer/projects/:id` - 更新项目
- `POST /api/financer/projects/:id/sync` - 同步字段变更（核心）
- `POST /api/financer/projects/:id/sign` - 签约

### 智能体接口
- `POST /api/agent/scheme/calculate` - 方案计算
- `POST /api/agent/legal/calculate` - 法律计算
- `POST /api/agent/risk/calculate` - 风控计算
- `POST /api/agent/finance/calculate` - 财务计算
- `POST /api/agent/interest/calculate` - 利益计算
- `GET /api/agent/:type/result/:projectId` - 获取计算结果

### 投资者接口
- `GET /api/investor/overview` - 市场总览
- `GET /api/investor/pipeline` - Pipeline列表
- `POST /api/investor/invest` - 提交投资意向

### 内部员工接口
- `GET /api/staff/tasks` - 待办任务
- `POST /api/staff/tasks/:id/review` - 提交审核
- `GET /api/staff/knowledge-base` - 知识库查询
- `POST /api/staff/knowledge-base` - 更新知识库
- `POST /api/staff/knowledge-base/feedback` - 知识库回流

## 使用指南

### 快捷体验
1. 访问系统首页
2. 点击「登录」进入登录页
3. 使用「快捷演示登录」选择角色体验：
   - **融资者**: 体验动态填报和实时AI评估
   - **投资者**: 查看市场总览和Pipeline
   - **法务/风控**: 体验智能体控制台

### 融资者流程
1. 登录后选择融资赛道
2. 填写动态表单，观察右侧实时评估面板
3. 信息完善度达到60%后提交方案
4. 确认方案并电子签约

### 投资者流程
1. 登录后查看市场总览
2. 浏览Pipeline项目
3. 查看AI智能体评估详情
4. 选择层级和金额提交投资意向

## 本地开发

```bash
# 安装依赖
npm install

# 数据库迁移
npm run db:migrate:local

# 导入种子数据
npm run db:seed

# 构建项目
npm run build

# 启动开发服务器
npm run dev:sandbox

# 或使用PM2
pm2 start ecosystem.config.cjs
```

## 部署到Cloudflare

```bash
# 构建并部署
npm run deploy:prod
```

## 待优化项
- [ ] WebSocket真实实现（当前使用轮询模拟）
- [ ] 完整的文件上传功能
- [ ] 真实的AI模型调用（如OpenAI）
- [ ] 更完善的权限校验中间件
- [ ] 数据导出功能
- [ ] 通知系统

## 项目结构
```
webapp/
├── src/
│   ├── index.tsx          # 主入口
│   ├── pages/             # 页面渲染
│   │   ├── layout.ts      # 公共布局
│   │   ├── home.ts        # 首页
│   │   ├── login.ts       # 登录页
│   │   ├── financer/      # 融资者页面
│   │   ├── investor/      # 投资者页面
│   │   └── staff/         # 员工页面
│   └── routes/            # API路由
│       ├── auth.ts        # 认证
│       ├── financer.ts    # 融资者API
│       ├── investor.ts    # 投资者API
│       ├── staff.ts       # 员工API
│       └── agents.ts      # AI智能体API
├── migrations/            # 数据库迁移
├── seed.sql               # 种子数据
├── wrangler.jsonc         # Cloudflare配置
├── ecosystem.config.cjs   # PM2配置
└── package.json
```

## 部署状态
- **平台**: Cloudflare Pages (开发环境) / Sandbox (演示)
- **状态**: ✅ 运行中
- **最后更新**: 2026-02-05
