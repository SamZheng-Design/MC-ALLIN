import { baseLayout } from '../layout'

export const renderInvestorProject = (projectId: string) => baseLayout('项目详情', `
<div class="min-h-screen bg-primary-50">
    <!-- 顶部导航 - 简约黑色 -->
    <nav class="bg-primary-950 border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <a href="/" class="flex items-center group">
                        <div class="w-7 h-7 bg-white rounded-lg flex items-center justify-center mr-2.5 group-hover:scale-105 transition-transform">
                            <span class="text-primary-900 font-bold text-xs">DG</span>
                        </div>
                        <span class="text-white logo-text">滴灌通</span>
                    </a>
                    <span class="ml-4 text-primary-400 text-sm">投资者门户</span>
                </div>
                <div class="flex items-center space-x-6">
                    <a href="/investor/market-overview" class="text-primary-400 hover:text-white text-sm transition">市场总览</a>
                    <a href="/investor/portfolio" class="text-primary-400 hover:text-white text-sm transition">投资组合</a>
                    <a href="/investor/pipeline" class="text-primary-400 hover:text-white text-sm transition">Pipeline</a>
                    <div class="ml-4 flex items-center">
                        <div class="w-7 h-7 bg-primary-800 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-primary-300 text-xs"></i>
                        </div>
                        <span class="ml-2 text-white text-sm" id="user-name">投资者</span>
                    </div>
                    <button onclick="logout()" class="text-primary-400 hover:text-white transition">
                        <i class="fas fa-sign-out-alt text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4">
        <!-- 返回按钮 -->
        <a href="/investor/portfolio" class="inline-flex items-center text-primary-600 hover:text-primary-900 text-sm mb-6 transition">
            <i class="fas fa-arrow-left mr-2"></i>返回投资组合
        </a>

        <!-- 项目概览 -->
        <div class="bg-white rounded-2xl border border-primary-100 p-6 mb-6">
            <div class="flex justify-between items-start">
                <div>
                    <h1 class="text-2xl font-semibold text-primary-900" id="project-name">加载中...</h1>
                    <div class="flex items-center mt-2 space-x-4 text-sm">
                        <span class="text-primary-500">项目编号: <span class="text-primary-900 font-medium" id="project-no">--</span></span>
                        <span class="text-primary-500">赛道: <span class="text-primary-900 font-medium" id="project-track">--</span></span>
                        <span class="status-badge status-active" id="project-status">--</span>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-3xl font-semibold text-success-600" id="total-return">--</div>
                    <div class="text-sm text-primary-500">累计收益</div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
            <!-- 左侧：主要信息 -->
            <div class="col-span-2 space-y-6">
                <!-- 投资信息 -->
                <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                    <div class="p-5 border-b border-primary-100">
                        <h2 class="font-semibold text-primary-900">投资信息</h2>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-4 gap-6 text-center">
                            <div class="bg-primary-50 rounded-xl p-4">
                                <div class="text-2xl font-semibold text-primary-900" id="invest-amount">--</div>
                                <div class="text-sm text-primary-500 mt-1">投资金额</div>
                            </div>
                            <div class="bg-primary-50 rounded-xl p-4">
                                <div class="text-2xl font-semibold text-accent-600" id="share-rate">--%</div>
                                <div class="text-sm text-primary-500 mt-1">分成比例</div>
                            </div>
                            <div class="bg-primary-50 rounded-xl p-4">
                                <div class="text-2xl font-semibold text-success-600" id="annual-return">--%</div>
                                <div class="text-sm text-primary-500 mt-1">年化收益</div>
                            </div>
                            <div class="bg-primary-50 rounded-xl p-4">
                                <div class="text-2xl font-semibold text-primary-900" id="invest-layer">--</div>
                                <div class="text-sm text-primary-500 mt-1">投资层级</div>
                            </div>
                        </div>
                        <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
                            <div class="flex justify-between py-2 border-b border-primary-50">
                                <span class="text-primary-500">投资日期</span>
                                <span class="text-primary-900 font-medium" id="invest-date">--</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-primary-50">
                                <span class="text-primary-500">到期日期</span>
                                <span class="text-primary-900 font-medium" id="expire-date">--</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-primary-50">
                                <span class="text-primary-500">剩余期限</span>
                                <span class="text-primary-900 font-medium" id="remaining-days">--</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-primary-50">
                                <span class="text-primary-500">结算周期</span>
                                <span class="text-primary-900 font-medium" id="settlement-cycle">月度结算</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 收益记录 -->
                <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                    <div class="p-5 border-b border-primary-100 flex justify-between items-center">
                        <h2 class="font-semibold text-primary-900">收益记录</h2>
                        <span class="text-sm text-primary-500">共 <span id="return-count">0</span> 笔</span>
                    </div>
                    <div class="p-4">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b border-primary-100">
                                    <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">结算周期</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">营业收入</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">分成金额</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">状态</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">到账日期</th>
                                </tr>
                            </thead>
                            <tbody id="return-table">
                                <!-- 动态加载 -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 收益趋势图 -->
                <div class="bg-white rounded-2xl border border-primary-100 p-6">
                    <h2 class="font-semibold text-primary-900 mb-4">收益趋势</h2>
                    <canvas id="return-chart" height="200"></canvas>
                </div>
            </div>

            <!-- 右侧：补充信息 -->
            <div class="space-y-6">
                <!-- 融资方信息 -->
                <div class="bg-white rounded-2xl border border-primary-100 p-6">
                    <h3 class="font-semibold text-primary-900 mb-4">融资方信息</h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between">
                            <span class="text-primary-500">企业名称</span>
                            <span class="text-primary-900 font-medium" id="company-name">--</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">法定代表人</span>
                            <span class="text-primary-900 font-medium" id="legal-person">--</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">成立日期</span>
                            <span class="text-primary-900 font-medium" id="establish-date">--</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">门店数量</span>
                            <span class="text-primary-900 font-medium" id="store-count">--</span>
                        </div>
                    </div>
                </div>

                <!-- 风控评分 -->
                <div class="bg-white rounded-2xl border border-primary-100 p-6">
                    <h3 class="font-semibold text-primary-900 mb-4">风控评分</h3>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-primary-500 text-sm">综合评分</span>
                        <span class="text-2xl font-semibold text-success-600" id="risk-score">--/100</span>
                    </div>
                    <div class="space-y-2" id="risk-dimensions">
                        <!-- 动态加载 -->
                    </div>
                </div>

                <!-- 合同信息 -->
                <div class="bg-white rounded-2xl border border-primary-100 p-6">
                    <h3 class="font-semibold text-primary-900 mb-4">合同信息</h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between">
                            <span class="text-primary-500">合同编号</span>
                            <span class="text-primary-900 font-medium" id="contract-no">--</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">签约日期</span>
                            <span class="text-primary-900 font-medium" id="sign-date">--</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">合同状态</span>
                            <span class="status-badge status-active">生效中</span>
                        </div>
                    </div>
                    <button onclick="downloadContract()" class="mt-4 w-full py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                        <i class="fas fa-download mr-2"></i>下载合同
                    </button>
                </div>

                <!-- 快捷操作 -->
                <div class="bg-white rounded-2xl border border-primary-100 p-6">
                    <h3 class="font-semibold text-primary-900 mb-4">快捷操作</h3>
                    <div class="space-y-2">
                        <button onclick="contactFinancer()" class="w-full py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                            <i class="fas fa-comment mr-2"></i>联系融资方
                        </button>
                        <button onclick="viewReports()" class="w-full py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                            <i class="fas fa-chart-bar mr-2"></i>查看报告
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`, `
<script>
    const PROJECT_ID = ${projectId};
    
    if (!DGT.user) {
        window.location.href = '/auth/login';
    }
    document.getElementById('user-name').textContent = DGT.user?.name || '投资者';

    // 模拟项目数据
    const projectData = {
        1: {
            name: '奈雪的茶华南区',
            projectNo: 'DGT-INV-2024-0001',
            track: '连锁实体店',
            status: '执行中',
            investAmount: '¥500万',
            shareRate: '12%',
            annualReturn: '12.5%',
            layer: '优先级',
            totalReturn: '¥62.5万',
            investDate: '2023-06-01',
            expireDate: '2025-06-01',
            remainingDays: '18个月',
            companyName: '深圳市奈雪餐饮管理有限公司',
            legalPerson: '彭心',
            establishDate: '2015-11-01',
            storeCount: '50家',
            riskScore: 85,
            contractNo: 'DGT-C-2023-00001',
            signDate: '2023-05-28',
            returns: [
                { period: '2024年1月', revenue: '¥850万', share: '¥10.2万', status: 'paid', date: '2024-02-05' },
                { period: '2023年12月', revenue: '¥920万', share: '¥11.04万', status: 'paid', date: '2024-01-05' },
                { period: '2023年11月', revenue: '¥780万', share: '¥9.36万', status: 'paid', date: '2023-12-05' },
                { period: '2023年10月', revenue: '¥810万', share: '¥9.72万', status: 'paid', date: '2023-11-05' },
                { period: '2023年9月', revenue: '¥760万', share: '¥9.12万', status: 'paid', date: '2023-10-05' },
                { period: '2023年8月', revenue: '¥880万', share: '¥10.56万', status: 'paid', date: '2023-09-05' },
            ]
        },
        2: {
            name: '周杰伦巡演深圳站',
            projectNo: 'DGT-INV-2024-0002',
            track: '演唱会/商业活动',
            status: '已完成',
            investAmount: '¥200万',
            shareRate: '18%',
            annualReturn: '18.2%',
            layer: '夹层',
            totalReturn: '¥36.4万',
            investDate: '2023-09-01',
            expireDate: '2024-01-15',
            remainingDays: '--',
            companyName: '杰威尔音乐有限公司',
            legalPerson: '杨俊荣',
            establishDate: '2007-01-01',
            storeCount: '1场',
            riskScore: 72,
            contractNo: 'DGT-C-2023-00025',
            signDate: '2023-08-25',
            returns: [
                { period: '演出结算', revenue: '¥3,200万', share: '¥36.4万', status: 'paid', date: '2024-01-20' },
            ]
        },
        3: {
            name: '九寨沟景区提升',
            projectNo: 'DGT-INV-2024-0003',
            track: '旅游景区',
            status: '执行中',
            investAmount: '¥800万',
            shareRate: '10%',
            annualReturn: '10.8%',
            layer: '优先级',
            totalReturn: '¥86.4万',
            investDate: '2023-03-01',
            expireDate: '2025-03-01',
            remainingDays: '12个月',
            companyName: '九寨沟风景名胜区管理局',
            legalPerson: '王某某',
            establishDate: '1984-01-01',
            storeCount: '1处',
            riskScore: 88,
            contractNo: 'DGT-C-2023-00008',
            signDate: '2023-02-25',
            returns: [
                { period: '2024年1月', revenue: '¥1,200万', share: '¥12万', status: 'paid', date: '2024-02-05' },
                { period: '2023年12月', revenue: '¥1,500万', share: '¥15万', status: 'paid', date: '2024-01-05' },
                { period: '2023年11月', revenue: '¥980万', share: '¥9.8万', status: 'paid', date: '2023-12-05' },
            ]
        }
    };

    // 加载项目数据
    function loadProjectData() {
        const data = projectData[PROJECT_ID] || projectData[1];
        
        // 填充基本信息
        document.getElementById('project-name').textContent = data.name;
        document.getElementById('project-no').textContent = data.projectNo;
        document.getElementById('project-track').textContent = data.track;
        document.getElementById('project-status').textContent = data.status;
        document.getElementById('total-return').textContent = data.totalReturn;
        
        // 填充投资信息
        document.getElementById('invest-amount').textContent = data.investAmount;
        document.getElementById('share-rate').textContent = data.shareRate;
        document.getElementById('annual-return').textContent = data.annualReturn;
        document.getElementById('invest-layer').textContent = data.layer;
        document.getElementById('invest-date').textContent = data.investDate;
        document.getElementById('expire-date').textContent = data.expireDate;
        document.getElementById('remaining-days').textContent = data.remainingDays;
        
        // 填充融资方信息
        document.getElementById('company-name').textContent = data.companyName;
        document.getElementById('legal-person').textContent = data.legalPerson;
        document.getElementById('establish-date').textContent = data.establishDate;
        document.getElementById('store-count').textContent = data.storeCount;
        
        // 填充风控评分
        document.getElementById('risk-score').textContent = data.riskScore + '/100';
        renderRiskDimensions(data.riskScore);
        
        // 填充合同信息
        document.getElementById('contract-no').textContent = data.contractNo;
        document.getElementById('sign-date').textContent = data.signDate;
        
        // 渲染收益记录
        renderReturnTable(data.returns);
        
        // 渲染收益图表
        renderReturnChart(data.returns);
    }

    function renderRiskDimensions(score) {
        const dimensions = [
            { name: '经营稳定性', score: score + 2 },
            { name: '财务健康度', score: score - 5 },
            { name: '行业前景', score: score },
            { name: '管理能力', score: score - 3 }
        ];
        
        document.getElementById('risk-dimensions').innerHTML = dimensions.map(d => \`
            <div class="flex items-center">
                <span class="w-20 text-xs text-primary-500">\${d.name}</span>
                <div class="flex-1 h-1.5 bg-primary-100 rounded-full mx-2">
                    <div class="h-1.5 \${d.score >= 70 ? 'bg-success-500' : d.score >= 50 ? 'bg-warning-500' : 'bg-danger-500'} rounded-full" style="width: \${d.score}%"></div>
                </div>
                <span class="text-xs text-primary-600 font-medium w-6">\${d.score}</span>
            </div>
        \`).join('');
    }

    function renderReturnTable(returns) {
        document.getElementById('return-count').textContent = returns.length;
        document.getElementById('return-table').innerHTML = returns.map(r => \`
            <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                <td class="px-4 py-4 font-medium text-primary-900 text-sm">\${r.period}</td>
                <td class="px-4 py-4 text-primary-600 text-sm">\${r.revenue}</td>
                <td class="px-4 py-4 text-success-600 font-semibold text-sm">\${r.share}</td>
                <td class="px-4 py-4">
                    <span class="status-badge \${r.status === 'paid' ? 'status-completed' : 'status-pending'}">
                        \${r.status === 'paid' ? '已到账' : '待结算'}
                    </span>
                </td>
                <td class="px-4 py-4 text-primary-500 text-sm">\${r.date}</td>
            </tr>
        \`).join('');
    }

    function renderReturnChart(returns) {
        const reversedReturns = [...returns].reverse();
        new Chart(document.getElementById('return-chart'), {
            type: 'line',
            data: {
                labels: reversedReturns.map(r => r.period),
                datasets: [{
                    label: '分成金额(万)',
                    data: reversedReturns.map(r => parseFloat(r.share.replace('¥', '').replace('万', ''))),
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.3
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

    function downloadContract() {
        DGT.showToast('合同下载中...', 'info');
    }

    function contactFinancer() {
        DGT.showToast('消息功能开发中...', 'info');
    }

    function viewReports() {
        DGT.showToast('报告功能开发中...', 'info');
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    loadProjectData();
</script>
`)
