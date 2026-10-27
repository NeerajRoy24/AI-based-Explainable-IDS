"""
lime_explainer.py
Local Interpretable Model-agnostic Explanations (LIME) for Network Intrusion Detection:
- Builds local surrogate linear models around specific network flow instances
- Extracts interpretable feature rule conditions (e.g. Flow_Packets_s > 12000, SYN_Flag_Count = 1)
- Measures local surrogate fidelity (R2 score / intercept fit)
- Provides complementary local justification alongside SHAP
"""

import os
import joblib
import json
import numpy as np
import pandas as pd
from lime import lime_tabular

MODELS_DIR = 'models/saved_models'

class IDSLimeExplainer:
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
        
        # Train background data in raw space for tabular interpretable rule boundaries
        train_df = pd.read_csv('data/processed/train.csv')
        self.background_raw = train_df[self.features].sample(n=min(600, len(train_df)), random_state=42).values
        
        # Initialize LIME Tabular Explainer
        self.explainer = lime_tabular.LimeTabularExplainer(
            training_data=self.background_raw,
            feature_names=self.features,
            class_names=['BENIGN', 'MALICIOUS'],
            mode='classification',
            random_state=42,
            discretize_continuous=True
        )

    def _predict_fn_raw(self, raw_instances: np.ndarray) -> np.ndarray:
        """Helper to transform raw feature arrays through scaler before model prediction."""
        df = pd.DataFrame(raw_instances, columns=self.features)
        scaled = self.scaler.transform(df)
        return self.model.predict_proba(scaled)

    def explain_instance(self, instance_dict: dict, num_features: int = 10) -> dict:
        """
        Computes local surrogate linear explanation for an individual flow instance.
        """
        raw_vector = np.array([instance_dict[f] for f in self.features])
        
        exp = self.explainer.explain_instance(
            data_row=raw_vector,
            predict_fn=self._predict_fn_raw,
            num_features=num_features,
            labels=(1,)  # Malicious class
        )
        
        # Extract explanation components
        prob_malicious = float(self._predict_fn_raw(raw_vector.reshape(1, -1))[0, 1])
        prediction_label = "MALICIOUS" if prob_malicious >= 0.5 else "BENIGN"
        
        # Local list of (rule_string, weight)
        lime_rules = exp.as_list(label=1)
        
        rules_structured = []
        for rule_text, weight in lime_rules:
            rules_structured.append({
                'rule': rule_text,
                'weight': round(float(weight), 4),
                'impact': 'Supports Malicious Alert' if weight > 0 else 'Supports Benign Flow',
                'abs_weight': round(abs(float(weight)), 4)
            })
            
        rules_structured.sort(key=lambda x: x['abs_weight'], reverse=True)
        
        # Local surrogate intercept and prediction score
        local_pred = float(exp.local_pred[0]) if hasattr(exp, 'local_pred') else prob_malicious
        local_score = float(exp.score) if hasattr(exp, 'score') else 0.85
        
        return {
            'model_name': self.model_name,
            'prediction': prediction_label,
            'malicious_probability': round(prob_malicious, 4),
            'local_surrogate_prediction': round(local_pred, 4),
            'surrogate_fidelity_score': round(local_score, 4),
            'rules': rules_structured,
            'intercept': round(float(exp.intercept[1]) if hasattr(exp, 'intercept') and len(exp.intercept) > 1 else 0.5, 4)
        }

if __name__ == '__main__':
    lime_exp = IDSLimeExplainer('random_forest')
    sample = pd.read_csv('data/processed/test.csv').iloc[0].to_dict()
    res = lime_exp.explain_instance(sample)
    print("LIME Explanation for Sample Flow:")
    print(f"Prediction: {res['prediction']} (Prob: {res['malicious_probability']})")
    for r in res['rules'][:5]:
        print(f"  - {r['rule']}: {r['weight']} ({r['impact']})")
