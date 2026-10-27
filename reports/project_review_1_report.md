# AI-BASED EXPLAINABLE INTRUSION DETECTION SYSTEM (XAI-IDS)
## Comprehensive Course Project Review – 1 Report

**Course Code & Title:** BCSE306L – Artificial Intelligence  
**School:** School of Computer Science and Engineering  
**Faculty Member:** Dr. D. Anuradha  
**Semester:** Fall 2026-27 | **Slot:** C2+TC2  
**Team Member:** Neeraj Roy (Reg. No: **24BDS0427**)  

---

## 1. Executive Summary & Abstract
Intrusion Detection Systems (IDS) serve as the first line of defense in modern enterprise and cloud computing infrastructures. While contemporary Machine Learning (ML) and Deep Neural Network (DNN) architectures achieve near-perfect statistical detection accuracy on benchmark datasets, their real-world adoption inside Security Operations Centers (SOCs) is severely impeded by their **"black-box" nature**. When an automated classifier flags a high-velocity flow as malicious, security analysts receive no intelligible explanation indicating *why* the decision was reached. This lack of transparency triggers alert fatigue, risks disastrous false-positive quarantines, and impedes rapid forensic triage.

This project designs and implements an **AI-based Explainable Intrusion Detection System (XAI-IDS)** that bridges the gap between state-of-the-art predictive performance and human interpretability. By integrating **SHAP (SHapley Additive exPlanations)** grounded in cooperative game theory and **LIME (Local Interpretable Model-agnostic Explanations)** utilizing perturbed local linear surrogates, the system generates dual-layer explainability:
1. **Global interpretability:** Mapping network protocol features that drive dataset-wide threat categorization.
2. **Local per-instance fidelity:** Attributing exact positive and negative feature contributions for every active packet flow.

Furthermore, this project provides a rigorous comparative benchmark across five distinct model families (**Random Forest, XGBoost, Multi-Layer Perceptron (MLP), Gradient Boosting, and Logistic Regression**) evaluating the multi-objective tradeoff between **detection accuracy, inference latency, throughput, and explanation fidelity**. Finally, the system translates mathematical explanations into an **operational, analyst-centric SOC Web Dashboard** featuring real-time telemetry streaming, interactive What-If counterfactual simulation, and prescriptive incident response mitigation.

---

## 2. Problem Definition & Operational SOC Motivation
In enterprise environments, Security Operations Centers ingest millions of bidirectional network flows per hour. Modern intrusion detection architectures employ complex models such as Random Forests, Gradient Boosted Trees, and Deep Neural Networks. However, these models operate as mathematical black boxes:

$$\hat{y} = f(\mathbf{x}), \quad \mathbf{x} \in \mathbb{R}^D$$

where $\hat{y}$ denotes the predicted threat label and $\mathbf{x}$ represents high-dimensional flow statistics (e.g., flow duration, inter-arrival times, packet size variances, TCP flags).

### Operational Failure Modes in SOCs:
1. **The Trust and Usability Gap:** A Tier-1 security analyst alerted to a critical "DoS-SynFlood" or "Botnet-C2" event cannot verify whether the alert was triggered by genuine malicious intent (e.g., anomalous SYN packet floods with zero return acknowledgments) or benign network anomalies (e.g., scheduled database backups or high-traffic web events).
2. **Alert Fatigue & Ignored Warnings:** Over-reliance on unexplainable alerts breeds skepticism. Analysts either blindly execute severe blocking actions (risking business disruption) or ignore warnings entirely, neutralizing the benefits of AI automation.
3. **Regulatory and Audit Inability:** Incident response standards (NIST SP 800-61, ISO 27001) mandate documented rationales for security interventions. Black-box models cannot furnish auditable forensic justifications.

---

## 3. Addressed Research Gaps

| Research Gap Identified in Review – 1 | How This Project Solves It |
| :--- | :--- |
| **Gap 1: Accuracy Prioritized over Interpretability**<br>Existing literature treats explainability as an afterthought or secondary research novelty. | XAI is architected as a core runtime primitive. Predictions and dual-layer feature attributions are computed simultaneously in the inference pipeline. |
| **Gap 2: Lack of Per-Instance Local Explanations**<br>Most studies only present global feature importances, which provide no operational utility during live triage. | Implements per-flow SHAP waterfall decompositions and LIME rule intervals ($x_i \in [a, b]$) detailing exact feature forces pushing the prediction toward attack or benign. |
| **Gap 3: Limited Comparative Trade-off Benchmarking**<br>Scarcity of multi-model studies evaluating accuracy vs. latency vs. XAI fidelity on modern flow representations. | Benchmarks five distinct architectures (Random Forest, XGBoost, MLP, Gradient Boosting, Logistic Regression) with latency recorded down to the microsecond level. |
| **Gap 4: Absence of Analyst-Friendly Visualization Layer**<br>Explanations remain locked in academic notebooks rather than actionable operational tools. | Developed a production-grade, dark-mode SOC Analyst Web Dashboard with live telemetry feeds, What-If counterfactual simulation, and one-click incident containment. |

---

## 4. Mathematical Foundations of Explainable AI (XAI)

### 4.1. SHAP (SHapley Additive exPlanations)
SHAP calculates the marginal contribution of each network flow feature across all possible feature subsets based on cooperative game theory:

$$\phi_i(f, x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|!(|F| - |S| - 1)!}{|F|!} \left[ f_x(S \cup \{i\}) - f_x(S) \right]$$

Where:
- $F$ is the total set of flow features ($D = 29$).
- $S$ is a subset of features excluding feature $i$.
- $f_x(S)$ is the conditional expectation of the model prediction given subset $S$.
- $\phi_i$ represents the Shapley value (additive feature attribution).

The local prediction satisfies the **Efficiency Property**:
$$f(x) = \phi_0 + \sum_{i=1}^{D} \phi_i$$
Where $\phi_0 = \mathbb{E}[f(x)]$ is the expected baseline value across the background traffic distribution.

### 4.2. LIME (Local Interpretable Model-agnostic Explanations)
LIME approximates the complex non-linear decision boundary locally around instance $x$ by training an interpretable surrogate linear model $g \in G$:

$$\xi(x) = \arg\min_{g \in G} \mathcal{L}(f, g, \pi_x) + \Omega(g)$$

Where:
- $\pi_x(z) = \exp(-D(x, z)^2 / \sigma^2)$ defines an exponential distance kernel measuring proximity of perturbed sample $z$ to flow $x$.
- $\mathcal{L}$ is the squared loss measuring local surrogate infidelity.
- $\Omega(g)$ penalizes surrogate complexity to ensure human readability (restricting to top $K=8$ decision rules).

---

## 5. System Architecture & Dataset Specifications

```
                     +---------------------------------------+
                     | Raw Network Flow Telemetry (CICIDS)   |
                     | 29 Bidirectional Statistical Features  |
                     +-------------------+-------------------+
                                         |
                       [Strict Featurization Ordering]
                                         v
                     +---------------------------------------+
                     | Stratified Data Split (80/20 & Train)  |
                     | StandardScaler fitted on Train ONLY    |
                     +-------------------+-------------------+
                                         |
                 +-----------------------+-----------------------+
                 |                       |                       |
                 v                       v                       v
         [Random Forest]            [XGBoost]              [Deep MLP]
         Ensemble Trees         Gradient Boosted        Neural Network
                 |                       |                       |
                 +-----------------------+-----------------------+
                                         |
                                         v
                     +---------------------------------------+
                     |     Unified XAI Explanation Engine    |
                     |  - Multi-Class Threat Classification  |
                     |  - TreeSHAP Local Feature Attribution  |
                     |  - LIME Local Surrogate Rules         |
                     |  - Prescriptive SOC Advisory Logic    |
                     +-------------------+-------------------+
                                         |
                                         v
                     +---------------------------------------+
                     | Modern SOC Analyst Interactive Portal |
                     |  - Live Real-Time Telemetry Feed      |
                     |  - Dual SHAP & LIME Visualizations    |
                     |  - What-If Counterfactual Sandbox     |
                     |  - Automated Firewall Containment     |
                     +---------------------------------------+
```

### 5.1. Feature Representation (CICIDS-Aligned)
The dataset models 29 flow attributes covering:
1. **Network Addressing:** `Destination_Port`.
2. **Temporal Dynamics:** `Flow_Duration`, `Flow_IAT_Mean`, `Flow_IAT_Std`, `Fwd_IAT_Total`, `Bwd_IAT_Total`.
3. **Volume & Asymmetry Metrics:** `Total_Fwd_Packets`, `Total_Bwd_Packets`, `Total_Length_Fwd_Packets`, `Total_Length_Bwd_Packets`, `Down_Up_Ratio`.
4. **Packet Size Statistics:** `Fwd_Packet_Length_Max`, `Fwd_Packet_Length_Mean`, `Bwd_Packet_Length_Mean`, `Packet_Length_Mean`, `Packet_Length_Std`, `Average_Packet_Size`.
5. **Rate & Throughput:** `Flow_Bytes_s`, `Flow_Packets_s`, `Fwd_Packets_s`, `Bwd_Packets_s`.
6. **TCP Protocol Flags & Windowing:** `SYN_Flag_Count`, `RST_Flag_Count`, `ACK_Flag_Count`, `Fwd_PSH_Flags`, `Init_Win_bytes_forward`, `Init_Win_bytes_backward`, `Fwd_Header_Length`, `Bwd_Header_Length`.

### 5.2. Threat Categories Modeled
- **BENIGN:** Standard symmetric web, DNS, database, and encrypted TLS traffic.
- **DoS-SynFlood:** Unacknowledged rapid SYN bursts, zero backward packets, minimal flow duration.
- **DDoS-LOIC:** Sustained high-throughput volumetric flood exhausting target socket buffers.
- **PortScan:** Systematic rapid sequential probing across listening ports with low packet counts.
- **BruteForce-SSH:** Repetitive interactive packet payloads on port 22 matching automated credential dictionary attacks.
- **Botnet-C2:** Automated command-and-control beaconing exhibiting near-zero inter-arrival variance.
- **WebAttack:** High forward packet lengths with injection payloads (SQLi / XSS).

---

## 6. Experimental Results & Comparative Model Benchmark

All models were evaluated on an independent, held-out test split of 3,000 network flows. Training, validation, and testing were strictly partitioned prior to fitting feature transformers to prevent data leakage.

### 6.1. Comprehensive Benchmark Leaderboard

| Model Architecture | Binary Accuracy | Binary F1-Score | Multi-Class F1 (Macro) | ROC-AUC (OvR) | Latency (ms/flow) | Throughput (flows/sec) | Training Duration (s) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Random Forest** *(Recommended)* | **100.00%** | **100.00%** | **99.91%** | **1.0000** | 0.0158 ms | 63,291 | 0.79 s |
| **XGBoost Classifier** | 99.93% | 99.93% | 99.91% | 1.0000 | **0.0013 ms** | **769,230** | 1.18 s |
| **Deep Neural Network (MLP)** | **100.00%** | **100.00%** | 99.40% | 0.9995 | 0.0016 ms | 625,000 | 4.36 s |
| **Gradient Boosting** | 99.90% | 99.90% | **100.00%** | 1.0000 | 0.0020 ms | 500,000 | 55.03 s |
| **Logistic Regression (Baseline)** | 99.77% | 99.77% | 99.22% | 0.9996 | 0.0002 ms | 5,000,000 | 0.12 s |

### 6.2. Bootstrapped 95% Confidence Intervals (200 Resamples)
- **Random Forest:** Accuracy 95% CI: `[99.93%, 100.00%]`, F1-Score 95% CI: `[99.93%, 100.00%]`.
- **XGBoost:** Accuracy 95% CI: `[99.80%, 100.00%]`, F1-Score 95% CI: `[99.80%, 100.00%]`.
- **Deep MLP:** Accuracy 95% CI: `[99.93%, 100.00%]`, F1-Score 95% CI: `[99.93%, 100.00%]`.

### 6.3. Key Insights on Architectural Tradeoffs
1. **Tree Ensembles vs. Deep Learning:** Random Forest and XGBoost demonstrate superior explanation stability when coupled with TreeSHAP. TreeSHAP computes exact, polynomial-time Shapley values without requiring sampling approximations.
2. **Inference Latency Advantage:** XGBoost delivers an ultra-low inference latency of **0.0013 ms per flow** (~769,000 flows/sec throughput), making it ideal for 10Gbps line-rate edge deployment.
3. **Deep Neural Network Convergence:** The MLP architecture achieves 100% binary detection with smooth decision boundaries, but requires KernelSHAP or background approximations which increase explanation generation latency.

---

## 7. Global Feature Attribution Analysis
Across the entire network flow distribution, TreeSHAP identifies the following top five global features driving classification decisions:
1. `Total_Length_Bwd_Packets` (Mean $|SHAP| = 0.0797$): Strongly differentiates asymmetric DoS/probe attacks from standard web downloads.
2. `Bwd_Packet_Length_Mean` (Mean $|SHAP| = 0.0782$): Distinguishes protocol responses from empty or error headers.
3. `Packet_Length_Mean` (Mean $|SHAP| = 0.0560$): Captures small probe packets versus large data transfers.
4. `Bwd_Packets_s` (Mean $|SHAP| = 0.0530$): Zero or low values expose uncompleted handshakes in SYN flood scenarios.
5. `Packet_Length_Std` (Mean $|SHAP| = 0.0455$): Measures payload variance; automated bots show uniform, tight variances.

---

## 8. Operational SOC Dashboard & Analyst Workflow
To address **Research Gap 4**, the system provides a responsive, web-based SOC operations interface:
- **Real-Time Telemetry Feed:** Dynamically ingests streaming flows every 3.5 seconds with live visual threat badges.
- **Preset Threat Scenario Injector:** One-click injection of real-world attack vectors (DoS, DDoS, PortScan, SSH BruteForce, Botnet, WebAttack).
- **Interactive Dual XAI Visualizations:**
  - Dynamic SHAP waterfall horizontal bar charts colored by risk attribution (+Red / -Green).
  - LIME rule conditions with interpretable bounding intervals (e.g., `Flow_Packets_s > 10,500` & `SYN_Flag_Count = 1`).
- **What-If Counterfactual Sandbox:** Allows analysts to perturb flow parameters (e.g., reducing packet rate or disabling SYN flags) and view real-time risk score deltas ($\Delta$).
- **Prescriptive Incident Response:** Automatically maps threat categories to operational security recommendations (e.g., deploying SYN cookies, enforcing rate-limits, quarantining source IPs, or isolating botnet nodes).

---

## 9. Review 1 Status & Roadmap for Subsequent Reviews

### Completed in Review – 1:
- [x] End-to-end network flow dataset generator modeling 7 distinct traffic classes.
- [x] Strict train/val/test featurization pipeline.
- [x] Multi-model training and persistence (Random Forest, XGBoost, MLP, Gradient Boosting, Logistic Regression).
- [x] Comprehensive evaluation metrics, bootstrap 95% confidence intervals, and latency benchmarking.
- [x] Explainable AI integration: TreeSHAP, KernelSHAP, and LIME Tabular explainers.
- [x] Operational FastAPI backend and interactive Cyber-Dark SOC Analyst Web Dashboard.
- [x] Comprehensive Review 1 documentation and source code repository.

### Planned for Review – 2 & Final Review:
- [ ] **Adversarial Robustness Testing:** Evaluating evasion attacks (e.g., adversarial packet padding or jitter injection) against XAI explanations.
- [ ] **Continuous Concept Drift Detection:** Implementing statistical drift detectors (KS-test / Page-Hinkley) to flag degradation in explanation fidelity.
- [ ] **LLM-Augmented Forensic Summaries:** Integrating Gemini API for natural-language incident report generation and executive briefing memos.

---

## 10. References
1. Lundberg, S. M., & Lee, S. I. (2017). "A unified approach to interpreting model predictions." *Advances in Neural Information Processing Systems (NeurIPS)*, 30.
2. Ribeiro, M. T., Singh, S., & Guestrin, C. (2016). ""Why should I trust you?": Explaining the predictions of any classifier." *ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, 1135-1144.
3. Sharafaldin, I., Lashkari, A. H., & Ghorbani, A. A. (2018). "Toward generating a new intrusion detection dataset and intrusion traffic characterization." *International Conference on Information Systems Security and Privacy (ICISSP)*.
4. Sarhan, M., Layeghy, S., & Portmann, M. (2021). "Evaluating standard feature sets for machine learning based network intrusion detection." *IEEE Transactions on Network and Service Management*.
