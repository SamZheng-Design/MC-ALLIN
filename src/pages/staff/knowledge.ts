import { baseLayout } from '../layout'

export const renderStaffKnowledge = (department: string) => baseLayout('知识库管理', `
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
                <a href="/staff/${department}/knowledge" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-white bg-white/10">
                    <i class="fas fa-book w-5 mr-3 text-sm"></i>知识库管理
                </a>
                <a href="/staff/${department}/logs" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-400 hover:text-white hover:bg-white/5 transition">
                    <i class="fas fa-history w-5 mr-3 text-sm"></i>操作日志
                </a>
            </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="flex-1 p-6">
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-semibold text-primary-900 tracking-tight">知识库管理</h1>
                    <p class="text-primary-500 mt-2 text-sm">管理和维护AI智能体的知识库内容</p>
                </div>
                <button onclick="openAddKnowledgeModal()" class="px-4 py-2 bg-primary-900 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition">
                    <i class="fas fa-plus mr-2"></i>新增知识条目
                </button>
            </div>

            <!-- 知识库分类 -->
            <div class="grid grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-2xl border-2 border-primary-900 p-4 cursor-pointer" onclick="filterCategory('all', this)">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-medium text-primary-900">全部知识</div>
                            <div class="text-sm text-primary-500 mt-1" id="count-all">128 条</div>
                        </div>
                        <div class="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center">
                            <i class="fas fa-database text-white"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4 cursor-pointer hover:border-primary-300 transition" onclick="filterCategory('template', this)">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-medium text-primary-900">模板库</div>
                            <div class="text-sm text-primary-500 mt-1" id="count-template">45 条</div>
                        </div>
                        <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-file-alt text-primary-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4 cursor-pointer hover:border-primary-300 transition" onclick="filterCategory('rule', this)">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-medium text-primary-900">规则库</div>
                            <div class="text-sm text-primary-500 mt-1" id="count-rule">52 条</div>
                        </div>
                        <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-cog text-primary-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-primary-100 p-4 cursor-pointer hover:border-primary-300 transition" onclick="filterCategory('case', this)">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-medium text-primary-900">案例库</div>
                            <div class="text-sm text-primary-500 mt-1" id="count-case">31 条</div>
                        </div>
                        <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-folder text-primary-600"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 筛选器 -->
            <div class="bg-white rounded-2xl border border-primary-100 p-4 mb-6 flex items-center space-x-3">
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-status">
                    <option value="">全部状态</option>
                    <option value="active">已启用</option>
                    <option value="inactive">已停用</option>
                    <option value="draft">草稿</option>
                </select>
                <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-track">
                    <option value="">全部赛道</option>
                    <option value="chain_store">连锁实体店</option>
                    <option value="commercial_event">演唱会/商业活动</option>
                    <option value="tourism">旅游景区</option>
                    <option value="project_service">项目制非标服务</option>
                </select>
                <div class="flex-1"></div>
                <input type="text" placeholder="搜索知识条目..." class="px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900 w-64" id="search-input">
            </div>

            <!-- 知识库列表 -->
            <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-primary-100">
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">知识编号</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">标题</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">类型</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">适用赛道</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">版本</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">状态</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">更新时间</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作</th>
                        </tr>
                    </thead>
                    <tbody id="knowledge-table">
                        <!-- 动态加载 -->
                    </tbody>
                </table>
            </div>
        </main>
    </div>

    <!-- 新增/编辑知识条目弹窗 -->
    <div id="knowledge-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div class="p-5 border-b border-primary-100 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-primary-900" id="modal-title">新增知识条目</h2>
                <button onclick="closeKnowledgeModal()" class="w-8 h-8 rounded-lg bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-700 transition flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6 overflow-y-auto" style="max-height: calc(90vh - 180px);">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-primary-700 mb-2">标题</label>
                        <input type="text" id="kb-title" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入知识条目标题">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-primary-700 mb-2">类型</label>
                            <select id="kb-type" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900">
                                <option value="template">模板</option>
                                <option value="rule">规则</option>
                                <option value="case">案例</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-primary-700 mb-2">适用赛道</label>
                            <select id="kb-track" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900">
                                <option value="all">全部赛道</option>
                                <option value="chain_store">连锁实体店</option>
                                <option value="commercial_event">演唱会/商业活动</option>
                                <option value="tourism">旅游景区</option>
                                <option value="project_service">项目制非标服务</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-primary-700 mb-2">内容</label>
                        <textarea id="kb-content" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" rows="10" placeholder="请输入知识条目内容..."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-primary-700 mb-2">标签</label>
                        <input type="text" id="kb-tags" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="多个标签用逗号分隔">
                    </div>
                </div>
            </div>
            <div class="p-5 border-t border-primary-100 flex justify-end space-x-3">
                <button onclick="closeKnowledgeModal()" class="px-5 py-2 border border-primary-200 rounded-xl text-sm text-primary-600 font-medium hover:bg-primary-50 transition">
                    取消
                </button>
                <button onclick="saveKnowledge()" class="px-5 py-2 bg-primary-900 text-white rounded-xl text-sm font-medium hover:bg-primary-800 transition">
                    保存
                </button>
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
    document.getElementById('dept-name').textContent = config.name + ' - 知识库管理';
    document.getElementById('user-info').textContent = (DGT.user?.name || '员工') + ' | ' + config.name;

    // 模拟知识库数据
    const knowledgeData = [
        { id: 'KB-001', title: '连锁实体店收入分成协议模板v2.0', type: 'template', track: '连锁实体店', version: 'v2.0', status: 'active', updatedAt: '2024-01-15' },
        { id: 'KB-002', title: '演唱会项目风险评估规则', type: 'rule', track: '演唱会/商业活动', version: 'v1.5', status: 'active', updatedAt: '2024-01-12' },
        { id: 'KB-003', title: '旅游景区分成比例计算公式', type: 'rule', track: '旅游景区', version: 'v1.2', status: 'active', updatedAt: '2024-01-10' },
        { id: 'KB-004', title: '奈雪的茶华南区成功案例', type: 'case', track: '连锁实体店', version: 'v1.0', status: 'active', updatedAt: '2024-01-08' },
        { id: 'KB-005', title: '项目制服务合同条款库', type: 'template', track: '项目制非标服务', version: 'v1.3', status: 'draft', updatedAt: '2024-01-05' },
    ];

    function renderKnowledgeTable(filter = 'all') {
        let data = knowledgeData;
        if (filter !== 'all') {
            data = knowledgeData.filter(k => k.type === filter);
        }

        document.getElementById('knowledge-table').innerHTML = data.map(k => \`
            <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                <td class="px-4 py-4 font-medium text-accent-600 text-sm">\${k.id}</td>
                <td class="px-4 py-4 text-primary-900 text-sm font-medium">\${k.title}</td>
                <td class="px-4 py-4">
                    <span class="px-2 py-1 rounded-md text-xs font-medium \${getTypeClass(k.type)}">\${getTypeName(k.type)}</span>
                </td>
                <td class="px-4 py-4 text-primary-600 text-sm">\${k.track}</td>
                <td class="px-4 py-4 text-primary-500 text-sm">\${k.version}</td>
                <td class="px-4 py-4">
                    <span class="status-badge status-\${k.status}">\${k.status === 'active' ? '已启用' : k.status === 'draft' ? '草稿' : '已停用'}</span>
                </td>
                <td class="px-4 py-4 text-xs text-primary-400">\${k.updatedAt}</td>
                <td class="px-4 py-4">
                    <button onclick="editKnowledge('\${k.id}')" class="text-primary-600 hover:text-primary-900 text-sm font-medium transition mr-3">编辑</button>
                    <button onclick="deleteKnowledge('\${k.id}')" class="text-danger-500 hover:text-danger-700 text-sm font-medium transition">删除</button>
                </td>
            </tr>
        \`).join('');
    }

    function getTypeClass(type) {
        const classes = {
            'template': 'bg-accent-50 text-accent-600',
            'rule': 'bg-success-50 text-success-600',
            'case': 'bg-warning-50 text-warning-600'
        };
        return classes[type] || '';
    }

    function getTypeName(type) {
        const names = { 'template': '模板', 'rule': '规则', 'case': '案例' };
        return names[type] || type;
    }

    function filterCategory(category, el) {
        // 更新选中状态
        document.querySelectorAll('.grid > div').forEach(div => {
            div.classList.remove('border-2', 'border-primary-900');
            div.classList.add('border', 'border-primary-100');
        });
        el.classList.remove('border', 'border-primary-100');
        el.classList.add('border-2', 'border-primary-900');

        renderKnowledgeTable(category);
    }

    function openAddKnowledgeModal() {
        document.getElementById('modal-title').textContent = '新增知识条目';
        document.getElementById('kb-title').value = '';
        document.getElementById('kb-content').value = '';
        document.getElementById('kb-tags').value = '';
        document.getElementById('knowledge-modal').classList.remove('hidden');
    }

    function closeKnowledgeModal() {
        document.getElementById('knowledge-modal').classList.add('hidden');
    }

    function editKnowledge(id) {
        const item = knowledgeData.find(k => k.id === id);
        if (item) {
            document.getElementById('modal-title').textContent = '编辑知识条目';
            document.getElementById('kb-title').value = item.title;
            document.getElementById('knowledge-modal').classList.remove('hidden');
        }
    }

    function saveKnowledge() {
        DGT.showToast('知识条目已保存', 'success');
        closeKnowledgeModal();
    }

    function deleteKnowledge(id) {
        if (confirm('确定要删除该知识条目吗？')) {
            DGT.showToast('知识条目已删除', 'success');
            renderKnowledgeTable();
        }
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    renderKnowledgeTable();
</script>
`)
