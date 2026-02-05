import { baseLayout } from '../layout'

export const renderStaffCompleted = (department: string) => baseLayout('已处理项目', `
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
        <!-- 左侧导航 -->
        <aside class="w-64 bg-primary-950 min-h-screen">
            <nav class="mt-4 px-3">
                <a href="/staff/${department}/agent-console" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition">
                    <i class="fas fa-tasks w-5 mr-3 text-sm"></i>待办项目
                </a>
                <a href="/staff/${department}/completed" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-white bg-white/10">
                    <i class="fas fa-check-circle w-5 mr-3 text-sm"></i>已处理
                </a>
                <a href="/staff/${department}/knowledge" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition">
                    <i class="fas fa-book w-5 mr-3 text-sm"></i>知识库管理
                </a>
                <a href="/staff/${department}/logs" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition">
                    <i class="fas fa-history w-5 mr-3 text-sm"></i>操作日志
                </a>
            </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="flex-1 p-6">
            <div class="mb-8">
                <h1 class="text-2xl font-semibold text-primary-900 tracking-tight">已处理项目</h1>
                <p class="text-primary-500 mt-2 text-sm">查看已审核完成的项目记录</p>
            </div>

            <!-- 统计卡片 -->
            <div class="grid grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-primary-900" id="total-count">156</div>
                            <div class="text-sm text-primary-500 mt-1">累计处理</div>
                        </div>
                        <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-folder text-primary-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-success-600" id="approved-count">128</div>
                            <div class="text-sm text-primary-500 mt-1">审核通过</div>
                        </div>
                        <div class="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-check-circle text-success-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-danger-500" id="rejected-count">28</div>
                            <div class="text-sm text-primary-500 mt-1">已驳回</div>
                        </div>
                        <div class="w-10 h-10 bg-danger-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-times-circle text-danger-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-warning-500" id="calibrated-count">45</div>
                            <div class="text-sm text-primary-500 mt-1">人工校准</div>
                        </div>
                        <div class="w-10 h-10 bg-warning-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-edit text-warning-600"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 筛选器 -->
            <div class="bg-white rounded-2xl border border-primary-100 p-4 mb-6 flex items-center space-x-3">
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-result">
                    <option value="">全部结果</option>
                    <option value="approved">通过</option>
                    <option value="rejected">驳回</option>
                </select>
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-track">
                    <option value="">全部赛道</option>
                    <option value="chain_store">连锁实体店</option>
                    <option value="commercial_event">演唱会/商业活动</option>
                    <option value="tourism">旅游景区</option>
                    <option value="project_service">项目制非标服务</option>
                </select>
                <input type="date" class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-date">
                <div class="flex-1"></div>
                <input type="text" placeholder="搜索项目编号..." class="px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900 w-48" id="search-input">
            </div>

            <!-- 已处理列表 -->
            <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-primary-100">
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">项目编号</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">融资方</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">赛道</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">处理结果</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">人工校准</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">处理时间</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作</th>
                        </tr>
                    </thead>
                    <tbody id="completed-table">
                        <!-- 动态加载 -->
                    </tbody>
                </table>
            </div>
        </main>
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
    document.getElementById('dept-name').textContent = config.name + ' - 已处理项目';
    document.getElementById('user-info').textContent = (DGT.user?.name || '员工') + ' | ' + config.name;

    // 模拟已处理数据
    const completedData = [
        { id: 'DGT-2024-0001', financer: '奈雪的茶', track: '连锁实体店', result: 'approved', calibrated: true, time: '2024-01-20 14:35' },
        { id: 'DGT-2024-0002', financer: '周杰伦工作室', track: '演唱会/商业活动', result: 'approved', calibrated: true, time: '2024-01-19 16:20' },
        { id: 'DGT-2024-0003', financer: '九寨沟景区', track: '旅游景区', result: 'rejected', calibrated: false, time: '2024-01-18 11:45' },
        { id: 'DGT-2024-0004', financer: '蜜雪冰城', track: '连锁实体店', result: 'approved', calibrated: false, time: '2024-01-17 09:30' },
        { id: 'DGT-2024-0005', financer: '某咨询公司', track: '项目制非标服务', result: 'approved', calibrated: true, time: '2024-01-16 15:15' },
    ];

    function renderCompletedTable() {
        document.getElementById('completed-table').innerHTML = completedData.map(item => \`
            <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                <td class="px-4 py-4 font-medium text-accent-600 text-sm">\${item.id}</td>
                <td class="px-4 py-4 text-primary-900 text-sm">\${item.financer}</td>
                <td class="px-4 py-4 text-primary-600 text-sm">\${item.track}</td>
                <td class="px-4 py-4">
                    <span class="status-badge \${item.result === 'approved' ? 'status-approved' : 'status-rejected'}">
                        \${item.result === 'approved' ? '通过' : '驳回'}
                    </span>
                </td>
                <td class="px-4 py-4">
                    \${item.calibrated ? '<span class="text-warning-500"><i class="fas fa-edit mr-1"></i>已校准</span>' : '<span class="text-primary-400">-</span>'}
                </td>
                <td class="px-4 py-4 text-xs text-primary-400">\${item.time}</td>
                <td class="px-4 py-4">
                    <button onclick="viewDetail('\${item.id}')" class="text-primary-600 hover:text-primary-900 text-sm font-medium transition">查看详情</button>
                </td>
            </tr>
        \`).join('');
    }

    function viewDetail(projectId) {
        DGT.showToast('查看项目 ' + projectId + ' 详情', 'info');
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    renderCompletedTable();
</script>
`)
