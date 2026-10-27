"""
evaluator.py
Evaluates all trained intrusion detection models on the held-out test dataset:
- Accuracy, Precision (Macro/Weighted), Recall (Macro/Weighted), F1-Score, ROC-AUC
- Inference Latency (ms per sample) & Throughput (samples/sec)
- Bootstrapped 95% Confidence Intervals for F1-score and Accuracy
- Per-class confusion matrices and error analysis
- Exports model comparison metrics to JSON and visual evaluation plots
"""

import os
import time
import json
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report
)

from data.dataset_generator import FEATURES

MODELS_DIR = 'models/saved_models'
REPORTS_DIR = 'reports'
os.makedirs(REPORTS_DIR, exist_ok=True)

MODEL_NAMES = [
    'Random_Forest',
    'XGBoost',
    'Deep_Neural_Network_MLP',
    'Gradient_Boosting',
    'Logistic_Regression'
]

def bootstrap_ci(y_true, y_pred, metric_fn, n_bootstraps=200, ci=0.95, random_state=42):
    rng = np.random.default_rng(random_state)
    bootstrapped_scores = []
    n = len(y_true)
    for _ in range(n_bootstraps):
        indices = rng.integers(0, n, n)
        score = metric_fn(y_true[indices], y_pred[indices])
        bootstrapped_scores.append(score)
    lower = np.percentile(bootstrapped_scores, (1 - ci) / 2 * 100)
    upper = np.percentile(bootstrapped_scores, (1 + ci) / 2 * 100)
    return float(np.mean(bootstrapped_scores)), float(lower), float(upper)

def evaluate_all():
    print("=" * 60)
    print("BENCHMARKING & EVALUATION OF IDS MODELS ON HELD-OUT TEST DATA")
    print("=" * 60)
    
    test_df = pd.read_csv('data/processed/test.csv')
    X_test_raw = test_df[FEATURES]
    y_test_binary = test_df['Is_Malicious'].values
    y_test_multi_str = test_df['Label'].values
    
    scaler = joblib.load(os.path.join(MODELS_DIR, 'scaler.joblib'))
    label_encoder = joblib.load(os.path.join(MODELS_DIR, 'label_encoder.joblib'))
    X_test_scaled = scaler.transform(X_test_raw)
    y_test_multi = label_encoder.transform(y_test_multi_str)
    
    with open(os.path.join(MODELS_DIR, 'training_time_metrics.json'), 'r') as f:
        train_times = json.load(f)
        
    results = {
        'binary_evaluation': {},
        'multiclass_evaluation': {},
        'model_comparison_summary': []
    }
    
    for name in MODEL_NAMES:
        key = name.lower()
        bin_model = joblib.load(os.path.join(MODELS_DIR, f"{key}_binary.joblib"))
        mul_model = joblib.load(os.path.join(MODELS_DIR, f"{key}_multi.joblib"))
        
        # Binary evaluation & latency
        t0 = time.perf_counter()
        y_pred_bin = bin_model.predict(X_test_scaled)
        t1 = time.perf_counter()
        y_prob_bin = bin_model.predict_proba(X_test_scaled)[:, 1] if hasattr(bin_model, 'predict_proba') else None
        
        latency_ms_per_sample = ((t1 - t0) / len(X_test_scaled)) * 1000.0
        throughput_samples_s = len(X_test_scaled) / (t1 - t0 + 1e-9)
        
        bin_acc = accuracy_score(y_test_binary, y_pred_bin)
        bin_f1 = f1_score(y_test_binary, y_pred_bin)
        bin_prec = precision_score(y_test_binary, y_pred_bin)
        bin_rec = recall_score(y_test_binary, y_pred_bin)
        bin_auc = roc_auc_score(y_test_binary, y_prob_bin) if y_prob_bin is not None else 0.0
        
        mean_acc, acc_low, acc_high = bootstrap_ci(y_test_binary, y_pred_bin, accuracy_score)
        mean_f1, f1_low, f1_high = bootstrap_ci(y_test_binary, y_pred_bin, f1_score)
        
        bin_cm = confusion_matrix(y_test_binary, y_pred_bin).tolist()
        
        results['binary_evaluation'][name] = {
            'accuracy': round(bin_acc, 4),
            'precision': round(bin_prec, 4),
            'recall': round(bin_rec, 4),
            'f1_score': round(bin_f1, 4),
            'roc_auc': round(bin_auc, 4),
            'latency_ms_per_sample': round(latency_ms_per_sample, 5),
            'throughput_samples_per_sec': round(throughput_samples_s, 1),
            'f1_95ci': [round(f1_low, 4), round(f1_high, 4)],
            'accuracy_95ci': [round(acc_low, 4), round(acc_high, 4)],
            'confusion_matrix': bin_cm,
            'train_time_sec': train_times.get(name, {}).get('binary_train_time_sec', 0.0)
        }
        
        # Multiclass evaluation
        y_pred_mul = mul_model.predict(X_test_scaled)
        y_prob_mul = mul_model.predict_proba(X_test_scaled) if hasattr(mul_model, 'predict_proba') else None
        
        mul_acc = accuracy_score(y_test_multi, y_pred_mul)
        mul_f1_macro = f1_score(y_test_multi, y_pred_mul, average='macro')
        mul_f1_weighted = f1_score(y_test_multi, y_pred_mul, average='weighted')
        mul_prec_macro = precision_score(y_test_multi, y_pred_mul, average='macro', zero_division=0)
        mul_rec_macro = recall_score(y_test_multi, y_pred_mul, average='macro', zero_division=0)
        
        try:
            mul_auc = roc_auc_score(y_test_multi, y_prob_mul, multi_class='ovr', average='macro') if y_prob_mul is not None else 0.0
        except Exception:
            mul_auc = 0.0
            
        mul_cm = confusion_matrix(y_test_multi, y_pred_mul).tolist()
        class_names = list(label_encoder.classes_)
        report = classification_report(y_test_multi, y_pred_mul, target_names=class_names, output_dict=True, zero_division=0)
        
        results['multiclass_evaluation'][name] = {
            'accuracy': round(mul_acc, 4),
            'f1_macro': round(mul_f1_macro, 4),
            'f1_weighted': round(mul_f1_weighted, 4),
            'precision_macro': round(mul_prec_macro, 4),
            'recall_macro': round(mul_rec_macro, 4),
            'roc_auc_ovr': round(mul_auc, 4),
            'confusion_matrix': mul_cm,
            'classification_report': report,
            'train_time_sec': train_times.get(name, {}).get('multi_train_time_sec', 0.0)
        }
        
        results['model_comparison_summary'].append({
            'Model': name,
            'Binary_Accuracy': round(bin_acc * 100, 2),
            'Binary_F1': round(bin_f1 * 100, 2),
            'Binary_ROC_AUC': round(bin_auc, 4),
            'Multi_F1_Macro': round(mul_f1_macro * 100, 2),
            'Latency_ms': round(latency_ms_per_sample, 4),
            'Throughput_sps': round(throughput_samples_s, 0),
            'Train_Time_s': round(train_times.get(name, {}).get('total_train_time_sec', 0.0), 2)
        })
        
        print(f"[{name}]")
        print(f"  Binary -> Acc: {bin_acc*100:.2f}%, F1: {bin_f1*100:.2f}%, AUC: {bin_auc:.4f}, Latency: {latency_ms_per_sample:.4f}ms")
        print(f"  Multi  -> Acc: {mul_acc*100:.2f}%, Macro F1: {mul_f1_macro*100:.2f}%, ROC-AUC OvR: {mul_auc:.4f}")
        
    # Save results JSON
    benchmark_file = os.path.join(REPORTS_DIR, 'model_benchmark_report.json')
    with open(benchmark_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\nSaved comprehensive benchmark report to: {benchmark_file}")
    
    # Generate Visual Comparison Plots
    generate_comparison_plots(results)
    return results

def generate_comparison_plots(results: dict):
    summary_df = pd.DataFrame(results['model_comparison_summary'])
    
    plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    
    # 1. Detection Performance (F1 vs Accuracy)
    x = np.arange(len(summary_df))
    width = 0.35
    axes[0, 0].bar(x - width/2, summary_df['Binary_Accuracy'], width, label='Accuracy (%)', color='#2563eb')
    axes[0, 0].bar(x + width/2, summary_df['Binary_F1'], width, label='F1-Score (%)', color='#10b981')
    axes[0, 0].set_title('Binary Intrusion Detection Performance', fontsize=12, fontweight='bold')
    axes[0, 0].set_xticks(x)
    axes[0, 0].set_xticklabels([m.replace('_', ' ') for m in summary_df['Model']], rotation=20, ha='right')
    axes[0, 0].set_ylim(80, 102)
    axes[0, 0].set_ylabel('Percentage (%)')
    axes[0, 0].legend()
    
    # 2. Multi-Class Macro F1
    axes[0, 1].bar(summary_df['Model'], summary_df['Multi_F1_Macro'], color='#8b5cf6')
    axes[0, 1].set_title('Multi-Class Attack Category Macro F1-Score', fontsize=12, fontweight='bold')
    axes[0, 1].set_xticks(range(len(summary_df)))
    axes[0, 1].set_xticklabels([m.replace('_', ' ') for m in summary_df['Model']], rotation=20, ha='right')
    axes[0, 1].set_ylim(70, 102)
    axes[0, 1].set_ylabel('Macro F1 (%)')
    
    # 3. Inference Latency Tradeoff
    axes[1, 0].barh([m.replace('_', ' ') for m in summary_df['Model']], summary_df['Latency_ms'], color='#f59e0b')
    axes[1, 0].set_title('Inference Latency per Flow (Lower is Faster)', fontsize=12, fontweight='bold')
    axes[1, 0].set_xlabel('Latency (milliseconds / flow)')
    
    # 4. Training Time Comparison
    axes[1, 1].bar([m.replace('_', ' ') for m in summary_df['Model']], summary_df['Train_Time_s'], color='#ec4899')
    axes[1, 1].set_title('Model Training Duration (Seconds)', fontsize=12, fontweight='bold')
    axes[1, 1].set_xticks(range(len(summary_df)))
    axes[1, 1].set_xticklabels([m.replace('_', ' ') for m in summary_df['Model']], rotation=20, ha='right')
    axes[1, 1].set_ylabel('Seconds')
    
    plt.tight_layout()
    chart_path = os.path.join(REPORTS_DIR, 'model_comparison_charts.png')
    plt.savefig(chart_path, dpi=300)
    plt.close()
    print(f"Generated comparison visualization at: {chart_path}")

if __name__ == '__main__':
    evaluate_all()
