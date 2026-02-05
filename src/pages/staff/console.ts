import { baseLayout } from '../layout'

export const renderStaffConsole = (department: string) => baseLayout('智能体控制台', `
<div class="min-h-screen bg-primary-50">
    <!-- 顶部导航 - 深色简约 -->
    <nav class="bg-primary-950 border-b border-white/5">
        <div class="max-w-full mx-auto px-4">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <a href="/" class="flex items-center group">
                        <div class="w-7 h-7 bg-white rounded-lg flex items-center justify-center mr-2.5 group-hover:scale-105 transition-transform">
                            <span class="text-primary-900 font-bold text-xs">DG</span>
                        </div>
                        <span class="text-white logo-text">滴灌通</span>
                    </a>
                    <span class="ml-3 text-primary-600">|</span>
                    <span class="ml-3 text-white text-sm" id="dept-name">内部员工控制台</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-primary-400 text-sm" id="user-info">加载中...</span>
                    <button onclick="logout()" class="text-primary-400 hover:text-white transition">
                        <i class="fas fa-sign-out-alt text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex">
        <!-- 左侧导航 - 深色侧边栏 -->
        <aside class="w-64 bg-primary-950 min-h-screen">
            <nav class="mt-4 px-3">
                <a href="/staff/${department}/agent-console" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-white bg-white/10" id="nav-pending">
                    <i class="fas fa-tasks w-5 mr-3 text-sm"></i>待办项目
                    <span class="ml-auto bg-danger-500 text-white text-xs px-2 py-0.5 rounded-md font-medium" id="pending-count">0</span>
                </a>
                <a href="/staff/${department}/completed" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition" id="nav-completed">
                    <i class="fas fa-check-circle w-5 mr-3 text-sm"></i>已处理
                </a>
                <a href="/staff/${department}/knowledge" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition" id="nav-knowledge">
                    <i class="fas fa-book w-5 mr-3 text-sm"></i>知识库管理
                </a>
                <a href="/staff/${department}/logs" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition" id="nav-logs">
                    <i class="fas fa-history w-5 mr-3 text-sm"></i>操作日志
                </a>
            </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="flex-1 p-6">
            <!-- 筛选器 - 简约风格 -->
            <div class="bg-white rounded-2xl border border-primary-100 p-4 mb-6 flex items-center space-x-3">
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900">
                    <option>全部赛道</option>
                    <option>连锁实体店</option>
                    <option>演唱会/商业活动</option>
                    <option>旅游景区</option>
                    <option>项目制非标服务</option>
                </select>
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900">
                    <option>全部完善度</option>
                    <option>80%以上</option>
                    <option>60%-80%</option>
                    <option>60%以下</option>
                </select>
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900">
                    <option>全部状态</option>
                    <option>待处理</option>
                    <option>处理中</option>
                </select>
                <div class="flex-1"></div>
                <input type="text" placeholder="搜索项目..." class="px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900 w-48">
            </div>

            <!-- 待办列表 - 简约风格 -->
            <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                <div class="p-4 border-b border-primary-100 flex items-center justify-between">
                    <h2 class="font-semibold text-primary-900">待复核项目</h2>
                    <div class="text-xs text-primary-400">
                        <span class="w-1.5 h-1.5 bg-success-400 rounded-full inline-block mr-1.5 animate-pulse"></span>AI 智能体运行中
                    </div>
                </div>
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-primary-100">
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">项目编号</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">融资方</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">赛道</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">完善度</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">AI处理状态</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">待复核项</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作</th>
                        </tr>
                    </thead>
                    <tbody id="task-table">
                        <!-- 动态加载 -->
                    </tbody>
                </table>
            </div>
        </main>

        <!-- 右侧：知识库快捷入口 - 简约风格 -->
        <aside class="w-80 bg-white border-l border-primary-100 p-6">
            <h3 class="font-semibold text-primary-900 mb-4 text-sm">
                <i class="fas fa-book text-primary-400 mr-2"></i>知识库快捷编辑
            </h3>
            <div class="space-y-2" id="kb-shortcuts">
                <!-- 动态加载 -->
            </div>
            
            <h3 class="font-semibold text-primary-900 mt-8 mb-4 text-sm">
                <i class="fas fa-history text-primary-400 mr-2"></i>最近校准记录
            </h3>
            <div class="space-y-2" id="recent-adjustments">
                <!-- 动态加载 -->
            </div>
        </aside>
    </div>

    <!-- 项目复核弹窗 - 简约风格 -->
    <div id="review-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <div class="p-5 border-b border-primary-100 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-primary-900">项目复核 - <span id="review-project-no" class="text-accent-600"></span></h2>
                <button onclick="closeReviewModal()" class="w-8 h-8 rounded-lg bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-700 transition flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="flex" style="height: calc(90vh - 180px);">
                <!-- 左侧：原始申报信息 -->
                <div class="w-1/2 border-r border-primary-100 overflow-y-auto p-6">
                    <h3 class="font-semibold text-primary-900 mb-4 text-sm">融资方申报信息</h3>
                    <div id="review-form-data" class="space-y-4 text-sm">
                        <!-- 动态加载 -->
                    </div>
                </div>
                <!-- 右侧：AI输出+编辑器 -->
                <div class="w-1/2 overflow-y-auto p-6">
                    <h3 class="font-semibold text-primary-900 mb-4 text-sm">
                        <i class="fas fa-robot text-primary-400 mr-2"></i>AI 智能体输出
                    </h3>
                    <div id="review-ai-output" class="space-y-4">
                        <!-- 动态加载 -->
                    </div>
                    
                    <h3 class="font-semibold text-primary-900 mt-6 mb-4 text-sm">
                        <i class="fas fa-edit text-primary-400 mr-2"></i>人工校准
                    </h3>
                    <div id="review-editor" class="space-y-4">
                        <!-- 动态加载 -->
                    </div>
                </div>
            </div>
            <div class="p-5 border-t border-primary-100 flex justify-between">
                <button onclick="rejectProject()" class="px-5 py-2 border border-danger-200 text-danger-600 rounded-xl text-sm font-medium hover:bg-danger-50 transition">
                    <i class="fas fa-times mr-2"></i>驳回
                </button>
                <div class="space-x-3">
                    <button onclick="saveAdjustment()" class="px-5 py-2 border border-primary-200 rounded-xl text-sm text-primary-600 font-medium hover:bg-primary-50 transition">
                        暂存
                    </button>
                    <button onclick="approveProject()" class="px-5 py-2 bg-primary-900 text-white rounded-xl text-sm font-medium hover:bg-primary-800 transition">
                        <i class="fas fa-check mr-2"></i>审核通过
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`, `
<script>
    const DEPARTMENT = '${department}';
    
    // 部门配置
    const deptConfig = {
        'legal': { name: '法务部', agent: '法律合约智能体', icon: 'balance-scale', color: 'purple' },
        'risk': { name: '风控部', agent: '风控智能体', icon: 'shield-alt', color: 'red' },
        'finance': { name: '财务部', agent: '财务智能体', icon: 'university', color: 'green' },
        'invest_scheme': { name: '投委方案组', agent: '分成方案智能体', icon: 'calculator', color: 'blue' },
        'interest': { name: '投委利益组', agent: '利益一致性智能体', icon: 'handshake', color: 'yellow' }
    };

    const config = deptConfig[DEPARTMENT] || deptConfig['legal'];
    document.getElementById('dept-name').textContent = config.name + ' - ' + config.agent + '控制台';
    document.getElementById('user-info').textContent = (DGT.user?.name || '员工') + ' | ' + config.name;

    // 模拟待办数据
    const tasks = [
        { id: 1, projectNo: 'DGT-2024-0001', financer: '奈雪的茶', track: '连锁实体店', completeness: 85, aiStatus: 'completed', pendingItems: 2 },
        { id: 2, projectNo: 'DGT-2024-0002', financer: '周杰伦工作室', track: '演唱会/商业活动', completeness: 78, aiStatus: 'completed', pendingItems: 3 },
        { id: 3, projectNo: 'DGT-2024-0003', financer: '九寨沟景区', track: '旅游景区', completeness: 92, aiStatus: 'processing', pendingItems: 1 }
    ];

    // 知识库快捷入口
    const kbShortcuts = {
        'legal': ['合同模板库', '标准条款库', '风险条款库'],
        'risk': ['风险指标库', '评分模型库', '黑名单库'],
        'finance': ['账户架构库', '分账规则库', '结算模型库'],
        'invest_scheme': ['定价模型库', '赛道估值库', '历史数据库'],
        'interest': ['利益模型库', '激励规则库', '对标案例库']
    };

    function renderTasks() {
        document.getElementById('pending-count').textContent = tasks.length;
        document.getElementById('task-table').innerHTML = tasks.map(t => \`
            <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                <td class="px-4 py-4 font-medium text-accent-600 text-sm">\${t.projectNo}</td>
                <td class="px-4 py-4 text-primary-900 text-sm">\${t.financer}</td>
                <td class="px-4 py-4 text-primary-600 text-sm">\${t.track}</td>
                <td class="px-4 py-4">
                    <div class="flex items-center">
                        <div class="w-16 h-1.5 bg-primary-100 rounded-full mr-2">
                            <div class="h-1.5 bg-primary-900 rounded-full" style="width: \${t.completeness}%"></div>
                        </div>
                        <span class="text-xs text-primary-500 font-medium">\${t.completeness}%</span>
                    </div>
                </td>
                <td class="px-4 py-4">
                    <span class="px-2 py-1 rounded-md text-xs font-medium \${t.aiStatus === 'completed' ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-500'}">
                        <i class="fas fa-\${t.aiStatus === 'completed' ? 'check' : 'spinner fa-spin'} mr-1"></i>
                        \${t.aiStatus === 'completed' ? '已完成' : '处理中'}
                    </span>
                </td>
                <td class="px-4 py-4">
                    <span class="text-danger-500 font-semibold text-sm">\${t.pendingItems}</span> <span class="text-primary-400 text-xs">项待确认</span>
                </td>
                <td class="px-4 py-4">
                    <button onclick="openReview(\${t.id})" class="px-3 py-1.5 bg-primary-900 text-white rounded-lg text-xs font-medium hover:bg-primary-800 transition">
                        开始复核
                    </button>
                </td>
            </tr>
        \`).join('');
    }

    function renderKBShortcuts() {
        const shortcuts = kbShortcuts[DEPARTMENT] || kbShortcuts['legal'];
        document.getElementById('kb-shortcuts').innerHTML = shortcuts.map((s, idx) => \`
            <a href="javascript:void(0)" onclick="openKBEditor('\${s}')" class="block px-4 py-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition text-sm text-primary-700">
                <i class="fas fa-folder text-primary-400 mr-2"></i>\${s}
            </a>
        \`).join('');
    }

    function openKBEditor(name) {
        DGT.showToast('正在打开: ' + name, 'info');
        // TODO: 实现知识库编辑功能
    }

    function switchStaffTab(tab) {
        // 移除所有激活状态
        ['pending', 'completed', 'knowledge', 'logs'].forEach(t => {
            const navEl = document.getElementById('nav-' + t);
            if (navEl) {
                navEl.classList.remove('text-white', 'bg-white/10');
                navEl.classList.add('text-primary-400');
            }
        });
        // 激活当前选项
        const activeNav = document.getElementById('nav-' + tab);
        if (activeNav) {
            activeNav.classList.remove('text-primary-400');
            activeNav.classList.add('text-white', 'bg-white/10');
        }
        
        // 显示对应内容
        if (tab === 'pending') {
            DGT.showToast('已切换到待办项目', 'info');
        } else if (tab === 'completed') {
            DGT.showToast('已处理项目列表加载中...', 'info');
        } else if (tab === 'knowledge') {
            DGT.showToast('知识库管理页面加载中...', 'info');
        } else if (tab === 'logs') {
            DGT.showToast('操作日志加载中...', 'info');
        }
    }

    function renderRecentAdjustments() {
        const adjustments = [
            { project: 'DGT-2024-0001', action: '修改分成比例', time: '10分钟前' },
            { project: 'DGT-2024-0002', action: '补充条款', time: '1小时前' },
            { project: 'DGT-2024-0003', action: '调整风控评分', time: '2小时前' }
        ];
        document.getElementById('recent-adjustments').innerHTML = adjustments.map(a => \`
            <div class="p-3 bg-primary-50 rounded-xl">
                <div class="text-primary-900 text-sm font-medium">\${a.project}</div>
                <div class="text-primary-400 text-xs mt-0.5">\${a.action} · \${a.time}</div>
            </div>
        \`).join('');
    }

    function openReview(taskId) {
        const task = tasks.find(t => t.id === taskId);
        document.getElementById('review-project-no').textContent = task.projectNo;
        
        // 模拟加载数据
        document.getElementById('review-form-data').innerHTML = \`
            <div class="border rounded-lg p-4 bg-gray-50">
                <h4 class="font-medium text-gray-700 mb-2">主体信息</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div><span class="text-gray-500">企业名称:</span> \${task.financer}</div>
                    <div><span class="text-gray-500">法定代表人:</span> 张三</div>
                    <div><span class="text-gray-500">注册资本:</span> 1000万</div>
                    <div><span class="text-gray-500">成立日期:</span> 2018-05-01</div>
                </div>
            </div>
            <div class="border rounded-lg p-4 bg-gray-50">
                <h4 class="font-medium text-gray-700 mb-2">经营数据</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div><span class="text-gray-500">门店数量:</span> 50家</div>
                    <div><span class="text-gray-500">年营收:</span> 5000万</div>
                    <div><span class="text-gray-500">毛利率:</span> 65%</div>
                    <div><span class="text-gray-500">员工数:</span> 200人</div>
                </div>
            </div>
            <div class="border rounded-lg p-4 bg-gray-50">
                <h4 class="font-medium text-gray-700 mb-2">融资需求</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div><span class="text-gray-500">融资金额:</span> 500万</div>
                    <div><span class="text-gray-500">资金用途:</span> 开新店</div>
                </div>
            </div>
        \`;

        // AI输出
        document.getElementById('review-ai-output').innerHTML = \`
            <div class="border rounded-lg p-4 bg-\${config.color}-50">
                <div class="flex items-center mb-2">
                    <i class="fas fa-\${config.icon} text-\${config.color}-600 mr-2"></i>
                    <span class="font-medium">\${config.agent}计算结果</span>
                    <span class="ml-auto text-xs text-gray-500">知识库版本: v2.1</span>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                        <span>基础条款匹配完成</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                        <span class="text-yellow-700">待确认: 提前终止条款需人工审核</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                        <span class="text-yellow-700">待确认: 违约金比例建议调整</span>
                    </div>
                </div>
            </div>
        \`;

        // 人工校准编辑器
        document.getElementById('review-editor').innerHTML = \`
            <div class="border rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">提前终止条款</label>
                <textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="3">任何一方提前终止本协议，需提前30日书面通知对方...</textarea>
            </div>
            <div class="border rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">违约金比例</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value="5%">
            </div>
            <div class="border rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">备注说明</label>
                <textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2" placeholder="请输入校准说明..."></textarea>
            </div>
        \`;

        document.getElementById('review-modal').classList.remove('hidden');
    }

    function closeReviewModal() {
        document.getElementById('review-modal').classList.add('hidden');
    }

    function approveProject() {
        DGT.showToast('审核通过，数据已提交下一环节', 'success');
        closeReviewModal();
    }

    function rejectProject() {
        if (confirm('确认驳回该项目？')) {
            DGT.showToast('项目已驳回', 'warning');
            closeReviewModal();
        }
    }

    function saveAdjustment() {
        DGT.showToast('校准内容已暂存', 'success');
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    renderTasks();
    renderKBShortcuts();
    renderRecentAdjustments();
</script>
`)
