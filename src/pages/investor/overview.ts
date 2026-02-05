import { baseLayout } from '../layout'

export const renderInvestorOverview = () => baseLayout('市场总览', `
<div class="min-h-screen bg-gray-100">
    <!-- 顶部导航 -->
    <nav class="gradient-bg shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <i class="fas fa-tint text-white text-xl mr-2"></i>
                    <span class="text-white font-bold">滴灌通</span>
                    <span class="ml-4 text-white/80">投资者门户</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/investor/market-overview" class="text-white font-medium">市场总览</a>
                    <a href="/investor/portfolio" class="text-white/70 hover:text-white">投资组合</a>
                    <a href="/investor/pipeline" class="text-white/70 hover:text-white">Pipeline</a>
                    <div class="ml-4 flex items-center">
                        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-white text-sm"></i>
                        </div>
                        <span class="ml-2 text-white text-sm" id="user-name">投资者</span>
                    </div>
                    <button onclick="logout()" class="text-white/70 hover:text-white">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4">
        <!-- 大盘指标 -->
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm text-gray-500">全赛道项目数</div>
                        <div class="text-3xl font-bold text-gray-800 mt-1" id="total-projects">1,280</div>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-project-diagram text-blue-600 text-xl"></i>
                    </div>
                </div>
                <div class="mt-3 text-sm text-green-600">
                    <i class="fas fa-arrow-up mr-1"></i>+12.5% 本月
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm text-gray-500">已投规模</div>
                        <div class="text-3xl font-bold text-gray-800 mt-1">¥<span id="invested-amount">29.6</span>亿</div>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-coins text-green-600 text-xl"></i>
                    </div>
                </div>
                <div class="mt-3 text-sm text-green-600">
                    <i class="fas fa-arrow-up mr-1"></i>+8.3% 本月
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm text-gray-500">Pipeline规模</div>
                        <div class="text-3xl font-bold text-gray-800 mt-1">¥<span id="pipeline-amount">5.2</span>亿</div>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-stream text-purple-600 text-xl"></i>
                    </div>
                </div>
                <div class="mt-3 text-sm text-purple-600">
                    <i class="fas fa-clock mr-1"></i>待投资
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm text-gray-500">累计兑付</div>
                        <div class="text-3xl font-bold text-gray-800 mt-1">¥<span id="payout-amount">18.9</span>亿</div>
                    </div>
                    <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-hand-holding-usd text-orange-600 text-xl"></i>
                    </div>
                </div>
                <div class="mt-3 text-sm text-green-600">
                    <i class="fas fa-check-circle mr-1"></i>兑付率 98.5%
                </div>
            </div>
        </div>

        <!-- 图表区域 -->
        <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="font-bold text-gray-800 mb-4">行业分布</h3>
                <canvas id="industry-chart" height="200"></canvas>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="font-bold text-gray-800 mb-4">产品层级分布</h3>
                <canvas id="layer-chart" height="200"></canvas>
            </div>
        </div>

        <!-- Tab切换 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="flex border-b">
                <button id="tab-invested" onclick="switchTab('invested')" 
                        class="flex-1 py-4 text-center font-medium text-indigo-600 border-b-2 border-indigo-600">
                    <i class="fas fa-check-circle mr-2"></i>已投资项目
                </button>
                <button id="tab-evaluating" onclick="switchTab('evaluating')" 
                        class="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700">
                    <i class="fas fa-search mr-2"></i>在评估项目
                </button>
            </div>

            <!-- 筛选器 -->
            <div class="p-4 bg-gray-50 border-b flex items-center space-x-4">
                <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500">
                    <option value="">全部行业</option>
                    <option>连锁实体店</option>
                    <option>演唱会/商业活动</option>
                    <option>旅游景区</option>
                    <option>项目制非标服务</option>
                </select>
                <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500">
                    <option value="">全部地区</option>
                    <option>华东</option>
                    <option>华南</option>
                    <option>华北</option>
                    <option>西南</option>
                </select>
                <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500">
                    <option value="">全部层级</option>
                    <option>优先级</option>
                    <option>夹层</option>
                    <option>劣后级</option>
                </select>
                <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500">
                    <option value="">风控评分</option>
                    <option>80分以上</option>
                    <option>60-80分</option>
                    <option>60分以下</option>
                </select>
                <div class="flex-1"></div>
                <input type="text" placeholder="搜索项目..." 
                       class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 w-48">
            </div>

            <!-- 已投资项目列表 -->
            <div id="invested-list" class="p-4">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">项目</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">行业</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">投资金额</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">层级</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">年化收益</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">风控评分</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">操作</th>
                        </tr>
                    </thead>
                    <tbody id="invested-table">
                        <!-- 动态加载 -->
                    </tbody>
                </table>
            </div>

            <!-- 在评估项目列表 -->
            <div id="evaluating-list" class="p-4 hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">项目</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">行业</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">融资金额</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">分成比例</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">AI评分</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">可投层级</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">操作</th>
                        </tr>
                    </thead>
                    <tbody id="evaluating-table">
                        <!-- 动态加载 -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`, `
<script>
    if (!DGT.user) {
        window.location.href = '/auth/login';
    }
    document.getElementById('user-name').textContent = DGT.user?.name || '投资者';

    // 初始化图表
    function initCharts() {
        // 行业分布饼图
        new Chart(document.getElementById('industry-chart'), {
            type: 'doughnut',
            data: {
                labels: ['连锁实体店', '演唱会/商业活动', '旅游景区', '项目制非标服务'],
                datasets: [{
                    data: [42, 20, 28, 10],
                    backgroundColor: ['#6366f1', '#a855f7', '#22c55e', '#f97316']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });

        // 产品层级分布
        new Chart(document.getElementById('layer-chart'), {
            type: 'bar',
            data: {
                labels: ['优先级', '夹层', '劣后级'],
                datasets: [{
                    label: '投资规模(亿)',
                    data: [15.2, 8.5, 5.9],
                    backgroundColor: ['#22c55e', '#f59e0b', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // 模拟数据
    const investedProjects = [
        { id: 1, name: '奈雪的茶华南区', industry: '连锁实体店', amount: 500, layer: 'senior', return: 12.5, risk: 85, status: 'active' },
        { id: 2, name: '周杰伦巡演深圳站', industry: '演唱会/商业活动', amount: 200, layer: 'mezzanine', return: 18.2, risk: 72, status: 'active' },
        { id: 3, name: '九寨沟景区提升', industry: '旅游景区', amount: 800, layer: 'senior', return: 10.8, risk: 88, status: 'active' },
        { id: 4, name: '蜜雪冰城西南区', industry: '连锁实体店', amount: 300, layer: 'subordinate', return: 22.5, risk: 68, status: 'completed' }
    ];

    const evaluatingProjects = [
        { id: 5, name: '瑞幸咖啡华东扩张', industry: '连锁实体店', amount: '500-800万', shareRate: '8-12%', aiScore: 82, layers: ['senior', 'mezzanine'] },
        { id: 6, name: '张学友巡演北京站', industry: '演唱会/商业活动', amount: '300-500万', shareRate: '15-20%', aiScore: 78, layers: ['mezzanine', 'subordinate'] },
        { id: 7, name: '黄山景区数字化', industry: '旅游景区', amount: '1000-1500万', shareRate: '6-10%', aiScore: 85, layers: ['senior'] }
    ];

    function renderInvestedTable() {
        document.getElementById('invested-table').innerHTML = investedProjects.map(p => \`
            <tr class="border-t hover:bg-gray-50">
                <td class="px-4 py-4">
                    <div class="font-medium text-gray-800">\${p.name}</div>
                </td>
                <td class="px-4 py-4 text-sm">\${p.industry}</td>
                <td class="px-4 py-4 font-medium">¥\${p.amount}万</td>
                <td class="px-4 py-4">
                    <span class="px-2 py-1 rounded text-xs \${getLayerClass(p.layer)}">\${getLayerText(p.layer)}</span>
                </td>
                <td class="px-4 py-4 text-green-600 font-medium">\${p.return}%</td>
                <td class="px-4 py-4">
                    <div class="flex items-center">
                        <span class="font-medium \${p.risk >= 70 ? 'text-green-600' : 'text-yellow-600'}">\${p.risk}</span>
                        <span class="text-gray-400 text-sm">/100</span>
                    </div>
                </td>
                <td class="px-4 py-4">
                    <span class="status-badge status-\${p.status}">\${p.status === 'active' ? '执行中' : '已完成'}</span>
                </td>
                <td class="px-4 py-4">
                    <button onclick="viewDetail(\${p.id})" class="text-indigo-600 hover:text-indigo-800 text-sm">
                        查看详情
                    </button>
                </td>
            </tr>
        \`).join('');
    }

    function renderEvaluatingTable() {
        document.getElementById('evaluating-table').innerHTML = evaluatingProjects.map(p => \`
            <tr class="border-t hover:bg-gray-50">
                <td class="px-4 py-4">
                    <div class="font-medium text-gray-800">\${p.name}</div>
                </td>
                <td class="px-4 py-4 text-sm">\${p.industry}</td>
                <td class="px-4 py-4 font-medium">\${p.amount}</td>
                <td class="px-4 py-4 text-indigo-600 font-medium">\${p.shareRate}</td>
                <td class="px-4 py-4">
                    <div class="flex items-center">
                        <div class="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div class="h-2 bg-indigo-600 rounded-full" style="width: \${p.aiScore}%"></div>
                        </div>
                        <span class="font-medium">\${p.aiScore}</span>
                    </div>
                </td>
                <td class="px-4 py-4">
                    \${p.layers.map(l => \`<span class="px-2 py-1 rounded text-xs mr-1 \${getLayerClass(l)}">\${getLayerText(l)}</span>\`).join('')}
                </td>
                <td class="px-4 py-4">
                    <button onclick="viewPipeline(\${p.id})" class="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                        查看评估
                    </button>
                </td>
            </tr>
        \`).join('');
    }

    function getLayerClass(layer) {
        const classes = {
            'senior': 'bg-green-100 text-green-700',
            'mezzanine': 'bg-yellow-100 text-yellow-700',
            'subordinate': 'bg-red-100 text-red-700'
        };
        return classes[layer] || '';
    }

    function getLayerText(layer) {
        const texts = { 'senior': '优先级', 'mezzanine': '夹层', 'subordinate': '劣后级' };
        return texts[layer] || layer;
    }

    function switchTab(tab) {
        const investedTab = document.getElementById('tab-invested');
        const evaluatingTab = document.getElementById('tab-evaluating');
        const investedList = document.getElementById('invested-list');
        const evaluatingList = document.getElementById('evaluating-list');
        
        if (tab === 'invested') {
            investedTab.classList.add('text-indigo-600', 'border-b-2', 'border-indigo-600');
            investedTab.classList.remove('text-gray-500');
            evaluatingTab.classList.remove('text-indigo-600', 'border-b-2', 'border-indigo-600');
            evaluatingTab.classList.add('text-gray-500');
            investedList.classList.remove('hidden');
            evaluatingList.classList.add('hidden');
        } else {
            evaluatingTab.classList.add('text-indigo-600', 'border-b-2', 'border-indigo-600');
            evaluatingTab.classList.remove('text-gray-500');
            investedTab.classList.remove('text-indigo-600', 'border-b-2', 'border-indigo-600');
            investedTab.classList.add('text-gray-500');
            evaluatingList.classList.remove('hidden');
            investedList.classList.add('hidden');
        }
    }

    function viewDetail(id) {
        window.location.href = '/investor/portfolio?id=' + id;
    }

    function viewPipeline(id) {
        window.location.href = '/investor/pipeline?id=' + id;
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    initCharts();
    renderInvestedTable();
    renderEvaluatingTable();
</script>
`)
