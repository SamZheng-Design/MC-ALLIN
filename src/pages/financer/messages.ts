import { baseLayout, navbar } from '../layout'

export const renderFinancerMessages = () => baseLayout('消息中心', `
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
            <a href="/financer/projects" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-folder w-5 mr-3 text-sm"></i>
                <span>我的项目</span>
            </a>
            <a href="/financer/messages" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium bg-primary-900 text-white">
                <i class="fas fa-bell w-5 mr-3 text-sm"></i>
                <span>消息中心</span>
                <span class="ml-auto bg-danger-500 text-white text-xs px-2 py-0.5 rounded-md font-medium">3</span>
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
            <h1 class="text-2xl font-semibold text-primary-900 tracking-tight">消息中心</h1>
            <p class="text-primary-500 mt-2 text-sm">查看系统通知和项目进度更新</p>
        </div>

        <!-- 消息分类Tab -->
        <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden mb-6">
            <div class="flex border-b border-primary-100">
                <button onclick="switchMessageTab('all')" id="tab-all" class="flex-1 py-3.5 text-center text-sm font-medium text-primary-900 border-b-2 border-primary-900">
                    全部消息
                </button>
                <button onclick="switchMessageTab('system')" id="tab-system" class="flex-1 py-3.5 text-center text-sm font-medium text-primary-400 hover:text-primary-600 transition">
                    系统通知
                </button>
                <button onclick="switchMessageTab('project')" id="tab-project" class="flex-1 py-3.5 text-center text-sm font-medium text-primary-400 hover:text-primary-600 transition">
                    项目动态
                </button>
            </div>
        </div>

        <!-- 消息列表 -->
        <div class="space-y-4" id="messages-list">
            <!-- 动态加载 -->
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

    // 模拟消息数据
    const messages = [
        { id: 1, type: 'system', title: '欢迎使用滴灌通平台', content: '感谢您注册成为滴灌通融资者，开始您的融资之旅吧！', time: '2024-01-20 10:00', read: true },
        { id: 2, type: 'project', title: '项目 DGT-2024-0001 审核通过', content: '恭喜！您的项目已通过AI智能评估和人工复核，请尽快完成签约。', time: '2024-01-19 15:30', read: false },
        { id: 3, type: 'project', title: '项目 DGT-2024-0002 需要补充材料', content: '您的项目需要补充营业执照复印件，请在3个工作日内完成。', time: '2024-01-18 09:15', read: false },
        { id: 4, type: 'system', title: '平台维护通知', content: '平台将于2024年1月25日凌晨2:00-4:00进行系统升级，届时服务将暂时不可用。', time: '2024-01-17 14:00', read: true },
        { id: 5, type: 'project', title: '项目 DGT-2024-0004 本月分成已结算', content: '您的项目本月分成金额已结算，金额：¥15,680.00，请查收。', time: '2024-01-15 12:00', read: false },
    ];

    function renderMessages(filter = 'all') {
        let filteredMessages = messages;
        
        if (filter !== 'all') {
            filteredMessages = messages.filter(m => m.type === filter);
        }

        const container = document.getElementById('messages-list');
        
        if (filteredMessages.length === 0) {
            container.innerHTML = \`
                <div class="bg-white rounded-2xl border border-primary-100 p-12 text-center">
                    <div class="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-inbox text-primary-400 text-lg"></i>
                    </div>
                    <p class="text-primary-400 text-sm">暂无消息</p>
                </div>
            \`;
            return;
        }

        container.innerHTML = filteredMessages.map(m => \`
            <div class="bg-white rounded-2xl border border-primary-100 p-5 hover:shadow-lg transition cursor-pointer \${!m.read ? 'border-l-4 border-l-accent-500' : ''}" onclick="viewMessage(\${m.id})">
                <div class="flex items-start justify-between">
                    <div class="flex items-start">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center mr-4 \${m.type === 'system' ? 'bg-primary-100' : 'bg-accent-100'}">
                            <i class="fas fa-\${m.type === 'system' ? 'bullhorn' : 'project-diagram'} \${m.type === 'system' ? 'text-primary-600' : 'text-accent-600'} text-sm"></i>
                        </div>
                        <div>
                            <div class="flex items-center">
                                <h3 class="font-medium text-primary-900 text-sm \${!m.read ? 'font-semibold' : ''}">\${m.title}</h3>
                                \${!m.read ? '<span class="ml-2 w-2 h-2 bg-danger-500 rounded-full"></span>' : ''}
                            </div>
                            <p class="text-primary-500 text-sm mt-1">\${m.content}</p>
                        </div>
                    </div>
                    <span class="text-xs text-primary-400 whitespace-nowrap ml-4">\${m.time}</span>
                </div>
            </div>
        \`).join('');
    }

    function switchMessageTab(tab) {
        // 移除所有激活状态
        ['all', 'system', 'project'].forEach(t => {
            const tabEl = document.getElementById('tab-' + t);
            tabEl.classList.remove('text-primary-900', 'border-b-2', 'border-primary-900');
            tabEl.classList.add('text-primary-400');
        });
        // 激活当前选项
        const activeTab = document.getElementById('tab-' + tab);
        activeTab.classList.remove('text-primary-400');
        activeTab.classList.add('text-primary-900', 'border-b-2', 'border-primary-900');
        
        renderMessages(tab);
    }

    function viewMessage(id) {
        const message = messages.find(m => m.id === id);
        if (message) {
            message.read = true;
            DGT.showToast('查看消息: ' + message.title, 'info');
            renderMessages();
        }
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    renderMessages();
</script>
`)
