import { baseLayout } from '../layout'

export const renderFinancerReport = (trackId: string) => baseLayout('动态信息填报', `
<div class="min-h-screen bg-gray-100">
    <!-- 顶部导航 -->
    <nav class="gradient-bg shadow-lg sticky top-0 z-50">
        <div class="max-w-full mx-auto px-4">
            <div class="flex justify-between h-14">
                <div class="flex items-center">
                    <a href="/financer/dashboard" class="text-white/80 hover:text-white mr-4">
                        <i class="fas fa-arrow-left"></i>
                    </a>
                    <i class="fas fa-tint text-white text-xl mr-2"></i>
                    <span class="text-white font-bold">滴灌通</span>
                    <span class="ml-4 text-white/80">|</span>
                    <span class="ml-4 text-white font-medium" id="track-name">加载中...</span>
                </div>
                <div class="flex items-center space-x-4">
                    <!-- 信息完善度 -->
                    <div class="flex items-center bg-white/20 rounded-full px-4 py-1">
                        <span class="text-white/80 text-sm mr-2">信息完善度</span>
                        <span class="text-white font-bold text-lg" id="completeness-value">0</span>
                        <span class="text-white/80 text-sm">%</span>
                    </div>
                    <button onclick="saveDraft()" class="px-4 py-2 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30 transition">
                        <i class="fas fa-save mr-1"></i>保存草稿
                    </button>
                    <button onclick="submitProject()" class="px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-white/90 transition">
                        <i class="fas fa-paper-plane mr-1"></i>提交方案
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex">
        <!-- 左侧：表单分组导航 -->
        <aside class="w-56 bg-white shadow-lg min-h-screen sticky top-14 pt-4">
            <nav id="form-nav" class="space-y-1">
                <!-- 动态生成 -->
            </nav>
            <div class="p-4 mt-4 border-t">
                <div class="text-xs text-gray-500 mb-2">填报进度</div>
                <div class="w-full h-2 bg-gray-200 rounded-full">
                    <div id="progress-bar" class="h-2 bg-indigo-600 rounded-full transition-all duration-500" style="width: 0%"></div>
                </div>
            </div>
        </aside>

        <!-- 中间：动态表单 -->
        <main class="flex-1 p-6 max-w-3xl">
            <div id="form-container">
                <!-- 动态生成表单 -->
                <div class="text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-indigo-600 mb-4"></i>
                    <p class="text-gray-600">正在加载表单配置...</p>
                </div>
            </div>
        </main>

        <!-- 右侧：实时智能评估面板 -->
        <aside class="w-96 bg-white shadow-lg min-h-screen sticky top-14 overflow-y-auto" style="max-height: calc(100vh - 56px);">
            <div class="p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 class="font-bold text-gray-800 flex items-center">
                    <i class="fas fa-robot text-indigo-600 mr-2"></i>
                    AI智能实时评估
                </h2>
                <p class="text-xs text-gray-500 mt-1">数据变更后自动重新计算</p>
            </div>

            <!-- 1. 收入分成方案面板 -->
            <div class="border-b">
                <div class="p-4 bg-blue-50 cursor-pointer flex justify-between items-center" onclick="togglePanel('scheme')">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-calculator text-white"></i>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-800">收入分成方案</h3>
                            <p class="text-xs text-gray-500">置信度: <span id="scheme-confidence" class="font-bold text-blue-600">--</span>%</p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-down text-gray-400 transition-transform" id="scheme-arrow"></i>
                </div>
                <div id="scheme-panel" class="p-4 space-y-3">
                    <div class="loading-shimmer h-4 rounded w-3/4"></div>
                    <div class="loading-shimmer h-4 rounded w-1/2"></div>
                    <div class="loading-shimmer h-4 rounded w-2/3"></div>
                </div>
            </div>

            <!-- 2. 法律合同面板 -->
            <div class="border-b">
                <div class="p-4 bg-purple-50 cursor-pointer flex justify-between items-center" onclick="togglePanel('legal')">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-file-contract text-white"></i>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-800">法律合同</h3>
                            <p class="text-xs text-gray-500">条款完备度: <span id="legal-completeness" class="font-bold text-purple-600">--</span>%</p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-down text-gray-400 transition-transform" id="legal-arrow"></i>
                </div>
                <div id="legal-panel" class="p-4 space-y-3 hidden">
                    <div class="loading-shimmer h-4 rounded w-3/4"></div>
                    <div class="loading-shimmer h-4 rounded w-1/2"></div>
                </div>
            </div>

            <!-- 3. 风控评分面板 -->
            <div class="border-b">
                <div class="p-4 bg-red-50 cursor-pointer flex justify-between items-center" onclick="togglePanel('risk')">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-shield-alt text-white"></i>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-800">风控评分</h3>
                            <p class="text-xs text-gray-500">综合评分: <span id="risk-score" class="font-bold text-red-600">--</span>/100</p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-down text-gray-400 transition-transform" id="risk-arrow"></i>
                </div>
                <div id="risk-panel" class="p-4 space-y-3 hidden">
                    <div class="loading-shimmer h-4 rounded w-3/4"></div>
                    <div class="loading-shimmer h-4 rounded w-1/2"></div>
                </div>
            </div>

            <!-- 4. 财务架构面板 -->
            <div class="border-b">
                <div class="p-4 bg-green-50 cursor-pointer flex justify-between items-center" onclick="togglePanel('finance')">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-university text-white"></i>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-800">财务架构</h3>
                            <p class="text-xs text-gray-500">推荐方案: <span id="finance-type" class="font-bold text-green-600">--</span></p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-down text-gray-400 transition-transform" id="finance-arrow"></i>
                </div>
                <div id="finance-panel" class="p-4 space-y-3 hidden">
                    <div class="loading-shimmer h-4 rounded w-3/4"></div>
                    <div class="loading-shimmer h-4 rounded w-1/2"></div>
                </div>
            </div>

            <!-- 5. 利益一致性面板 -->
            <div class="border-b">
                <div class="p-4 bg-yellow-50 cursor-pointer flex justify-between items-center" onclick="togglePanel('interest')">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-handshake text-white"></i>
                        </div>
                        <div>
                            <h3 class="font-medium text-gray-800">利益一致性</h3>
                            <p class="text-xs text-gray-500">绑定评分: <span id="interest-score" class="font-bold text-yellow-600">--</span>/100</p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-down text-gray-400 transition-transform" id="interest-arrow"></i>
                </div>
                <div id="interest-panel" class="p-4 space-y-3 hidden">
                    <div class="loading-shimmer h-4 rounded w-3/4"></div>
                    <div class="loading-shimmer h-4 rounded w-1/2"></div>
                </div>
            </div>
        </aside>
    </div>
</div>
`, `
<script>
    const TRACK_ID = ${trackId};
    let projectId = null;
    let formData = {};
    let fieldSchema = null;
    let debounceTimer = null;
    let isCalculating = false;

    // 检查登录
    if (!DGT.user) {
        window.location.href = '/auth/login';
    }

    // 获取URL参数中的projectId
    const urlParams = new URLSearchParams(window.location.search);
    projectId = urlParams.get('projectId');

    // 初始化
    async function init() {
        try {
            // 加载赛道配置
            const trackRes = await DGT.api.get('/financer/tracks/' + TRACK_ID);
            const track = trackRes.data.track;
            document.getElementById('track-name').textContent = track.name + ' - 融资申报';
            fieldSchema = JSON.parse(track.field_schema);
            
            // 如果有projectId，加载已有数据
            if (projectId) {
                const projectRes = await DGT.api.get('/financer/projects/' + projectId);
                formData = JSON.parse(projectRes.data.project.form_data || '{}');
                updateCompleteness(projectRes.data.project.completeness);
            } else {
                // 创建新项目
                const createRes = await DGT.api.post('/financer/projects', { trackId: TRACK_ID });
                projectId = createRes.data.projectId;
                // 更新URL
                window.history.replaceState({}, '', '/financer/report/' + TRACK_ID + '?projectId=' + projectId);
            }
            
            // 渲染表单
            renderForm();
            renderFormNav();
            
            // 触发初始AI计算
            triggerAgentCalculation();
        } catch (err) {
            console.error('初始化失败', err);
            DGT.showToast('加载失败，请刷新重试', 'error');
        }
    }

    // 渲染左侧导航
    function renderFormNav() {
        const nav = document.getElementById('form-nav');
        nav.innerHTML = fieldSchema.groups.map((group, idx) => \`
            <a href="#group-\${group.key}" 
               class="flex items-center px-4 py-3 text-sm \${idx === 0 ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'}"
               onclick="scrollToGroup('\${group.key}')">
                <i class="fas fa-\${getGroupIcon(group.key)} w-5 mr-2"></i>
                \${group.name}
            </a>
        \`).join('');
    }

    function getGroupIcon(key) {
        const icons = {
            entity: 'building', organizer: 'building', provider: 'building', scenic: 'mountain',
            operation: 'chart-bar', event: 'calendar-alt', project: 'tasks',
            finance: 'dollar-sign', budget: 'coins', history: 'history',
            funding: 'hand-holding-usd',
            documents: 'file-alt'
        };
        return icons[key] || 'folder';
    }

    // 渲染表单
    function renderForm() {
        const container = document.getElementById('form-container');
        container.innerHTML = fieldSchema.groups.map(group => \`
            <div id="group-\${group.key}" class="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
                <div class="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                    <h3 class="font-bold text-gray-800">
                        <i class="fas fa-\${getGroupIcon(group.key)} text-indigo-600 mr-2"></i>
                        \${group.name}
                    </h3>
                </div>
                <div class="p-6 space-y-4">
                    \${group.fields.map(field => renderField(field, group.key)).join('')}
                </div>
            </div>
        \`).join('');
        
        // 填充已有数据
        Object.keys(formData).forEach(key => {
            const input = document.getElementById('field-' + key);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = formData[key];
                } else if (input.tagName === 'SELECT' && input.multiple) {
                    const values = formData[key] || [];
                    Array.from(input.options).forEach(opt => {
                        opt.selected = values.includes(opt.value);
                    });
                } else {
                    input.value = formData[key];
                }
            }
        });
    }

    // 渲染单个字段
    function renderField(field, groupKey) {
        const fullKey = groupKey + '_' + field.key;
        const value = formData[fullKey] || '';
        const required = field.required ? '<span class="text-red-500">*</span>' : '';
        
        let input = '';
        switch (field.type) {
            case 'text':
            case 'tel':
                input = \`<input type="\${field.type}" id="field-\${fullKey}" 
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="请输入\${field.label}"
                          value="\${value}"
                          onchange="handleFieldChange('\${fullKey}', this.value)"
                          onblur="handleFieldChange('\${fullKey}', this.value)">\`;
                break;
            case 'number':
                input = \`<input type="number" id="field-\${fullKey}" 
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="请输入\${field.label}"
                          value="\${value}"
                          onchange="handleFieldChange('\${fullKey}', this.value)"
                          onblur="handleFieldChange('\${fullKey}', this.value)">\`;
                break;
            case 'date':
                input = \`<input type="date" id="field-\${fullKey}" 
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          value="\${value}"
                          onchange="handleFieldChange('\${fullKey}', this.value)">\`;
                break;
            case 'select':
                input = \`<select id="field-\${fullKey}" 
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          onchange="handleFieldChange('\${fullKey}', this.value)">
                          <option value="">请选择</option>
                          \${(field.options || []).map(opt => \`<option value="\${opt}" \${value === opt ? 'selected' : ''}>\${opt}</option>\`).join('')}
                        </select>\`;
                break;
            case 'multiselect':
                input = \`<select id="field-\${fullKey}" multiple
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          onchange="handleMultiSelect('\${fullKey}', this)">
                          \${(field.options || []).map(opt => {
                              const selected = (value || []).includes(opt);
                              return \`<option value="\${opt}" \${selected ? 'selected' : ''}>\${opt}</option>\`;
                          }).join('')}
                        </select>
                        <p class="text-xs text-gray-500 mt-1">按住Ctrl/Command可多选</p>\`;
                break;
            case 'file':
                input = \`<div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition cursor-pointer"
                          onclick="document.getElementById('file-\${fullKey}').click()">
                          <i class="fas fa-cloud-upload-alt text-gray-400 text-2xl mb-2"></i>
                          <p class="text-sm text-gray-500">点击上传\${field.label}</p>
                          <p class="text-xs text-gray-400 mt-1" id="file-name-\${fullKey}">\${value ? '已上传' : '支持PDF、JPG、PNG'}</p>
                          <input type="file" id="file-\${fullKey}" class="hidden" 
                                 \${field.multiple ? 'multiple' : ''}
                                 onchange="handleFileUpload('\${fullKey}', this)">
                        </div>\`;
                break;
            default:
                input = \`<input type="text" id="field-\${fullKey}" 
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          value="\${value}"
                          onchange="handleFieldChange('\${fullKey}', this.value)">\`;
        }
        
        return \`
            <div class="form-field">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    \${field.label} \${required}
                </label>
                \${input}
            </div>
        \`;
    }

    // 处理字段变更 - 核心实时联动逻辑
    function handleFieldChange(fieldKey, value) {
        const oldValue = formData[fieldKey];
        if (oldValue === value) return; // 值未变化，不触发
        
        formData[fieldKey] = value;
        
        // 防抖：300ms内连续输入只触发一次计算
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            // 发送增量变更并触发AI重算
            syncFieldChange(fieldKey, oldValue, value);
        }, 300);
    }

    function handleMultiSelect(fieldKey, select) {
        const values = Array.from(select.selectedOptions).map(opt => opt.value);
        handleFieldChange(fieldKey, values);
    }

    function handleFileUpload(fieldKey, input) {
        const file = input.files[0];
        if (file) {
            document.getElementById('file-name-' + fieldKey).textContent = file.name;
            // 模拟上传成功
            handleFieldChange(fieldKey, 'uploaded_' + Date.now());
        }
    }

    // 同步字段变更到后端
    async function syncFieldChange(fieldKey, oldValue, newValue) {
        try {
            await DGT.api.post('/financer/projects/' + projectId + '/sync', {
                fieldKey,
                oldValue,
                newValue,
                formData,
                trackId: TRACK_ID
            });
            
            // 触发AI智能体重新计算
            triggerAgentCalculation();
        } catch (err) {
            console.error('同步失败', err);
        }
    }

    // 触发AI智能体计算 - 核心
    async function triggerAgentCalculation() {
        if (isCalculating) return;
        isCalculating = true;
        
        // 显示加载状态
        showPanelLoading('scheme');
        showPanelLoading('legal');
        showPanelLoading('risk');
        showPanelLoading('finance');
        showPanelLoading('interest');
        
        try {
            // 并行调用5大智能体
            const [schemeRes, legalRes, riskRes, financeRes, interestRes] = await Promise.all([
                DGT.api.post('/agent/scheme/calculate', { projectId, formData, trackId: TRACK_ID }),
                DGT.api.post('/agent/legal/calculate', { projectId, formData, trackId: TRACK_ID }),
                DGT.api.post('/agent/risk/calculate', { projectId, formData, trackId: TRACK_ID }),
                DGT.api.post('/agent/finance/calculate', { projectId, formData, trackId: TRACK_ID }),
                DGT.api.post('/agent/interest/calculate', { projectId, formData, trackId: TRACK_ID })
            ]);
            
            // 更新各面板（无刷新）
            updateSchemePanel(schemeRes.data);
            updateLegalPanel(legalRes.data);
            updateRiskPanel(riskRes.data);
            updateFinancePanel(financeRes.data);
            updateInterestPanel(interestRes.data);
            
            // 更新完善度
            updateCompleteness(schemeRes.data.completeness || 0);
        } catch (err) {
            console.error('AI计算失败', err);
        } finally {
            isCalculating = false;
        }
    }

    // 显示面板加载状态
    function showPanelLoading(type) {
        const panel = document.getElementById(type + '-panel');
        panel.innerHTML = \`
            <div class="loading-shimmer h-4 rounded w-3/4 mb-2"></div>
            <div class="loading-shimmer h-4 rounded w-1/2 mb-2"></div>
            <div class="loading-shimmer h-4 rounded w-2/3"></div>
        \`;
    }

    // 更新收入分成方案面板
    function updateSchemePanel(data) {
        document.getElementById('scheme-confidence').textContent = data.confidence || 0;
        const panel = document.getElementById('scheme-panel');
        const isLowConfidence = (data.confidence || 0) < 80;
        
        panel.innerHTML = \`
            <div class="space-y-3">
                \${isLowConfidence ? \`
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        预估方案，完善信息可提升精准度
                    </div>
                \` : \`
                    <div class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                        <i class="fas fa-check-circle mr-1"></i>
                        精准方案
                    </div>
                \`}
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-gray-50 rounded-lg p-3">
                        <div class="text-xs text-gray-500">建议融资金额</div>
                        <div class="text-lg font-bold text-blue-600">\${data.fundingAmount || '--'}</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                        <div class="text-xs text-gray-500">分成比例</div>
                        <div class="text-lg font-bold text-blue-600">\${data.shareRate || '--'}%</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                        <div class="text-xs text-gray-500">资金成本</div>
                        <div class="text-lg font-bold text-blue-600">\${data.fundingCost || '--'}%</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                        <div class="text-xs text-gray-500">分润周期</div>
                        <div class="text-lg font-bold text-blue-600">\${data.sharePeriod || '--'}</div>
                    </div>
                </div>
                \${data.suggestion ? \`
                    <div class="text-sm text-gray-600 mt-2">
                        <i class="fas fa-lightbulb text-yellow-500 mr-1"></i>
                        \${data.suggestion}
                    </div>
                \` : ''}
            </div>
        \`;
    }

    // 更新法律合同面板
    function updateLegalPanel(data) {
        document.getElementById('legal-completeness').textContent = data.completeness || 0;
        const panel = document.getElementById('legal-panel');
        
        panel.innerHTML = \`
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">适用模板</span>
                    <span class="font-medium text-purple-600">\${data.templateName || '收入分成协议'}</span>
                </div>
                <div class="bg-purple-50 rounded-lg p-3">
                    <div class="text-xs text-gray-500 mb-2">核心条款预览</div>
                    <div class="text-sm text-gray-700 space-y-1">
                        \${(data.clauses || []).map(c => \`
                            <div class="flex items-start">
                                <i class="fas fa-check text-purple-500 mr-2 mt-0.5 text-xs"></i>
                                <span>\${c}</span>
                            </div>
                        \`).join('')}
                    </div>
                </div>
                \${(data.missingClauses || []).length > 0 ? \`
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div class="text-xs text-yellow-800 font-medium mb-1">待补充条款</div>
                        \${data.missingClauses.map(c => \`
                            <div class="text-sm text-yellow-700">• \${c}</div>
                        \`).join('')}
                    </div>
                \` : ''}
            </div>
        \`;
    }

    // 更新风控评分面板
    function updateRiskPanel(data) {
        document.getElementById('risk-score').textContent = data.score || 0;
        const panel = document.getElementById('risk-panel');
        const score = data.score || 0;
        const riskLevel = score >= 80 ? '低风险' : score >= 60 ? '中风险' : '高风险';
        const riskColor = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red';
        
        panel.innerHTML = \`
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">风险等级</span>
                    <span class="px-3 py-1 bg-\${riskColor}-100 text-\${riskColor}-700 rounded-full text-sm font-medium">\${riskLevel}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">黑名单校验</span>
                    <span class="text-sm font-medium \${data.blacklistStatus === 'pass' ? 'text-green-600' : 'text-red-600'}">
                        <i class="fas fa-\${data.blacklistStatus === 'pass' ? 'check-circle' : 'times-circle'} mr-1"></i>
                        \${data.blacklistStatus === 'pass' ? '通过' : '预警'}
                    </span>
                </div>
                <div class="bg-gray-50 rounded-lg p-3">
                    <div class="text-xs text-gray-500 mb-2">评分维度</div>
                    \${(data.dimensions || []).map(d => \`
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-sm text-gray-600">\${d.name}</span>
                            <div class="flex items-center">
                                <div class="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                                    <div class="h-1.5 bg-red-500 rounded-full" style="width: \${d.score}%"></div>
                                </div>
                                <span class="text-sm font-medium">\${d.score}</span>
                            </div>
                        </div>
                    \`).join('')}
                </div>
                \${(data.warnings || []).length > 0 ? \`
                    <div class="text-sm text-red-600">
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        风险提示：\${data.warnings.join('、')}
                    </div>
                \` : ''}
            </div>
        \`;
    }

    // 更新财务架构面板
    function updateFinancePanel(data) {
        document.getElementById('finance-type').textContent = data.accountType || '--';
        const panel = document.getElementById('finance-panel');
        
        panel.innerHTML = \`
            <div class="space-y-3">
                <div class="bg-green-50 rounded-lg p-3">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm text-gray-600">推荐账户类型</span>
                        <span class="font-medium text-green-600">\${data.accountType || '共管账户'}</span>
                    </div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm text-gray-600">资金流对接</span>
                        <span class="font-medium text-green-600">\${data.fundFlow || 'API自动对接'}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">结算周期</span>
                        <span class="font-medium text-green-600">\${data.settlementCycle || 'T+1'}</span>
                    </div>
                </div>
                <div class="text-sm text-gray-600">
                    <div class="font-medium mb-1">分账规则</div>
                    <div class="bg-gray-50 rounded p-2 text-xs">
                        \${data.splitRule || '按日收入 × 分成比例自动计算'}
                    </div>
                </div>
                \${data.requirements ? \`
                    <div class="text-xs text-gray-500">
                        <i class="fas fa-info-circle mr-1"></i>
                        \${data.requirements}
                    </div>
                \` : ''}
            </div>
        \`;
    }

    // 更新利益一致性面板
    function updateInterestPanel(data) {
        document.getElementById('interest-score').textContent = data.score || 0;
        const panel = document.getElementById('interest-panel');
        
        panel.innerHTML = \`
            <div class="space-y-3">
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-yellow-50 rounded-lg p-3">
                        <div class="text-xs text-gray-500">利益绑定评分</div>
                        <div class="text-lg font-bold text-yellow-600">\${data.score || 0}/100</div>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-3">
                        <div class="text-xs text-gray-500">激励匹配度</div>
                        <div class="text-lg font-bold text-yellow-600">\${data.incentiveMatch || 0}%</div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-3">
                    <div class="text-xs text-gray-500 mb-2">一致性说明</div>
                    <div class="text-sm text-gray-700">\${data.explanation || '融资方与投资方利益绑定程度评估'}</div>
                </div>
                \${data.suggestions ? \`
                    <div class="text-sm text-yellow-700">
                        <div class="font-medium mb-1">优化建议</div>
                        <div>\${data.suggestions}</div>
                    </div>
                \` : ''}
            </div>
        \`;
    }

    // 更新完善度
    function updateCompleteness(value) {
        const el = document.getElementById('completeness-value');
        const progressBar = document.getElementById('progress-bar');
        
        // 数字动画
        const current = parseInt(el.textContent) || 0;
        const diff = value - current;
        const step = diff > 0 ? 1 : -1;
        let i = current;
        
        const animate = () => {
            if ((step > 0 && i < value) || (step < 0 && i > value)) {
                i += step;
                el.textContent = i;
                progressBar.style.width = i + '%';
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    // 切换面板展开/收起
    function togglePanel(type) {
        const panel = document.getElementById(type + '-panel');
        const arrow = document.getElementById(type + '-arrow');
        panel.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }

    // 滚动到分组
    function scrollToGroup(key) {
        const el = document.getElementById('group-' + key);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // 更新导航高亮
        document.querySelectorAll('#form-nav a').forEach(a => {
            a.classList.remove('text-indigo-600', 'bg-indigo-50', 'border-r-4', 'border-indigo-600');
            a.classList.add('text-gray-600');
        });
        const navItem = document.querySelector('#form-nav a[href="#group-' + key + '"]');
        if (navItem) {
            navItem.classList.add('text-indigo-600', 'bg-indigo-50', 'border-r-4', 'border-indigo-600');
            navItem.classList.remove('text-gray-600');
        }
    }

    // 保存草稿
    async function saveDraft() {
        try {
            await DGT.api.put('/financer/projects/' + projectId, { formData, status: 'draft' });
            DGT.showToast('草稿已保存', 'success');
        } catch (err) {
            DGT.showToast('保存失败', 'error');
        }
    }

    // 提交方案
    async function submitProject() {
        const completeness = parseInt(document.getElementById('completeness-value').textContent) || 0;
        if (completeness < 60) {
            DGT.showToast('信息完善度需达到60%以上才能提交', 'warning');
            return;
        }
        
        if (!confirm('确认提交方案？提交后将进入审核流程。')) return;
        
        try {
            await DGT.api.put('/financer/projects/' + projectId, { formData, status: 'submitted' });
            DGT.showToast('方案已提交', 'success');
            setTimeout(() => {
                window.location.href = '/financer/confirm/' + projectId;
            }, 1000);
        } catch (err) {
            DGT.showToast('提交失败', 'error');
        }
    }

    // 初始化
    init();
</script>
`)
