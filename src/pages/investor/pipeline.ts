import { baseLayout } from '../layout'

export const renderInvestorPipeline = () => baseLayout('Pipeline评估', `
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
                    <a href="/investor/pipeline" class="text-white text-sm font-medium">Pipeline</a>
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
        <!-- 赛道筛选 -->
        <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-2xl border-2 border-primary-900 p-4 cursor-pointer hover:shadow-lg transition" onclick="selectTrack('chain_store', this)">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center mr-3">
                        <i class="fas fa-store text-white"></i>
                    </div>
                    <div>
                        <div class="font-medium text-primary-900">连锁实体店</div>
                        <div class="text-sm text-primary-500">23个待投</div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl border border-primary-100 p-4 cursor-pointer hover:shadow-lg hover:border-primary-300 transition" onclick="selectTrack('event', this)">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                        <i class="fas fa-ticket-alt text-primary-600"></i>
                    </div>
                    <div>
                        <div class="font-medium text-primary-900">演唱会/商业活动</div>
                        <div class="text-sm text-primary-500">8个待投</div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl border border-primary-100 p-4 cursor-pointer hover:shadow-lg hover:border-primary-300 transition" onclick="selectTrack('tourism', this)">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                        <i class="fas fa-mountain text-primary-600"></i>
                    </div>
                    <div>
                        <div class="font-medium text-primary-900">旅游景区</div>
                        <div class="text-sm text-primary-500">5个待投</div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl border border-primary-100 p-4 cursor-pointer hover:shadow-lg hover:border-primary-300 transition" onclick="selectTrack('service', this)">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                        <i class="fas fa-briefcase text-primary-600"></i>
                    </div>
                    <div>
                        <div class="font-medium text-primary-900">项目制非标服务</div>
                        <div class="text-sm text-primary-500">3个待投</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 赛道历史数据 -->
        <div class="bg-white rounded-2xl border border-primary-100 p-6 mb-6">
            <h3 class="font-semibold text-primary-900 mb-4 text-sm">连锁实体店赛道历史数据</h3>
            <div class="grid grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-semibold text-primary-900">856</div>
                    <div class="text-sm text-primary-500 mt-1">历史项目数</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-semibold text-success-600">¥12.5亿</div>
                    <div class="text-sm text-primary-500 mt-1">累计投资</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-semibold text-accent-600">13.2%</div>
                    <div class="text-sm text-primary-500 mt-1">平均收益率</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-semibold text-warning-500">98.8%</div>
                    <div class="text-sm text-primary-500 mt-1">按时兑付率</div>
                </div>
            </div>
        </div>

        <!-- Pipeline项目列表 -->
        <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
            <div class="p-6 border-b border-primary-100 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-primary-900">待投资项目 Pipeline</h2>
                <div class="text-sm text-primary-500">共 23 个项目</div>
            </div>
            <div class="divide-y divide-primary-50">
                <!-- 项目卡片 -->
                <div class="p-6 hover:bg-primary-50 cursor-pointer transition" onclick="openProjectDetail(1)">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center">
                                <h3 class="font-semibold text-lg text-primary-900">瑞幸咖啡华东扩张计划</h3>
                                <span class="ml-3 px-2.5 py-1 bg-success-50 text-success-600 text-xs font-medium rounded-lg">低风险</span>
                            </div>
                            <div class="mt-2 text-sm text-primary-500">
                                计划在华东地区新开50家门店，预计月均营收增长30%
                            </div>
                            <div class="mt-3 flex items-center space-x-6 text-sm">
                                <span class="text-primary-600"><i class="fas fa-money-bill text-primary-400 mr-1"></i>融资: ¥500-800万</span>
                                <span class="text-primary-600"><i class="fas fa-percent text-primary-400 mr-1"></i>分成: 8-12%</span>
                                <span class="text-primary-600"><i class="fas fa-chart-line text-primary-400 mr-1"></i>AI评分: 82</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-primary-500 mb-2">可投层级</div>
                            <div class="space-x-2">
                                <span class="px-2 py-1 bg-success-50 text-success-600 text-xs font-medium rounded-lg">优先级</span>
                                <span class="px-2 py-1 bg-warning-50 text-warning-500 text-xs font-medium rounded-lg">夹层</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="p-6 hover:bg-primary-50 cursor-pointer transition" onclick="openProjectDetail(2)">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center">
                                <h3 class="font-semibold text-lg text-primary-900">喜茶西南区域拓展</h3>
                                <span class="ml-3 px-2.5 py-1 bg-warning-50 text-warning-500 text-xs font-medium rounded-lg">中风险</span>
                            </div>
                            <div class="mt-2 text-sm text-primary-500">
                                西南市场首批20家旗舰店开设计划
                            </div>
                            <div class="mt-3 flex items-center space-x-6 text-sm">
                                <span class="text-primary-600"><i class="fas fa-money-bill text-primary-400 mr-1"></i>融资: ¥300-500万</span>
                                <span class="text-primary-600"><i class="fas fa-percent text-primary-400 mr-1"></i>分成: 10-15%</span>
                                <span class="text-primary-600"><i class="fas fa-chart-line text-primary-400 mr-1"></i>AI评分: 75</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-primary-500 mb-2">可投层级</div>
                            <div class="space-x-2">
                                <span class="px-2 py-1 bg-warning-50 text-warning-500 text-xs font-medium rounded-lg">夹层</span>
                                <span class="px-2 py-1 bg-danger-50 text-danger-500 text-xs font-medium rounded-lg">劣后级</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-6 hover:bg-primary-50 cursor-pointer transition" onclick="openProjectDetail(3)">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center">
                                <h3 class="font-semibold text-lg text-primary-900">蜜雪冰城北方区扩张</h3>
                                <span class="ml-3 px-2.5 py-1 bg-success-50 text-success-600 text-xs font-medium rounded-lg">低风险</span>
                            </div>
                            <div class="mt-2 text-sm text-primary-500">
                                北方市场100家新店开设计划
                            </div>
                            <div class="mt-3 flex items-center space-x-6 text-sm">
                                <span class="text-primary-600"><i class="fas fa-money-bill text-primary-400 mr-1"></i>融资: ¥800-1200万</span>
                                <span class="text-primary-600"><i class="fas fa-percent text-primary-400 mr-1"></i>分成: 6-10%</span>
                                <span class="text-primary-600"><i class="fas fa-chart-line text-primary-400 mr-1"></i>AI评分: 88</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-primary-500 mb-2">可投层级</div>
                            <div class="space-x-2">
                                <span class="px-2 py-1 bg-success-50 text-success-600 text-xs font-medium rounded-lg">优先级</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 项目详情弹窗 -->
    <div id="project-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div class="p-5 border-b border-primary-100 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-primary-900">AI智能体评估详情</h2>
                <button onclick="closeModal()" class="w-8 h-8 rounded-lg bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-700 transition flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6 overflow-y-auto" style="max-height: calc(90vh - 180px);">
                <!-- 5大智能体评估详情 -->
                <div class="space-y-4">
                    <!-- 方案智能体 -->
                    <div class="border border-primary-100 rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-accent-50 flex items-center">
                            <i class="fas fa-calculator text-accent-600 mr-2"></i>
                            <span class="font-medium text-primary-900">方案智能体评估</span>
                        </div>
                        <div class="p-4 grid grid-cols-2 gap-4 text-sm">
                            <div><span class="text-primary-500">融资金额:</span> <span class="font-medium text-primary-900">¥500-800万</span></div>
                            <div><span class="text-primary-500">分成比例:</span> <span class="font-medium text-primary-900">8-12%</span></div>
                            <div><span class="text-primary-500">资金成本:</span> <span class="font-medium text-primary-900">10-15%</span></div>
                            <div><span class="text-primary-500">置信度:</span> <span class="font-medium text-accent-600">82%</span></div>
                        </div>
                    </div>
                    
                    <!-- 法律智能体 -->
                    <div class="border border-primary-100 rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-purple-50 flex items-center">
                            <i class="fas fa-file-contract text-purple-600 mr-2"></i>
                            <span class="font-medium text-primary-900">法律智能体评估</span>
                        </div>
                        <div class="p-4 text-sm">
                            <div class="mb-2"><span class="text-primary-500">适用模板:</span> <span class="font-medium text-primary-900">连锁实体店收入分成协议v2.0</span></div>
                            <div class="mb-2"><span class="text-primary-500">条款完备度:</span> <span class="font-medium text-purple-600">95%</span></div>
                            <div class="text-primary-500">核心条款: 分成计算、支付周期、违约责任、提前终止</div>
                        </div>
                    </div>
                    
                    <!-- 风控智能体 -->
                    <div class="border border-primary-100 rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-danger-50 flex items-center">
                            <i class="fas fa-shield-alt text-danger-600 mr-2"></i>
                            <span class="font-medium text-primary-900">风控智能体评估</span>
                        </div>
                        <div class="p-4">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-primary-500 text-sm">综合风控评分</span>
                                <span class="text-2xl font-semibold text-success-600">82/100</span>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center"><span class="w-24 text-xs text-primary-500">经营稳定性</span><div class="flex-1 h-1.5 bg-primary-100 rounded mx-2"><div class="h-1.5 bg-success-500 rounded" style="width:85%"></div></div><span class="text-xs text-primary-600 font-medium">85</span></div>
                                <div class="flex items-center"><span class="w-24 text-xs text-primary-500">财务健康度</span><div class="flex-1 h-1.5 bg-primary-100 rounded mx-2"><div class="h-1.5 bg-success-500 rounded" style="width:78%"></div></div><span class="text-xs text-primary-600 font-medium">78</span></div>
                                <div class="flex items-center"><span class="w-24 text-xs text-primary-500">行业前景</span><div class="flex-1 h-1.5 bg-primary-100 rounded mx-2"><div class="h-1.5 bg-success-500 rounded" style="width:82%"></div></div><span class="text-xs text-primary-600 font-medium">82</span></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 财务智能体 -->
                    <div class="border border-primary-100 rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-success-50 flex items-center">
                            <i class="fas fa-university text-success-600 mr-2"></i>
                            <span class="font-medium text-primary-900">财务智能体评估</span>
                        </div>
                        <div class="p-4 grid grid-cols-2 gap-4 text-sm">
                            <div><span class="text-primary-500">账户类型:</span> <span class="font-medium text-primary-900">共管账户</span></div>
                            <div><span class="text-primary-500">结算周期:</span> <span class="font-medium text-primary-900">T+1</span></div>
                            <div><span class="text-primary-500">分账规则:</span> <span class="font-medium text-primary-900">日收入×分成比例</span></div>
                            <div><span class="text-primary-500">监管要求:</span> <span class="font-medium text-success-600">符合</span></div>
                        </div>
                    </div>
                    
                    <!-- 利益智能体 -->
                    <div class="border border-primary-100 rounded-xl overflow-hidden">
                        <div class="px-4 py-3 bg-warning-50 flex items-center">
                            <i class="fas fa-handshake text-warning-600 mr-2"></i>
                            <span class="font-medium text-primary-900">利益一致性评估</span>
                        </div>
                        <div class="p-4">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-primary-500 text-sm">利益绑定评分</span>
                                <span class="text-2xl font-semibold text-warning-600">78/100</span>
                            </div>
                            <div class="text-sm text-primary-500">
                                投融资双方利益高度一致，分成比例合理，激励机制有效
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-5 border-t border-primary-100 flex justify-between items-center">
                <button onclick="closeModal()" class="px-5 py-2 border border-primary-200 rounded-xl text-sm text-primary-600 font-medium hover:bg-primary-50 transition">
                    取消
                </button>
                <div class="flex items-center space-x-3">
                    <select class="px-4 py-2 border border-primary-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900">
                        <option>选择投资层级</option>
                        <option>优先级 (预期8-10%)</option>
                        <option>夹层 (预期12-15%)</option>
                    </select>
                    <input type="number" placeholder="投资金额(万)" class="px-4 py-2 border border-primary-200 rounded-xl text-sm w-32 focus:ring-2 focus:ring-primary-900 focus:border-primary-900">
                    <button onclick="bookInvestment()" class="px-5 py-2 bg-primary-900 text-white rounded-xl text-sm font-medium hover:bg-primary-800 transition">
                        预约投资
                    </button>
                </div>
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

    function selectTrack(track, el) {
        // 切换赛道选中状态
        document.querySelectorAll('.grid > div').forEach(div => {
            div.classList.remove('border-2', 'border-primary-900');
            div.classList.add('border', 'border-primary-100');
            div.querySelector('.w-10').classList.remove('bg-primary-900');
            div.querySelector('.w-10').classList.add('bg-primary-100');
            div.querySelector('.w-10 i').classList.remove('text-white');
            div.querySelector('.w-10 i').classList.add('text-primary-600');
        });
        el.classList.remove('border', 'border-primary-100');
        el.classList.add('border-2', 'border-primary-900');
        el.querySelector('.w-10').classList.remove('bg-primary-100');
        el.querySelector('.w-10').classList.add('bg-primary-900');
        el.querySelector('.w-10 i').classList.remove('text-primary-600');
        el.querySelector('.w-10 i').classList.add('text-white');
    }

    function openProjectDetail(id) {
        document.getElementById('project-modal').classList.remove('hidden');
    }

    function closeModal() {
        document.getElementById('project-modal').classList.add('hidden');
    }

    function bookInvestment() {
        DGT.showToast('预约成功！我们将尽快联系您', 'success');
        closeModal();
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }
</script>
`)
