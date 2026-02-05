import { baseLayout } from '../layout'

export const renderStaffConsole = (department: string) => baseLayout('智能体控制台', `
<div class="min-h-screen bg-gray-100">
    <nav class="bg-gray-800 shadow-lg">
        <div class="max-w-full mx-auto px-4">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <i class="fas fa-tint text-white text-xl mr-2"></i>
                    <span class="text-white font-bold">滴灌通</span>
                    <span class="ml-4 text-gray-400">|</span>
                    <span class="ml-4 text-white" id="dept-name">内部员工控制台</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-300 text-sm" id="user-info">加载中...</span>
                    <button onclick="logout()" class="text-gray-300 hover:text-white">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex">
        <!-- 左侧导航 -->
        <aside class="w-64 bg-gray-800 min-h-screen">
            <nav class="mt-4">
                <a href="#" class="flex items-center px-6 py-3 text-white bg-gray-700">
                    <i class="fas fa-tasks w-5 mr-3"></i>待办项目
                    <span class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full" id="pending-count">0</span>
                </a>
                <a href="#" class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
                    <i class="fas fa-check-circle w-5 mr-3"></i>已处理
                </a>
                <a href="#" class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
                    <i class="fas fa-book w-5 mr-3"></i>知识库管理
                </a>
                <a href="#" class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
                    <i class="fas fa-history w-5 mr-3"></i>操作日志
                </a>
            </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="flex-1 p-6">
            <!-- 筛选器 -->
            <div class="bg-white rounded-xl shadow p-4 mb-6 flex items-center space-x-4">
                <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>全部赛道</option>
                    <option>连锁实体店</option>
                    <option>演唱会/商业活动</option>
                    <option>旅游景区</option>
                    <option>项目制非标服务</option>
                </select>
                <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>全部完善度</option>
                    <option>80%以上</option>
                    <option>60%-80%</option>
                    <option>60%以下</option>
                </select>
                <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>全部状态</option>
                    <option>待处理</option>
                    <option>处理中</option>
                </select>
                <div class="flex-1"></div>
                <input type="text" placeholder="搜索项目..." class="px-4 py-2 border border-gray-300 rounded-lg text-sm w-48">
            </div>

            <!-- 待办列表 -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-4 border-b flex items-center justify-between">
                    <h2 class="font-bold text-gray-800">待复核项目</h2>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-robot mr-1"></i>AI智能体状态: <span class="text-green-600">正常运行</span>
                    </div>
                </div>
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">项目编号</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">融资方</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">赛道</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">完善度</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">AI处理状态</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">待复核项</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">操作</th>
                        </tr>
                    </thead>
                    <tbody id="task-table">
                        <!-- 动态加载 -->
                    </tbody>
                </table>
            </div>
        </main>

        <!-- 右侧：知识库快捷入口 -->
        <aside class="w-80 bg-white shadow-lg p-6">
            <h3 class="font-bold text-gray-800 mb-4">
                <i class="fas fa-book text-indigo-600 mr-2"></i>知识库快捷编辑
            </h3>
            <div class="space-y-3" id="kb-shortcuts">
                <!-- 动态加载 -->
            </div>
            
            <h3 class="font-bold text-gray-800 mt-8 mb-4">
                <i class="fas fa-history text-gray-600 mr-2"></i>最近校准记录
            </h3>
            <div class="space-y-2 text-sm" id="recent-adjustments">
                <!-- 动态加载 -->
            </div>
        </aside>
    </div>

    <!-- 项目复核弹窗 -->
    <div id="review-modal" class="fixed inset-0 bg-black/50 hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">项目复核 - <span id="review-project-no"></span></h2>
                <button onclick="closeReviewModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="flex" style="height: calc(90vh - 180px);">
                <!-- 左侧：原始申报信息 -->
                <div class="w-1/2 border-r overflow-y-auto p-6">
                    <h3 class="font-bold text-gray-800 mb-4">融资方申报信息</h3>
                    <div id="review-form-data" class="space-y-4 text-sm">
                        <!-- 动态加载 -->
                    </div>
                </div>
                <!-- 右侧：AI输出+编辑器 -->
                <div class="w-1/2 overflow-y-auto p-6">
                    <h3 class="font-bold text-gray-800 mb-4">
                        <i class="fas fa-robot text-indigo-600 mr-2"></i>AI智能体输出
                    </h3>
                    <div id="review-ai-output" class="space-y-4">
                        <!-- 动态加载 -->
                    </div>
                    
                    <h3 class="font-bold text-gray-800 mt-6 mb-4">
                        <i class="fas fa-edit text-purple-600 mr-2"></i>人工校准
                    </h3>
                    <div id="review-editor" class="space-y-4">
                        <!-- 动态加载 -->
                    </div>
                </div>
            </div>
            <div class="p-6 border-t bg-gray-50 flex justify-between">
                <button onclick="rejectProject()" class="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                    <i class="fas fa-times mr-2"></i>驳回
                </button>
                <div class="space-x-3">
                    <button onclick="saveAdjustment()" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                        暂存
                    </button>
                    <button onclick="approveProject()" class="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
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
            <tr class="border-t hover:bg-gray-50">
                <td class="px-4 py-4 font-medium text-indigo-600">\${t.projectNo}</td>
                <td class="px-4 py-4">\${t.financer}</td>
                <td class="px-4 py-4 text-sm">\${t.track}</td>
                <td class="px-4 py-4">
                    <div class="flex items-center">
                        <div class="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div class="h-2 bg-indigo-600 rounded-full" style="width: \${t.completeness}%"></div>
                        </div>
                        <span class="text-sm">\${t.completeness}%</span>
                    </div>
                </td>
                <td class="px-4 py-4">
                    <span class="px-2 py-1 rounded text-xs \${t.aiStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                        <i class="fas fa-\${t.aiStatus === 'completed' ? 'check' : 'spinner fa-spin'} mr-1"></i>
                        \${t.aiStatus === 'completed' ? '已完成' : '处理中'}
                    </span>
                </td>
                <td class="px-4 py-4">
                    <span class="text-red-600 font-medium">\${t.pendingItems}</span> 项待确认
                </td>
                <td class="px-4 py-4">
                    <button onclick="openReview(\${t.id})" class="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                        开始复核
                    </button>
                </td>
            </tr>
        \`).join('');
    }

    function renderKBShortcuts() {
        const shortcuts = kbShortcuts[DEPARTMENT] || kbShortcuts['legal'];
        document.getElementById('kb-shortcuts').innerHTML = shortcuts.map(s => \`
            <a href="#" class="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition">
                <i class="fas fa-folder text-indigo-600 mr-2"></i>\${s}
            </a>
        \`).join('');
    }

    function renderRecentAdjustments() {
        const adjustments = [
            { project: 'DGT-2024-0001', action: '修改分成比例', time: '10分钟前' },
            { project: 'DGT-2024-0002', action: '补充条款', time: '1小时前' },
            { project: 'DGT-2024-0003', action: '调整风控评分', time: '2小时前' }
        ];
        document.getElementById('recent-adjustments').innerHTML = adjustments.map(a => \`
            <div class="p-2 bg-gray-50 rounded">
                <div class="text-gray-800">\${a.project}</div>
                <div class="text-gray-500 text-xs">\${a.action} · \${a.time}</div>
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
