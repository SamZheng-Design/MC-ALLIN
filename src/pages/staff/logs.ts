import { baseLayout } from '../layout'

export const renderStaffLogs = (department: string) => baseLayout('操作日志', `
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
                <a href="/staff/${department}/completed" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition">
                    <i class="fas fa-check-circle w-5 mr-3 text-sm"></i>已处理
                </a>
                <a href="/staff/${department}/knowledge" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition">
                    <i class="fas fa-book w-5 mr-3 text-sm"></i>知识库管理
                </a>
                <a href="/staff/${department}/logs" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-white bg-white/10">
                    <i class="fas fa-history w-5 mr-3 text-sm"></i>操作日志
                </a>
            </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="flex-1 p-6">
            <div class="mb-8">
                <h1 class="text-2xl font-semibold text-primary-900 tracking-tight">操作日志</h1>
                <p class="text-primary-500 mt-2 text-sm">查看所有操作记录和系统日志</p>
            </div>

            <!-- 统计卡片 -->
            <div class="grid grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-primary-900">256</div>
                            <div class="text-sm text-primary-500 mt-1">今日操作</div>
                        </div>
                        <div class="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-mouse-pointer text-accent-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-success-600">89</div>
                            <div class="text-sm text-primary-500 mt-1">审核通过</div>
                        </div>
                        <div class="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-check text-success-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-warning-500">34</div>
                            <div class="text-sm text-primary-500 mt-1">知识库更新</div>
                        </div>
                        <div class="w-10 h-10 bg-warning-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-edit text-warning-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-semibold text-danger-500">12</div>
                            <div class="text-sm text-primary-500 mt-1">驳回操作</div>
                        </div>
                        <div class="w-10 h-10 bg-danger-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-times text-danger-600"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 筛选器 -->
            <div class="bg-white rounded-2xl border border-primary-100 p-4 mb-6 flex items-center space-x-3">
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-type">
                    <option value="">全部类型</option>
                    <option value="review">审核操作</option>
                    <option value="knowledge">知识库操作</option>
                    <option value="calibration">人工校准</option>
                    <option value="system">系统操作</option>
                </select>
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-result">
                    <option value="">全部结果</option>
                    <option value="success">成功</option>
                    <option value="failed">失败</option>
                </select>
                <input type="date" class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-date">
                <div class="flex-1"></div>
                <input type="text" placeholder="搜索操作记录..." class="px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900 w-64" id="search-input">
                <button onclick="exportLogs()" class="px-4 py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                    <i class="fas fa-download mr-2"></i>导出
                </button>
            </div>

            <!-- 日志列表 -->
            <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-primary-100">
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">时间</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作人</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作类型</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作内容</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">关联项目</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">结果</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">IP地址</th>
                        </tr>
                    </thead>
                    <tbody id="logs-table">
                        <!-- 动态加载 -->
                    </tbody>
                </table>

                <!-- 分页 -->
                <div class="p-4 border-t border-primary-100 flex items-center justify-between">
                    <div class="text-sm text-primary-500">共 256 条记录，第 1/26 页</div>
                    <div class="flex items-center space-x-2">
                        <button class="px-3 py-1.5 border border-primary-200 rounded-lg text-sm text-primary-500 hover:bg-primary-50 transition disabled:opacity-50" disabled>
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="px-3 py-1.5 bg-primary-900 text-white rounded-lg text-sm font-medium">1</button>
                        <button class="px-3 py-1.5 border border-primary-200 rounded-lg text-sm text-primary-600 hover:bg-primary-50 transition">2</button>
                        <button class="px-3 py-1.5 border border-primary-200 rounded-lg text-sm text-primary-600 hover:bg-primary-50 transition">3</button>
                        <span class="text-primary-400">...</span>
                        <button class="px-3 py-1.5 border border-primary-200 rounded-lg text-sm text-primary-600 hover:bg-primary-50 transition">26</button>
                        <button class="px-3 py-1.5 border border-primary-200 rounded-lg text-sm text-primary-600 hover:bg-primary-50 transition">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
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
    document.getElementById('dept-name').textContent = config.name + ' - 操作日志';
    document.getElementById('user-info').textContent = (DGT.user?.name || '员工') + ' | ' + config.name;

    // 模拟日志数据
    const logsData = [
        { time: '2024-01-20 14:35:22', operator: '张三', type: 'review', action: '审核通过项目 DGT-2024-0001', project: 'DGT-2024-0001', result: 'success', ip: '192.168.1.101' },
        { time: '2024-01-20 14:30:15', operator: '李四', type: 'calibration', action: '人工校准分成比例为 12%', project: 'DGT-2024-0002', result: 'success', ip: '192.168.1.102' },
        { time: '2024-01-20 14:25:08', operator: '王五', type: 'knowledge', action: '新增知识条目 KB-005', project: '-', result: 'success', ip: '192.168.1.103' },
        { time: '2024-01-20 14:20:33', operator: '张三', type: 'review', action: '驳回项目 DGT-2024-0003', project: 'DGT-2024-0003', result: 'success', ip: '192.168.1.101' },
        { time: '2024-01-20 14:15:47', operator: '李四', type: 'knowledge', action: '更新模板 连锁实体店协议v2.0', project: '-', result: 'success', ip: '192.168.1.102' },
        { time: '2024-01-20 14:10:22', operator: '赵六', type: 'calibration', action: '修改风控评分为 85', project: 'DGT-2024-0004', result: 'success', ip: '192.168.1.104' },
        { time: '2024-01-20 14:05:11', operator: '张三', type: 'system', action: '登录系统', project: '-', result: 'success', ip: '192.168.1.101' },
        { time: '2024-01-20 14:00:05', operator: '王五', type: 'review', action: '审核通过项目 DGT-2024-0005', project: 'DGT-2024-0005', result: 'success', ip: '192.168.1.103' },
    ];

    function renderLogsTable() {
        document.getElementById('logs-table').innerHTML = logsData.map(log => \`
            <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                <td class="px-4 py-4 text-xs text-primary-500">\${log.time}</td>
                <td class="px-4 py-4 text-primary-900 text-sm font-medium">\${log.operator}</td>
                <td class="px-4 py-4">
                    <span class="px-2 py-1 rounded-md text-xs font-medium \${getTypeClass(log.type)}">\${getTypeName(log.type)}</span>
                </td>
                <td class="px-4 py-4 text-primary-600 text-sm">\${log.action}</td>
                <td class="px-4 py-4 text-sm">
                    \${log.project !== '-' ? \`<a href="#" class="text-accent-600 hover:text-accent-700">\${log.project}</a>\` : '<span class="text-primary-400">-</span>'}
                </td>
                <td class="px-4 py-4">
                    <span class="status-badge \${log.result === 'success' ? 'status-active' : 'status-rejected'}">\${log.result === 'success' ? '成功' : '失败'}</span>
                </td>
                <td class="px-4 py-4 text-xs text-primary-400">\${log.ip}</td>
            </tr>
        \`).join('');
    }

    function getTypeClass(type) {
        const classes = {
            'review': 'bg-accent-50 text-accent-600',
            'calibration': 'bg-warning-50 text-warning-600',
            'knowledge': 'bg-success-50 text-success-600',
            'system': 'bg-primary-100 text-primary-600'
        };
        return classes[type] || 'bg-primary-100 text-primary-600';
    }

    function getTypeName(type) {
        const names = {
            'review': '审核操作',
            'calibration': '人工校准',
            'knowledge': '知识库',
            'system': '系统操作'
        };
        return names[type] || type;
    }

    function exportLogs() {
        DGT.showToast('正在导出日志...', 'info');
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    renderLogsTable();
</script>
`)
