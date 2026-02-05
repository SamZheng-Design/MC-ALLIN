import { baseLayout } from '../layout'

export const renderInvestorPortfolio = () => baseLayout('投资组合', `
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
                    <a href="/investor/portfolio" class="text-white text-sm font-medium">投资组合</a>
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
        <!-- 组合统计 -->
        <div class="grid grid-cols-4 gap-5 mb-8">
            <div class="bg-white rounded-2xl border border-primary-100 p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-xs text-primary-400 font-medium uppercase tracking-wide">累计投资</div>
                        <div class="text-3xl font-semibold text-primary-900 mt-2">¥1,800<span class="text-lg text-primary-400 ml-1">万</span></div>
                    </div>
                    <div class="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center">
                        <i class="fas fa-coins text-white text-sm"></i>
                    </div>
                </div>
                <div class="mt-4 text-xs text-primary-500 font-medium">共 8 个项目</div>
            </div>
            <div class="bg-white rounded-2xl border border-primary-100 p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-xs text-primary-400 font-medium uppercase tracking-wide">累计收益</div>
                        <div class="text-3xl font-semibold text-success-600 mt-2">¥216.8<span class="text-lg text-primary-400 ml-1">万</span></div>
                    </div>
                    <div class="w-10 h-10 bg-success-500 rounded-xl flex items-center justify-center">
                        <i class="fas fa-chart-line text-white text-sm"></i>
                    </div>
                </div>
                <div class="mt-4 text-xs text-success-600 font-medium">年化 12.04%</div>
            </div>
            <div class="bg-white rounded-2xl border border-primary-100 p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-xs text-primary-400 font-medium uppercase tracking-wide">待兑付</div>
                        <div class="text-3xl font-semibold text-warning-500 mt-2">¥45.2<span class="text-lg text-primary-400 ml-1">万</span></div>
                    </div>
                    <div class="w-10 h-10 bg-warning-500 rounded-xl flex items-center justify-center">
                        <i class="fas fa-clock text-white text-sm"></i>
                    </div>
                </div>
                <div class="mt-4 text-xs text-primary-500 font-medium">下期 03/15</div>
            </div>
            <div class="bg-white rounded-2xl border border-primary-100 p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-xs text-primary-400 font-medium uppercase tracking-wide">在投本金</div>
                        <div class="text-3xl font-semibold text-accent-600 mt-2">¥1,200<span class="text-lg text-primary-400 ml-1">万</span></div>
                    </div>
                    <div class="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center">
                        <i class="fas fa-wallet text-white text-sm"></i>
                    </div>
                </div>
                <div class="mt-4 text-xs text-primary-500 font-medium">6 个执行中</div>
            </div>
        </div>

        <!-- 项目列表 -->
        <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
            <div class="p-6 border-b border-primary-100">
                <h2 class="text-lg font-semibold text-primary-900">投资项目明细</h2>
            </div>
            <div class="p-4">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-primary-100">
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">项目名称</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">投资金额</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">已收分成</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">年化收益</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">剩余期限</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">状态</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wide">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                            <td class="px-4 py-4 font-medium text-primary-900 text-sm">奈雪的茶华南区</td>
                            <td class="px-4 py-4 text-primary-600 text-sm">¥500万</td>
                            <td class="px-4 py-4 text-success-600 text-sm font-medium">¥62.5万</td>
                            <td class="px-4 py-4 text-success-600 font-semibold text-sm">12.5%</td>
                            <td class="px-4 py-4 text-primary-500 text-sm">18个月</td>
                            <td class="px-4 py-4"><span class="status-badge status-active">执行中</span></td>
                            <td class="px-4 py-4">
                                <a href="/investor/project/1" class="text-primary-600 hover:text-primary-900 text-sm font-medium transition">查看详情</a>
                            </td>
                        </tr>
                        <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                            <td class="px-4 py-4 font-medium text-primary-900 text-sm">周杰伦巡演深圳站</td>
                            <td class="px-4 py-4 text-primary-600 text-sm">¥200万</td>
                            <td class="px-4 py-4 text-success-600 text-sm font-medium">¥36.4万</td>
                            <td class="px-4 py-4 text-success-600 font-semibold text-sm">18.2%</td>
                            <td class="px-4 py-4 text-primary-500 text-sm">--</td>
                            <td class="px-4 py-4"><span class="status-badge status-completed">已完成</span></td>
                            <td class="px-4 py-4">
                                <a href="/investor/project/2" class="text-primary-600 hover:text-primary-900 text-sm font-medium transition">查看详情</a>
                            </td>
                        </tr>
                        <tr class="border-b border-primary-50 hover:bg-primary-50 transition">
                            <td class="px-4 py-4 font-medium text-primary-900 text-sm">九寨沟景区提升</td>
                            <td class="px-4 py-4 text-primary-600 text-sm">¥800万</td>
                            <td class="px-4 py-4 text-success-600 text-sm font-medium">¥86.4万</td>
                            <td class="px-4 py-4 text-success-600 font-semibold text-sm">10.8%</td>
                            <td class="px-4 py-4 text-primary-500 text-sm">12个月</td>
                            <td class="px-4 py-4"><span class="status-badge status-active">执行中</span></td>
                            <td class="px-4 py-4">
                                <a href="/investor/project/3" class="text-primary-600 hover:text-primary-900 text-sm font-medium transition">查看详情</a>
                            </td>
                        </tr>
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

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }
</script>
`)
