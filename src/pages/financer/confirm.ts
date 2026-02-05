import { baseLayout } from '../layout'

export const renderFinancerConfirm = (projectId: string) => baseLayout('方案确认', `
<div class="min-h-screen bg-gray-100">
    <!-- 顶部导航 -->
    <nav class="gradient-bg shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <a href="/financer/dashboard" class="text-white/80 hover:text-white mr-4">
                        <i class="fas fa-arrow-left"></i>
                    </a>
                    <i class="fas fa-tint text-white text-xl mr-2"></i>
                    <span class="text-white font-bold">滴灌通</span>
                    <span class="ml-4 text-white/80">|</span>
                    <span class="ml-4 text-white">方案&合同确认</span>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-6xl mx-auto py-8 px-4">
        <!-- 进度条 -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <i class="fas fa-check"></i>
                    </div>
                    <span class="ml-3 font-medium text-green-600">信息填报</span>
                </div>
                <div class="flex-1 h-1 bg-green-500 mx-4"></div>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <i class="fas fa-check"></i>
                    </div>
                    <span class="ml-3 font-medium text-green-600">AI评估</span>
                </div>
                <div class="flex-1 h-1 bg-indigo-500 mx-4"></div>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                        <span class="font-bold">3</span>
                    </div>
                    <span class="ml-3 font-medium text-indigo-600">方案确认</span>
                </div>
                <div class="flex-1 h-1 bg-gray-300 mx-4"></div>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                        <span class="font-bold">4</span>
                    </div>
                    <span class="ml-3 font-medium text-gray-400">电子签约</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
            <!-- 左侧：方案摘要 -->
            <div class="col-span-2 space-y-6">
                <!-- 收入分成方案 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="px-6 py-4 bg-blue-50 border-b flex items-center">
                        <i class="fas fa-calculator text-blue-600 mr-3"></i>
                        <h3 class="font-bold text-gray-800">收入分成方案</h3>
                    </div>
                    <div class="p-6" id="scheme-summary">
                        <div class="loading-shimmer h-32 rounded"></div>
                    </div>
                </div>

                <!-- 法律合同 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="px-6 py-4 bg-purple-50 border-b flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-file-contract text-purple-600 mr-3"></i>
                            <h3 class="font-bold text-gray-800">法律合同</h3>
                        </div>
                        <button onclick="downloadContract()" class="text-sm text-purple-600 hover:text-purple-800">
                            <i class="fas fa-download mr-1"></i>下载PDF
                        </button>
                    </div>
                    <div class="p-6" id="contract-preview" style="max-height: 500px; overflow-y: auto;">
                        <div class="loading-shimmer h-64 rounded"></div>
                    </div>
                </div>

                <!-- 风控报告 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="px-6 py-4 bg-red-50 border-b flex items-center">
                        <i class="fas fa-shield-alt text-red-600 mr-3"></i>
                        <h3 class="font-bold text-gray-800">风控评估报告</h3>
                    </div>
                    <div class="p-6" id="risk-report">
                        <div class="loading-shimmer h-32 rounded"></div>
                    </div>
                </div>
            </div>

            <!-- 右侧：签约操作 -->
            <div class="space-y-6">
                <!-- 项目信息 -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="font-bold text-gray-800 mb-4">项目信息</h3>
                    <div class="space-y-3 text-sm" id="project-info">
                        <div class="loading-shimmer h-4 rounded w-3/4"></div>
                        <div class="loading-shimmer h-4 rounded w-1/2"></div>
                    </div>
                </div>

                <!-- 电子签名 -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="font-bold text-gray-800 mb-4">电子签名</h3>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4" id="signature-area">
                        <canvas id="signature-canvas" width="300" height="150" class="border rounded bg-white mx-auto"></canvas>
                        <p class="text-xs text-gray-500 mt-2">请在上方区域手写签名</p>
                    </div>
                    <button onclick="clearSignature()" class="w-full py-2 border border-gray-300 rounded-lg text-gray-600 text-sm mb-3 hover:bg-gray-50">
                        <i class="fas fa-eraser mr-1"></i>清除签名
                    </button>
                    <div class="flex items-start mb-4">
                        <input type="checkbox" id="agree-terms" class="mt-1 mr-2">
                        <label for="agree-terms" class="text-sm text-gray-600">
                            我已阅读并同意<a href="#" class="text-indigo-600">《收入分成协议》</a>及相关条款
                        </label>
                    </div>
                    <button onclick="submitSignature()" class="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                        <i class="fas fa-signature mr-2"></i>确认签约
                    </button>
                </div>

                <!-- 返回修改 -->
                <button onclick="goBack()" class="w-full py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                    <i class="fas fa-arrow-left mr-2"></i>返回修改
                </button>
            </div>
        </div>
    </div>
</div>
`, `
<script>
    const PROJECT_ID = ${projectId};
    let signatureCanvas, signatureCtx;
    let isDrawing = false;

    // 初始化
    async function init() {
        // 初始化签名画布
        signatureCanvas = document.getElementById('signature-canvas');
        signatureCtx = signatureCanvas.getContext('2d');
        signatureCtx.strokeStyle = '#000';
        signatureCtx.lineWidth = 2;
        signatureCtx.lineCap = 'round';
        
        // 绑定签名事件
        signatureCanvas.addEventListener('mousedown', startDrawing);
        signatureCanvas.addEventListener('mousemove', draw);
        signatureCanvas.addEventListener('mouseup', stopDrawing);
        signatureCanvas.addEventListener('mouseout', stopDrawing);
        
        // 触摸支持
        signatureCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = signatureCanvas.getBoundingClientRect();
            startDrawing({ offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top });
        });
        signatureCanvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = signatureCanvas.getBoundingClientRect();
            draw({ offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top });
        });
        signatureCanvas.addEventListener('touchend', stopDrawing);

        // 加载项目数据
        await loadProjectData();
    }

    function startDrawing(e) {
        isDrawing = true;
        signatureCtx.beginPath();
        signatureCtx.moveTo(e.offsetX, e.offsetY);
    }

    function draw(e) {
        if (!isDrawing) return;
        signatureCtx.lineTo(e.offsetX, e.offsetY);
        signatureCtx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function clearSignature() {
        signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    }

    async function loadProjectData() {
        try {
            // 加载项目基本信息
            const projectRes = await DGT.api.get('/financer/projects/' + PROJECT_ID);
            const project = projectRes.data.project;
            
            document.getElementById('project-info').innerHTML = \`
                <div class="flex justify-between">
                    <span class="text-gray-500">项目编号</span>
                    <span class="font-medium">\${project.project_no}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">申报赛道</span>
                    <span class="font-medium">\${project.track_name || '连锁实体店'}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">信息完善度</span>
                    <span class="font-medium text-green-600">\${project.completeness}%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">状态</span>
                    <span class="status-badge status-\${project.status}">\${getStatusText(project.status)}</span>
                </div>
            \`;

            // 加载AI评估结果
            const [schemeRes, legalRes, riskRes] = await Promise.all([
                DGT.api.get('/agent/scheme/result/' + PROJECT_ID),
                DGT.api.get('/agent/legal/result/' + PROJECT_ID),
                DGT.api.get('/agent/risk/result/' + PROJECT_ID)
            ]);

            // 渲染方案摘要
            renderSchemeSummary(schemeRes.data);
            renderContractPreview(legalRes.data);
            renderRiskReport(riskRes.data);
        } catch (err) {
            console.error('加载失败', err);
            DGT.showToast('加载项目数据失败', 'error');
        }
    }

    function renderSchemeSummary(data) {
        document.getElementById('scheme-summary').innerHTML = \`
            <div class="grid grid-cols-2 gap-6">
                <div class="bg-blue-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-1">融资金额</div>
                    <div class="text-2xl font-bold text-blue-600">\${data.fundingAmount || '¥100-300万'}</div>
                </div>
                <div class="bg-blue-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-1">分成比例</div>
                    <div class="text-2xl font-bold text-blue-600">\${data.shareRate || '8-12'}%</div>
                </div>
                <div class="bg-gray-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-1">资金成本</div>
                    <div class="text-xl font-bold text-gray-800">\${data.fundingCost || '10-15'}%</div>
                </div>
                <div class="bg-gray-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-1">分润周期</div>
                    <div class="text-xl font-bold text-gray-800">\${data.sharePeriod || '月度结算'}</div>
                </div>
            </div>
            <div class="mt-4 p-4 bg-green-50 rounded-lg">
                <div class="flex items-center text-green-700">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span class="font-medium">方案置信度: \${data.confidence || 85}%</span>
                </div>
            </div>
        \`;
    }

    function renderContractPreview(data) {
        document.getElementById('contract-preview').innerHTML = \`
            <div class="prose prose-sm max-w-none">
                <h2 class="text-center text-xl font-bold mb-6">收入分成协议</h2>
                <p class="text-sm text-gray-500 text-center mb-6">协议编号：DGT-\${Date.now()}</p>
                
                <h3 class="font-bold mt-6 mb-3">第一条 定义与解释</h3>
                <p>本协议中，除非上下文另有说明，下列术语具有如下含义：</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>融资方</strong>：指签署本协议的融资主体</li>
                    <li><strong>投资方</strong>：指通过滴灌通平台参与本项目投资的投资者</li>
                    <li><strong>收入分成</strong>：指按照约定比例分配的营业收入部分</li>
                </ul>

                <h3 class="font-bold mt-6 mb-3">第二条 融资金额与期限</h3>
                <p>2.1 本协议项下融资金额为人民币 <span class="text-indigo-600 font-bold">\${data.fundingAmount || '___'}</span> 元整。</p>
                <p>2.2 融资期限为 <span class="text-indigo-600 font-bold">\${data.period || '24'}</span> 个月，自资金到账之日起计算。</p>

                <h3 class="font-bold mt-6 mb-3">第三条 收入分成比例</h3>
                <p>3.1 融资方同意按照日营业收入的 <span class="text-indigo-600 font-bold">\${data.shareRate || '___'}%</span> 向投资方支付分成款项。</p>
                <p>3.2 分成款项按 <span class="text-indigo-600 font-bold">\${data.settlementCycle || '月度'}</span> 结算，于每结算周期结束后 <span class="text-indigo-600 font-bold">5</span> 个工作日内完成支付。</p>

                <h3 class="font-bold mt-6 mb-3">第四条 账户与资金监管</h3>
                <p>4.1 融资方应开设指定收款账户，并接受资金监管。</p>
                <p>4.2 推荐账户类型：<span class="text-indigo-600 font-bold">\${data.accountType || '共管账户'}</span></p>

                <h3 class="font-bold mt-6 mb-3">第五条 违约责任</h3>
                <p>5.1 任何一方违反本协议约定，应承担相应的违约责任。</p>
                <p>5.2 融资方连续三个结算周期未能按时支付分成款项，视为重大违约。</p>

                <h3 class="font-bold mt-6 mb-3">第六条 争议解决</h3>
                <p>本协议的签订、履行、解释及争议解决均适用中华人民共和国法律。</p>

                <div class="mt-8 pt-6 border-t">
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <p class="font-bold mb-2">融资方（甲方）</p>
                            <p>签署日期：_______________</p>
                            <p>签章：_______________</p>
                        </div>
                        <div>
                            <p class="font-bold mb-2">投资方（乙方）</p>
                            <p>签署日期：_______________</p>
                            <p>签章：_______________</p>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    }

    function renderRiskReport(data) {
        const score = data.score || 75;
        document.getElementById('risk-report').innerHTML = \`
            <div class="flex items-center justify-between mb-4">
                <div>
                    <div class="text-sm text-gray-500">综合风控评分</div>
                    <div class="text-3xl font-bold \${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}">\${score}/100</div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-500">风险等级</div>
                    <div class="text-lg font-bold \${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}">
                        \${score >= 70 ? '低风险' : score >= 50 ? '中风险' : '高风险'}
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                \${(data.dimensions || [
                    { name: '经营稳定性', score: 80 },
                    { name: '财务健康度', score: 72 },
                    { name: '行业前景', score: 75 },
                    { name: '管理能力', score: 70 }
                ]).map(d => \`
                    <div class="flex items-center">
                        <span class="w-24 text-sm text-gray-600">\${d.name}</span>
                        <div class="flex-1 h-2 bg-gray-200 rounded-full mx-3">
                            <div class="h-2 rounded-full \${d.score >= 70 ? 'bg-green-500' : d.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}" 
                                 style="width: \${d.score}%"></div>
                        </div>
                        <span class="text-sm font-medium w-8">\${d.score}</span>
                    </div>
                \`).join('')}
            </div>
        \`;
    }

    function getStatusText(status) {
        const map = {
            'draft': '草稿', 'submitted': '已提交', 'reviewing': '审核中',
            'approved': '已通过', 'rejected': '已拒绝', 'signed': '已签约', 'active': '执行中'
        };
        return map[status] || status;
    }

    function downloadContract() {
        DGT.showToast('合同PDF生成中...', 'info');
        // 模拟下载
        setTimeout(() => {
            DGT.showToast('下载已开始', 'success');
        }, 1000);
    }

    async function submitSignature() {
        const agreed = document.getElementById('agree-terms').checked;
        if (!agreed) {
            DGT.showToast('请先阅读并同意协议条款', 'warning');
            return;
        }

        // 检查签名
        const signatureData = signatureCanvas.toDataURL();
        const isBlank = signatureCanvas.getContext('2d').getImageData(0, 0, signatureCanvas.width, signatureCanvas.height)
            .data.every((v, i) => i % 4 === 3 ? v === 255 : v === 0);
        
        if (isBlank) {
            DGT.showToast('请先完成电子签名', 'warning');
            return;
        }

        try {
            await DGT.api.post('/financer/projects/' + PROJECT_ID + '/sign', {
                signature: signatureData
            });
            DGT.showToast('签约成功！', 'success');
            setTimeout(() => {
                window.location.href = '/financer/dashboard';
            }, 1500);
        } catch (err) {
            DGT.showToast('签约失败，请重试', 'error');
        }
    }

    function goBack() {
        // 返回编辑页面
        window.history.back();
    }

    init();
</script>
`)
