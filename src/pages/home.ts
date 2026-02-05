import { baseLayout } from './layout'

export const renderHomePage = () => baseLayout('首页', `
<div class="min-h-screen bg-primary-50">
    <!-- 顶部导航 - 简约透明风格 -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <a href="/" class="flex items-center group">
                        <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                            <span class="text-primary-900 font-bold text-sm">DG</span>
                        </div>
                        <span class="text-white logo-text text-lg">滴灌通</span>
                    </a>
                </div>
                <div class="flex items-center space-x-3">
                    <a href="/auth/login" class="text-white/80 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                        登录
                    </a>
                    <a href="/auth/login?tab=register" class="bg-white text-primary-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-100 transition">
                        开始使用
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero区域 - 深色极简风格 -->
    <section class="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <!-- 标签 -->
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <span class="w-2 h-2 bg-success-400 rounded-full mr-2 animate-pulse"></span>
                <span class="text-white/60 text-sm">AI 智能体已就绪</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight leading-tight">
                收入分成投资<br>
                <span class="text-gradient">智能化平台</span>
            </h1>
            <p class="text-lg text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
                基于五大 AI 智能体实时协同，为融资方提供精准方案，为投资者提供透明的投资机会
            </p>
            <div class="flex justify-center space-x-4">
                <a href="/auth/login?role=financer" 
                   class="bg-white text-primary-900 px-6 py-3 rounded-xl font-medium hover:bg-primary-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <i class="fas fa-building mr-2"></i>我要融资
                </a>
                <a href="/auth/login?role=investor" 
                   class="bg-white/5 text-white px-6 py-3 rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-all">
                    <i class="fas fa-chart-line mr-2"></i>我要投资
                </a>
            </div>
        </div>
        
        <!-- 装饰性发光 -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>

    <!-- 核心特性 - 极简卡片风格 -->
    <section class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-14">
                <h2 class="text-3xl font-semibold text-primary-900 mb-4 tracking-tight">五大 AI 智能体</h2>
                <p class="text-primary-500">实时协同，智能决策</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                <a href="/staff/invest_scheme/agent-console" class="text-center p-6 rounded-2xl bg-primary-50 card-hover border border-primary-100 block cursor-pointer group">
                    <div class="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-600 transition-colors">
                        <i class="fas fa-calculator text-white text-lg"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 text-sm group-hover:text-accent-600 transition-colors">方案智能体</h3>
                    <p class="text-xs text-primary-500 leading-relaxed">实时计算融资金额与分成比例</p>
                </a>
                <a href="/staff/legal/agent-console" class="text-center p-6 rounded-2xl bg-primary-50 card-hover border border-primary-100 block cursor-pointer group">
                    <div class="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                        <i class="fas fa-file-contract text-white text-lg"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 text-sm group-hover:text-purple-600 transition-colors">法律智能体</h3>
                    <p class="text-xs text-primary-500 leading-relaxed">自动生成合同与法律条款</p>
                </a>
                <a href="/staff/risk/agent-console" class="text-center p-6 rounded-2xl bg-primary-50 card-hover border border-primary-100 block cursor-pointer group">
                    <div class="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-danger-500 transition-colors">
                        <i class="fas fa-shield-alt text-white text-lg"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 text-sm group-hover:text-danger-500 transition-colors">风控智能体</h3>
                    <p class="text-xs text-primary-500 leading-relaxed">多维度风险评估与校验</p>
                </a>
                <a href="/staff/finance/agent-console" class="text-center p-6 rounded-2xl bg-primary-50 card-hover border border-primary-100 block cursor-pointer group">
                    <div class="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-success-600 transition-colors">
                        <i class="fas fa-university text-white text-lg"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 text-sm group-hover:text-success-600 transition-colors">财务智能体</h3>
                    <p class="text-xs text-primary-500 leading-relaxed">账户架构与分账规则配置</p>
                </a>
                <a href="/staff/interest/agent-console" class="text-center p-6 rounded-2xl bg-primary-50 card-hover border border-primary-100 block cursor-pointer group">
                    <div class="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-warning-500 transition-colors">
                        <i class="fas fa-handshake text-white text-lg"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 text-sm group-hover:text-warning-500 transition-colors">利益智能体</h3>
                    <p class="text-xs text-primary-500 leading-relaxed">利益绑定评估与激励优化</p>
                </a>
            </div>
        </div>
    </section>

    <!-- 赛道介绍 - 简洁卡片 -->
    <section class="py-20 bg-primary-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-14">
                <h2 class="text-3xl font-semibold text-primary-900 mb-4 tracking-tight">支持的融资赛道</h2>
                <p class="text-primary-500">多元化场景覆盖</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <a href="/financer/report/1" class="bg-white rounded-2xl p-6 card-hover border border-primary-100 block group cursor-pointer">
                    <div class="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-600 transition-colors">
                        <i class="fas fa-store text-white"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">连锁实体店</h3>
                    <p class="text-sm text-primary-500 mb-4 leading-relaxed">连锁零售、餐饮、服务门店等实体场景</p>
                    <div class="pt-4 border-t border-primary-100 flex justify-between items-center">
                        <div>
                            <span class="text-2xl font-semibold text-primary-900">¥12.5</span>
                            <span class="text-primary-400 text-sm ml-1">亿</span>
                        </div>
                        <span class="text-xs text-accent-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">立即申报 →</span>
                    </div>
                </a>
                <a href="/financer/report/2" class="bg-white rounded-2xl p-6 card-hover border border-primary-100 block group cursor-pointer">
                    <div class="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                        <i class="fas fa-ticket-alt text-white"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 group-hover:text-purple-600 transition-colors">商业活动</h3>
                    <p class="text-sm text-primary-500 mb-4 leading-relaxed">演唱会、展览、商业活动等项目制场景</p>
                    <div class="pt-4 border-t border-primary-100 flex justify-between items-center">
                        <div>
                            <span class="text-2xl font-semibold text-primary-900">¥5.8</span>
                            <span class="text-primary-400 text-sm ml-1">亿</span>
                        </div>
                        <span class="text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">立即申报 →</span>
                    </div>
                </a>
                <a href="/financer/report/3" class="bg-white rounded-2xl p-6 card-hover border border-primary-100 block group cursor-pointer">
                    <div class="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success-600 transition-colors">
                        <i class="fas fa-mountain text-white"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 group-hover:text-success-600 transition-colors">旅游景区</h3>
                    <p class="text-sm text-primary-500 mb-4 leading-relaxed">旅游景区、度假村、主题公园等文旅场景</p>
                    <div class="pt-4 border-t border-primary-100 flex justify-between items-center">
                        <div>
                            <span class="text-2xl font-semibold text-primary-900">¥8.2</span>
                            <span class="text-primary-400 text-sm ml-1">亿</span>
                        </div>
                        <span class="text-xs text-success-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">立即申报 →</span>
                    </div>
                </a>
                <a href="/financer/report/4" class="bg-white rounded-2xl p-6 card-hover border border-primary-100 block group cursor-pointer">
                    <div class="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-warning-500 transition-colors">
                        <i class="fas fa-briefcase text-white"></i>
                    </div>
                    <h3 class="font-semibold text-primary-900 mb-2 group-hover:text-warning-500 transition-colors">项目制服务</h3>
                    <p class="text-sm text-primary-500 mb-4 leading-relaxed">咨询、设计、IT服务等项目制服务场景</p>
                    <div class="pt-4 border-t border-primary-100 flex justify-between items-center">
                        <div>
                            <span class="text-2xl font-semibold text-primary-900">¥3.1</span>
                            <span class="text-primary-400 text-sm ml-1">亿</span>
                        </div>
                        <span class="text-xs text-warning-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">立即申报 →</span>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- 数据统计 - 极简数字展示 -->
    <section class="py-20 bg-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="text-4xl font-semibold text-primary-900 mb-2 tracking-tight">¥29.6<span class="text-lg text-primary-400 ml-1">亿</span></div>
                    <div class="text-sm text-primary-500">累计投资规模</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-semibold text-primary-900 mb-2 tracking-tight">1,280<span class="text-lg text-primary-400 ml-1">+</span></div>
                    <div class="text-sm text-primary-500">服务企业数</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-semibold text-primary-900 mb-2 tracking-tight">98.5<span class="text-lg text-primary-400 ml-1">%</span></div>
                    <div class="text-sm text-primary-500">按时兑付率</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-semibold text-primary-900 mb-2 tracking-tight">12.8<span class="text-lg text-primary-400 ml-1">%</span></div>
                    <div class="text-sm text-primary-500">平均年化收益</div>
                </div>
            </div>
        </div>
    </section>

    <!-- 页脚 - 极简黑色 -->
    <footer class="bg-primary-950 text-white py-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                            <span class="text-primary-900 font-bold text-sm">DG</span>
                        </div>
                        <span class="logo-text text-lg">滴灌通</span>
                    </div>
                    <p class="text-primary-400 text-sm leading-relaxed">
                        AI 智能体驱动的收入分成投资平台，让每一笔投资都有迹可循
                    </p>
                </div>
                <div>
                    <h4 class="font-medium mb-4 text-sm">融资服务</h4>
                    <ul class="space-y-2 text-primary-400 text-sm">
                        <li><a href="/auth/login?role=financer&track=chain_store" class="hover:text-white transition">连锁实体店融资</a></li>
                        <li><a href="/auth/login?role=financer&track=commercial_event" class="hover:text-white transition">商业活动融资</a></li>
                        <li><a href="/auth/login?role=financer&track=tourism" class="hover:text-white transition">文旅项目融资</a></li>
                        <li><a href="/auth/login?role=financer&track=project_service" class="hover:text-white transition">项目制服务融资</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-medium mb-4 text-sm">投资服务</h4>
                    <ul class="space-y-2 text-primary-400 text-sm">
                        <li><a href="/auth/login?role=investor" class="hover:text-white transition">ETF 化投资</a></li>
                        <li><a href="/auth/login?role=investor" class="hover:text-white transition">分层投资产品</a></li>
                        <li><a href="/auth/login?role=investor" class="hover:text-white transition">投后管理</a></li>
                        <li><a href="/auth/login?role=investor" class="hover:text-white transition">收益兑付</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-medium mb-4 text-sm">联系我们</h4>
                    <ul class="space-y-2 text-primary-400 text-sm">
                        <li><i class="fas fa-phone mr-2 text-primary-500"></i>400-888-8888</li>
                        <li><i class="fas fa-envelope mr-2 text-primary-500"></i>contact@dgt.com</li>
                        <li><i class="fas fa-map-marker-alt mr-2 text-primary-500"></i>香港中环</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-primary-500 text-sm">
                <span>© 2024 滴灌通. All rights reserved.</span>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="/legal/privacy" class="hover:text-white transition">隐私政策</a>
                    <a href="/legal/terms" class="hover:text-white transition">服务条款</a>
                </div>
            </div>
        </div>
    </footer>
</div>
`)
