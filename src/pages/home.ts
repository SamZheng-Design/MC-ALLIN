import { baseLayout } from './layout'

export const renderHomePage = () => baseLayout('首页', `
<div class="min-h-screen">
    <!-- 顶部导航 -->
    <nav class="gradient-bg shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <i class="fas fa-tint text-white text-2xl mr-2"></i>
                    <span class="text-white text-xl font-bold">滴灌通</span>
                    <span class="ml-4 text-white/80 text-sm">收入分成投资系统</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/auth/login" class="text-white hover:text-white/80 px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition">
                        登录
                    </a>
                    <a href="/auth/login?tab=register" class="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition">
                        注册
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero区域 -->
    <section class="gradient-bg py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
                AI智能体驱动的<br>收入分成投资平台
            </h1>
            <p class="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                基于五大AI智能体实时计算，为融资方提供精准分成方案，
                为投资者提供透明的ETF化投资机会
            </p>
            <div class="flex justify-center space-x-4">
                <a href="/auth/login?role=financer" 
                   class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/90 transition shadow-lg">
                    <i class="fas fa-building mr-2"></i>我要融资
                </a>
                <a href="/auth/login?role=investor" 
                   class="bg-transparent text-white px-8 py-3 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white/10 transition">
                    <i class="fas fa-chart-line mr-2"></i>我要投资
                </a>
            </div>
        </div>
    </section>

    <!-- 核心特性 -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">五大AI智能体实时协同</h2>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div class="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 card-hover transition-all duration-300">
                    <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-calculator text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">方案智能体</h3>
                    <p class="text-sm text-gray-600">实时计算融资金额、分成比例、资金成本</p>
                </div>
                <div class="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 card-hover transition-all duration-300">
                    <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-file-contract text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">法律智能体</h3>
                    <p class="text-sm text-gray-600">自动生成合同条款、实时更新法律文本</p>
                </div>
                <div class="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 card-hover transition-all duration-300">
                    <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-shield-alt text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">风控智能体</h3>
                    <p class="text-sm text-gray-600">多维度风险评估、黑白名单实时校验</p>
                </div>
                <div class="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 card-hover transition-all duration-300">
                    <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-university text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">财务智能体</h3>
                    <p class="text-sm text-gray-600">账户架构设计、分账规则自动配置</p>
                </div>
                <div class="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 card-hover transition-all duration-300">
                    <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-handshake text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">利益智能体</h3>
                    <p class="text-sm text-gray-600">投融资利益绑定评估、激励机制优化</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 赛道介绍 -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">支持的融资赛道</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
                    <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-store text-indigo-600 text-xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">连锁实体店</h3>
                    <p class="text-sm text-gray-600 mb-4">连锁零售、餐饮、服务门店等实体经营场景</p>
                    <div class="flex items-center text-sm text-indigo-600">
                        <span>历史投资规模：¥12.5亿</span>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-ticket-alt text-purple-600 text-xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">演唱会/商业活动</h3>
                    <p class="text-sm text-gray-600 mb-4">演唱会、展览、商业活动等项目制场景</p>
                    <div class="flex items-center text-sm text-purple-600">
                        <span>历史投资规模：¥5.8亿</span>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-mountain text-green-600 text-xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">旅游景区</h3>
                    <p class="text-sm text-gray-600 mb-4">旅游景区、度假村、主题公园等文旅场景</p>
                    <div class="flex items-center text-sm text-green-600">
                        <span>历史投资规模：¥8.2亿</span>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
                    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-briefcase text-orange-600 text-xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">项目制非标服务</h3>
                    <p class="text-sm text-gray-600 mb-4">咨询、设计、IT服务等项目制服务场景</p>
                    <div class="flex items-center text-sm text-orange-600">
                        <span>历史投资规模：¥3.1亿</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 数据统计 -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div class="text-4xl font-bold text-indigo-600 mb-2">¥29.6亿</div>
                    <div class="text-gray-600">累计投资规模</div>
                </div>
                <div>
                    <div class="text-4xl font-bold text-green-600 mb-2">1,280+</div>
                    <div class="text-gray-600">服务企业数</div>
                </div>
                <div>
                    <div class="text-4xl font-bold text-purple-600 mb-2">98.5%</div>
                    <div class="text-gray-600">按时兑付率</div>
                </div>
                <div>
                    <div class="text-4xl font-bold text-orange-600 mb-2">12.8%</div>
                    <div class="text-gray-600">平均年化收益</div>
                </div>
            </div>
        </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center mb-4">
                        <i class="fas fa-tint text-2xl mr-2"></i>
                        <span class="text-xl font-bold">滴灌通</span>
                    </div>
                    <p class="text-gray-400 text-sm">
                        AI智能体驱动的收入分成投资平台，让每一笔投资都有迹可循
                    </p>
                </div>
                <div>
                    <h4 class="font-bold mb-4">融资服务</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" class="hover:text-white">连锁实体店融资</a></li>
                        <li><a href="#" class="hover:text-white">商业活动融资</a></li>
                        <li><a href="#" class="hover:text-white">文旅项目融资</a></li>
                        <li><a href="#" class="hover:text-white">项目制服务融资</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">投资服务</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" class="hover:text-white">ETF化投资</a></li>
                        <li><a href="#" class="hover:text-white">分层投资产品</a></li>
                        <li><a href="#" class="hover:text-white">投后管理</a></li>
                        <li><a href="#" class="hover:text-white">收益兑付</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">联系我们</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><i class="fas fa-phone mr-2"></i>400-888-8888</li>
                        <li><i class="fas fa-envelope mr-2"></i>contact@dgt.com</li>
                        <li><i class="fas fa-map-marker-alt mr-2"></i>香港中环</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                © 2024 滴灌通. All rights reserved. | 
                <a href="#" class="hover:text-white">隐私政策</a> | 
                <a href="#" class="hover:text-white">服务条款</a>
            </div>
        </div>
    </footer>
</div>
`)
