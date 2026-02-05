import { baseLayout } from '../layout'

export const renderInvestorPipeline = () => baseLayout('Pipeline评估', `
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
                    <a href="/investor/portfolio" class="text-white/70 hover:text-white">投资组合</a>
                    <a href="/investor/pipeline" class="text-white font-medium">Pipeline</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4">
        <!-- 赛道筛选 -->
        <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition border-2 border-indigo-500" onclick="selectTrack('chain_store')">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-store text-indigo-600"></i>
                    </div>
                    <div>
                        <div class="font-medium">连锁实体店</div>
                        <div class="text-sm text-gray-500">23个待投</div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition" onclick="selectTrack('event')">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-ticket-alt text-purple-600"></i>
                    </div>
                    <div>
                        <div class="font-medium">演唱会/商业活动</div>
                        <div class="text-sm text-gray-500">8个待投</div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition" onclick="selectTrack('tourism')">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-mountain text-green-600"></i>
                    </div>
                    <div>
                        <div class="font-medium">旅游景区</div>
                        <div class="text-sm text-gray-500">5个待投</div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition" onclick="selectTrack('service')">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-briefcase text-orange-600"></i>
                    </div>
                    <div>
                        <div class="font-medium">项目制非标服务</div>
                        <div class="text-sm text-gray-500">3个待投</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 赛道历史数据 -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="font-bold text-gray-800 mb-4">连锁实体店赛道历史数据</h3>
            <div class="grid grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-indigo-600">856</div>
                    <div class="text-sm text-gray-500">历史项目数</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-green-600">¥12.5亿</div>
                    <div class="text-sm text-gray-500">累计投资</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-purple-600">13.2%</div>
                    <div class="text-sm text-gray-500">平均收益率</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-orange-600">98.8%</div>
                    <div class="text-sm text-gray-500">按时兑付率</div>
                </div>
            </div>
        </div>

        <!-- Pipeline项目列表 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">待投资项目 Pipeline</h2>
                <div class="text-sm text-gray-500">共 23 个项目</div>
            </div>
            <div class="divide-y">
                <!-- 项目卡片 -->
                <div class="p-6 hover:bg-gray-50 cursor-pointer" onclick="openProjectDetail(1)">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center">
                                <h3 class="font-bold text-lg text-gray-800">瑞幸咖啡华东扩张计划</h3>
                                <span class="ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">低风险</span>
                            </div>
                            <div class="mt-2 text-sm text-gray-600">
                                计划在华东地区新开50家门店，预计月均营收增长30%
                            </div>
                            <div class="mt-3 flex items-center space-x-6 text-sm">
                                <span><i class="fas fa-money-bill text-gray-400 mr-1"></i>融资: ¥500-800万</span>
                                <span><i class="fas fa-percent text-gray-400 mr-1"></i>分成: 8-12%</span>
                                <span><i class="fas fa-chart-line text-gray-400 mr-1"></i>AI评分: 82</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-500 mb-2">可投层级</div>
                            <div class="space-x-2">
                                <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">优先级</span>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">夹层</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="p-6 hover:bg-gray-50 cursor-pointer" onclick="openProjectDetail(2)">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center">
                                <h3 class="font-bold text-lg text-gray-800">喜茶西南区域拓展</h3>
                                <span class="ml-3 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">中风险</span>
                            </div>
                            <div class="mt-2 text-sm text-gray-600">
                                西南市场首批20家旗舰店开设计划
                            </div>
                            <div class="mt-3 flex items-center space-x-6 text-sm">
                                <span><i class="fas fa-money-bill text-gray-400 mr-1"></i>融资: ¥300-500万</span>
                                <span><i class="fas fa-percent text-gray-400 mr-1"></i>分成: 10-15%</span>
                                <span><i class="fas fa-chart-line text-gray-400 mr-1"></i>AI评分: 75</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-500 mb-2">可投层级</div>
                            <div class="space-x-2">
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">夹层</span>
                                <span class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">劣后级</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 项目详情弹窗 -->
    <div id="project-modal" class="fixed inset-0 bg-black/50 hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 class="text-xl font-bold text-gray-800">AI智能体评估详情</h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="p-6 overflow-y-auto" style="max-height: calc(90vh - 180px);">
                <!-- 5大智能体评估详情 -->
                <div class="space-y-6">
                    <!-- 方案智能体 -->
                    <div class="border rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-blue-50 flex items-center">
                            <i class="fas fa-calculator text-blue-600 mr-2"></i>
                            <span class="font-medium">方案智能体评估</span>
                        </div>
                        <div class="p-4 grid grid-cols-2 gap-4">
                            <div><span class="text-gray-500">融资金额:</span> <span class="font-medium">¥500-800万</span></div>
                            <div><span class="text-gray-500">分成比例:</span> <span class="font-medium">8-12%</span></div>
                            <div><span class="text-gray-500">资金成本:</span> <span class="font-medium">10-15%</span></div>
                            <div><span class="text-gray-500">置信度:</span> <span class="font-medium text-blue-600">82%</span></div>
                        </div>
                    </div>
                    
                    <!-- 法律智能体 -->
                    <div class="border rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-purple-50 flex items-center">
                            <i class="fas fa-file-contract text-purple-600 mr-2"></i>
                            <span class="font-medium">法律智能体评估</span>
                        </div>
                        <div class="p-4">
                            <div class="mb-2"><span class="text-gray-500">适用模板:</span> <span class="font-medium">连锁实体店收入分成协议v2.0</span></div>
                            <div class="mb-2"><span class="text-gray-500">条款完备度:</span> <span class="font-medium text-purple-600">95%</span></div>
                            <div class="text-sm text-gray-600">核心条款: 分成计算、支付周期、违约责任、提前终止</div>
                        </div>
                    </div>
                    
                    <!-- 风控智能体 -->
                    <div class="border rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-red-50 flex items-center">
                            <i class="fas fa-shield-alt text-red-600 mr-2"></i>
                            <span class="font-medium">风控智能体评估</span>
                        </div>
                        <div class="p-4">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-gray-500">综合风控评分</span>
                                <span class="text-2xl font-bold text-green-600">82/100</span>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center"><span class="w-24 text-sm">经营稳定性</span><div class="flex-1 h-2 bg-gray-200 rounded mx-2"><div class="h-2 bg-green-500 rounded" style="width:85%"></div></div><span class="text-sm">85</span></div>
                                <div class="flex items-center"><span class="w-24 text-sm">财务健康度</span><div class="flex-1 h-2 bg-gray-200 rounded mx-2"><div class="h-2 bg-green-500 rounded" style="width:78%"></div></div><span class="text-sm">78</span></div>
                                <div class="flex items-center"><span class="w-24 text-sm">行业前景</span><div class="flex-1 h-2 bg-gray-200 rounded mx-2"><div class="h-2 bg-green-500 rounded" style="width:82%"></div></div><span class="text-sm">82</span></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 财务智能体 -->
                    <div class="border rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-green-50 flex items-center">
                            <i class="fas fa-university text-green-600 mr-2"></i>
                            <span class="font-medium">财务智能体评估</span>
                        </div>
                        <div class="p-4 grid grid-cols-2 gap-4">
                            <div><span class="text-gray-500">账户类型:</span> <span class="font-medium">共管账户</span></div>
                            <div><span class="text-gray-500">结算周期:</span> <span class="font-medium">T+1</span></div>
                            <div><span class="text-gray-500">分账规则:</span> <span class="font-medium">日收入×分成比例</span></div>
                            <div><span class="text-gray-500">监管要求:</span> <span class="font-medium">符合</span></div>
                        </div>
                    </div>
                    
                    <!-- 利益智能体 -->
                    <div class="border rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-yellow-50 flex items-center">
                            <i class="fas fa-handshake text-yellow-600 mr-2"></i>
                            <span class="font-medium">利益一致性评估</span>
                        </div>
                        <div class="p-4">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-gray-500">利益绑定评分</span>
                                <span class="text-2xl font-bold text-yellow-600">78/100</span>
                            </div>
                            <div class="text-sm text-gray-600">
                                投融资双方利益高度一致，分成比例合理，激励机制有效
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-6 border-t bg-gray-50 flex justify-between">
                <button onclick="closeModal()" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                    取消
                </button>
                <div class="space-x-3">
                    <select class="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>选择投资层级</option>
                        <option>优先级 (预期8-10%)</option>
                        <option>夹层 (预期12-15%)</option>
                    </select>
                    <input type="number" placeholder="投资金额(万)" class="px-4 py-2 border border-gray-300 rounded-lg w-32">
                    <button class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                        预约投资
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`, `
<script>
    function selectTrack(track) {
        // 切换赛道选中状态
        document.querySelectorAll('.grid > div').forEach(el => {
            el.classList.remove('border-2', 'border-indigo-500');
        });
        event.currentTarget.classList.add('border-2', 'border-indigo-500');
    }

    function openProjectDetail(id) {
        document.getElementById('project-modal').classList.remove('hidden');
    }

    function closeModal() {
        document.getElementById('project-modal').classList.add('hidden');
    }
</script>
`)
