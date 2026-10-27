/**
 * main.js
 * Front-end controller for Explainable AI Intrusion Detection System (XAI-IDS)
 * Handles telemetry streaming, interactive SHAP/LIME charts, What-If simulation,
 * and SOC incident response advisories.
 */

let currentFeatures = {};
let baselineFeatures = {};
let presetFlows = {};
let streamInterval = null;
let isStreaming = true;
let capturedFlowCount = 0;

// Chart.js instances
let shapChart = null;
let limeChart = null;
let classProbChart = null;
let globalShapChart = null;

document.addEventListener('DOMContentLoaded', async () => {
    await initApp();
});

async function initApp() {
    try {
        // 1. Fetch Preset Flows
        const resPresets = await fetch('/api/sample-flows');
        if (resPresets.ok) {
            presetFlows = await resPresets.json();
        }

        // 2. Fetch Benchmark Metrics
        loadBenchmarkTable();

        // 3. Build Inspector Fields & Load Initial Preset (DoS-SynFlood)
        if (presetFlows['DoS-SynFlood']) {
            loadPresetFlow('DoS-SynFlood');
        } else if (Object.keys(presetFlows).length > 0) {
            const firstKey = Object.keys(presetFlows)[0];
            loadPresetFlow(firstKey);
        }

        // 4. Start Live Telemetry Stream
        startTelemetryStream();

        // 5. Load Global SHAP Importance
        loadGlobalShapImportance();

    } catch (err) {
        console.error("Initialization error:", err);
        showToast("Error initializing dashboard: " + err.message, "danger");
    }
}

/* ==========================================================================
   Telemetry Stream
   ========================================================================== */
function startTelemetryStream() {
    if (streamInterval) clearInterval(streamInterval);
    streamInterval = setInterval(fetchStreamPacket, 3500);
    isStreaming = true;
    updateStreamUI();
}

function stopTelemetryStream() {
    if (streamInterval) {
        clearInterval(streamInterval);
        streamInterval = null;
    }
    isStreaming = false;
    updateStreamUI();
}

function toggleTelemetryStream() {
    if (isStreaming) {
        stopTelemetryStream();
        showToast("Live telemetry paused", "warning");
    } else {
        startTelemetryStream();
        showToast("Live telemetry resumed", "primary");
    }
}

function updateStreamUI() {
    const textEl = document.getElementById('streamStateText');
    const btnEl = document.getElementById('streamToggleBtn');
    if (textEl && btnEl) {
        textEl.textContent = isStreaming ? "ON" : "PAUSED";
        btnEl.classList.toggle('btn-stream', isStreaming);
        btnEl.classList.toggle('btn-secondary', !isStreaming);
    }
}

async function fetchStreamPacket() {
    try {
        const res = await fetch('/api/stream-flow');
        if (!res.ok) return;
        const packet = await res.json();
        addPacketToStreamList(packet);
    } catch (e) {
        console.warn("Stream fetch failed:", e);
    }
}

function addPacketToStreamList(packet) {
    capturedFlowCount++;
    document.getElementById('flowCounterBadge').textContent = `Captured: ${capturedFlowCount}`;

    const streamList = document.getElementById('streamList');
    const item = document.createElement('div');
    item.className = 'stream-item';

    const isMal = packet.Is_Malicious === 1;
    const tagClass = isMal ? 'tag-malicious' : 'tag-benign';
    const tagText = packet.Label || (isMal ? 'ATTACK' : 'BENIGN');

    item.innerHTML = `
        <span>Port ${packet.Destination_Port}</span>
        <span>${formatNumber(packet.Flow_Packets_s)}/s</span>
        <span class="stream-tag ${tagClass}">${tagText}</span>
        <button class="cyber-btn btn-xs btn-primary">Inspect</button>
    `;

    item.onclick = () => {
        // Highlight active item
        document.querySelectorAll('.stream-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        injectFlowIntoInspector(packet);
        analyzeCurrentFlow();
        showToast(`Loaded live flow targeting Port ${packet.Destination_Port}`, "primary");
    };

    streamList.prepend(item);
    // Keep max 25 items in feed
    while (streamList.children.length > 25) {
        streamList.removeChild(streamList.lastChild);
    }
}

/* ==========================================================================
   Preset & Inspector Management
   ========================================================================== */
function loadPresetFlow(category) {
    if (!presetFlows[category]) {
        showToast(`Preset scenario ${category} not found`, "warning");
        return;
    }
    const flow = presetFlows[category];
    injectFlowIntoInspector(flow);
    analyzeCurrentFlow();
    showToast(`Injected threat scenario: ${category}`, "primary");
}

function injectFlowIntoInspector(flow) {
    currentFeatures = { ...flow };
    baselineFeatures = { ...flow };
    buildInspectorFields(flow);
    // Hide what-if delta banner
    document.getElementById('whatIfBanner').classList.add('d-none');
}

function buildInspectorFields(flow) {
    const container = document.getElementById('inspectorFields');
    container.innerHTML = '';

    const priorityFields = [
        'Destination_Port', 'Flow_Duration', 'Total_Fwd_Packets', 'Total_Bwd_Packets',
        'Flow_Packets_s', 'Flow_Bytes_s', 'SYN_Flag_Count', 'ACK_Flag_Count',
        'RST_Flag_Count', 'Down_Up_Ratio', 'Packet_Length_Mean', 'Average_Packet_Size',
        'Flow_IAT_Mean', 'Flow_IAT_Std', 'Init_Win_bytes_forward'
    ];

    priorityFields.forEach(f => {
        if (flow.hasOwnProperty(f)) {
            const val = flow[f];
            const group = document.createElement('div');
            group.className = 'field-group';
            group.innerHTML = `
                <label for="field_${f}">${f.replace(/_/g, ' ')}</label>
                <input type="number" step="any" class="cyber-input" id="field_${f}" 
                       value="${val}" onchange="onFieldValueChange('${f}', this.value)">
            `;
            container.appendChild(group);
        }
    });
}

function onFieldValueChange(feature, value) {
    currentFeatures[feature] = parseFloat(value);
}

function resetFlowInputs() {
    currentFeatures = { ...baselineFeatures };
    buildInspectorFields(currentFeatures);
    analyzeCurrentFlow();
    document.getElementById('whatIfBanner').classList.add('d-none');
    showToast("Reset flow features to original values", "primary");
}

function onModelChange() {
    const sel = document.getElementById('modelSelect').value;
    analyzeCurrentFlow();
    loadGlobalShapImportance();
    showToast(`Switched active model to: ${sel.replace(/_/g, ' ')}`, "primary");
}

/* ==========================================================================
   XAI Inference Execution
   ========================================================================== */
async function analyzeCurrentFlow() {
    const model = document.getElementById('modelSelect').value;

    try {
        const payload = {
            model_name: model,
            features: currentFeatures
        };

        const res = await fetch('/api/predict-explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Inference failed");
        }

        const data = await res.json();
        updateThreatBanner(data);
        renderShapVisuals(data.shap);
        renderLimeVisuals(data.lime);
        renderClassProbabilities(data.class_confidences);
        renderAdvisory(data.advisory, data);
        updateModelConsensus();

    } catch (err) {
        console.error("XAI inference error:", err);
        showToast("Inference error: " + err.message, "danger");
    }
}

function updateThreatBanner(data) {
    const headingEl = document.getElementById('threatClassificationHeading');
    const catBadge = document.getElementById('threatCategoryBadge');
    const sevBadge = document.getElementById('threatSeverityBadge');
    const riskEl = document.getElementById('threatRiskScore');
    const bannerEl = document.getElementById('assessmentBanner');

    headingEl.textContent = data.prediction;
    headingEl.style.color = data.badge_color;

    catBadge.textContent = data.attack_category;
    sevBadge.textContent = `SEVERITY: ${data.severity}`;
    sevBadge.style.color = data.badge_color;
    sevBadge.style.borderColor = data.badge_color;

    riskEl.textContent = `${data.risk_score}%`;
    riskEl.style.color = data.badge_color;

    bannerEl.style.borderColor = data.is_malicious ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)';
}

/* ==========================================================================
   SHAP Visualizations
   ========================================================================== */
function renderShapVisuals(shapData) {
    document.getElementById('shapBaseVal').textContent = shapData.base_value;

    // Top features for bar chart (take top 10 by abs attribution)
    const topItems = shapData.all_attributions.slice(0, 10).reverse();
    const labels = topItems.map(x => x.feature.replace(/_/g, ' '));
    const values = topItems.map(x => x.shap_value);
    const bgColors = values.map(v => v > 0 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(16, 185, 129, 0.85)');
    const borderColors = values.map(v => v > 0 ? '#ef4444' : '#10b981');

    const ctx = document.getElementById('shapBarChart').getContext('2d');
    if (shapChart) shapChart.destroy();

    shapChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'SHAP Value (Contribution to Log-Odds / Risk)',
                data: values,
                backgroundColor: bgColors,
                borderColor: borderColors,
                borderWidth: 1.5,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `SHAP: ${ctx.raw.toFixed(4)} (${ctx.raw > 0 ? '+Malicious Risk' : '-Benign Evidence'})`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 11 } }
                }
            }
        }
    });

    // Populate SHAP Table
    const tbody = document.querySelector('#shapTable tbody');
    tbody.innerHTML = '';
    shapData.all_attributions.slice(0, 12).forEach(item => {
        const tr = document.createElement('tr');
        const isPos = item.shap_value > 0;
        tr.innerHTML = `
            <td><strong>${item.feature}</strong></td>
            <td>${formatNumber(item.raw_value)}</td>
            <td style="color: ${isPos ? '#ef4444' : '#10b981'}; font-weight: 700;">
                ${isPos ? '+' : ''}${item.shap_value.toFixed(4)} (${item.contribution_percentage}%)
            </td>
            <td><span class="stream-tag ${isPos ? 'tag-malicious' : 'tag-benign'}">${item.direction}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

/* ==========================================================================
   LIME Visualizations
   ========================================================================== */
function renderLimeVisuals(limeData) {
    document.getElementById('limeFidelityScore').textContent = limeData.surrogate_fidelity_score;

    const rules = limeData.rules.slice(0, 8).reverse();
    const labels = rules.map(r => r.rule);
    const values = rules.map(r => r.weight);
    const bgColors = values.map(v => v > 0 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(16, 185, 129, 0.85)');

    const ctx = document.getElementById('limeBarChart').getContext('2d');
    if (limeChart) limeChart.destroy();

    limeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'LIME Local Weight',
                data: values,
                backgroundColor: bgColors,
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 10 } }
                }
            }
        }
    });

    // Populate Rule Cards
    const container = document.getElementById('limeRulesList');
    container.innerHTML = '';
    limeData.rules.forEach(r => {
        const isMal = r.weight > 0;
        const card = document.createElement('div');
        card.className = `rule-card ${isMal ? 'rule-malicious' : 'rule-benign'}`;
        card.innerHTML = `
            <div>
                <div class="rule-condition">${r.rule}</div>
                <div class="rule-impact-label">${r.impact}</div>
            </div>
            <div class="rule-weight-badge" style="color: ${isMal ? '#ef4444' : '#10b981'};">
                ${isMal ? '+' : ''}${r.weight}
            </div>
        `;
        container.appendChild(card);
    });
}

/* ==========================================================================
   Multi-Class Probability Distribution
   ========================================================================== */
function renderClassProbabilities(confidences) {
    const labels = Object.keys(confidences);
    const values = Object.values(confidences).map(v => (v * 100).toFixed(1));

    const ctx = document.getElementById('classProbChart').getContext('2d');
    if (classProbChart) classProbChart.destroy();

    classProbChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Confidence (%)',
                data: values,
                backgroundColor: labels.map(l => l === 'BENIGN' ? 'rgba(16, 185, 129, 0.7)' : 'rgba(139, 92, 246, 0.7)'),
                borderColor: labels.map(l => l === 'BENIGN' ? '#10b981' : '#8b5cf6'),
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { size: 10 } }
                }
            }
        }
    });
}

/* ==========================================================================
   SOC Incident Advisory
   ========================================================================== */
function renderAdvisory(advisory, fullData) {
    document.getElementById('advisoryTitle').textContent = advisory.title;
    document.getElementById('advisorySummary').textContent = advisory.summary;

    const actionCodeEl = document.getElementById('advisoryActionCode');
    const actionNoteEl = document.getElementById('advisoryActionNote');
    actionCodeEl.textContent = advisory.incident_action;
    actionNoteEl.textContent = fullData.is_malicious ? "High-priority mitigation triggered" : "Normal traffic pattern validated";

    // Evidence list
    const evList = document.getElementById('advisoryEvidenceList');
    evList.innerHTML = '';
    advisory.evidence.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b; margin-right: 6px;"></i> ${item}`;
        evList.appendChild(li);
    });

    // Mitigation list
    const mitList = document.getElementById('advisoryMitigationList');
    mitList.innerHTML = '';
    if (Array.isArray(advisory.mitigation)) {
        advisory.mitigation.forEach(step => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-shield-check" style="color: #10b981; margin-right: 6px;"></i> ${step}`;
            mitList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = advisory.mitigation;
        mitList.appendChild(li);
    }
}

/* ==========================================================================
   What-If Counterfactual Sandbox
   ========================================================================== */
async function runWhatIfSimulation() {
    const model = document.getElementById('modelSelect').value;

    try {
        const payload = {
            model_name: model,
            original_features: baselineFeatures,
            modifications: currentFeatures
        };

        const res = await fetch('/api/what-if', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("What-if simulation failed");
        const data = await res.json();

        const banner = document.getElementById('whatIfBanner');
        const textEl = document.getElementById('whatIfText');
        banner.classList.remove('d-none');

        const deltaColor = data.risk_score_delta < 0 ? '#10b981' : '#ef4444';
        textEl.innerHTML = `
            <strong>${data.original_prediction} (${data.original_risk_score}%)</strong> 
            &rarr; <strong>${data.counterfactual_prediction} (${data.counterfactual_risk_score}%)</strong>.
            <span style="color: ${deltaColor}; font-weight: 700; margin-left: 8px;">
                Delta: ${data.risk_score_delta > 0 ? '+' : ''}${data.risk_score_delta}%
            </span>
            &mdash; ${data.impact_summary}
        `;

        // Update visuals with counterfactual explanation
        updateThreatBanner(data.detailed_explanation);
        renderShapVisuals(data.detailed_explanation.shap);
        renderLimeVisuals(data.detailed_explanation.lime);
        renderClassProbabilities(data.detailed_explanation.class_confidences);
        renderAdvisory(data.detailed_explanation.advisory, data.detailed_explanation);

        showToast(`Counterfactual evaluated: Delta ${data.risk_score_delta}%`, "warning");

    } catch (err) {
        console.error("What-If error:", err);
        showToast("Error running What-If simulation: " + err.message, "danger");
    }
}

/* ==========================================================================
   Multi-Model Consensus & Benchmark
   ========================================================================== */
async function updateModelConsensus() {
    try {
        const res = await fetch('/api/compare-models', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model_name: 'random_forest',
                features: currentFeatures
            })
        });

        if (!res.ok) return;
        const comparisons = await res.json();

        const container = document.getElementById('consensusGrid');
        container.innerHTML = '';

        comparisons.forEach(item => {
            if (item.error) return;
            const card = document.createElement('div');
            card.className = 'consensus-card';
            const isMal = item.risk_score >= 50;
            const col = isMal ? '#ef4444' : '#10b981';

            card.innerHTML = `
                <div class="consensus-card-model">${item.model.replace(/_/g, ' ').toUpperCase()}</div>
                <div class="consensus-card-pred" style="color: ${col};">${item.prediction}</div>
                <div class="consensus-card-score">Risk: <strong>${item.risk_score}%</strong></div>
                <div style="font-size: 0.68rem; color: #94a3b8; margin-top: 4px;">Top: ${item.top_feature}</div>
            `;
            container.appendChild(card);
        });

    } catch (e) {
        console.warn("Consensus update failed:", e);
    }
}

async function loadBenchmarkTable() {
    try {
        const res = await fetch('/api/benchmark');
        if (!res.ok) return;
        const data = await res.json();

        const tbody = document.querySelector('#benchmarkTable tbody');
        tbody.innerHTML = '';

        data.model_comparison_summary.forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${m.Model.replace(/_/g, ' ')}</strong></td>
                <td><span style="color: #06b6d4;">${m.Binary_Accuracy}%</span></td>
                <td><span style="color: #10b981;">${m.Binary_F1}%</span></td>
                <td><span style="color: #8b5cf6;">${m.Multi_F1_Macro}%</span></td>
                <td>${m.Binary_ROC_AUC}</td>
                <td>${m.Latency_ms} ms</td>
                <td>${formatNumber(m.Throughput_sps)}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.warn("Benchmark load error:", e);
    }
}

/* ==========================================================================
   Global SHAP Importance
   ========================================================================== */
async function loadGlobalShapImportance() {
    const model = document.getElementById('modelSelect').value;
    try {
        const res = await fetch(`/api/global-importance?model=${model}`);
        if (!res.ok) return;
        const data = await res.json();

        const top15 = data.rankings.slice(0, 15).reverse();
        const labels = top15.map(x => x.feature.replace(/_/g, ' '));
        const values = top15.map(x => x.importance);

        const ctx = document.getElementById('globalShapChart').getContext('2d');
        if (globalShapChart) globalShapChart.destroy();

        globalShapChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mean Absolute SHAP (Overall Dataset Impact)',
                    data: values,
                    backgroundColor: 'rgba(6, 182, 212, 0.75)',
                    borderColor: '#06b6d4',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 10 } }
                    }
                }
            }
        });
    } catch (e) {
        console.warn("Global SHAP load error:", e);
    }
}

/* ==========================================================================
   Tabs & Modal Controls
   ========================================================================== */
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

/* ==========================================================================
   Actions: Mitigation & Incident Export
   ========================================================================== */
function triggerSimulatedMitigation() {
    const port = currentFeatures['Destination_Port'] || 80;
    showToast(`Firewall mitigation rule applied: Quarantined Destination Port ${port}`, "danger");
    const noteEl = document.getElementById('advisoryActionNote');
    if (noteEl) noteEl.textContent = `MITIGATED: Rule #FW-${Math.floor(Math.random()*9000+1000)} active on Port ${port}`;
}

function exportIncidentReport() {
    const reportData = {
        timestamp: new Date().toISOString(),
        system: "XAI-IDS v1.0 SOC",
        analyzed_features: currentFeatures
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOC_Incident_Report_${Date.now()}.json`;
    a.click();
    showToast("Incident report downloaded", "primary");
}

/* ==========================================================================
   Utility Helpers
   ========================================================================== */
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    if (typeof num !== 'number') return num;
    if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(1) + 'k';
    return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function showToast(message, type = "primary") {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    let icon = "fa-circle-info";
    if (type === "danger") icon = "fa-triangle-exclamation";
    if (type === "warning") icon = "fa-bolt";
    if (type === "success") icon = "fa-circle-check";

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
