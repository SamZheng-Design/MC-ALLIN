import { baseLayout } from '../layout'

export const renderTermsPage = () => baseLayout('服务条款', `
<div class="min-h-screen bg-primary-50">
    <!-- 顶部导航 -->
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
                </div>
                <div class="flex items-center">
                    <a href="/" class="text-primary-400 hover:text-white text-sm transition">
                        <i class="fas fa-home mr-1"></i>返回首页
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-4xl mx-auto py-12 px-4">
        <div class="bg-white rounded-2xl border border-primary-100 p-8">
            <h1 class="text-2xl font-semibold text-primary-900 mb-6">服务条款</h1>
            <p class="text-primary-500 text-sm mb-8">最后更新日期：2024年1月1日</p>
            
            <div class="prose prose-primary max-w-none text-primary-600 text-sm leading-relaxed space-y-6">
                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">1. 服务概述</h2>
                    <p>滴灌通是一个收入分成投资平台，连接融资方与投资者，通过AI智能体提供智能化的投融资服务。</p>
                    <p class="mt-2">使用我们的服务，即表示您同意遵守本服务条款。</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">2. 用户资格</h2>
                    <p>使用滴灌通服务，您必须：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>年满18周岁且具有完全民事行为能力</li>
                        <li>提供真实、准确、完整的注册信息</li>
                        <li>遵守中华人民共和国及香港特别行政区相关法律法规</li>
                        <li>符合相关投资者适当性要求（如适用）</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">3. 账户安全</h2>
                    <p>您有责任：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>妥善保管账户登录凭证</li>
                        <li>对账户下的所有活动负责</li>
                        <li>发现账户异常及时通知我们</li>
                        <li>不得将账户转让或借给他人使用</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">4. 平台服务</h2>
                    <p>滴灌通提供以下服务：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>融资者服务：</strong>融资申报、AI智能评估、合同生成、资金管理</li>
                        <li><strong>投资者服务：</strong>项目浏览、投资分析、投资组合管理、收益兑付</li>
                        <li><strong>智能体服务：</strong>方案智能体、法律智能体、风控智能体、财务智能体、利益智能体</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">5. 费用与收费</h2>
                    <p>平台收费标准：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>融资方：按融资金额的一定比例收取服务费</li>
                        <li>投资者：按投资收益的一定比例收取管理费</li>
                        <li>具体费率以签署的协议为准</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">6. 风险提示</h2>
                    <div class="bg-warning-50 border border-warning-200 rounded-lg p-4">
                        <p class="text-warning-700">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            <strong>重要提示：</strong>投资有风险，决策需谨慎。
                        </p>
                        <ul class="list-disc pl-5 space-y-1 mt-2 text-warning-700">
                            <li>过往业绩不代表未来表现</li>
                            <li>收入分成投资可能无法收回全部本金</li>
                            <li>请在充分了解风险的情况下做出投资决策</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">7. 知识产权</h2>
                    <p>滴灌通平台及其内容（包括但不限于文字、图片、软件、商标等）的知识产权归滴灌通所有。未经授权，不得复制、修改或分发。</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">8. 免责声明</h2>
                    <p>在法律允许的范围内：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>平台不对AI智能体生成的建议承担投资结果责任</li>
                        <li>平台不保证服务不会中断或不会出错</li>
                        <li>用户需自行承担投资决策的风险</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">9. 条款修改</h2>
                    <p>我们保留随时修改本服务条款的权利。修改后的条款将在平台上公布，继续使用服务即表示接受修改后的条款。</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">10. 争议解决</h2>
                    <p>本服务条款的解释、效力及争议解决，适用中华人民共和国香港特别行政区法律。任何争议应提交香港国际仲裁中心仲裁解决。</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">11. 联系方式</h2>
                    <p>如有任何问题，请联系：</p>
                    <ul class="list-none mt-2 space-y-1">
                        <li><i class="fas fa-envelope text-primary-400 mr-2"></i>legal@dgt.com</li>
                        <li><i class="fas fa-phone text-primary-400 mr-2"></i>400-888-8888</li>
                        <li><i class="fas fa-map-marker-alt text-primary-400 mr-2"></i>香港中环</li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</div>
`)
