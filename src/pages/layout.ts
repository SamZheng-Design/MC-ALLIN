// 公共布局模板 - Apple/OpenAI 风格设计系统
export const baseLayout = (title: string, content: string, scripts: string = '') => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 滴灌通</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        // 主色调 - 优雅的深灰到黑
                        primary: {
                            50: '#fafafa',
                            100: '#f4f4f5',
                            200: '#e4e4e7',
                            300: '#d4d4d8',
                            400: '#a1a1aa',
                            500: '#71717a',
                            600: '#52525b',
                            700: '#3f3f46',
                            800: '#27272a',
                            900: '#18181b',
                            950: '#09090b'
                        },
                        // 强调色 - 清新的蓝色
                        accent: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            200: '#bfdbfe',
                            300: '#93c5fd',
                            400: '#60a5fa',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a'
                        },
                        // 成功色 - 清爽的绿色
                        success: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            400: '#4ade80',
                            500: '#22c55e',
                            600: '#16a34a'
                        },
                        // 警告色
                        warning: {
                            50: '#fffbeb',
                            100: '#fef3c7',
                            400: '#fbbf24',
                            500: '#f59e0b'
                        },
                        // 错误色
                        danger: {
                            50: '#fef2f2',
                            100: '#fee2e2',
                            400: '#f87171',
                            500: '#ef4444',
                            600: '#dc2626'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <style>
        * {
            font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* 主背景渐变 - 简约灰白 */
        .gradient-bg {
            background: linear-gradient(180deg, #18181b 0%, #09090b 100%);
        }
        
        /* Hero区域背景 - 微妙的网格效果 */
        .hero-gradient {
            background: linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%);
            position: relative;
        }
        .hero-gradient::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
            background-size: 40px 40px;
        }
        
        /* 卡片悬浮效果 - 更微妙 */
        .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
        }
        
        /* 玻璃拟态效果 */
        .glass {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .glass-dark {
            background: rgba(24, 24, 27, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        /* 发光效果 */
        .glow {
            box-shadow: 0 0 60px rgba(59, 130, 246, 0.15);
        }
        .glow-sm {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
        }
        
        /* 加载动画 */
        .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .loading-shimmer {
            background: linear-gradient(90deg, #f4f4f5 25%, #e4e4e7 50%, #f4f4f5 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* 过渡效果 */
        .panel-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .number-animate {
            transition: all 0.5s ease-out;
        }
        
        /* 状态徽章 - 更简约 */
        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.01em;
        }
        .status-draft { background-color: #f4f4f5; color: #52525b; }
        .status-submitted { background-color: #eff6ff; color: #2563eb; }
        .status-reviewing { background-color: #fefce8; color: #ca8a04; }
        .status-approved { background-color: #f0fdf4; color: #16a34a; }
        .status-rejected { background-color: #fef2f2; color: #dc2626; }
        .status-signed { background-color: #f0fdf4; color: #16a34a; }
        .status-active { background-color: #f0fdf4; color: #16a34a; }
        .status-completed { background-color: #f4f4f5; color: #52525b; }
        
        /* 按钮样式 */
        .btn-primary {
            background: linear-gradient(135deg, #18181b 0%, #27272a 100%);
            color: white;
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.2s ease;
        }
        .btn-primary:hover {
            background: linear-gradient(135deg, #27272a 0%, #3f3f46 100%);
            transform: translateY(-1px);
        }
        
        .btn-accent {
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
            color: white;
            transition: all 0.2s ease;
        }
        .btn-accent:hover {
            background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
            transform: translateY(-1px);
        }
        
        /* 输入框样式 */
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* 滚动条美化 */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #d4d4d8;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #a1a1aa;
        }

        /* Logo 样式 */
        .logo-text {
            font-weight: 600;
            letter-spacing: -0.02em;
        }
        
        /* 渐变文字 */
        .text-gradient {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body class="bg-primary-50 min-h-screen antialiased">
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

// 导航栏组件 - 简约黑色风格
export const navbar = (userRole: string = '', userName: string = '') => `
<nav class="gradient-bg border-b border-white/5">
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
            <div class="flex items-center space-x-4" id="nav-user">
                <!-- 动态渲染用户信息 -->
            </div>
        </div>
    </div>
</nav>
`

// 侧边栏菜单 - Apple风格
export const sidebar = (menuItems: Array<{icon: string, label: string, href: string, active?: boolean}>) => `
<aside class="w-64 bg-white border-r border-primary-100 min-h-screen">
    <nav class="mt-2 px-3">
        ${menuItems.map(item => `
            <a href="${item.href}" 
               class="flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium transition-all duration-200 ${item.active ? 'bg-primary-900 text-white' : 'text-primary-600 hover:bg-primary-100'}">
                <i class="fas fa-${item.icon} w-5 mr-3 text-sm"></i>
                <span>${item.label}</span>
            </a>
        `).join('')}
    </nav>
</aside>
`
