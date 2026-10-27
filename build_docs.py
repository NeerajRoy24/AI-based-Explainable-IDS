"""
build_docs.py
Builds the static GitHub Pages deployment bundle in docs/
Embeds precomputed threat flows, model benchmarks, global SHAP rankings,
and client-side explanation fallbacks so the site runs 100% in any browser.
"""

import os
import json
import shutil
import pandas as pd
from xai.explanation_engine import XAIExplanationEngine
from data.dataset_generator import ATTACK_CLASSES

os.makedirs('docs/static/css', exist_ok=True)
os.makedirs('docs/static/js', exist_ok=True)

# 1. Adapt index.html for relative paths
with open('dashboard/templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html_gh = html.replace('href="/static/css/style.css"', 'href="static/css/style.css"')
html_gh = html_gh.replace('src="/static/js/main.js"', 'src="static/js/main.js"')

with open('docs/index.html', 'w', encoding='utf-8') as f:
    f.write(html_gh)

# 2. Copy stylesheet
shutil.copy('dashboard/static/css/style.css', 'docs/static/css/style.css')

# 3. Precompute data
with open('reports/model_benchmark_report.json', 'r', encoding='utf-8') as f:
    benchmark_data = json.load(f)

test_df = pd.read_csv('data/processed/test.csv')
sample_flows = {}
engine = XAIExplanationEngine()
explanations = {}

for label in ATTACK_CLASSES:
    subset = test_df[test_df['Label'] == label]
    if not subset.empty:
        row = subset.iloc[0].to_dict()
        clean_row = {
            k: (int(v) if isinstance(v, int) else round(float(v), 2) if isinstance(v, float) else v)
            for k, v in row.items()
        }
        sample_flows[label] = clean_row
        explanations[label] = engine.predict_and_explain(clean_row, model_name='random_forest')

shap_eng = engine._get_shap('random_forest')
global_shap = shap_eng.compute_global_importance(n_samples=250)

# 4. Create robust client JS with GitHub Pages offline mode support
with open('dashboard/static/js/main.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

bundle_header = f"""// Pre-bundled fallback datasets for standalone GitHub Pages hosting
const BUNDLED_BENCHMARK = {json.dumps(benchmark_data)};
const BUNDLED_SAMPLE_FLOWS = {json.dumps(sample_flows)};
const BUNDLED_EXPLANATIONS = {json.dumps(explanations)};
const BUNDLED_GLOBAL_SHAP = {json.dumps(global_shap)};
const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');
"""

# Enhance initApp and fetch wrappers
smart_js = bundle_header + js_code

# Replace fetch calls with intelligent fallback
smart_js = smart_js.replace(
    "const resPresets = await fetch('/api/sample-flows');",
    "let resPresets; try { resPresets = await fetch('/api/sample-flows'); } catch(e){ resPresets = null; }\n        if (!resPresets || !resPresets.ok) { presetFlows = BUNDLED_SAMPLE_FLOWS; }"
)

smart_js = smart_js.replace(
    "const res = await fetch('/api/benchmark');",
    "let res; try { res = await fetch('/api/benchmark'); } catch(e){ res = null; }\n        if (!res || !res.ok) { return renderBenchmarkFromData(BUNDLED_BENCHMARK); }"
)

smart_js = smart_js.replace(
    "const res = await fetch(`/api/global-importance?model=${model}`);",
    "let res; try { res = await fetch(`/api/global-importance?model=${model}`); } catch(e){ res = null; }\n        if (!res || !res.ok) { return renderGlobalShapFromData(BUNDLED_GLOBAL_SHAP); }"
)

# Replace stream packet fetch with local simulated pool
stream_fallback = """
async function fetchStreamPacket() {
    try {
        let res;
        try { res = await fetch('/api/stream-flow'); } catch(e) { res = null; }
        if (res && res.ok) {
            const packet = await res.json();
            return addPacketToStreamList(packet);
        }
        // Fallback to pool
        const keys = Object.keys(presetFlows);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const packet = { ...presetFlows[randomKey] };
        packet.Destination_Port = Math.random() > 0.5 ? packet.Destination_Port : Math.floor(Math.random()*65000+1);
        addPacketToStreamList(packet);
    } catch (e) {
        console.warn("Stream fetch failed:", e);
    }
}
"""

smart_js = smart_js.replace(
    """async function fetchStreamPacket() {
    try {
        const res = await fetch('/api/stream-flow');
        if (!res.ok) return;
        const packet = await res.json();
        addPacketToStreamList(packet);
    } catch (e) {
        console.warn("Stream fetch failed:", e);
    }
}""",
    stream_fallback.strip()
)

# Helper functions for benchmark and global shap
helper_funcs = """
function renderBenchmarkFromData(data) {
    const tbody = document.querySelector('#benchmarkTable tbody');
    if (!tbody) return;
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
}

function renderGlobalShapFromData(data) {
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
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { display: false }, ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 10 } } }
            }
        }
    });
}
"""

smart_js += helper_funcs

# In analyzeCurrentFlow: fallback to BUNDLED_EXPLANATIONS
analyze_fallback = """
        let data;
        try {
            const res = await fetch('/api/predict-explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) data = await res.json();
        } catch(e) { data = null; }

        if (!data) {
            const label = currentFeatures['Label'] || 'DoS-SynFlood';
            data = BUNDLED_EXPLANATIONS[label] || BUNDLED_EXPLANATIONS['DoS-SynFlood'];
        }
"""

smart_js = smart_js.replace(
    """        const res = await fetch('/api/predict-explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Inference failed");
        }

        const data = await res.json();""",
    analyze_fallback.strip()
)

with open('docs/static/js/main.js', 'w', encoding='utf-8') as f:
    f.write(smart_js)

print("SUCCESS: docs/ directory built for GitHub Pages!")
