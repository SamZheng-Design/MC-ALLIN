import { baseLayout } from '../layout'

export const renderInvestorPortfolio = () => baseLayout('投资组合', `
<div class="min-h-screen bg-gray-100">
    <nav class="gradient-bg shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <i class="fas fa-tint text-white text-xl mr-2"></i>
                    <span class="text-white font-bold">滴灌通</span>
                    <span class="ml-4 text-white/80">投资者门户</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/investor/market-overview" class="text-white/70 hover:text-white">市场总览</a>
                    <a href="/investor/portfolio" class="text-white font-medium">投资组合</a>
                    <a href="/investor/pipeline" class="text-white/70 hover:text-white">Pipeline</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4">
        <!-- 组合统计 -->
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div class="text-sm opacity-80">累计投资</div>
                <div class="text-3xl font-bold mt-1">¥1,800万</div>
                <div class="mt-2 text-sm opacity-80">共 8 个项目</div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                <div class="text-sm opacity-80">累计收益</div>
                <div class="text-3xl font-bold mt-1">¥216.8万</div>
                <div class="mt-2 text-sm opacity-80">年化 12.04%</div>
            </div>
            <div class="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
                <div class="text-sm opacity-80">待兑付</div>
                <div class="text-3xl font-bold mt-1">¥45.2万</div>
                <div class="mt-2 text-sm opacity-80">下期 03/15</div>
            </div>
            <div class="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
                <div class="text-sm opacity-80">在投本金</div>
                <div class="text-3xl font-bold mt-1">¥1,200万</div>
                <div class="mt-2 text-sm opacity-80">6 个执行中</div>
            </div>
        </div>

        <!-- 项目列表 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-6 border-b">
                <h2 class="text-xl font-bold text-gray-800">投资项目明细</h2>
            </div>
            <div class="p-4">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">项目名称</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">投资金额</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">已收分成</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">年化收益</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">剩余期限</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-t hover:bg-gray-50">
                            <td class="px-4 py-4 font-medium">奈雪的茶华南区</td>
                            <td class="px-4 py-4">¥500万</td>
                            <td class="px-4 py-4 text-green-600">¥62.5万</td>
                            <td class="px-4 py-4 text-green-600 font-medium">12.5%</td>
                            <td class="px-4 py-4">18个月</td>
                            <td class="px-4 py-4"><span class="status-badge status-active">执行中</span></td>
                        </tr>
                        <tr class="border-t hover:bg-gray-50">
                            <td class="px-4 py-4 font-medium">周杰伦巡演深圳站</td>
                            <td class="px-4 py-4">¥200万</td>
                            <td class="px-4 py-4 text-green-600">¥36.4万</td>
                            <td class="px-4 py-4 text-green-600 font-medium">18.2%</td>
                            <td class="px-4 py-4">--</td>
                            <td class="px-4 py-4"><span class="status-badge status-signed">已完成</span></td>
                        </tr>
                        <tr class="border-t hover:bg-gray-50">
                            <td class="px-4 py-4 font-medium">九寨沟景区提升</td>
                            <td class="px-4 py-4">¥800万</td>
                            <td class="px-4 py-4 text-green-600">¥86.4万</td>
                            <td class="px-4 py-4 text-green-600 font-medium">10.8%</td>
                            <td class="px-4 py-4">12个月</td>
                            <td class="px-4 py-4"><span class="status-badge status-active">执行中</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`)
