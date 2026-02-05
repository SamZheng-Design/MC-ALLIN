import { baseLayout } from '../layout'

export const renderPrivacyPage = () => baseLayout('隐私政策', `
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
            <h1 class="text-2xl font-semibold text-primary-900 mb-6">隐私政策</h1>
            <p class="text-primary-500 text-sm mb-8">最后更新日期：2024年1月1日</p>
            
            <div class="prose prose-primary max-w-none text-primary-600 text-sm leading-relaxed space-y-6">
                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">1. 信息收集</h2>
                    <p>我们收集您在使用滴灌通平台时提供的信息，包括但不限于：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>账户注册信息（姓名、邮箱、手机号等）</li>
                        <li>身份验证信息（身份证、营业执照等）</li>
                        <li>交易相关信息（投融资记录、合同等）</li>
                        <li>设备信息（IP地址、浏览器类型等）</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">2. 信息使用</h2>
                    <p>我们使用收集的信息用于：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>提供、维护和改进我们的服务</li>
                        <li>处理交易和发送相关通知</li>
                        <li>进行风险控制和合规审查</li>
                        <li>与您沟通，响应您的请求</li>
                        <li>防止欺诈和其他非法活动</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">3. 信息保护</h2>
                    <p>我们采取严格的安全措施保护您的个人信息：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>数据加密传输和存储</li>
                        <li>访问控制和身份验证</li>
                        <li>定期安全审计和漏洞扫描</li>
                        <li>员工安全意识培训</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">4. 信息共享</h2>
                    <p>我们不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>获得您的明确同意</li>
                        <li>与合作伙伴共享以提供服务（如银行、支付机构）</li>
                        <li>法律法规要求或政府机关要求</li>
                        <li>保护我们或他人的权利、财产或安全</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">5. 您的权利</h2>
                    <p>您对您的个人信息享有以下权利：</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li>访问和获取您的个人信息副本</li>
                        <li>更正不准确的个人信息</li>
                        <li>删除您的个人信息（在某些情况下）</li>
                        <li>撤回同意</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-lg font-semibold text-primary-900 mb-3">6. 联系我们</h2>
                    <p>如果您对本隐私政策有任何疑问，请通过以下方式联系我们：</p>
                    <ul class="list-none mt-2 space-y-1">
                        <li><i class="fas fa-envelope text-primary-400 mr-2"></i>privacy@dgt.com</li>
                        <li><i class="fas fa-phone text-primary-400 mr-2"></i>400-888-8888</li>
                        <li><i class="fas fa-map-marker-alt text-primary-400 mr-2"></i>香港中环</li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</div>
`)
