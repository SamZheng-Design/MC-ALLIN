-- ========================================
-- 滴灌通收入分成投资系统 - 种子数据
-- ========================================

-- 插入赛道配置
INSERT OR REPLACE INTO tracks (id, name, code, description, icon, field_schema) VALUES 
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
        {"key": "avg_store_area", "label": "平均门店面积(㎡)", "type": "number", "required": true},
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

-- 插入知识库数据
INSERT OR REPLACE INTO knowledge_base (id, agent_type, category, title, content, version) VALUES
(1, 'scheme', 'pricing_model', '连锁实体店分成比例基准', '基于门店数量、营收规模、毛利率的分成比例计算模型：基准比例5-15%，门店>10家下调1%，营收>1000万下调0.5%，毛利率<30%上调1%', 'v1.0'),
(2, 'legal', 'contract_template', '收入分成协议模板-连锁实体店', '标准收入分成协议模板，包含：定义条款、分成计算、支付方式、违约责任、争议解决等核心条款', 'v1.0'),
(3, 'risk', 'scoring_model', '风控评分模型', '综合评分=经营稳定性(30%)+财务健康度(30%)+行业前景(20%)+管理能力(20%)，各维度0-100分', 'v1.0'),
(4, 'finance', 'account_model', '账户架构推荐模型', '根据融资金额和风险等级推荐账户类型：<100万独立账户，100-500万共管账户，>500万分级共管', 'v1.0'),
(5, 'interest', 'alignment_model', '利益一致性评分模型', '评估投融资双方利益绑定程度：分成比例合理性(40%)+激励机制(30%)+退出条款(30%)', 'v1.0');

-- 插入测试用户
INSERT OR REPLACE INTO users (id, phone, email, password_hash, role, department, name) VALUES
(1, '13800138001', NULL, 'hashed_password_1', 'ROLE_FINANCER', NULL, '测试融资者'),
(2, '13800138002', NULL, 'hashed_password_2', 'ROLE_INVESTOR', NULL, '测试投资者'),
(3, NULL, 'legal@dgt.com', 'hashed_password_3', 'ROLE_STAFF_LEGAL', 'legal', '法务专员'),
(4, NULL, 'risk@dgt.com', 'hashed_password_4', 'ROLE_STAFF_RISK', 'risk', '风控专员'),
(5, NULL, 'finance@dgt.com', 'hashed_password_5', 'ROLE_STAFF_FINANCE', 'finance', '财务专员'),
(6, NULL, 'scheme@dgt.com', 'hashed_password_6', 'ROLE_STAFF_INVEST_SCHEME', 'invest_scheme', '方案专员'),
(7, NULL, 'interest@dgt.com', 'hashed_password_7', 'ROLE_STAFF_INTEREST', 'interest', '利益分析专员');
