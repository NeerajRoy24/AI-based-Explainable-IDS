"""
shap_explainer.py
Explainable AI (XAI) module powered by SHAP (SHapley Additive exPlanations):
- Uses TreeSHAP for tree ensemble architectures (Random Forest, XGBoost)
- Computes global feature attributions across background network flow data
- Computes per-instance local attributions (waterfall / force values) for real-time alerts
- Formats structured explanation payloads for the SOC web interface and exports summary plots
"""

import os
import joblib
import json
import numpy as np
import pandas as pd
import shap
import matplotlib.pyplot as plt

MODELS_DIR = 'models/saved_models'
XAI_DIR = 'xai/artifacts'
os.makedirs(XAI_DIR, exist_ok=True)

class IDSShapExplainer:
    def __init__(self, model_name: str = 'random_forest'):
        self.model_name = model_name.lower()
        self.scaler = joblib.load(os.path.join(MODELS_DIR, 'scaler.joblib'))
        self.label_encoder = joblib.load(os.path.join(MODELS_DIR, 'label_encoder.joblib'))
        with open(os.path.join(MODELS_DIR, 'features.json'), 'r') as f:
            self.features = json.load(f)
            
        model_file = os.path.join(MODELS_DIR, f"{self.model_name}_binary.joblib")
        if not os.path.exists(model_file):
            raise FileNotFoundError(f"Model file {model_file} not found. Please train models first.")
        self.model = joblib.load(model_file)
        
        # Load background data for baseline expectations
        train_df = pd.read_csv('data/processed/train.csv')
        self.background_raw = train_df[self.features].sample(n=min(300, len(train_df)), random_state=42)
        self.background_scaled = self.scaler.transform(self.background_raw)
        
        # Initialize explainer
        if 'forest' in self.model_name or 'xgboost' in self.model_name or 'gradient' in self.model_name:
            self.explainer = shap.TreeExplainer(self.model)
        else:
            # Kernel or Linear explainer fallback
            self.explainer = shap.LinearExplainer(self.model, self.background_scaled)
            
        self._global_importance = None

    def compute_global_importance(self, n_samples: int = 500) -> dict:
        """Computes global feature rankings based on mean absolute SHAP values."""
        test_df = pd.read_csv('data/processed/test.csv')
        sample_df = test_df[self.features].sample(n=min(n_samples, len(test_df)), random_state=42)
        sample_scaled = self.scaler.transform(sample_df)
        
        shap_values = self.explainer.shap_values(sample_scaled)
        
        # Handle binary classification shapes (list of arrays or 2D array or 3D array)
        if isinstance(shap_values, list):
            # Typically index 1 is malicious/attack class
            vals = shap_values[1] if len(shap_values) > 1 else shap_values[0]
        elif len(np.shape(shap_values)) == 3:
            vals = shap_values[:, :, 1]
        else:
            vals = shap_values
            
        mean_abs_shap = np.mean(np.abs(vals), axis=0)
        rankings = sorted(
            [{'feature': f, 'importance': float(score)} for f, score in zip(self.features, mean_abs_shap)],
            key=lambda x: x['importance'],
            reverse=True
        )
        
        # Generate and save global SHAP summary plot
        plt.figure(figsize=(10, 8))
        shap.summary_plot(vals, sample_scaled, feature_names=self.features, show=False, max_display=15)
        plot_path = os.path.join(XAI_DIR, f"{self.model_name}_global_shap_summary.png")
        plt.tight_layout()
        plt.savefig(plot_path, dpi=250)
        plt.close()
        
        self._global_importance = rankings
        return {
            'model': self.model_name,
            'rankings': rankings,
            'summary_plot': plot_path
        }

    def explain_instance(self, instance_dict: dict) -> dict:
        """
        Computes local per-instance SHAP attribution for a specific network flow record.
        Returns:
            - base_value: expected model output
            - prediction_proba: model predicted probability of malicious attack
            - feature_attributions: sorted list of features pushing toward malicious (positive) or benign (negative)
        """
        row_raw = np.array([[instance_dict[f] for f in self.features]])
        row_scaled = self.scaler.transform(row_raw)
        
        prob_malicious = float(self.model.predict_proba(row_scaled)[0, 1])
        prediction_label = "MALICIOUS" if prob_malicious >= 0.5 else "BENIGN"
        
        shap_raw = self.explainer.shap_values(row_scaled)
        
        # Unpack SHAP values for class 1 (Malicious)
        if isinstance(shap_raw, list):
            sv = shap_raw[1][0] if len(shap_raw) > 1 else shap_raw[0][0]
        elif len(np.shape(shap_raw)) == 3:
            sv = shap_raw[0, :, 1]
        else:
            sv = shap_raw[0]
            
        # Base value (expected output)
        if hasattr(self.explainer, 'expected_value'):
            ev = self.explainer.expected_value
            base_val = float(ev[1]) if isinstance(ev, (list, np.ndarray)) and len(ev) > 1 else float(ev)
        else:
            base_val = 0.5
            
        attributions = []
        for feat_name, raw_val, shap_val in zip(self.features, row_raw[0], sv):
            attributions.append({
                'feature': feat_name,
                'raw_value': float(raw_val),
                'shap_value': float(shap_val),
                'abs_shap': float(abs(shap_val)),
                'direction': 'Increases Risk (Malicious)' if shap_val > 0 else 'Decreases Risk (Benign)',
                'contribution_percentage': 0.0  # calculated below
            })
            
        # Sort by absolute SHAP impact
        attributions.sort(key=lambda x: x['abs_shap'], reverse=True)
        total_abs = sum(x['abs_shap'] for x in attributions) + 1e-9
        for item in attributions:
            item['contribution_percentage'] = round((item['abs_shap'] / total_abs) * 100.0, 2)
            
        return {
            'model_name': self.model_name,
            'prediction': prediction_label,
            'malicious_probability': round(prob_malicious, 4),
            'base_value': round(base_val, 4),
            'top_risk_factors': [x for x in attributions if x['shap_value'] > 0][:5],
            'top_benign_factors': [x for x in attributions if x['shap_value'] < 0][:5],
            'all_attributions': attributions
        }

if __name__ == '__main__':
    explainer = IDSShapExplainer('random_forest')
    print("Computing global SHAP feature importance...")
    global_info = explainer.compute_global_importance(n_samples=200)
    print("Top 5 Global Features:")
    for item in global_info['rankings'][:5]:
        print(f"  - {item['feature']}: {item['importance']:.4f}")
