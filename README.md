# AI-Based Explainable Intrusion Detection System (XAI-IDS)

[![Live Website](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?logo=github&style=for-the-badge)](https://neerajroy24.github.io/AI-based-Explainable-IDS/)
[![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python&style=for-the-badge)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.162.0-009688?logo=fastapi&style=for-the-badge)](https://fastapi.tiangolo.com)
[![XAI](https://img.shields.io/badge/XAI-SHAP%20%2B%20LIME-ff69b4&style=for-the-badge)](#)

> 🌐 **Public Live Demo:** **[https://neerajroy24.github.io/AI-based-Explainable-IDS/](https://neerajroy24.github.io/AI-based-Explainable-IDS/)**

> **Course:** BCSE306L – Artificial Intelligence  
> **Faculty:** Dr. D. Anuradha  
> **Student:** Neeraj Roy (Reg No: **24BDS0427**)  
> **School:** School of Computer Science and Engineering  
> **Project Document:** [Project document - VTOP.docx](Project%20document%20-%20VTOP.docx)  

---

## 🛡️ Project Overview

Traditional Machine Learning Intrusion Detection Systems (IDS) achieve high accuracy but function as opaque **"black boxes"**. Security Operations Center (SOC) analysts receive automated alerts without any justification, triggering alert fatigue, false-positive paralysis, and delayed incident mitigation.

**XAI-IDS** solves this critical trust and operational gap by coupling high-performance classifiers (**Random Forest, XGBoost, Deep Neural Network (MLP), Gradient Boosting, and Logistic Regression**) with dual-layer Explainable AI:
- **SHAP (SHapley Additive exPlanations):** Cooperative game-theoretic feature attribution providing local waterfall force breakdowns and global dataset-wide feature rankings.
- **LIME (Local Interpretable Model-Agnostic Explanations):** Local surrogate linear models defining exact interpretable decision rule boundaries.
- **Interactive SOC Analyst Web Dashboard:** A cyber-dark operations console featuring live real-time flow streaming, preset attack injection, interactive What-If counterfactual simulation, and prescriptive containment advisories.

---

## 📁 Repository Structure

```
AI project/
├── data/
│   ├── raw/
│   │   └── cicids_flow_dataset.csv     # Raw 15,000 network flow records
│   ├── processed/
│   │   ├── train.csv                   # Stratified training split (10,200 flows)
│   │   ├── val.csv                     # Stratified validation split (1,800 flows)
│   │   └── test.csv                    # Held-out test split (3,000 flows)
│   └── dataset_generator.py            # High-fidelity CICIDS flow generator
│
├── models/
│   ├── trainer.py                      # Multi-model training pipeline with strict featurization
│   ├── evaluator.py                    # Comprehensive comparative evaluation & bootstrap CIs
│   └── saved_models/                   # Serialized model joblibs, scalers, & encoders
│       ├── random_forest_binary.joblib
│       ├── random_forest_multi.joblib
│       ├── xgboost_binary.joblib
│       ├── xgboost_multi.joblib
│       ├── deep_neural_network_mlp_binary.joblib
│       ├── gradient_boosting_binary.joblib
│       ├── logistic_regression_binary.joblib
│       ├── scaler.joblib
│       ├── label_encoder.joblib
│       ├── features.json
│       └── classes.json
│
├── xai/
│   ├── shap_explainer.py               # TreeSHAP and KernelSHAP explanation engines
│   ├── lime_explainer.py               # LIME Tabular local surrogate explainer
│   ├── explanation_engine.py           # Unified explanation orchestrator & SOC advisory
│   └── artifacts/
│       └── random_forest_global_shap_summary.png
│
├── dashboard/
│   ├── app.py                          # FastAPI web application & REST API
│   ├── templates/
│   │   └── index.html                  # Cyberpunk dark-mode SOC Analyst Portal
│   └── static/
│       ├── css/
│       │   └── style.css               # Glassmorphic cyber theme stylesheet
│       └── js/
│           └── main.js                 # Frontend telemetry stream & Chart.js logic
│
├── reports/
│   ├── model_benchmark_report.json     # Machine-readable benchmark evaluation metrics
│   └── model_comparison_charts.png     # 4-panel visual comparative benchmark chart
│
├── Project document - VTOP.docx        # Official VTOP Course Project Document
├── run_pipeline.py                     # One-click end-to-end data, training, & evaluation
├── run_dashboard.py                    # One-click launcher for the SOC Web Dashboard
├── requirements.txt                    # Frozen dependency specifications
└── README.md                           # Documentation and instructions
```

---

## 📊 Comparative Architectural Benchmark (Test Set: 3,000 Flows)

| Architecture | Binary Accuracy | Binary F1 | Multi-Class F1 | ROC-AUC | Inference Latency | Throughput |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Random Forest** *(Recommended)* | **100.00%** | **100.00%** | **99.91%** | **1.0000** | 0.0158 ms | 63,291 flows/s |
| **XGBoost Classifier** | 99.93% | 99.93% | 99.91% | 1.0000 | **0.0013 ms** | **769,230 flows/s** |
| **Deep Neural Network (MLP)** | **100.00%** | **100.00%** | 99.40% | 0.9995 | 0.0016 ms | 625,000 flows/s |
| **Gradient Boosting** | 99.90% | 99.90% | **100.00%** | 1.0000 | 0.0020 ms | 500,000 flows/s |
| **Logistic Regression Baseline** | 99.77% | 99.77% | 99.22% | 0.9996 | 0.0002 ms | 5,000,000 flows/s |

---

## 🚀 Quick Start Guide

### 1. Activate Environment & Run Pipeline
To regenerate the dataset, train all five model families, compute benchmarks, and generate XAI artifacts:

```bash
# In Windows PowerShell:
.\.venv\Scripts\python.exe run_pipeline.py
```

### 2. Launch the SOC Web Dashboard
To launch the interactive SOC operations console:

```bash
.\.venv\Scripts\python.exe run_dashboard.py
```

Open your browser and navigate to:  
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 🖥️ SOC Dashboard Features

1. **Real-Time Network Flow Telemetry:** Live streaming packet feed with simulated packet ingestion every 3.5 seconds.
2. **Threat Scenario Quick-Loader:** 1-click preset threat injection (`DoS-SynFlood`, `DDoS-LOIC`, `PortScan`, `BruteForce-SSH`, `Botnet-C2`, `WebAttack`, and `BENIGN`).
3. **Local SHAP Feature Attribution:** Visual waterfall horizontal bar chart detailing positive risk-increasing forces vs negative benign evidence.
4. **LIME Local Surrogate Rules:** Extracted interpretable condition intervals and fidelity $R^2$ scores.
5. **Interactive What-If Counterfactual Sandbox:** Tweak packet rates, flags, or payload statistics and instantly inspect risk score deltas ($\Delta$).
6. **Prescriptive Incident Containment:** Automated mapping of threat indicators to firewall and edge mitigation actions (e.g., rate-limiting, SYN-cookies, prefix blackholing).
7. **Academic Project Info Modal:** Accessible via navbar button containing all project guidelines, student details, and research formulations.

---

## 📜 Academic Course Project Details
- **Course:** BCSE306L – Artificial Intelligence
- **Faculty:** Dr. D. Anuradha
- **Student:** Neeraj Roy (Reg. No: 24BDS0427)
- **Slot:** C2+TC2
- **Semester:** Fall 2026-27
- **Official VTOP Document:** [Project document - VTOP.docx](Project%20document%20-%20VTOP.docx)
