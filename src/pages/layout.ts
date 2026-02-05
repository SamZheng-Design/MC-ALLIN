// 公共布局模板
export const baseLayout = (title: string, content: string, scripts: string = '') => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 滴灌通收入分成投资系统</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .loading-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        .panel-transition {
            transition: all 0.3s ease-in-out;
        }
        .number-animate {
            transition: all 0.5s ease-out;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        .status-draft { background-color: #fef3c7; color: #92400e; }
        .status-submitted { background-color: #dbeafe; color: #1e40af; }
        .status-reviewing { background-color: #e0e7ff; color: #3730a3; }
        .status-approved { background-color: #d1fae5; color: #065f46; }
        .status-rejected { background-color: #fee2e2; color: #991b1b; }
        .status-signed { background-color: #cffafe; color: #0e7490; }
        .status-active { background-color: #dcfce7; color: #166534; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    ${content}
    <script>
        // 全局工具函数
        window.DGT = {
            token: localStorage.getItem('dgt_token'),
            user: JSON.parse(localStorage.getItem('dgt_user') || 'null'),
            
            setAuth(token, user) {
                this.token = token;
                this.user = user;
                localStorage.setItem('dgt_token', token);
                localStorage.setItem('dgt_user', JSON.stringify(user));
            },
            
            clearAuth() {
                this.token = null;
                this.user = null;
                localStorage.removeItem('dgt_token');
                localStorage.removeItem('dgt_user');
            },
            
            api: axios.create({
                baseURL: '/api',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            
            formatNumber(num) {
                return new Intl.NumberFormat('zh-CN').format(num);
            },
            
            formatPercent(num) {
                return num.toFixed(1) + '%';
            },
            
            formatCurrency(num) {
                return '¥' + this.formatNumber(num);
            },
            
            showToast(message, type = 'info') {
                const toast = document.createElement('div');
                const bgColor = {
                    'success': 'bg-green-500',
                    'error': 'bg-red-500',
                    'warning': 'bg-yellow-500',
                    'info': 'bg-blue-500'
                }[type];
                toast.className = \`fixed top-4 right-4 \${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in\`;
                toast.textContent = message;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        };
        
        // 设置API拦截器
        DGT.api.interceptors.request.use(config => {
            if (DGT.token) {
                config.headers.Authorization = 'Bearer ' + DGT.token;
            }
            return config;
        });
        
        DGT.api.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    DGT.clearAuth();
                    window.location.href = '/auth/login';
                }
                return Promise.reject(error);
            }
        );
    </script>
    ${scripts}
</body>
</html>
`

// 导航栏组件
export const navbar = (userRole: string = '', userName: string = '') => `
<nav class="gradient-bg shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <a href="/" class="flex items-center">
                    <i class="fas fa-tint text-white text-2xl mr-2"></i>
                    <span class="text-white text-xl font-bold">滴灌通</span>
                </a>
                <span class="ml-4 text-white/80 text-sm">收入分成投资系统</span>
            </div>
            <div class="flex items-center space-x-4" id="nav-user">
                <!-- 动态渲染用户信息 -->
            </div>
        </div>
    </div>
</nav>
`

// 侧边栏菜单
export const sidebar = (menuItems: Array<{icon: string, label: string, href: string, active?: boolean}>) => `
<aside class="w-64 bg-white shadow-lg min-h-screen">
    <nav class="mt-6">
        ${menuItems.map(item => `
            <a href="${item.href}" 
               class="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${item.active ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''}">
                <i class="fas fa-${item.icon} w-5 mr-3"></i>
                <span>${item.label}</span>
            </a>
        `).join('')}
    </nav>
</aside>
`
