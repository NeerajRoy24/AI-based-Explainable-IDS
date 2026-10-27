"""
trainer.py
Trains multiple ML and Deep Learning architectures for Network Intrusion Detection:
1. Random Forest (Tree Ensemble)
2. XGBoost (Gradient Boosted Trees)
3. Multi-Layer Perceptron (Deep Neural Network / MLP)
4. Gradient Boosting (Sequential Ensembling)
5. Logistic Regression (Linear Baseline)

Follows strict featurization ordering:
- Fits scaler and encoders ONLY on training split
- Saves models, scalers, metadata for XAI explainers and real-time dashboard inference
"""

import os
import time
import joblib
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier

from data.dataset_generator import FEATURES, ATTACK_CLASSES

MODELS_DIR = 'models/saved_models'
os.makedirs(MODELS_DIR, exist_ok=True)

def load_data():
    train_df = pd.read_csv('data/processed/train.csv')
    val_df = pd.read_csv('data/processed/val.csv')
    test_df = pd.read_csv('data/processed/test.csv')
    
    X_train = train_df[FEATURES]
    y_train_binary = train_df['Is_Malicious']
    y_train_multi = train_df['Label']
    
    X_val = val_df[FEATURES]
    y_val_binary = val_df['Is_Malicious']
    y_val_multi = val_df['Label']
    
    X_test = test_df[FEATURES]
    y_test_binary = test_df['Is_Malicious']
    y_test_multi = test_df['Label']
    
    # Fit LabelEncoder on training multi-class labels
    label_encoder = LabelEncoder()
    label_encoder.fit(y_train_multi)
    
    y_train_multi_enc = label_encoder.transform(y_train_multi)
    y_val_multi_enc = label_encoder.transform(y_val_multi)
    y_test_multi_enc = label_encoder.transform(y_test_multi)
    
    # Fit StandardScaler strictly on training set
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_val_scaled = scaler.transform(X_val)
    X_test_scaled = scaler.transform(X_test)
    
    # Save preprocessing artifacts
    joblib.dump(scaler, os.path.join(MODELS_DIR, 'scaler.joblib'))
    joblib.dump(label_encoder, os.path.join(MODELS_DIR, 'label_encoder.joblib'))
    with open(os.path.join(MODELS_DIR, 'features.json'), 'w') as f:
        json.dump(FEATURES, f, indent=2)
    with open(os.path.join(MODELS_DIR, 'classes.json'), 'w') as f:
        json.dump(list(label_encoder.classes_), f, indent=2)
        
    return {
        'X_train': X_train, 'X_train_scaled': X_train_scaled,
        'y_train_binary': y_train_binary, 'y_train_multi': y_train_multi_enc,
        'X_val': X_val, 'X_val_scaled': X_val_scaled,
        'y_val_binary': y_val_binary, 'y_val_multi': y_val_multi_enc,
        'X_test': X_test, 'X_test_scaled': X_test_scaled,
        'y_test_binary': y_test_binary, 'y_test_multi': y_test_multi_enc,
        'scaler': scaler, 'label_encoder': label_encoder
    }

def train_all_models(data: dict):
    print("=" * 60)
    print("TRAINING MULTIPLE CLASSIFIER ARCHITECTURES (XAI COMPARATIVE STUDY)")
    print("=" * 60)
    
    X_train_scaled = data['X_train_scaled']
    y_train_binary = data['y_train_binary']
    y_train_multi = data['y_train_multi']
    
    models = {
        'Random_Forest': {
            'binary': RandomForestClassifier(n_estimators=100, max_depth=16, random_state=42, n_jobs=-1),
            'multi': RandomForestClassifier(n_estimators=100, max_depth=16, random_state=42, n_jobs=-1)
        },
        'XGBoost': {
            'binary': XGBClassifier(n_estimators=100, max_depth=6, learning_rate=0.1, random_state=42, n_jobs=-1, eval_metric='logloss'),
            'multi': XGBClassifier(n_estimators=100, max_depth=6, learning_rate=0.1, random_state=42, n_jobs=-1, eval_metric='mlogloss')
        },
        'Deep_Neural_Network_MLP': {
            'binary': MLPClassifier(hidden_layer_sizes=(128, 64, 32), max_iter=200, random_state=42, early_stopping=True),
            'multi': MLPClassifier(hidden_layer_sizes=(128, 64, 32), max_iter=200, random_state=42, early_stopping=True)
        },
        'Gradient_Boosting': {
            'binary': GradientBoostingClassifier(n_estimators=80, max_depth=5, learning_rate=0.1, random_state=42),
            'multi': GradientBoostingClassifier(n_estimators=80, max_depth=5, learning_rate=0.1, random_state=42)
        },
        'Logistic_Regression': {
            'binary': LogisticRegression(max_iter=500, random_state=42),
            'multi': LogisticRegression(max_iter=500, random_state=42)
        }
    }
    
    training_metrics = {}
    
    for name, model_pair in models.items():
        print(f"\n---> Training {name}...")
        
        # Binary model training
        t0 = time.time()
        model_pair['binary'].fit(X_train_scaled, y_train_binary)
        t_bin = time.time() - t0
        
        # Multiclass model training
        t0 = time.time()
        model_pair['multi'].fit(X_train_scaled, y_train_multi)
        t_mul = time.time() - t0
        
        # Save models
        bin_path = os.path.join(MODELS_DIR, f"{name.lower()}_binary.joblib")
        mul_path = os.path.join(MODELS_DIR, f"{name.lower()}_multi.joblib")
        joblib.dump(model_pair['binary'], bin_path)
        joblib.dump(model_pair['multi'], mul_path)
        
        training_metrics[name] = {
            'binary_train_time_sec': round(t_bin, 4),
            'multi_train_time_sec': round(t_mul, 4),
            'total_train_time_sec': round(t_bin + t_mul, 4)
        }
        print(f"     Saved binary model to: {bin_path} (trained in {t_bin:.2f}s)")
        print(f"     Saved multiclass model to: {mul_path} (trained in {t_mul:.2f}s)")
        
    metrics_path = os.path.join(MODELS_DIR, 'training_time_metrics.json')
    with open(metrics_path, 'w') as f:
        json.dump(training_metrics, f, indent=2)
        
    print("\nTraining completed successfully for all models!")
    return models

if __name__ == '__main__':
    data = load_data()
    train_all_models(data)
