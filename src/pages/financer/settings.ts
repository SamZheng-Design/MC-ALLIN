import { baseLayout, navbar } from '../layout'

export const renderFinancerSettings = () => baseLayout('个人设置', `
${navbar()}
<div class="flex bg-primary-50">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-white border-r border-primary-100 min-h-screen">
        <div class="p-5 border-b border-primary-100">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
                <div class="ml-3">
                    <div class="font-medium text-primary-900 text-sm" id="user-name">加载中...</div>
                    <div class="text-xs text-primary-400">融资者</div>
                </div>
            </div>
        </div>
        <nav class="mt-2 px-3">
            <a href="/financer/dashboard" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-th-large w-5 mr-3 text-sm"></i>
                <span>赛道选择</span>
            </a>
            <a href="/financer/projects" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-folder w-5 mr-3 text-sm"></i>
                <span>我的项目</span>
            </a>
            <a href="/financer/messages" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-bell w-5 mr-3 text-sm"></i>
                <span>消息中心</span>
            </a>
            <a href="/financer/settings" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium bg-primary-900 text-white">
                <i class="fas fa-cog w-5 mr-3 text-sm"></i>
                <span>个人设置</span>
            </a>
            <a href="javascript:void(0)" onclick="logout()" class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 transition">
                <i class="fas fa-sign-out-alt w-5 mr-3 text-sm"></i>
                <span>退出登录</span>
            </a>
        </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 p-8">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-primary-900 tracking-tight">个人设置</h1>
            <p class="text-primary-500 mt-2 text-sm">管理您的账户信息和偏好设置</p>
        </div>

        <div class="grid grid-cols-3 gap-6">
            <!-- 左侧：主要设置 -->
            <div class="col-span-2 space-y-6">
                <!-- 基本信息 -->
                <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                    <div class="p-5 border-b border-primary-100">
                        <h2 class="font-semibold text-primary-900">基本信息</h2>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-primary-700 mb-2">姓名</label>
                                <input type="text" id="setting-name" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入姓名">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-primary-700 mb-2">企业名称</label>
                                <input type="text" id="setting-company" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入企业名称">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-primary-700 mb-2">手机号</label>
                                <input type="tel" id="setting-phone" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入手机号">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-primary-700 mb-2">邮箱</label>
                                <input type="email" id="setting-email" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入邮箱">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-primary-700 mb-2">企业地址</label>
                            <input type="text" id="setting-address" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入企业地址">
                        </div>
                        <div class="pt-4">
                            <button onclick="saveBasicInfo()" class="px-6 py-2 bg-primary-900 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition">
                                保存修改
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 安全设置 -->
                <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                    <div class="p-5 border-b border-primary-100">
                        <h2 class="font-semibold text-primary-900">安全设置</h2>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="flex items-center justify-between py-3 border-b border-primary-50">
                            <div>
                                <div class="font-medium text-primary-900 text-sm">修改密码</div>
                                <div class="text-xs text-primary-500 mt-1">定期更换密码以保障账户安全</div>
                            </div>
                            <button onclick="openPasswordModal()" class="px-4 py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                                修改
                            </button>
                        </div>
                        <div class="flex items-center justify-between py-3 border-b border-primary-50">
                            <div>
                                <div class="font-medium text-primary-900 text-sm">两步验证</div>
                                <div class="text-xs text-primary-500 mt-1">开启后登录需要验证码确认</div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="two-factor" class="sr-only peer">
                                <div class="w-11 h-6 bg-primary-200 rounded-full peer peer-checked:bg-primary-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                        <div class="flex items-center justify-between py-3">
                            <div>
                                <div class="font-medium text-primary-900 text-sm">登录设备管理</div>
                                <div class="text-xs text-primary-500 mt-1">查看和管理已登录的设备</div>
                            </div>
                            <button onclick="viewDevices()" class="px-4 py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                                查看
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 通知设置 -->
                <div class="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                    <div class="p-5 border-b border-primary-100">
                        <h2 class="font-semibold text-primary-900">通知设置</h2>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="flex items-center justify-between py-3 border-b border-primary-50">
                            <div>
                                <div class="font-medium text-primary-900 text-sm">项目进度通知</div>
                                <div class="text-xs text-primary-500 mt-1">项目状态变更时发送通知</div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="notify-progress" class="sr-only peer" checked>
                                <div class="w-11 h-6 bg-primary-200 rounded-full peer peer-checked:bg-primary-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                        <div class="flex items-center justify-between py-3 border-b border-primary-50">
                            <div>
                                <div class="font-medium text-primary-900 text-sm">分成结算通知</div>
                                <div class="text-xs text-primary-500 mt-1">每次结算完成时发送通知</div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="notify-settlement" class="sr-only peer" checked>
                                <div class="w-11 h-6 bg-primary-200 rounded-full peer peer-checked:bg-primary-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                        <div class="flex items-center justify-between py-3">
                            <div>
                                <div class="font-medium text-primary-900 text-sm">营销信息</div>
                                <div class="text-xs text-primary-500 mt-1">接收平台最新活动和产品信息</div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="notify-marketing" class="sr-only peer">
                                <div class="w-11 h-6 bg-primary-200 rounded-full peer peer-checked:bg-primary-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧：账户信息 -->
            <div class="space-y-6">
                <!-- 账户状态 -->
                <div class="bg-white rounded-2xl border border-primary-100 p-6">
                    <h3 class="font-semibold text-primary-900 mb-4">账户状态</h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between">
                            <span class="text-primary-500">账户类型</span>
                            <span class="font-medium text-primary-900">融资者账户</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">认证状态</span>
                            <span class="status-badge status-active">已认证</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">注册时间</span>
                            <span class="font-medium text-primary-900" id="register-time">2024-01-01</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-primary-500">最近登录</span>
                            <span class="font-medium text-primary-900" id="last-login">刚刚</span>
                        </div>
                    </div>
                </div>

                <!-- 实名认证 -->
                <div class="bg-white rounded-2xl border border-primary-100 p-6">
                    <h3 class="font-semibold text-primary-900 mb-4">实名认证</h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-success-500 mr-2"></i>
                            <span class="text-primary-600">企业营业执照已认证</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-success-500 mr-2"></i>
                            <span class="text-primary-600">法人身份已认证</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-success-500 mr-2"></i>
                            <span class="text-primary-600">银行账户已绑定</span>
                        </div>
                    </div>
                    <button onclick="viewCertification()" class="mt-4 w-full py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                        查看认证详情
                    </button>
                </div>

                <!-- 危险操作 -->
                <div class="bg-white rounded-2xl border border-danger-100 p-6">
                    <h3 class="font-semibold text-danger-600 mb-4">危险操作</h3>
                    <p class="text-sm text-primary-500 mb-4">注销账户将删除所有数据，此操作不可恢复</p>
                    <button onclick="deleteAccount()" class="w-full py-2 border border-danger-200 text-danger-600 rounded-lg text-sm font-medium hover:bg-danger-50 transition">
                        注销账户
                    </button>
                </div>
            </div>
        </div>
    </main>
</div>

<!-- 修改密码弹窗 -->
<div id="password-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-primary-900 mb-4">修改密码</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-primary-700 mb-2">当前密码</label>
                <input type="password" id="current-password" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入当前密码">
            </div>
            <div>
                <label class="block text-sm font-medium text-primary-700 mb-2">新密码</label>
                <input type="password" id="new-password" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请输入新密码">
            </div>
            <div>
                <label class="block text-sm font-medium text-primary-700 mb-2">确认新密码</label>
                <input type="password" id="confirm-password" class="w-full px-4 py-2 border border-primary-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-900 focus:border-primary-900" placeholder="请再次输入新密码">
            </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
            <button onclick="closePasswordModal()" class="px-4 py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition">
                取消
            </button>
            <button onclick="changePassword()" class="px-4 py-2 bg-primary-900 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition">
                确认修改
            </button>
        </div>
    </div>
</div>
`, `
<script>
    // 检查登录状态
    if (!DGT.user || !DGT.user.role.includes('FINANCER')) {
        window.location.href = '/auth/login';
    }
    
    document.getElementById('user-name').textContent = DGT.user?.name || '用户';

    // 初始化表单数据
    function initForm() {
        // 模拟加载用户数据
        document.getElementById('setting-name').value = DGT.user?.name || '';
        document.getElementById('setting-phone').value = '138****8001';
        document.getElementById('setting-email').value = 'user@example.com';
        document.getElementById('setting-company').value = '测试企业有限公司';
        document.getElementById('setting-address').value = '北京市朝阳区XX路XX号';
    }

    function saveBasicInfo() {
        DGT.showToast('基本信息已保存', 'success');
    }

    function openPasswordModal() {
        document.getElementById('password-modal').classList.remove('hidden');
    }

    function closePasswordModal() {
        document.getElementById('password-modal').classList.add('hidden');
    }

    function changePassword() {
        const newPwd = document.getElementById('new-password').value;
        const confirmPwd = document.getElementById('confirm-password').value;
        
        if (newPwd !== confirmPwd) {
            DGT.showToast('两次输入的密码不一致', 'warning');
            return;
        }
        
        DGT.showToast('密码修改成功', 'success');
        closePasswordModal();
    }

    function viewDevices() {
        DGT.showToast('设备管理功能开发中...', 'info');
    }

    function viewCertification() {
        DGT.showToast('认证详情功能开发中...', 'info');
    }

    function deleteAccount() {
        if (confirm('确定要注销账户吗？此操作不可恢复！')) {
            DGT.showToast('账户注销功能开发中...', 'info');
        }
    }

    function logout() {
        DGT.clearAuth();
        window.location.href = '/auth/login';
    }

    // 初始化
    initForm();
</script>
`)
