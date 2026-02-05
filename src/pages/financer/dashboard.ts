import { baseLayout, navbar } from '../layout'

export const renderFinancerDashboard = () => baseLayout('融资者控制台', `
${navbar()}
<div class="flex bg-primary-50">
    <!-- 侧边栏 - Apple风格 -->
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
            <a href="/financer/dashboard" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium bg-primary-900 text-white">
                <i class="fas fa-th-large w-5 mr-3 text-sm"></i>
                <span>赛道选择</span>
            </a>
            <a href="/financer/projects" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
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
            <h1 class="text-2xl font-semibold text-primary-900 tracking-tight">选择融资赛道</h1>
            <p class="text-primary-500 mt-2 text-sm">请根据您的业务类型选择合适的融资赛道，我们将为您匹配专属的 AI 智能评估方案</p>
        </div>

        <!-- 赛道卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5" id="tracks-container">
            <!-- 动态加载 -->
        </div>

        <!-- 我的项目列表 -->
        <div class="mt-12">
            <h2 class="text-lg font-semibold text-primary-900 mb-4">我的申报项目</h2>
            <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-primary-100">
                            <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">项目编号</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">赛道</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">完善度</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">状态</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">创建时间</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作</th>
                        </tr>
                    </thead>
                    <tbody id="projects-table">
                        <tr>
                            <td colspan="6" class="px-6 py-12 text-center">
                                <div class="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <i class="fas fa-folder-open text-primary-400 text-lg"></i>
                                </div>
                                <p class="text-primary-400 text-sm">暂无项目，请选择赛道开始申报</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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

    // 赛道配置
    const tracks = [
        {
            id: 1,
            code: 'chain_store',
            name: '连锁实体店',
            icon: 'store',
            color: 'indigo',
            description: '连锁零售、餐饮、服务门店等实体经营场景',
            stats: { projects: 856, amount: '12.5亿', avgReturn: '13.2%' }
        },
        {
            id: 2,
            code: 'commercial_event',
            name: '演唱会/商业活动',
            icon: 'ticket-alt',
            color: 'purple',
            description: '演唱会、展览、商业活动等项目制场景',
            stats: { projects: 234, amount: '5.8亿', avgReturn: '15.8%' }
        },
        {
            id: 3,
            code: 'tourism',
            name: '旅游景区',
            icon: 'mountain',
            color: 'green',
            description: '旅游景区、度假村、主题公园等文旅场景',
            stats: { projects: 128, amount: '8.2亿', avgReturn: '11.5%' }
        },
        {
            id: 4,
            code: 'project_service',
            name: '项目制非标服务',
            icon: 'briefcase',
            color: 'orange',
            description: '咨询、设计、IT服务等项目制服务场景',
            stats: { projects: 62, amount: '3.1亿', avgReturn: '14.2%' }
        }
    ];

    // 渲染赛道卡片 - 简约风格
    function renderTracks() {
        const container = document.getElementById('tracks-container');
        container.innerHTML = tracks.map(track => \`
            <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden card-hover cursor-pointer"
                 onclick="selectTrack(\${track.id})">
                <div class="p-6">
                    <div class="flex items-start justify-between">
                        <div class="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center">
                            <i class="fas fa-\${track.icon} text-white text-lg"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-lg">
                            \${track.stats.projects} 个项目
                        </span>
                    </div>
                    <h3 class="text-lg font-semibold text-primary-900 mt-4">\${track.name}</h3>
                    <p class="text-primary-500 mt-2 text-sm leading-relaxed">\${track.description}</p>
                    <div class="mt-4 pt-4 border-t border-primary-100 flex justify-between text-sm">
                        <div>
                            <span class="text-primary-400">累计投资</span>
                            <span class="ml-2 font-semibold text-primary-900">¥\${track.stats.amount}</span>
                        </div>
                        <div>
                            <span class="text-primary-400">平均收益</span>
                            <span class="ml-2 font-semibold text-success-600">\${track.stats.avgReturn}</span>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-4 bg-primary-50 flex justify-between items-center">
                    <span class="text-xs text-primary-500">
                        <span class="w-1.5 h-1.5 bg-success-400 rounded-full inline-block mr-1.5 animate-pulse"></span>AI 智能评估已就绪
                    </span>
                    <button class="px-4 py-2 bg-primary-900 text-white rounded-lg text-xs font-medium hover:bg-primary-800 transition">
                        立即申报 <i class="fas fa-arrow-right ml-1.5 text-xs"></i>
                    </button>
                </div>
            </div>
        \`).join('');
    }

    // 选择赛道
    function selectTrack(trackId) {
        window.location.href = '/financer/report/' + trackId;
    }

    // 加载项目列表 - 简约风格
    async function loadProjects() {
        try {
            const res = await DGT.api.get('/financer/projects');
            const projects = res.data.projects || [];
            
            if (projects.length === 0) return;
            
            const tbody = document.getElementById('projects-table');
            tbody.innerHTML = projects.map(p => \`
                <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                    <td class="px-6 py-4 font-medium text-accent-600 text-sm">\${p.project_no}</td>
                    <td class="px-6 py-4 text-primary-600 text-sm">\${p.track_name}</td>
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
                    <td class="px-6 py-4 text-xs text-primary-400">\${new Date(p.created_at).toLocaleDateString()}</td>
                    <td class="px-6 py-4">
                        <a href="/financer/report/\${p.track_id}?projectId=\${p.id}" 
                           class="text-primary-600 hover:text-primary-900 text-sm font-medium transition">
                            继续编辑 <i class="fas fa-edit ml-1 text-xs"></i>
                        </a>
                    </td>
                </tr>
            \`).join('');
        } catch (err) {
            console.error('加载项目失败', err);
        }
    }

    function getStatusText(status) {
        const map = {
            'draft': '草稿',
            'submitted': '已提交',
            'reviewing': '审核中',
            'approved': '已通过',
            'rejected': '已拒绝',
            'signed': '已签约',
            'active': '执行中'
        };
        return map[status] || status;
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    renderTracks();
    loadProjects();
</script>
`)
