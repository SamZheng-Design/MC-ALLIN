import { baseLayout, navbar } from '../layout'

export const renderFinancerProjects = () => baseLayout('我的项目', `
${navbar()}
<div class="flex bg-primary-50">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-white border-r border-primary-100 min-h-screen">
        <div class="p-5 border-b border-primary-100">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
                <div class="ml-3">
                    <div class="font-medium text-primary-900 text-sm" id="user-name">加载中...</div>
                    <div class="text-xs text-primary-400">融资者</div>
                </div>
            </div>
        </div>
        <nav class="mt-2 px-3">
            <a href="/financer/dashboard" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-th-large w-5 mr-3 text-sm"></i>
                <span>赛道选择</span>
            </a>
            <a href="/financer/projects" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium bg-primary-900 text-white">
                <i class="fas fa-folder w-5 mr-3 text-sm"></i>
                <span>我的项目</span>
            </a>
            <a href="/financer/messages" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-bell w-5 mr-3 text-sm"></i>
                <span>消息中心</span>
            </a>
            <a href="/financer/settings" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-cog w-5 mr-3 text-sm"></i>
                <span>个人设置</span>
            </a>
            <a href="javascript:void(0)" onclick="logout()" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-sign-out-alt w-5 mr-3 text-sm"></i>
                <span>退出登录</span>
            </a>
        </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 p-8">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-primary-900 tracking-tight">我的项目</h1>
            <p class="text-primary-500 mt-2 text-sm">查看和管理您的所有融资申报项目</p>
        </div>

        <!-- 筛选器 -->
        <div class="bg-white rounded-2xl border border-primary-100 p-4 mb-6 flex items-center space-x-3">
            <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-status">
                <option value="">全部状态</option>
                <option value="draft">草稿</option>
                <option value="submitted">已提交</option>
                <option value="reviewing">审核中</option>
                <option value="approved">已通过</option>
                <option value="signed">已签约</option>
                <option value="active">执行中</option>
                <option value="completed">已完成</option>
            </select>
            <select class="px-3 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" id="filter-track">
                <option value="">全部赛道</option>
                <option value="chain_store">连锁实体店</option>
                <option value="commercial_event">演唱会/商业活动</option>
                <option value="tourism">旅游景区</option>
                <option value="project_service">项目制非标服务</option>
            </select>
            <div class="flex-1"></div>
            <input type="text" placeholder="搜索项目编号..." class="px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900 w-48" id="search-input">
        </div>

        <!-- 项目列表 -->
        <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-primary-100">
                        <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">项目编号</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">赛道</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">融资金额</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">完善度</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">状态</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">创建时间</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作</th>
                    </tr>
                </thead>
                <tbody id="projects-table">
                    <!-- 动态加载 -->
                </tbody>
            </table>
        </div>
    </main>
</div>
`, `
<script>
    // 检查登录状态
    if (!DGT.user || !DGT.user.role.includes('FINANCER')) {
        window.location.href = '/auth/login';
    }
    
    document.getElementById('user-name').textContent = DGT.user?.name || '用户';

    // 模拟项目数据
    const projects = [
        { id: 1, project_no: 'DGT-2024-0001', track_name: '连锁实体店', amount: '100-300万', completeness: 85, status: 'reviewing', created_at: '2024-01-15' },
        { id: 2, project_no: 'DGT-2024-0002', track_name: '演唱会/商业活动', amount: '500-800万', completeness: 92, status: 'signed', created_at: '2024-01-10' },
        { id: 3, project_no: 'DGT-2024-0003', track_name: '旅游景区', amount: '1000-1500万', completeness: 65, status: 'draft', created_at: '2024-01-20' },
        { id: 4, project_no: 'DGT-2024-0004', track_name: '连锁实体店', amount: '200-400万', completeness: 100, status: 'active', created_at: '2023-12-01' },
    ];

    function renderProjects(filterStatus = '', filterTrack = '', searchTerm = '') {
        let filteredProjects = projects;
        
        if (filterStatus) {
            filteredProjects = filteredProjects.filter(p => p.status === filterStatus);
        }
        if (filterTrack) {
            filteredProjects = filteredProjects.filter(p => p.track_name.includes(filterTrack));
        }
        if (searchTerm) {
            filteredProjects = filteredProjects.filter(p => p.project_no.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        const tbody = document.getElementById('projects-table');
        
        if (filteredProjects.length === 0) {
            tbody.innerHTML = \`
                <tr>
                    <td colspan="7" class="px-6 py-12 text-center">
                        <div class="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-folder-open text-primary-400 text-lg"></i>
                        </div>
                        <p class="text-primary-400 text-sm">暂无符合条件的项目</p>
                    </td>
                </tr>
            \`;
            return;
        }

        tbody.innerHTML = filteredProjects.map(p => \`
            <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                <td class="px-6 py-4 font-medium text-accent-600 text-sm">\${p.project_no}</td>
                <td class="px-6 py-4 text-primary-600 text-sm">\${p.track_name}</td>
                <td class="px-6 py-4 text-primary-900 text-sm font-medium">¥\${p.amount}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="w-20 h-1.5 bg-primary-100 rounded-full mr-2">
                            <div class="h-1.5 bg-primary-900 rounded-full" style="width: \${p.completeness}%"></div>
                        </div>
                        <span class="text-xs text-primary-500 font-medium">\${p.completeness}%</span>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="status-badge status-\${p.status}">\${getStatusText(p.status)}</span>
                </td>
                <td class="px-6 py-4 text-xs text-primary-400">\${p.created_at}</td>
                <td class="px-6 py-4">
                    \${getActionButtons(p)}
                </td>
            </tr>
        \`).join('');
    }

    function getStatusText(status) {
        const map = {
            'draft': '草稿',
            'submitted': '已提交',
            'reviewing': '审核中',
            'approved': '已通过',
            'rejected': '已拒绝',
            'signed': '已签约',
            'active': '执行中',
            'completed': '已完成'
        };
        return map[status] || status;
    }

    function getActionButtons(project) {
        if (project.status === 'draft' || project.status === 'rejected') {
            return \`<a href="/financer/report/1?projectId=\${project.id}" class="text-primary-600 hover:text-primary-900 text-sm font-medium transition">继续编辑</a>\`;
        } else if (project.status === 'approved') {
            return \`<a href="/financer/confirm/\${project.id}" class="text-accent-600 hover:text-accent-700 text-sm font-medium transition">去签约</a>\`;
        } else {
            return \`<a href="/financer/project/\${project.id}" class="text-primary-600 hover:text-primary-900 text-sm font-medium transition">查看详情</a>\`;
        }
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 筛选器事件
    document.getElementById('filter-status').addEventListener('change', function() {
        renderProjects(this.value, document.getElementById('filter-track').value, document.getElementById('search-input').value);
    });
    document.getElementById('filter-track').addEventListener('change', function() {
        renderProjects(document.getElementById('filter-status').value, this.value, document.getElementById('search-input').value);
    });
    document.getElementById('search-input').addEventListener('input', function() {
        renderProjects(document.getElementById('filter-status').value, document.getElementById('filter-track').value, this.value);
    });

    // 初始化
    renderProjects();
</script>
`)
