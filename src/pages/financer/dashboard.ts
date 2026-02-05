import { baseLayout, navbar } from '../layout'

export const renderFinancerDashboard = () => baseLayout('融资者控制台', `
${navbar()}
<div class="flex">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-white shadow-lg min-h-screen">
        <div class="p-6 border-b">
            <div class="flex items-center">
                <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-indigo-600 text-xl"></i>
                </div>
                <div class="ml-3">
                    <div class="font-medium text-gray-800" id="user-name">加载中...</div>
                    <div class="text-sm text-gray-500">融资者</div>
                </div>
            </div>
        </div>
        <nav class="mt-4">
            <a href="/financer/dashboard" class="flex items-center px-6 py-3 text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600">
                <i class="fas fa-th-large w-5 mr-3"></i>
                <span>赛道选择</span>
            </a>
            <a href="#" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
                <i class="fas fa-folder w-5 mr-3"></i>
                <span>我的项目</span>
            </a>
            <a href="#" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
                <i class="fas fa-bell w-5 mr-3"></i>
                <span>消息中心</span>
            </a>
            <a href="#" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
                <i class="fas fa-cog w-5 mr-3"></i>
                <span>个人设置</span>
            </a>
            <a href="#" onclick="logout()" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
                <i class="fas fa-sign-out-alt w-5 mr-3"></i>
                <span>退出登录</span>
            </a>
        </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 p-8">
        <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-800">选择融资赛道</h1>
            <p class="text-gray-600 mt-2">请根据您的业务类型选择合适的融资赛道，我们将为您匹配专属的AI智能评估方案</p>
        </div>

        <!-- 赛道卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="tracks-container">
            <!-- 动态加载 -->
        </div>

        <!-- 我的项目列表 -->
        <div class="mt-12">
            <h2 class="text-xl font-bold text-gray-800 mb-4">我的申报项目</h2>
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">项目编号</th>
                            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">赛道</th>
                            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">完善度</th>
                            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">状态</th>
                            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">创建时间</th>
                            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">操作</th>
                        </tr>
                    </thead>
                    <tbody id="projects-table">
                        <tr>
                            <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                                <i class="fas fa-folder-open text-4xl text-gray-300 mb-2"></i>
                                <p>暂无项目，请选择赛道开始申报</p>
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

    // 渲染赛道卡片
    function renderTracks() {
        const container = document.getElementById('tracks-container');
        container.innerHTML = tracks.map(track => \`
            <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover transition-all duration-300 cursor-pointer"
                 onclick="selectTrack(\${track.id})">
                <div class="p-6">
                    <div class="flex items-start justify-between">
                        <div class="w-14 h-14 bg-\${track.color}-100 rounded-xl flex items-center justify-center">
                            <i class="fas fa-\${track.icon} text-\${track.color}-600 text-2xl"></i>
                        </div>
                        <span class="px-3 py-1 bg-\${track.color}-50 text-\${track.color}-600 text-sm rounded-full">
                            \${track.stats.projects}个项目
                        </span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mt-4">\${track.name}</h3>
                    <p class="text-gray-600 mt-2 text-sm">\${track.description}</p>
                    <div class="mt-4 pt-4 border-t flex justify-between text-sm">
                        <div>
                            <span class="text-gray-500">累计投资</span>
                            <span class="ml-2 font-bold text-gray-800">¥\${track.stats.amount}</span>
                        </div>
                        <div>
                            <span class="text-gray-500">平均收益</span>
                            <span class="ml-2 font-bold text-green-600">\${track.stats.avgReturn}</span>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <span class="text-sm text-gray-600">
                        <i class="fas fa-robot mr-1"></i>AI智能评估已就绪
                    </span>
                    <button class="px-4 py-2 bg-\${track.color}-600 text-white rounded-lg text-sm font-medium hover:bg-\${track.color}-700 transition">
                        立即申报 <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>
            </div>
        \`).join('');
    }

    // 选择赛道
    function selectTrack(trackId) {
        window.location.href = '/financer/report/' + trackId;
    }

    // 加载项目列表
    async function loadProjects() {
        try {
            const res = await DGT.api.get('/financer/projects');
            const projects = res.data.projects || [];
            
            if (projects.length === 0) return;
            
            const tbody = document.getElementById('projects-table');
            tbody.innerHTML = projects.map(p => \`
                <tr class="border-t hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium text-indigo-600">\${p.project_no}</td>
                    <td class="px-6 py-4">\${p.track_name}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div class="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                <div class="h-2 bg-indigo-600 rounded-full" style="width: \${p.completeness}%"></div>
                            </div>
                            <span class="text-sm">\${p.completeness}%</span>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="status-badge status-\${p.status}">\${getStatusText(p.status)}</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">\${new Date(p.created_at).toLocaleDateString()}</td>
                    <td class="px-6 py-4">
                        <a href="/financer/report/\${p.track_id}?projectId=\${p.id}" 
                           class="text-indigo-600 hover:text-indigo-800 text-sm">
                            继续编辑 <i class="fas fa-edit ml-1"></i>
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
