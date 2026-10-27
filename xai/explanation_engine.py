"""
explanation_engine.py
Unified Explainable AI (XAI) Orchestration Engine for SOC Analysts:
- Coordinates Multi-Model Predictions (Binary Alert & Attack Type Categorization)
- Generates Dual SHAP + LIME Explanations
- Synthesizes Domain-Grounded SOC Analyst Incident Advisories & Mitigations
- Provides Interactive What-If Counterfactual Simulation
- Compares explanations across model families (Random Forest, XGBoost, MLP, Gradient Boosting)
"""

import os
import joblib
import json
import numpy as np
import pandas as pd
from typing import Dict, Any, List

from xai.shap_explainer import IDSShapExplainer
from xai.lime_explainer import IDSLimeExplainer
from data.dataset_generator import FEATURES

MODELS_DIR = 'models/saved_models'

class XAIExplanationEngine:
    def __init__(self):
        self.scaler = joblib.load(os.path.join(MODELS_DIR, 'scaler.joblib'))
        self.label_encoder = joblib.load(os.path.join(MODELS_DIR, 'label_encoder.joblib'))
        with open(os.path.join(MODELS_DIR, 'features.json'), 'r') as f:
            self.features = json.load(f)
            
        self._shap_explainers = {}
        self._lime_explainers = {}
        
        # Pre-cache available models
        self.available_models = [
            'random_forest',
            'xgboost',
            'deep_neural_network_mlp',
            'gradient_boosting',
            'logistic_regression'
        ]

    def _get_shap(self, model_name: str) -> IDSShapExplainer:
        model_name = model_name.lower()
        if model_name not in self._shap_explainers:
            self._shap_explainers[model_name] = IDSShapExplainer(model_name)
        return self._shap_explainers[model_name]

    def _get_lime(self, model_name: str) -> IDSLimeExplainer:
        model_name = model_name.lower()
        if model_name not in self._lime_explainers:
            self._lime_explainers[model_name] = IDSLimeExplainer(model_name)
        return self._lime_explainers[model_name]

    def predict_and_explain(self, instance_dict: Dict[str, Any], model_name: str = 'random_forest') -> Dict[str, Any]:
        """
        Executes full prediction and dual XAI breakdown (SHAP + LIME) for a network flow.
        """
        model_name = model_name.lower()
        raw_row = np.array([[float(instance_dict.get(f, 0.0)) for f in self.features]])
        scaled_row = self.scaler.transform(raw_row)
        
        # Load binary & multiclass models
        bin_model = joblib.load(os.path.join(MODELS_DIR, f"{model_name}_binary.joblib"))
        mul_model = joblib.load(os.path.join(MODELS_DIR, f"{model_name}_multi.joblib"))
        
        # Predictions
        prob_malicious = float(bin_model.predict_proba(scaled_row)[0, 1])
        is_attack = prob_malicious >= 0.5
        
        mul_probs = mul_model.predict_proba(scaled_row)[0]
        pred_class_idx = int(np.argmax(mul_probs))
        pred_class_name = str(self.label_encoder.classes_[pred_class_idx])
        
        class_confidences = {
            cls_name: round(float(prob), 4)
            for cls_name, prob in zip(self.label_encoder.classes_, mul_probs)
        }
        
        # Severity calculation
        risk_score = round(prob_malicious * 100, 1)
        if risk_score >= 85:
            severity = "CRITICAL"
            badge_color = "#ef4444"
        elif risk_score >= 60:
            severity = "HIGH"
            badge_color = "#f97316"
        elif risk_score >= 35:
            severity = "MEDIUM"
            badge_color = "#eab308"
        else:
            severity = "LOW (BENIGN)"
            badge_color = "#10b981"
            
        # Compute SHAP explanation
        shap_engine = self._get_shap(model_name)
        shap_res = shap_engine.explain_instance(instance_dict)
        
        # Compute LIME explanation
        lime_engine = self._get_lime(model_name)
        lime_res = lime_engine.explain_instance(instance_dict, num_features=8)
        
        # Synthesize Domain-Grounded SOC Advisory
        advisory = self._generate_soc_advisory(
            pred_class=pred_class_name,
            risk_score=risk_score,
            top_shap=shap_res['top_risk_factors'],
            top_lime=lime_res['rules'],
            instance=instance_dict
        )
        
        return {
            'model_name': model_name,
            'prediction': 'MALICIOUS ATTACK' if is_attack else 'BENIGN TRAFFIC',
            'is_malicious': is_attack,
            'attack_category': pred_class_name,
            'risk_score': risk_score,
            'severity': severity,
            'badge_color': badge_color,
            'malicious_probability': round(prob_malicious, 4),
            'class_confidences': class_confidences,
            'shap': shap_res,
            'lime': lime_res,
            'advisory': advisory
        }

    def simulate_what_if(self, original_instance: Dict[str, Any], modifications: Dict[str, Any], model_name: str = 'random_forest') -> Dict[str, Any]:
        """
        Interactive counterfactual simulation:
        Allows analysts to perturb features (e.g., reduce packet rate, clear SYN flag)
        and inspect the resulting impact on risk score, classification, and SHAP attribution.
        """
        # Baseline prediction
        base_res = self.predict_and_explain(original_instance, model_name=model_name)
        
        # Modified instance
        modified_instance = original_instance.copy()
        for k, v in modifications.items():
            if k in self.features:
                modified_instance[k] = float(v)
                
        mod_res = self.predict_and_explain(modified_instance, model_name=model_name)
        
        risk_delta = round(mod_res['risk_score'] - base_res['risk_score'], 1)
        prob_delta = round(mod_res['malicious_probability'] - base_res['malicious_probability'], 4)
        
        return {
            'original_prediction': base_res['prediction'],
            'original_risk_score': base_res['risk_score'],
            'counterfactual_prediction': mod_res['prediction'],
            'counterfactual_risk_score': mod_res['risk_score'],
            'risk_score_delta': risk_delta,
            'probability_delta': prob_delta,
            'impact_summary': f"Risk score {'decreased' if risk_delta < 0 else 'increased'} by {abs(risk_delta)}% after modifications.",
            'detailed_explanation': mod_res
        }

    def compare_models(self, instance_dict: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Runs the flow instance through all available models to compare decision consistency and explanation fidelity.
        """
        comparisons = []
        for m in self.available_models:
            try:
                res = self.predict_and_explain(instance_dict, model_name=m)
                comparisons.append({
                    'model': m,
                    'prediction': res['prediction'],
                    'attack_category': res['attack_category'],
                    'risk_score': res['risk_score'],
                    'top_feature': res['shap']['top_risk_factors'][0]['feature'] if res['shap']['top_risk_factors'] else 'None',
                    'lime_fidelity': res['lime']['surrogate_fidelity_score']
                })
            except Exception as e:
                comparisons.append({
                    'model': m,
                    'error': str(e)
                })
        return comparisons

    def _generate_soc_advisory(self, pred_class: str, risk_score: float, top_shap: list, top_lime: list, instance: dict) -> dict:
        """Constructs human-actionable SOC advisory based on XAI evidence and network flow telemetry."""
        if risk_score < 35:
            return {
                'title': 'Traffic Flow Verified - Normal Operations',
                'summary': 'The network flow characteristics align with expected benign protocol communications.',
                'evidence': [
                    'Symmetric forward/backward packet distributions',
                    'Standard TCP window sizes and expected acknowledgment sequences'
                ],
                'mitigation': 'No automated blocking or containment required. Flow logged for baseline telemetry.',
                'incident_action': 'ALLOW'
            }
            
        top_risk_names = [f['feature'] for f in top_shap[:3]] if top_shap else []
        port = int(instance.get('Destination_Port', 0))
        pkts_s = float(instance.get('Flow_Packets_s', 0.0))
        
        actions = []
        evidence = []
        
        for factor in top_shap[:3]:
            f_name = factor['feature']
            f_val = factor['raw_value']
            evidence.append(f"{f_name.replace('_', ' ')} = {f_val:,.1f} contributed +{factor['contribution_percentage']}% toward malicious alert.")
            
        if 'DoS' in pred_class or 'SynFlood' in pred_class:
            title = f"Denial-of-Service (SYN Flood) Inbound Alert on Port {port}"
            summary = f"High-velocity asymmetric packet flood ({pkts_s:,.0f} pkts/s) detected without completed TCP handshakes."
            actions = [
                f"Deploy SYN-Cookie validation on edge router/firewall for Port {port}.",
                "Enforce rate-limiting threshold (max 500 pkts/s per source IP).",
                "Inspect perimeter reverse-proxy connection backlog queue."
            ]
            action_code = "RATE_LIMIT_DROP"
        elif 'DDoS' in pred_class:
            title = f"Distributed Volumetric Attack Alert Targeting Port {port}"
            summary = "Sustained high-throughput flow with elevated packet counts exhausting server buffers."
            actions = [
                "Activate Cloud/BGP DDoS scrubbing center route redirection.",
                f"Apply egress/ingress blackhole ACLs for high-volume source prefixes.",
                "Review edge load-balancer health metrics."
            ]
            action_code = "SCRUB_TRAFFIC"
        elif 'PortScan' in pred_class:
            title = f"Reconnaissance / Port Scanning Probe Detected"
            summary = "Rapid low-packet probing activity scanning system listening ports."
            actions = [
                "Temporarily quarantine originating IP address for 60 minutes via iptables/firewall.",
                "Verify exposed perimeter ports and ensure stealth/drop response on closed ports.",
                "Correlate source IP with threat intelligence threat feeds."
            ]
            action_code = "QUARANTINE_IP"
        elif 'BruteForce' in pred_class:
            title = f"Credential Brute-Force Attempt on Port {port}"
            summary = "Repetitive interactive payloads detected matching dictionary/credential attack patterns."
            actions = [
                f"Enforce fail2ban or multi-factor authentication on Port {port}.",
                "Isolate compromised target service and audit authentication failure logs.",
                "Mandate public key authentication only and disable password logins."
            ]
            action_code = "BLOCK_AUTH"
        elif 'Botnet' in pred_class:
            title = "Command & Control (C2) Botnet Beaconing Alert"
            summary = "Flow displays periodic inter-arrival timing signatures indicative of malware heartbeat polling."
            actions = [
                "Isolate originating host machine from the internal LAN.",
                "Capture live memory dump and execute EDR endpoint forensic scan.",
                "Block destination C2 IP/domain at enterprise DNS resolver and perimeter egress."
            ]
            action_code = "ISOLATE_HOST"
        elif 'WebAttack' in pred_class:
            title = f"Web Application Attack (Injection / Exploitation) on Port {port}"
            summary = "Anomalously large forward payloads with high variance detected targeting web endpoints."
            actions = [
                "Engage Web Application Firewall (WAF) deep packet inspection.",
                "Inspect HTTP request URI parameter sanitization and SQL injection filters.",
                "Audit web server access logs for anomalous error response codes (500/403)."
            ]
            action_code = "WAF_BLOCK"
        else:
            title = f"Malicious Network Flow Alert - Category: {pred_class}"
            summary = "Suspicious network flow characteristics deviating significantly from standard protocol norms."
            actions = [
                "Perform deep packet inspection on subsequent traffic from this session.",
                "Review firewall logs and alert SOC Tier-2 analyst for manual inspection."
            ]
            action_code = "ALERT_SOC"
            
        return {
            'title': title,
            'summary': summary,
            'evidence': evidence,
            'mitigation': actions,
            'incident_action': action_code
        }
