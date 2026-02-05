-- ========================================
-- 滴灌通收入分成投资系统 - 丰富案例数据
-- 设计理念：真实商业场景、多样化数据、完整生命周期
-- ========================================

-- 清空旧数据（保持外键约束顺序）
DELETE FROM revenue_shares;
DELETE FROM review_tasks;
DELETE FROM investments;
DELETE FROM contracts;
DELETE FROM agent_results;
DELETE FROM projects;
DELETE FROM verification_codes;
DELETE FROM knowledge_base;
DELETE FROM users;
DELETE FROM tracks;

-- ========================================
-- 1. 赛道配置（4大核心赛道）
-- ========================================
INSERT INTO tracks (id, name, code, description, icon, field_schema) VALUES 
(1, '连锁实体店', 'chain_store', '连锁零售、餐饮、服务门店等实体经营场景', 'store', '{
  "groups": [
    {
      "name": "主体信息",
      "key": "entity",
      "fields": [
        {"key": "company_name", "label": "企业名称", "type": "text", "required": true},
        {"key": "legal_person", "label": "法定代表人", "type": "text", "required": true},
        {"key": "unified_credit_code", "label": "统一社会信用代码", "type": "text", "required": true},
        {"key": "registered_capital", "label": "注册资本(万元)", "type": "number", "required": true},
        {"key": "establishment_date", "label": "成立日期", "type": "date", "required": true},
        {"key": "business_address", "label": "经营地址", "type": "text", "required": true},
        {"key": "contact_person", "label": "联系人", "type": "text", "required": true},
        {"key": "contact_phone", "label": "联系电话", "type": "text", "required": true}
      ]
    },
    {
      "name": "经营数据",
      "key": "operation",
      "fields": [
        {"key": "store_count", "label": "门店数量", "type": "number", "required": true},
        {"key": "direct_store_count", "label": "直营店数量", "type": "number", "required": true},
        {"key": "franchise_store_count", "label": "加盟店数量", "type": "number", "required": false},
        {"key": "avg_store_area", "label": "平均门店面积(平方米)", "type": "number", "required": true},
        {"key": "employee_count", "label": "员工总数", "type": "number", "required": true},
        {"key": "operating_years", "label": "经营年限", "type": "number", "required": true},
        {"key": "industry_category", "label": "行业细分", "type": "select", "options": ["餐饮", "零售", "美业", "教育", "健身", "娱乐", "其他"], "required": true}
      ]
    },
    {
      "name": "财务数据",
      "key": "finance",
      "fields": [
        {"key": "last_year_revenue", "label": "上年度营收(万元)", "type": "number", "required": true},
        {"key": "last_year_profit", "label": "上年度净利润(万元)", "type": "number", "required": true},
        {"key": "gross_margin", "label": "毛利率(%)", "type": "number", "required": true},
        {"key": "net_margin", "label": "净利率(%)", "type": "number", "required": true},
        {"key": "monthly_avg_revenue", "label": "月均营收(万元)", "type": "number", "required": true},
        {"key": "monthly_fixed_cost", "label": "月固定成本(万元)", "type": "number", "required": true},
        {"key": "debt_ratio", "label": "资产负债率(%)", "type": "number", "required": false}
      ]
    },
    {
      "name": "融资需求",
      "key": "funding",
      "fields": [
        {"key": "funding_amount", "label": "融资金额(万元)", "type": "number", "required": true},
        {"key": "funding_purpose", "label": "资金用途", "type": "multiselect", "options": ["开新店", "装修升级", "供应链", "营销推广", "人员扩充", "设备采购", "其他"], "required": true},
        {"key": "expected_payback_months", "label": "预期回本周期(月)", "type": "number", "required": true},
        {"key": "collateral", "label": "可提供担保", "type": "select", "options": ["无担保", "个人担保", "企业担保", "资产抵押"], "required": true},
        {"key": "existing_loans", "label": "现有贷款余额(万元)", "type": "number", "required": false}
      ]
    },
    {
      "name": "资质附件",
      "key": "documents",
      "fields": [
        {"key": "business_license", "label": "营业执照", "type": "file", "required": true},
        {"key": "financial_statements", "label": "财务报表(近一年)", "type": "file", "required": true},
        {"key": "tax_records", "label": "纳税记录", "type": "file", "required": false},
        {"key": "store_photos", "label": "门店照片", "type": "file", "multiple": true, "required": false},
        {"key": "other_documents", "label": "其他资质文件", "type": "file", "multiple": true, "required": false}
      ]
    }
  ]
}'),

(2, '演唱会/商业活动', 'commercial_event', '演唱会、展览、商业活动等项目制场景', 'ticket', '{
  "groups": [
    {
      "name": "活动基本信息",
      "key": "event",
      "fields": [
        {"key": "event_name", "label": "活动名称", "type": "text", "required": true},
        {"key": "event_type", "label": "活动类型", "type": "select", "options": ["演唱会", "音乐节", "展览", "体育赛事", "商业路演", "其他"], "required": true},
        {"key": "organizer_name", "label": "主办方名称", "type": "text", "required": true},
        {"key": "event_date", "label": "活动日期", "type": "date", "required": true},
        {"key": "event_location", "label": "活动地点", "type": "text", "required": true},
        {"key": "venue_capacity", "label": "场地容量(人)", "type": "number", "required": true},
        {"key": "expected_attendance", "label": "预计人数", "type": "number", "required": true}
      ]
    },
    {
      "name": "主办方信息",
      "key": "organizer",
      "fields": [
        {"key": "company_name", "label": "公司名称", "type": "text", "required": true},
        {"key": "legal_person", "label": "法定代表人", "type": "text", "required": true},
        {"key": "past_events", "label": "过往活动数量", "type": "number", "required": true},
        {"key": "success_rate", "label": "成功举办率(%)", "type": "number", "required": true}
      ]
    },
    {
      "name": "财务预算",
      "key": "budget",
      "fields": [
        {"key": "total_budget", "label": "总预算(万元)", "type": "number", "required": true},
        {"key": "ticket_price_avg", "label": "平均票价(元)", "type": "number", "required": true},
        {"key": "expected_ticket_revenue", "label": "预计票房收入(万元)", "type": "number", "required": true},
        {"key": "sponsor_revenue", "label": "预计赞助收入(万元)", "type": "number", "required": false},
        {"key": "other_revenue", "label": "其他收入(万元)", "type": "number", "required": false}
      ]
    },
    {
      "name": "融资需求",
      "key": "funding",
      "fields": [
        {"key": "funding_amount", "label": "融资金额(万元)", "type": "number", "required": true},
        {"key": "funding_purpose", "label": "资金用途", "type": "multiselect", "options": ["场地租赁", "艺人费用", "设备租赁", "宣传推广", "保险费用", "其他"], "required": true},
        {"key": "repayment_source", "label": "还款来源", "type": "multiselect", "options": ["票房收入", "赞助收入", "周边销售", "直播收入"], "required": true}
      ]
    }
  ]
}'),

(3, '旅游景区', 'tourism', '旅游景区、度假村、主题公园等文旅场景', 'mountain', '{
  "groups": [
    {
      "name": "景区基本信息",
      "key": "scenic",
      "fields": [
        {"key": "scenic_name", "label": "景区名称", "type": "text", "required": true},
        {"key": "scenic_level", "label": "景区等级", "type": "select", "options": ["5A", "4A", "3A", "2A", "其他"], "required": true},
        {"key": "location", "label": "所在地区", "type": "text", "required": true},
        {"key": "area_size", "label": "占地面积(平方公里)", "type": "number", "required": true},
        {"key": "opening_year", "label": "开业年份", "type": "number", "required": true}
      ]
    },
    {
      "name": "运营数据",
      "key": "operation",
      "fields": [
        {"key": "annual_visitors", "label": "年接待游客(万人)", "type": "number", "required": true},
        {"key": "peak_daily_visitors", "label": "日最高接待量(人)", "type": "number", "required": true},
        {"key": "ticket_price", "label": "门票价格(元)", "type": "number", "required": true},
        {"key": "avg_spend_per_visitor", "label": "人均消费(元)", "type": "number", "required": true},
        {"key": "employee_count", "label": "员工数量", "type": "number", "required": true}
      ]
    },
    {
      "name": "财务数据",
      "key": "finance",
      "fields": [
        {"key": "annual_revenue", "label": "年营收(万元)", "type": "number", "required": true},
        {"key": "ticket_revenue_ratio", "label": "门票收入占比(%)", "type": "number", "required": true},
        {"key": "annual_profit", "label": "年净利润(万元)", "type": "number", "required": true},
        {"key": "operating_cost", "label": "年运营成本(万元)", "type": "number", "required": true}
      ]
    },
    {
      "name": "融资需求",
      "key": "funding",
      "fields": [
        {"key": "funding_amount", "label": "融资金额(万元)", "type": "number", "required": true},
        {"key": "funding_purpose", "label": "资金用途", "type": "multiselect", "options": ["设施升级", "新项目建设", "营销推广", "人员培训", "数字化改造"], "required": true}
      ]
    }
  ]
}'),

(4, '项目制非标服务', 'project_service', '咨询、设计、IT服务等项目制非标服务场景', 'briefcase', '{
  "groups": [
    {
      "name": "服务商信息",
      "key": "provider",
      "fields": [
        {"key": "company_name", "label": "公司名称", "type": "text", "required": true},
        {"key": "legal_person", "label": "法定代表人", "type": "text", "required": true},
        {"key": "service_type", "label": "服务类型", "type": "select", "options": ["管理咨询", "IT服务", "设计服务", "营销服务", "法律服务", "财务服务", "其他"], "required": true},
        {"key": "team_size", "label": "团队规模", "type": "number", "required": true},
        {"key": "years_in_business", "label": "从业年限", "type": "number", "required": true}
      ]
    },
    {
      "name": "项目信息",
      "key": "project",
      "fields": [
        {"key": "project_name", "label": "项目名称", "type": "text", "required": true},
        {"key": "client_name", "label": "客户名称", "type": "text", "required": true},
        {"key": "contract_amount", "label": "合同金额(万元)", "type": "number", "required": true},
        {"key": "project_duration", "label": "项目周期(月)", "type": "number", "required": true},
        {"key": "payment_terms", "label": "付款方式", "type": "select", "options": ["一次性", "分期", "里程碑付款", "按月付款"], "required": true}
      ]
    },
    {
      "name": "历史业绩",
      "key": "history",
      "fields": [
        {"key": "completed_projects", "label": "已完成项目数", "type": "number", "required": true},
        {"key": "avg_project_value", "label": "平均项目金额(万元)", "type": "number", "required": true},
        {"key": "client_retention_rate", "label": "客户续约率(%)", "type": "number", "required": true},
        {"key": "annual_revenue", "label": "年营收(万元)", "type": "number", "required": true}
      ]
    },
    {
      "name": "融资需求",
      "key": "funding",
      "fields": [
        {"key": "funding_amount", "label": "融资金额(万元)", "type": "number", "required": true},
        {"key": "funding_purpose", "label": "资金用途", "type": "multiselect", "options": ["项目垫资", "团队扩充", "设备采购", "办公场地", "其他"], "required": true}
      ]
    }
  ]
}');

-- ========================================
-- 2. 用户数据（多角色多类型）
-- ========================================

-- 融资者用户（8个不同行业）
INSERT INTO users (id, phone, email, password_hash, role, department, name, company_name, status) VALUES
(1, '13800001001', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '张明华', '喜茶深圳餐饮管理有限公司', 'active'),
(2, '13800001002', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '李雅琳', '瑞幸咖啡上海运营中心', 'active'),
(3, '13800001003', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '王建国', '古茗茶饮浙江总部', 'active'),
(4, '13800001004', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '陈小美', '名创优品华南区', 'active'),
(5, '13800001005', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '赵大鹏', '星耀文化传媒有限公司', 'active'),
(6, '13800001006', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '刘芳芳', '黄山旅游发展股份有限公司', 'active'),
(7, '13800001007', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '孙志强', '腾讯云数字化咨询', 'active'),
(8, '13800001008', NULL, 'demo_hash', 'ROLE_FINANCER', NULL, '周慧敏', '美团优选社区团购', 'active');

-- 境内投资者（3个）
INSERT INTO users (id, phone, email, password_hash, role, department, name, company_name, status) VALUES
(10, '13900001001', NULL, 'demo_hash', 'ROLE_INVESTOR', NULL, '林志伟', '华夏资本管理有限公司', 'active'),
(11, '13900001002', NULL, 'demo_hash', 'ROLE_INVESTOR', NULL, '黄晓红', '招商银行私人银行部', 'active'),
(12, '13900001003', NULL, 'demo_hash', 'ROLE_INVESTOR', NULL, '吴明辉', '中金公司另类投资部', 'active');

-- 境外投资者（3个不同类型）
INSERT INTO users (id, phone, email, password_hash, role, department, name, company_name, status) VALUES
(13, NULL, 'john.smith@goldman.com', 'demo_hash', 'ROLE_INVESTOR_OVERSEAS_LICENSED', NULL, 'John Smith', 'Goldman Sachs Asia', 'active'),
(14, NULL, 'mary.wong@hk-fund.com', 'demo_hash', 'ROLE_INVESTOR_OVERSEAS_PI_INDIVIDUAL', NULL, 'Mary Wong', 'HK Private Investor', 'active'),
(15, NULL, 'investment@sg-capital.com', 'demo_hash', 'ROLE_INVESTOR_OVERSEAS_PI_COMPANY', NULL, 'David Lee', 'Singapore Capital Partners', 'active');

-- 内部员工（各部门）
INSERT INTO users (id, phone, email, password_hash, role, department, name, company_name, status) VALUES
(20, NULL, 'legal@dgt.com', 'demo_hash', 'ROLE_STAFF_LEGAL', 'legal', '法务专员-周律师', NULL, 'active'),
(21, NULL, 'risk@dgt.com', 'demo_hash', 'ROLE_STAFF_RISK', 'risk', '风控专员-钱经理', NULL, 'active'),
(22, NULL, 'finance@dgt.com', 'demo_hash', 'ROLE_STAFF_FINANCE', 'finance', '财务专员-孙会计', NULL, 'active'),
(23, NULL, 'scheme@dgt.com', 'demo_hash', 'ROLE_STAFF_INVEST_SCHEME', 'invest_scheme', '方案专员-李分析师', NULL, 'active'),
(24, NULL, 'interest@dgt.com', 'demo_hash', 'ROLE_STAFF_INTEREST', 'interest', '利益分析专员-王顾问', NULL, 'active');

-- ========================================
-- 3. 知识库数据（各智能体专业知识）
-- ========================================
INSERT INTO knowledge_base (id, agent_type, category, title, content, version) VALUES
-- 方案智能体知识
(1, 'scheme', 'pricing_model', '连锁实体店分成比例基准', '基于门店数量、营收规模、毛利率的分成比例计算模型：
- 基准比例: 8-15%
- 门店数量调整: >10家-0.5%, >30家-1%, >50家-1.5%
- 营收规模调整: >1000万-0.3%, >3000万-0.5%, >5000万-0.8%
- 毛利率调整: <30%+1%, 30-50%±0%, >50%-0.5%
- 经营年限调整: <2年+1%, 2-5年±0%, >5年-0.5%', 'v2.1'),
(2, 'scheme', 'pricing_model', '演唱会活动分成比例基准', '项目制活动的分成计算逻辑：
- 基准比例: 12-20%
- 往期成功率调整: >90%-2%, 80-90%-1%, <80%+2%
- 预售比例影响: >60%预售-1.5%, >40%预售-1%
- 场地容量调整: >10000人规模-1%, >5000人-0.5%', 'v2.0'),
(3, 'scheme', 'pricing_model', '旅游景区分成比例基准', '文旅项目的分成计算逻辑：
- 基准比例: 6-12%
- 景区等级调整: 5A-1.5%, 4A-1%, 3A±0%
- 年客流调整: >100万人次-0.5%, >50万人次-0.3%
- 季节性因子: 淡旺季差异>3倍+0.5%', 'v1.8'),
(4, 'scheme', 'pricing_model', '项目服务分成比例基准', '非标服务的分成计算逻辑：
- 基准比例: 10-18%
- 客户质量调整: 上市公司-1%, 500强-1.5%
- 续约率调整: >80%-1%, >90%-1.5%
- 账期调整: 账期>90天+1%', 'v1.5'),

-- 法务智能体知识
(10, 'legal', 'contract_template', '收入分成协议模板-连锁实体店', '标准收入分成协议模板(V3.2)，适用于连锁实体店场景，包含：
【核心条款】定义条款(15项)、分成计算方式(含保底条款)、支付结算(T+3)、账户监管、违约责任、争议解决(仲裁优先)
【附加条款】经营限制、竞业禁止、信息披露、提前还款、续期条款', 'v3.2'),
(11, 'legal', 'contract_template', '收入分成协议模板-活动项目', '项目制分成协议模板(V2.8)，适用于演出活动场景，包含：
【核心条款】票房分成比例、赞助收入分配、周边收益分成、风险共担条款
【特殊条款】取消险条款、不可抗力、延期处理、结算时点', 'v2.8'),
(12, 'legal', 'clause_library', '违约责任条款库', '违约条款标准库：
- 逾期支付: 日万分之五滞纳金，上限10%
- 虚假陈述: 立即清偿+20%违约金
- 经营异常: 提前回收权+补偿机制
- 恶意转移: 刑事追诉保留权', 'v2.0'),
(13, 'legal', 'compliance_check', '合规检查清单', '融资项目合规要点：
- 主体资质: 营业执照有效性、经营范围匹配
- 财务真实性: 三年一贯性、审计报告
- 关联交易: 同业竞争、利益输送
- 诉讼查询: 企查查/天眼查历史记录', 'v1.5'),

-- 风控智能体知识
(20, 'risk', 'scoring_model', '综合风控评分模型', '多维度评分体系(总分100分)：
【经营稳定性-30分】门店存活率(10)、营收增长率(10)、员工稳定性(10)
【财务健康度-30分】毛利率(10)、现金流(10)、负债率(10)
【行业前景-20分】市场规模(10)、竞争格局(10)
【管理能力-20分】团队背景(10)、数字化程度(10)', 'v3.0'),
(21, 'risk', 'blacklist_rules', '黑名单规则库', '风险预警标准：
- 红线指标: 法人被执行、企业被列入严重违法名单
- 黄线指标: 近一年诉讼>3起、关联企业异常>2家
- 灰线指标: 频繁变更法人、注册地异常', 'v2.2'),
(22, 'risk', 'industry_benchmark', '行业风险基准', '各行业风险系数：
- 餐饮: 基准系数1.2(高周转高风险)
- 零售: 基准系数1.0(中等风险)
- 美业: 基准系数1.3(预付卡风险)
- 教育: 基准系数1.5(政策风险)
- 文旅: 基准系数1.1(季节性风险)', 'v2.0'),

-- 财务智能体知识
(30, 'finance', 'account_model', '账户架构推荐模型', '分级账户管理标准：
【一类账户-独立监管】融资>500万，日均流水>50万
【二类账户-共管模式】融资100-500万，有担保
【三类账户-自主+报备】融资<100万，信用良好
【资金归集】T+1自动归集，异常预警', 'v2.5'),
(31, 'finance', 'settlement_rules', '结算规则库', '分成结算标准：
- 日结模式: 适用高频交易(餐饮、零售)
- 周结模式: 适用中频交易(美业、服务)
- 月结模式: 适用低频大额(B2B、项目制)
- 异常处理: 偏离度>20%触发人工复核', 'v2.0'),

-- 利益智能体知识
(40, 'interest', 'alignment_model', '利益一致性评分模型', '利益绑定评估体系(100分)：
【分成合理性-40分】行业对标(15)、双方收益平衡(15)、激励相容(10)
【退出机制-30分】提前还款条款(15)、违约处置(15)
【信息透明-30分】数据披露(15)、监督权利(15)', 'v2.3'),
(41, 'interest', 'incentive_library', '激励机制库', '利益绑定增强措施：
- 阶梯分成: 超额收益递减分成
- 保底+浮动: 最低保障+绩效奖励
- 对赌条款: 达成目标返还部分分成
- 续期优惠: 良好履约享受利率优惠', 'v1.8');

-- ========================================
-- 4. 项目数据（12个真实案例覆盖全生命周期）
-- ========================================

-- 连锁实体店案例（4个）
INSERT INTO projects (id, project_no, financer_id, track_id, form_data, completeness, status, submitted_at, created_at) VALUES
-- 喜茶 - 已签约运营中
(1, 'DGT-2024-CS-001', 1, 1, '{
  "entity": {
    "company_name": "喜茶深圳餐饮管理有限公司",
    "legal_person": "张明华",
    "unified_credit_code": "91440300MA5DXXXX01",
    "registered_capital": 5000,
    "establishment_date": "2018-05-15",
    "business_address": "深圳市南山区科技园南区数字技术大厦12层",
    "contact_person": "张明华",
    "contact_phone": "13800001001"
  },
  "operation": {
    "store_count": 45,
    "direct_store_count": 38,
    "franchise_store_count": 7,
    "avg_store_area": 120,
    "employee_count": 520,
    "operating_years": 6,
    "industry_category": "餐饮"
  },
  "finance": {
    "last_year_revenue": 8500,
    "last_year_profit": 1020,
    "gross_margin": 62,
    "net_margin": 12,
    "monthly_avg_revenue": 708,
    "monthly_fixed_cost": 320,
    "debt_ratio": 35
  },
  "funding": {
    "funding_amount": 800,
    "funding_purpose": ["开新店", "装修升级", "供应链"],
    "expected_payback_months": 18,
    "collateral": "企业担保",
    "existing_loans": 200
  }
}', 95, 'active', '2024-10-15 09:30:00', '2024-10-10 14:20:00'),

-- 瑞幸咖啡 - 审核通过待签约
(2, 'DGT-2024-CS-002', 2, 1, '{
  "entity": {
    "company_name": "瑞幸咖啡上海运营中心",
    "legal_person": "李雅琳",
    "unified_credit_code": "91310000MA1GXXXX02",
    "registered_capital": 3000,
    "establishment_date": "2019-03-20",
    "business_address": "上海市浦东新区陆家嘴金融中心B座8层",
    "contact_person": "李雅琳",
    "contact_phone": "13800001002"
  },
  "operation": {
    "store_count": 128,
    "direct_store_count": 128,
    "franchise_store_count": 0,
    "avg_store_area": 45,
    "employee_count": 380,
    "operating_years": 5,
    "industry_category": "餐饮"
  },
  "finance": {
    "last_year_revenue": 15600,
    "last_year_profit": 1248,
    "gross_margin": 58,
    "net_margin": 8,
    "monthly_avg_revenue": 1300,
    "monthly_fixed_cost": 650,
    "debt_ratio": 42
  },
  "funding": {
    "funding_amount": 1500,
    "funding_purpose": ["开新店", "设备采购"],
    "expected_payback_months": 24,
    "collateral": "资产抵押",
    "existing_loans": 500
  }
}', 92, 'approved', '2024-12-20 11:00:00', '2024-12-15 16:45:00'),

-- 古茗茶饮 - 审核中
(3, 'DGT-2025-CS-003', 3, 1, '{
  "entity": {
    "company_name": "古茗茶饮浙江总部",
    "legal_person": "王建国",
    "unified_credit_code": "91330000MA2BXXXX03",
    "registered_capital": 2000,
    "establishment_date": "2020-06-10",
    "business_address": "杭州市西湖区文三路478号华星时代广场15层",
    "contact_person": "王建国",
    "contact_phone": "13800001003"
  },
  "operation": {
    "store_count": 68,
    "direct_store_count": 25,
    "franchise_store_count": 43,
    "avg_store_area": 60,
    "employee_count": 180,
    "operating_years": 4,
    "industry_category": "餐饮"
  },
  "finance": {
    "last_year_revenue": 4200,
    "last_year_profit": 504,
    "gross_margin": 55,
    "net_margin": 12,
    "monthly_avg_revenue": 350,
    "monthly_fixed_cost": 150,
    "debt_ratio": 28
  },
  "funding": {
    "funding_amount": 500,
    "funding_purpose": ["开新店", "营销推广"],
    "expected_payback_months": 15,
    "collateral": "个人担保",
    "existing_loans": 100
  }
}', 88, 'reviewing', '2025-01-25 10:15:00', '2025-01-20 09:00:00'),

-- 名创优品 - 草稿状态
(4, 'DGT-2025-CS-004', 4, 1, '{
  "entity": {
    "company_name": "名创优品华南区",
    "legal_person": "陈小美",
    "unified_credit_code": "91440000MA5CXXXX04",
    "registered_capital": 8000,
    "establishment_date": "2017-08-25",
    "business_address": "广州市天河区珠江新城华夏路30号",
    "contact_person": "陈小美",
    "contact_phone": "13800001004"
  },
  "operation": {
    "store_count": 210,
    "direct_store_count": 85,
    "franchise_store_count": 125,
    "avg_store_area": 180,
    "employee_count": 850,
    "operating_years": 7,
    "industry_category": "零售"
  },
  "finance": {
    "last_year_revenue": 32000,
    "last_year_profit": 2560,
    "gross_margin": 45,
    "net_margin": 8,
    "monthly_avg_revenue": 2667,
    "monthly_fixed_cost": 1400,
    "debt_ratio": 38
  },
  "funding": {
    "funding_amount": 3000,
    "funding_purpose": ["开新店", "供应链", "数字化"],
    "expected_payback_months": 30,
    "collateral": "资产抵押",
    "existing_loans": 1200
  }
}', 65, 'draft', NULL, '2025-02-01 11:30:00');

-- 演唱会/活动案例（3个）
INSERT INTO projects (id, project_no, financer_id, track_id, form_data, completeness, status, submitted_at, created_at) VALUES
-- 周杰伦演唱会 - 已签约
(5, 'DGT-2024-CE-001', 5, 2, '{
  "event": {
    "event_name": "周杰伦2025嘉年华世界巡回演唱会-深圳站",
    "event_type": "演唱会",
    "organizer_name": "星耀文化传媒",
    "event_date": "2025-05-15",
    "event_location": "深圳湾体育中心(春茧)",
    "venue_capacity": 40000,
    "expected_attendance": 38000
  },
  "organizer": {
    "company_name": "星耀文化传媒有限公司",
    "legal_person": "赵大鹏",
    "past_events": 28,
    "success_rate": 96
  },
  "budget": {
    "total_budget": 5500,
    "ticket_price_avg": 1280,
    "expected_ticket_revenue": 4864,
    "sponsor_revenue": 800,
    "other_revenue": 300
  },
  "funding": {
    "funding_amount": 2000,
    "funding_purpose": ["艺人费用", "场地租赁", "设备租赁"],
    "repayment_source": ["票房收入", "赞助收入"]
  }
}', 98, 'active', '2024-11-20 14:00:00', '2024-11-10 09:30:00'),

-- 草莓音乐节 - 审核中
(6, 'DGT-2025-CE-002', 5, 2, '{
  "event": {
    "event_name": "2025草莓音乐节-成都站",
    "event_type": "音乐节",
    "organizer_name": "星耀文化传媒",
    "event_date": "2025-04-28",
    "event_location": "成都世纪城新国际会展中心",
    "venue_capacity": 25000,
    "expected_attendance": 22000
  },
  "organizer": {
    "company_name": "星耀文化传媒有限公司",
    "legal_person": "赵大鹏",
    "past_events": 28,
    "success_rate": 96
  },
  "budget": {
    "total_budget": 2800,
    "ticket_price_avg": 580,
    "expected_ticket_revenue": 1276,
    "sponsor_revenue": 1200,
    "other_revenue": 500
  },
  "funding": {
    "funding_amount": 1000,
    "funding_purpose": ["艺人费用", "宣传推广", "设备租赁"],
    "repayment_source": ["票房收入", "赞助收入", "周边销售"]
  }
}', 90, 'reviewing', '2025-01-28 16:30:00', '2025-01-22 11:00:00'),

-- 电竞比赛 - 已完成
(7, 'DGT-2024-CE-003', 5, 2, '{
  "event": {
    "event_name": "英雄联盟S14全球总决赛观赛派对",
    "event_type": "体育赛事",
    "organizer_name": "星耀文化传媒",
    "event_date": "2024-11-02",
    "event_location": "上海梅赛德斯奔驰文化中心",
    "venue_capacity": 18000,
    "expected_attendance": 16500
  },
  "organizer": {
    "company_name": "星耀文化传媒有限公司",
    "legal_person": "赵大鹏",
    "past_events": 26,
    "success_rate": 95
  },
  "budget": {
    "total_budget": 1200,
    "ticket_price_avg": 388,
    "expected_ticket_revenue": 640,
    "sponsor_revenue": 450,
    "other_revenue": 180
  },
  "funding": {
    "funding_amount": 500,
    "funding_purpose": ["场地租赁", "设备租赁", "宣传推广"],
    "repayment_source": ["票房收入", "赞助收入", "直播收入"]
  }
}', 100, 'completed', '2024-09-15 10:00:00', '2024-09-01 14:20:00');

-- 旅游景区案例（2个）
INSERT INTO projects (id, project_no, financer_id, track_id, form_data, completeness, status, submitted_at, created_at) VALUES
-- 黄山景区 - 已签约
(8, 'DGT-2024-TM-001', 6, 3, '{
  "scenic": {
    "scenic_name": "黄山风景区西海大峡谷",
    "scenic_level": "5A",
    "location": "安徽省黄山市黄山区",
    "area_size": 160.6,
    "opening_year": 1979
  },
  "operation": {
    "annual_visitors": 350,
    "peak_daily_visitors": 25000,
    "ticket_price": 190,
    "avg_spend_per_visitor": 580,
    "employee_count": 2800
  },
  "finance": {
    "annual_revenue": 20300,
    "ticket_revenue_ratio": 32,
    "annual_profit": 5075,
    "operating_cost": 12180
  },
  "funding": {
    "funding_amount": 2500,
    "funding_purpose": ["设施升级", "数字化改造", "营销推广"]
  }
}', 95, 'active', '2024-08-20 09:00:00', '2024-08-10 15:30:00'),

-- 张家界玻璃桥 - 提交待审
(9, 'DGT-2025-TM-002', 6, 3, '{
  "scenic": {
    "scenic_name": "张家界大峡谷玻璃桥",
    "scenic_level": "4A",
    "location": "湖南省张家界市慈利县",
    "area_size": 35.2,
    "opening_year": 2016
  },
  "operation": {
    "annual_visitors": 180,
    "peak_daily_visitors": 12000,
    "ticket_price": 138,
    "avg_spend_per_visitor": 320,
    "employee_count": 450
  },
  "finance": {
    "annual_revenue": 5760,
    "ticket_revenue_ratio": 65,
    "annual_profit": 1728,
    "operating_cost": 3456
  },
  "funding": {
    "funding_amount": 800,
    "funding_purpose": ["新项目建设", "设施升级"]
  }
}', 85, 'submitted', '2025-02-01 10:00:00', '2025-01-28 14:00:00');

-- 项目服务案例（3个）
INSERT INTO projects (id, project_no, financer_id, track_id, form_data, completeness, status, submitted_at, created_at) VALUES
-- IT咨询项目 - 已签约
(10, 'DGT-2024-PS-001', 7, 4, '{
  "provider": {
    "company_name": "腾讯云数字化咨询",
    "legal_person": "孙志强",
    "service_type": "IT服务",
    "team_size": 85,
    "years_in_business": 8
  },
  "project": {
    "project_name": "某银行核心系统云迁移项目",
    "client_name": "中国农业银行数据中心",
    "contract_amount": 3500,
    "project_duration": 18,
    "payment_terms": "里程碑付款"
  },
  "history": {
    "completed_projects": 56,
    "avg_project_value": 1200,
    "client_retention_rate": 88,
    "annual_revenue": 18500
  },
  "funding": {
    "funding_amount": 1200,
    "funding_purpose": ["项目垫资", "团队扩充"]
  }
}', 94, 'active', '2024-09-10 11:30:00', '2024-09-01 09:00:00'),

-- 营销服务 - 审核中
(11, 'DGT-2025-PS-002', 8, 4, '{
  "provider": {
    "company_name": "美团优选社区团购",
    "legal_person": "周慧敏",
    "service_type": "营销服务",
    "team_size": 120,
    "years_in_business": 5
  },
  "project": {
    "project_name": "华南区2025年度品牌营销服务",
    "client_name": "宝洁中国",
    "contract_amount": 2800,
    "project_duration": 12,
    "payment_terms": "按月付款"
  },
  "history": {
    "completed_projects": 38,
    "avg_project_value": 800,
    "client_retention_rate": 92,
    "annual_revenue": 12000
  },
  "funding": {
    "funding_amount": 600,
    "funding_purpose": ["项目垫资", "设备采购"]
  }
}', 87, 'reviewing', '2025-01-30 15:00:00', '2025-01-25 10:30:00'),

-- 设计服务 - 草稿
(12, 'DGT-2025-PS-003', 7, 4, '{
  "provider": {
    "company_name": "腾讯云数字化咨询",
    "legal_person": "孙志强",
    "service_type": "设计服务",
    "team_size": 35,
    "years_in_business": 8
  },
  "project": {
    "project_name": "某新能源品牌全案视觉设计",
    "client_name": "蔚来汽车",
    "contract_amount": 580,
    "project_duration": 6,
    "payment_terms": "分期"
  },
  "history": {
    "completed_projects": 56,
    "avg_project_value": 450,
    "client_retention_rate": 88,
    "annual_revenue": 18500
  },
  "funding": {
    "funding_amount": 200,
    "funding_purpose": ["项目垫资"]
  }
}', 55, 'draft', NULL, '2025-02-03 16:00:00');

-- ========================================
-- 5. AI智能体计算结果（为已提交项目生成完整结果）
-- ========================================

-- 项目1: 喜茶 - 完整的5个智能体结果
INSERT INTO agent_results (project_id, agent_type, result_data, confidence, version, kb_version) VALUES
(1, 'scheme', '{
  "recommended_amount": 800,
  "share_rate": 8.5,
  "funding_cost_rate": 12.8,
  "payback_months": 16,
  "monthly_share": 68,
  "confidence_factors": {
    "revenue_stability": 92,
    "growth_potential": 88,
    "industry_benchmark": 85
  },
  "adjustments": [
    {"factor": "门店数>30", "impact": -1.0},
    {"factor": "营收>5000万", "impact": -0.8},
    {"factor": "毛利率>60%", "impact": -0.5},
    {"factor": "经营年限>5年", "impact": -0.5}
  ],
  "suggestion": "该项目经营稳定，建议采用标准分成模式，可考虑阶梯分成激励"
}', 92, 1, 'v2.1'),
(1, 'legal', '{
  "template_id": "TPL-CS-001",
  "template_name": "连锁餐饮收入分成协议(标准版)",
  "completeness": 95,
  "clauses": [
    {"name": "分成计算条款", "status": "complete", "content": "按月度实际营收的8.5%计算分成"},
    {"name": "支付结算条款", "status": "complete", "content": "T+3工作日内完成结算支付"},
    {"name": "账户监管条款", "status": "complete", "content": "采用二类共管账户模式"},
    {"name": "违约责任条款", "status": "complete", "content": "逾期支付日万分之五滞纳金"},
    {"name": "提前还款条款", "status": "complete", "content": "运营满12个月后可申请提前还款"}
  ],
  "missing_clauses": [],
  "risk_notes": ["建议补充季节性调整条款", "建议明确节假日结算安排"]
}', 95, 1, 'v3.2'),
(1, 'risk', '{
  "total_score": 85,
  "risk_level": "低风险",
  "dimensions": {
    "operation_stability": {"score": 88, "weight": 30, "details": "门店存活率95%，营收同比增长18%"},
    "financial_health": {"score": 82, "weight": 30, "details": "毛利率62%优于行业，负债率35%可控"},
    "industry_prospect": {"score": 85, "weight": 20, "details": "新茶饮市场持续增长，品牌认知度高"},
    "management_capability": {"score": 86, "weight": 20, "details": "管理团队经验丰富，数字化程度高"}
  },
  "blacklist_check": {
    "status": "通过",
    "items": ["法人无被执行记录", "企业无严重违法", "无关联企业异常"]
  },
  "warnings": [],
  "suggestion": "项目风险可控，建议正常推进"
}', 88, 1, 'v3.0'),
(1, 'finance', '{
  "account_type": "二类共管账户",
  "account_reason": "融资金额800万，有企业担保",
  "settlement_mode": "日结模式",
  "settlement_cycle": "T+1归集，T+3分成",
  "monitoring_rules": [
    {"rule": "日流水波动监控", "threshold": "偏离均值>30%预警"},
    {"rule": "周度汇总复核", "threshold": "累计偏离>20%触发人工"},
    {"rule": "月度对账确认", "threshold": "差异>1%需调整"}
  ],
  "fund_flow": {
    "collection_account": "招商银行深圳分行 622xxx001",
    "share_account": "DGT专户 622xxx002",
    "auto_transfer": true
  }
}', 90, 1, 'v2.5'),
(1, 'interest', '{
  "alignment_score": 87,
  "rating": "良好",
  "dimensions": {
    "share_fairness": {"score": 85, "details": "8.5%分成比例符合行业中位数"},
    "incentive_compatibility": {"score": 88, "details": "阶梯分成设计激励相容"},
    "exit_mechanism": {"score": 89, "details": "提前还款条款合理，双方利益平衡"}
  },
  "binding_measures": [
    {"type": "阶梯分成", "description": "超额收益部分分成比例递减至6%"},
    {"type": "续期优惠", "description": "良好履约可享受续期利率下调0.5%"}
  ],
  "optimization_suggestions": [
    "建议增加经营目标对赌条款",
    "可考虑引入股权激励选择权"
  ]
}', 87, 1, 'v2.3');

-- 项目2: 瑞幸咖啡 - 完整结果
INSERT INTO agent_results (project_id, agent_type, result_data, confidence, version, kb_version) VALUES
(2, 'scheme', '{
  "recommended_amount": 1500,
  "share_rate": 7.2,
  "funding_cost_rate": 11.5,
  "payback_months": 22,
  "monthly_share": 108,
  "confidence_factors": {
    "revenue_stability": 90,
    "growth_potential": 94,
    "industry_benchmark": 88
  },
  "adjustments": [
    {"factor": "门店数>100", "impact": -1.5},
    {"factor": "营收>10000万", "impact": -1.0},
    {"factor": "全直营模式", "impact": -0.5}
  ],
  "suggestion": "大规模连锁，建议采用较低分成比例+长周期模式"
}', 94, 1, 'v2.1'),
(2, 'legal', '{
  "template_id": "TPL-CS-002",
  "template_name": "大型连锁收入分成协议(定制版)",
  "completeness": 92,
  "clauses": [
    {"name": "分成计算条款", "status": "complete", "content": "按月度实际营收的7.2%计算分成"},
    {"name": "支付结算条款", "status": "complete", "content": "T+5工作日内完成结算支付"},
    {"name": "账户监管条款", "status": "complete", "content": "采用一类独立监管账户"},
    {"name": "违约责任条款", "status": "complete", "content": "逾期支付日万分之三滞纳金"},
    {"name": "扩张限制条款", "status": "pending", "content": "待补充新店开设审批流程"}
  ],
  "missing_clauses": ["新店开设审批条款"],
  "risk_notes": ["建议增加区域扩张限制条款"]
}', 92, 1, 'v3.2'),
(2, 'risk', '{
  "total_score": 82,
  "risk_level": "低风险",
  "dimensions": {
    "operation_stability": {"score": 85, "weight": 30, "details": "全直营模式管控强，标准化程度高"},
    "financial_health": {"score": 78, "weight": 30, "details": "毛利率58%，负债率42%略高需关注"},
    "industry_prospect": {"score": 88, "weight": 20, "details": "咖啡市场快速增长，品牌势能强"},
    "management_capability": {"score": 80, "weight": 20, "details": "管理团队执行力强，扩张经验丰富"}
  },
  "blacklist_check": {
    "status": "通过",
    "items": ["法人无被执行记录", "历史诉讼已结清"]
  },
  "warnings": ["负债率接近警戒线，建议关注"],
  "suggestion": "整体风险可控，建议强化现金流监控"
}', 85, 1, 'v3.0'),
(2, 'finance', '{
  "account_type": "一类独立监管账户",
  "account_reason": "融资金额1500万，规模较大",
  "settlement_mode": "日结模式",
  "settlement_cycle": "T+1归集，T+5分成",
  "monitoring_rules": [
    {"rule": "实时流水监控", "threshold": "单笔>10万即时推送"},
    {"rule": "日度汇总复核", "threshold": "日偏离>25%预警"},
    {"rule": "周度风控评估", "threshold": "连续3日异常触发现场"}
  ]
}', 91, 1, 'v2.5'),
(2, 'interest', '{
  "alignment_score": 84,
  "rating": "良好",
  "dimensions": {
    "share_fairness": {"score": 86, "details": "7.2%分成比例略低于行业，但规模效应合理"},
    "incentive_compatibility": {"score": 82, "details": "建议增加业绩对赌"},
    "exit_mechanism": {"score": 85, "details": "退出条款完善"}
  },
  "optimization_suggestions": [
    "建议设置门店数量增长对赌",
    "可考虑设置提前完成奖励机制"
  ]
}', 84, 1, 'v2.3');

-- 项目3: 古茗茶饮 - 审核中状态结果
INSERT INTO agent_results (project_id, agent_type, result_data, confidence, version, kb_version) VALUES
(3, 'scheme', '{
  "recommended_amount": 500,
  "share_rate": 9.5,
  "funding_cost_rate": 14.2,
  "payback_months": 14,
  "monthly_share": 47.5,
  "confidence_factors": {
    "revenue_stability": 85,
    "growth_potential": 82,
    "industry_benchmark": 80
  },
  "suggestion": "加盟比例较高，建议增加风险溢价"
}', 85, 1, 'v2.1'),
(3, 'legal', '{
  "template_id": "TPL-CS-003",
  "template_name": "加盟连锁收入分成协议",
  "completeness": 88,
  "clauses": [
    {"name": "分成计算条款", "status": "complete", "content": "按月度实际营收的9.5%计算分成"},
    {"name": "加盟店责任条款", "status": "pending", "content": "待明确加盟店收入确认方式"}
  ],
  "missing_clauses": ["加盟店收入确认条款"],
  "risk_notes": ["加盟店收入确认需要特别关注"]
}', 88, 1, 'v3.2'),
(3, 'risk', '{
  "total_score": 78,
  "risk_level": "中等风险",
  "dimensions": {
    "operation_stability": {"score": 75, "weight": 30, "details": "加盟店占比63%，管控难度较大"},
    "financial_health": {"score": 82, "weight": 30, "details": "财务指标健康"},
    "industry_prospect": {"score": 80, "weight": 20, "details": "区域品牌，市场认知度中等"},
    "management_capability": {"score": 76, "weight": 20, "details": "加盟管理体系待完善"}
  },
  "warnings": ["加盟店比例高，收入确认风险"],
  "suggestion": "建议强化加盟店流水监控机制"
}', 80, 1, 'v3.0'),
(3, 'finance', '{
  "account_type": "二类共管账户",
  "account_reason": "融资金额500万，加盟模式需加强监管",
  "settlement_mode": "周结模式",
  "settlement_cycle": "周度汇总，T+3分成"
}', 85, 1, 'v2.5'),
(3, 'interest', '{
  "alignment_score": 79,
  "rating": "一般",
  "dimensions": {
    "share_fairness": {"score": 78, "details": "分成比例合理但加盟收入确认存在风险"},
    "incentive_compatibility": {"score": 80, "details": "需增加加盟店激励绑定"}
  },
  "optimization_suggestions": [
    "建议要求加盟店系统对接",
    "增加加盟店表现的连带条款"
  ]
}', 79, 1, 'v2.3');

-- 项目5: 周杰伦演唱会 - 完整结果
INSERT INTO agent_results (project_id, agent_type, result_data, confidence, version, kb_version) VALUES
(5, 'scheme', '{
  "recommended_amount": 2000,
  "share_rate": 10.5,
  "funding_cost_rate": 15.8,
  "payback_months": 3,
  "expected_return": 2315,
  "confidence_factors": {
    "artist_appeal": 98,
    "presale_ratio": 85,
    "historical_success": 96
  },
  "adjustments": [
    {"factor": "顶流艺人", "impact": -2.0},
    {"factor": "成功率>95%", "impact": -1.5},
    {"factor": "预售>60%", "impact": -1.0}
  ],
  "suggestion": "顶级IP项目，风险低回报快，建议快速推进"
}', 96, 1, 'v2.0'),
(5, 'legal', '{
  "template_id": "TPL-CE-001",
  "template_name": "演唱会收入分成协议(顶流版)",
  "completeness": 98,
  "clauses": [
    {"name": "票房分成条款", "status": "complete", "content": "票房收入的10.5%作为分成"},
    {"name": "赞助分成条款", "status": "complete", "content": "赞助收入的8%作为分成"},
    {"name": "取消险条款", "status": "complete", "content": "不可抗力取消，保险优先赔付"},
    {"name": "延期条款", "status": "complete", "content": "延期不超过90天，协议自动顺延"}
  ],
  "risk_notes": []
}', 98, 1, 'v2.8'),
(5, 'risk', '{
  "total_score": 92,
  "risk_level": "极低风险",
  "dimensions": {
    "artist_reliability": {"score": 98, "weight": 40, "details": "周杰伦历史零取消记录"},
    "organizer_capability": {"score": 90, "weight": 30, "details": "主办方28场成功经验，成功率96%"},
    "market_demand": {"score": 95, "weight": 20, "details": "粉丝基础大，开票即售罄"},
    "venue_security": {"score": 85, "weight": 10, "details": "场地合规，安保预案完善"}
  },
  "blacklist_check": {"status": "通过"},
  "suggestion": "优质项目，建议优先投资"
}', 95, 1, 'v3.0'),
(5, 'finance', '{
  "account_type": "项目专户",
  "account_reason": "项目制资金独立核算",
  "settlement_mode": "活动结束结算",
  "settlement_cycle": "活动结束后T+15完成最终结算",
  "fund_control": {
    "presale_ratio": "预售款进入监管账户",
    "cost_release": "按进度审批释放成本",
    "share_timing": "活动后统一结算"
  }
}', 93, 1, 'v2.5'),
(5, 'interest', '{
  "alignment_score": 94,
  "rating": "优秀",
  "dimensions": {
    "share_fairness": {"score": 95, "details": "10.5%分成对顶流项目合理"},
    "risk_sharing": {"score": 92, "details": "取消险安排到位"},
    "incentive_compatibility": {"score": 95, "details": "超额票房双方共享"}
  },
  "binding_measures": [
    {"type": "超额分成", "description": "票房超预期部分，分成比例降至8%"},
    {"type": "保底机制", "description": "最低保障投资方本金+8%收益"}
  ]
}', 94, 1, 'v2.3');

-- 项目8: 黄山景区 - 完整结果
INSERT INTO agent_results (project_id, agent_type, result_data, confidence, version, kb_version) VALUES
(8, 'scheme', '{
  "recommended_amount": 2500,
  "share_rate": 5.8,
  "funding_cost_rate": 9.5,
  "payback_months": 36,
  "monthly_share": 145,
  "confidence_factors": {
    "brand_value": 95,
    "visitor_stability": 88,
    "government_support": 92
  },
  "adjustments": [
    {"factor": "5A景区", "impact": -1.5},
    {"factor": "年客流>300万", "impact": -0.5},
    {"factor": "上市公司背景", "impact": -0.5}
  ],
  "suggestion": "优质文旅资产，适合长期稳定投资"
}', 93, 1, 'v1.8'),
(8, 'legal', '{
  "template_id": "TPL-TM-001",
  "template_name": "景区收入分成协议(上市公司版)",
  "completeness": 96,
  "clauses": [
    {"name": "门票分成条款", "status": "complete", "content": "门票收入的5.8%作为分成"},
    {"name": "二消分成条款", "status": "complete", "content": "二次消费收入的4%作为分成"},
    {"name": "季节调整条款", "status": "complete", "content": "淡季(11-3月)分成比例下调1%"}
  ]
}', 96, 1, 'v3.2'),
(8, 'risk', '{
  "total_score": 90,
  "risk_level": "极低风险",
  "dimensions": {
    "asset_quality": {"score": 95, "weight": 35, "details": "5A景区，稀缺性资产"},
    "operation_track": {"score": 88, "weight": 25, "details": "45年运营历史，管理成熟"},
    "policy_environment": {"score": 92, "weight": 25, "details": "政府重点支持项目"},
    "financial_transparency": {"score": 85, "weight": 15, "details": "上市公司，财务透明"}
  },
  "suggestion": "稳健型优质资产"
}', 92, 1, 'v3.0'),
(8, 'finance', '{
  "account_type": "一类独立监管账户",
  "settlement_mode": "月结模式",
  "settlement_cycle": "月度结算，次月15日前支付"
}', 94, 1, 'v2.5'),
(8, 'interest', '{
  "alignment_score": 91,
  "rating": "优秀",
  "dimensions": {
    "share_fairness": {"score": 92, "details": "5.8%分成对5A景区合理"},
    "long_term_binding": {"score": 90, "details": "36个月周期利益绑定充分"}
  }
}', 91, 1, 'v2.3');

-- 项目10: IT咨询 - 完整结果
INSERT INTO agent_results (project_id, agent_type, result_data, confidence, version, kb_version) VALUES
(10, 'scheme', '{
  "recommended_amount": 1200,
  "share_rate": 12.5,
  "funding_cost_rate": 18.2,
  "payback_months": 15,
  "confidence_factors": {
    "client_quality": 95,
    "contract_security": 90,
    "delivery_capability": 88
  },
  "suggestion": "大客户项目，合同确定性高，适合项目融资"
}', 90, 1, 'v1.5'),
(10, 'legal', '{
  "template_id": "TPL-PS-001",
  "template_name": "项目服务收入分成协议",
  "completeness": 94,
  "clauses": [
    {"name": "项目分成条款", "status": "complete", "content": "按里程碑回款的12.5%分成"},
    {"name": "客户信用条款", "status": "complete", "content": "客户为农行，信用风险极低"}
  ]
}', 94, 1, 'v3.2'),
(10, 'risk', '{
  "total_score": 86,
  "risk_level": "低风险",
  "dimensions": {
    "client_credit": {"score": 98, "weight": 40, "details": "客户为国有大行，信用极好"},
    "delivery_risk": {"score": 82, "weight": 30, "details": "团队经验丰富，但项目复杂度高"},
    "contract_terms": {"score": 85, "weight": 20, "details": "里程碑付款条款明确"},
    "team_stability": {"score": 78, "weight": 10, "details": "核心人员稳定性需关注"}
  }
}', 88, 1, 'v3.0'),
(10, 'finance', '{
  "account_type": "项目专户",
  "settlement_mode": "里程碑结算",
  "settlement_cycle": "里程碑达成后T+10结算"
}', 89, 1, 'v2.5'),
(10, 'interest', '{
  "alignment_score": 85,
  "rating": "良好",
  "dimensions": {
    "share_fairness": {"score": 83, "details": "12.5%分成对项目制融资合理"},
    "delivery_incentive": {"score": 88, "details": "里程碑分成激励交付质量"}
  }
}', 85, 1, 'v2.3');

-- ========================================
-- 6. 合同数据
-- ========================================
INSERT INTO contracts (id, project_id, template_id, contract_text, completeness, financer_signed, financer_signed_at, investor_signed, investor_signed_at, status) VALUES
(1, 1, 'TPL-CS-001', '【收入分成合作协议】\n\n甲方（投资方）：滴灌通资本管理有限公司\n乙方（融资方）：喜茶深圳餐饮管理有限公司\n\n鉴于乙方从事连锁餐饮经营业务...（以下省略正文）\n\n分成比例：8.5%\n融资金额：800万元\n合作期限：18个月', 100, 1, '2024-10-16 10:00:00', 1, '2024-10-16 14:30:00', 'active'),
(2, 5, 'TPL-CE-001', '【演唱会项目收入分成协议】\n\n甲方（投资方）：滴灌通资本管理有限公司\n乙方（主办方）：星耀文化传媒有限公司\n\n项目名称：周杰伦2025嘉年华世界巡回演唱会-深圳站...（以下省略正文）\n\n票房分成：10.5%\n融资金额：2000万元', 100, 1, '2024-11-21 09:00:00', 1, '2024-11-21 11:00:00', 'active'),
(3, 8, 'TPL-TM-001', '【景区收入分成合作协议】\n\n甲方（投资方）：滴灌通资本管理有限公司\n乙方（融资方）：黄山旅游发展股份有限公司\n\n项目名称：黄山风景区西海大峡谷...（以下省略正文）\n\n门票分成：5.8%\n融资金额：2500万元', 100, 1, '2024-08-21 10:00:00', 1, '2024-08-22 09:00:00', 'active'),
(4, 10, 'TPL-PS-001', '【项目服务收入分成协议】\n\n甲方（投资方）：滴灌通资本管理有限公司\n乙方（服务商）：腾讯云数字化咨询\n\n项目名称：某银行核心系统云迁移项目...（以下省略正文）\n\n项目分成：12.5%\n融资金额：1200万元', 100, 1, '2024-09-11 10:00:00', 1, '2024-09-11 15:00:00', 'active');

-- ========================================
-- 7. 投资记录
-- ========================================
INSERT INTO investments (id, project_id, investor_id, amount, layer, expected_return_rate, status, signed_at) VALUES
-- 喜茶项目投资
(1, 1, 10, 400, 'senior', 8.5, 'active', '2024-10-17 10:00:00'),
(2, 1, 11, 300, 'mezzanine', 10.2, 'active', '2024-10-17 11:00:00'),
(3, 1, 13, 100, 'subordinate', 15.0, 'active', '2024-10-17 14:00:00'),

-- 周杰伦演唱会投资
(4, 5, 10, 800, 'senior', 12.0, 'active', '2024-11-22 09:00:00'),
(5, 5, 12, 700, 'mezzanine', 15.5, 'active', '2024-11-22 10:00:00'),
(6, 5, 14, 500, 'subordinate', 22.0, 'active', '2024-11-22 11:00:00'),

-- 黄山景区投资
(7, 8, 11, 1500, 'senior', 7.2, 'active', '2024-08-23 10:00:00'),
(8, 8, 15, 1000, 'mezzanine', 9.5, 'active', '2024-08-23 14:00:00'),

-- IT咨询项目投资
(9, 10, 12, 800, 'senior', 14.0, 'active', '2024-09-12 10:00:00'),
(10, 10, 13, 400, 'mezzanine', 18.0, 'active', '2024-09-12 11:00:00'),

-- 电竞活动投资（已完成）
(11, 7, 10, 300, 'senior', 12.0, 'completed', '2024-09-16 10:00:00'),
(12, 7, 14, 200, 'mezzanine', 16.0, 'completed', '2024-09-16 11:00:00');

-- ========================================
-- 8. 收入分成流水（模拟真实流水）
-- ========================================
INSERT INTO revenue_shares (project_id, investment_id, period, revenue, share_amount, share_rate, status, settled_at) VALUES
-- 喜茶项目流水（2024年10-12月 + 2025年1月）
(1, 1, '2024-10', 720, 30.6, 8.5, 'settled', '2024-11-05 10:00:00'),
(1, 1, '2024-11', 850, 36.125, 8.5, 'settled', '2024-12-05 10:00:00'),
(1, 1, '2024-12', 980, 41.65, 8.5, 'settled', '2025-01-05 10:00:00'),
(1, 1, '2025-01', 720, 30.6, 8.5, 'pending', NULL),
(1, 2, '2024-10', 720, 22.95, 8.5, 'settled', '2024-11-05 10:00:00'),
(1, 2, '2024-11', 850, 27.09, 8.5, 'settled', '2024-12-05 10:00:00'),
(1, 2, '2024-12', 980, 31.24, 8.5, 'settled', '2025-01-05 10:00:00'),
(1, 2, '2025-01', 720, 22.95, 8.5, 'pending', NULL),

-- 黄山景区流水（按月结算）
(8, 7, '2024-08', 2100, 72.66, 5.8, 'settled', '2024-09-15 10:00:00'),
(8, 7, '2024-09', 1800, 62.28, 5.8, 'settled', '2024-10-15 10:00:00'),
(8, 7, '2024-10', 2800, 96.88, 5.8, 'settled', '2024-11-15 10:00:00'),
(8, 7, '2024-11', 1200, 41.52, 5.8, 'settled', '2024-12-15 10:00:00'),
(8, 7, '2024-12', 1500, 51.9, 5.8, 'settled', '2025-01-15 10:00:00'),
(8, 7, '2025-01', 2200, 76.12, 5.8, 'pending', NULL),

-- 电竞活动流水（已完成项目）
(7, 11, '2024-11', 780, 46.8, 12.0, 'settled', '2024-11-20 10:00:00'),
(7, 12, '2024-11', 780, 31.2, 16.0, 'settled', '2024-11-20 10:00:00');

-- ========================================
-- 9. 审核任务
-- ========================================
INSERT INTO review_tasks (project_id, department, reviewer_id, agent_type, original_result, status, comments, reviewed_at) VALUES
-- 古茗茶饮 - 待审核
(3, 'legal', 20, 'legal', '{"template_id": "TPL-CS-003", "completeness": 88}', 'pending', NULL, NULL),
(3, 'risk', 21, 'risk', '{"total_score": 78, "risk_level": "中等风险"}', 'pending', NULL, NULL),
(3, 'invest_scheme', 23, 'scheme', '{"share_rate": 9.5, "recommended_amount": 500}', 'in_progress', '正在复核加盟店收入确认方案', NULL),

-- 草莓音乐节 - 待审核
(6, 'legal', 20, 'legal', '{"template_id": "TPL-CE-002", "completeness": 90}', 'pending', NULL, NULL),
(6, 'risk', 21, 'risk', '{"total_score": 82, "risk_level": "低风险"}', 'pending', NULL, NULL),

-- 张家界玻璃桥 - 待审核
(9, 'legal', 20, 'legal', '{"completeness": 85}', 'pending', NULL, NULL),
(9, 'risk', 21, 'risk', '{"total_score": 80}', 'pending', NULL, NULL),

-- 营销服务项目 - 待审核
(11, 'legal', 20, 'legal', '{"completeness": 87}', 'pending', NULL, NULL),
(11, 'finance', 22, 'finance', '{"account_type": "项目专户"}', 'pending', NULL, NULL),

-- 瑞幸咖啡 - 已审核通过
(2, 'legal', 20, 'legal', '{"template_id": "TPL-CS-002", "completeness": 92}', 'approved', '合同条款完备，建议补充新店审批流程', '2025-01-05 16:00:00'),
(2, 'risk', 21, 'risk', '{"total_score": 82}', 'approved', '整体风险可控，关注负债率', '2025-01-05 17:00:00'),
(2, 'invest_scheme', 23, 'scheme', '{"share_rate": 7.2}', 'approved', '分成方案合理', '2025-01-06 10:00:00');

-- ========================================
-- 完成
-- ========================================
