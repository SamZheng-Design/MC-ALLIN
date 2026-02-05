import { baseLayout } from './layout'

export const renderLoginPage = () => baseLayout('登录/注册', `
<div class="min-h-screen gradient-bg flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Logo区域 -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-center">
            <i class="fas fa-tint text-white text-4xl mb-2"></i>
            <h1 class="text-2xl font-bold text-white">滴灌通</h1>
            <p class="text-white/80 text-sm">收入分成投资系统</p>
        </div>

        <!-- Tab切换 -->
        <div class="flex border-b">
            <button id="tab-login" onclick="switchTab('login')" 
                    class="flex-1 py-4 text-center font-medium text-indigo-600 border-b-2 border-indigo-600 transition">
                登录
            </button>
            <button id="tab-register" onclick="switchTab('register')" 
                    class="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700 transition">
                注册
            </button>
        </div>

        <!-- 登录表单 -->
        <div id="form-login" class="p-8">
            <form onsubmit="handleLogin(event)">
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">手机号/邮箱</label>
                    <input type="text" id="login-account" required
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                           placeholder="请输入手机号或邮箱">
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
                    <input type="password" id="login-password" required
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                           placeholder="请输入密码">
                </div>
                <button type="submit" 
                        class="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
                    登 录
                </button>
            </form>
            
            <!-- 快捷登录（演示用） -->
            <div class="mt-6 pt-6 border-t">
                <p class="text-center text-sm text-gray-500 mb-3">快捷演示登录</p>
                <div class="grid grid-cols-2 gap-2 mb-3">
                    <button onclick="quickLogin('financer')" 
                            class="px-3 py-2 border border-indigo-300 text-indigo-600 rounded-lg text-sm hover:bg-indigo-50 transition">
                        <i class="fas fa-building mr-1"></i>融资者
                    </button>
                    <button onclick="quickLogin('investor')" 
                            class="px-3 py-2 border border-green-300 text-green-600 rounded-lg text-sm hover:bg-green-50 transition">
                        <i class="fas fa-chart-line mr-1"></i>投资者
                    </button>
                </div>
                <p class="text-center text-xs text-gray-400 mb-2">内部员工工作台</p>
                <div class="grid grid-cols-3 gap-2">
                    <button onclick="quickLogin('legal')" 
                            class="px-2 py-2 border border-purple-300 text-purple-600 rounded-lg text-xs hover:bg-purple-50 transition">
                        <i class="fas fa-balance-scale mr-1"></i>法务
                    </button>
                    <button onclick="quickLogin('risk')" 
                            class="px-2 py-2 border border-red-300 text-red-600 rounded-lg text-xs hover:bg-red-50 transition">
                        <i class="fas fa-shield-alt mr-1"></i>风控
                    </button>
                    <button onclick="quickLogin('finance')" 
                            class="px-2 py-2 border border-green-300 text-green-600 rounded-lg text-xs hover:bg-green-50 transition">
                        <i class="fas fa-university mr-1"></i>财务
                    </button>
                    <button onclick="quickLogin('scheme')" 
                            class="px-2 py-2 border border-blue-300 text-blue-600 rounded-lg text-xs hover:bg-blue-50 transition">
                        <i class="fas fa-calculator mr-1"></i>方案组
                    </button>
                    <button onclick="quickLogin('interest')" 
                            class="px-2 py-2 border border-yellow-300 text-yellow-600 rounded-lg text-xs hover:bg-yellow-50 transition">
                        <i class="fas fa-handshake mr-1"></i>利益组
                    </button>
                </div>
            </div>
        </div>

        <!-- 注册表单 -->
        <div id="form-register" class="p-8 hidden">
            <form onsubmit="handleRegister(event)">
                <!-- 角色选择 -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">注册身份</label>
                    <select id="register-role" onchange="handleRoleChange()" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="">请选择身份</option>
                        <option value="ROLE_FINANCER">融资者</option>
                        <option value="ROLE_INVESTOR">境内投资者</option>
                        <option value="ROLE_INVESTOR_OVERSEAS_LICENSED">境外持牌机构投资者</option>
                        <option value="ROLE_INVESTOR_OVERSEAS_PI_INDIVIDUAL">境外非持牌个人PI</option>
                        <option value="ROLE_INVESTOR_OVERSEAS_PI_COMPANY">境外非持牌公司PI</option>
                        <option value="ROLE_STAFF">滴灌通内部员工</option>
                    </select>
                </div>

                <!-- 动态表单区域 -->
                <div id="dynamic-register-fields">
                    <!-- 默认：手机号+验证码 -->
                    <div id="phone-fields">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">手机号</label>
                            <input type="tel" id="register-phone"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                   placeholder="请输入手机号">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">验证码</label>
                            <div class="flex space-x-3">
                                <input type="text" id="register-phone-code"
                                       class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                       placeholder="请输入验证码">
                                <button type="button" onclick="sendCode('phone')"
                                        class="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition whitespace-nowrap">
                                    获取验证码
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 内部员工：邮箱+部门 -->
                    <div id="staff-fields" class="hidden">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">公司邮箱</label>
                            <input type="email" id="register-email"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                   placeholder="xxx@dgt.com">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">所属部门</label>
                            <select id="register-department"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                                <option value="">请选择部门</option>
                                <option value="legal">法务部</option>
                                <option value="risk">风控部</option>
                                <option value="finance">财务部</option>
                                <option value="invest_scheme">投委方案组</option>
                                <option value="interest">投委利益组</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">邮箱验证码</label>
                            <div class="flex space-x-3">
                                <input type="text" id="register-email-code"
                                       class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                       placeholder="请输入验证码">
                                <button type="button" onclick="sendCode('email')"
                                        class="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition whitespace-nowrap">
                                    获取验证码
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 境外投资者：资质上传 -->
                    <div id="overseas-fields" class="hidden">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">资质文件上传</label>
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <i class="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
                                <p class="text-sm text-gray-500">点击或拖拽上传主体证明/金融牌照/合规备案</p>
                                <input type="file" id="register-qualification" class="hidden" multiple>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 密码 -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">设置密码</label>
                    <input type="password" id="register-password" required
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                           placeholder="请设置密码（至少6位）">
                </div>

                <!-- 姓名 -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                    <input type="text" id="register-name" required
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                           placeholder="请输入姓名">
                </div>

                <button type="submit" 
                        class="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
                    注 册
                </button>
            </form>
        </div>

        <!-- 返回首页 -->
        <div class="px-8 pb-6 text-center">
            <a href="/" class="text-sm text-gray-500 hover:text-indigo-600 transition">
                <i class="fas fa-arrow-left mr-1"></i>返回首页
            </a>
        </div>
    </div>
</div>
`, `
<script>
    // 检查URL参数
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tab') === 'register') {
        switchTab('register');
    }
    if (urlParams.get('role') === 'financer') {
        switchTab('register');
        setTimeout(() => {
            document.getElementById('register-role').value = 'ROLE_FINANCER';
            handleRoleChange();
        }, 100);
    }
    if (urlParams.get('role') === 'investor') {
        switchTab('register');
        setTimeout(() => {
            document.getElementById('register-role').value = 'ROLE_INVESTOR';
            handleRoleChange();
        }, 100);
    }

    function switchTab(tab) {
        const loginTab = document.getElementById('tab-login');
        const registerTab = document.getElementById('tab-register');
        const loginForm = document.getElementById('form-login');
        const registerForm = document.getElementById('form-register');
        
        if (tab === 'login') {
            loginTab.classList.add('text-indigo-600', 'border-b-2', 'border-indigo-600');
            loginTab.classList.remove('text-gray-500');
            registerTab.classList.remove('text-indigo-600', 'border-b-2', 'border-indigo-600');
            registerTab.classList.add('text-gray-500');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        } else {
            registerTab.classList.add('text-indigo-600', 'border-b-2', 'border-indigo-600');
            registerTab.classList.remove('text-gray-500');
            loginTab.classList.remove('text-indigo-600', 'border-b-2', 'border-indigo-600');
            loginTab.classList.add('text-gray-500');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    }

    function handleRoleChange() {
        const role = document.getElementById('register-role').value;
        const phoneFields = document.getElementById('phone-fields');
        const staffFields = document.getElementById('staff-fields');
        const overseasFields = document.getElementById('overseas-fields');
        
        // 隐藏所有
        phoneFields.classList.add('hidden');
        staffFields.classList.add('hidden');
        overseasFields.classList.add('hidden');
        
        if (role === 'ROLE_STAFF') {
            staffFields.classList.remove('hidden');
        } else if (role.includes('OVERSEAS')) {
            phoneFields.classList.remove('hidden');
            overseasFields.classList.remove('hidden');
        } else {
            phoneFields.classList.remove('hidden');
        }
    }

    async function sendCode(type) {
        const target = type === 'phone' 
            ? document.getElementById('register-phone').value
            : document.getElementById('register-email').value;
        
        if (!target) {
            DGT.showToast('请先输入' + (type === 'phone' ? '手机号' : '邮箱'), 'warning');
            return;
        }
        
        try {
            await DGT.api.post('/auth/send-code', { target, type });
            DGT.showToast('验证码已发送（演示模式：123456）', 'success');
        } catch (err) {
            DGT.showToast('发送失败，请重试', 'error');
        }
    }

    async function handleLogin(event) {
        event.preventDefault();
        const account = document.getElementById('login-account').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const res = await DGT.api.post('/auth/login', { account, password });
            DGT.setAuth(res.data.token, res.data.user);
            DGT.showToast('登录成功', 'success');
            setTimeout(() => {
                window.location.href = res.data.redirectUrl;
            }, 500);
        } catch (err) {
            DGT.showToast(err.response?.data?.message || '登录失败', 'error');
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        const role = document.getElementById('register-role').value;
        const password = document.getElementById('register-password').value;
        const name = document.getElementById('register-name').value;
        
        const data = { role, password, name };
        
        if (role === 'ROLE_STAFF') {
            data.email = document.getElementById('register-email').value;
            data.department = document.getElementById('register-department').value;
            data.code = document.getElementById('register-email-code').value;
        } else {
            data.phone = document.getElementById('register-phone').value;
            data.code = document.getElementById('register-phone-code').value;
        }
        
        try {
            const res = await DGT.api.post('/auth/register', data);
            DGT.setAuth(res.data.token, res.data.user);
            DGT.showToast('注册成功', 'success');
            setTimeout(() => {
                window.location.href = res.data.redirectUrl;
            }, 500);
        } catch (err) {
            DGT.showToast(err.response?.data?.message || '注册失败', 'error');
        }
    }

    // 快捷登录（演示用）
    async function quickLogin(type) {
        const accounts = {
            'financer': { account: '13800138001', password: 'demo123' },
            'investor': { account: '13800138002', password: 'demo123' },
            'legal': { account: 'legal@dgt.com', password: 'demo123' },
            'risk': { account: 'risk@dgt.com', password: 'demo123' },
            'finance': { account: 'finance@dgt.com', password: 'demo123' },
            'scheme': { account: 'scheme@dgt.com', password: 'demo123' },
            'interest': { account: 'interest@dgt.com', password: 'demo123' }
        };
        
        const { account, password } = accounts[type];
        try {
            const res = await DGT.api.post('/auth/login', { account, password });
            DGT.setAuth(res.data.token, res.data.user);
            DGT.showToast('登录成功', 'success');
            setTimeout(() => {
                window.location.href = res.data.redirectUrl;
            }, 500);
        } catch (err) {
            DGT.showToast(err.response?.data?.message || '登录失败', 'error');
        }
    }
</script>
`)
