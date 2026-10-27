"""
run_pipeline.py
End-to-End Orchestration Pipeline for Explainable AI Intrusion Detection System:
1. Generates realistic multi-attack network flow dataset (CICIDS standard)
2. Splits dataset strictly into train/val/test sets before feature scaling
3. Trains multiple classification models:
   - Random Forest
   - XGBoost
   - Deep Neural Network (MLP)
   - Gradient Boosting
   - Logistic Regression
4. Evaluates performance, inference latency, throughput, and 95% bootstrap CIs
5. Computes global SHAP feature importance & summary plots
6. Validates local SHAP and LIME explanation inference
"""

import os
import sys
import time

def run():
    print("=" * 70)
    print("   AI-BASED EXPLAINABLE INTRUSION DETECTION SYSTEM (XAI-IDS)")
    print("   Course: BCSE306L - Artificial Intelligence")
    print("   Student: Neeraj Roy (24BDS0427) | Faculty: Dr. D. Anuradha")
    print("=" * 70)
    
    start_time = time.time()
    
    # Step 1: Dataset Generation
    print("\n[STEP 1/5] Generating CICIDS-aligned network flow dataset...")
    from data.dataset_generator import save_and_split_dataset
    save_and_split_dataset(n_samples=15000)
    
    # Step 2: Model Training
    print("\n[STEP 2/5] Training 5 classifier architectures with strict featurization...")
    from models.trainer import load_data, train_all_models
    data = load_data()
    train_all_models(data)
    
    # Step 3: Comparative Evaluation & Benchmarking
    print("\n[STEP 3/5] Evaluating models on held-out test data & benchmarking latency...")
    from models.evaluator import evaluate_all
    benchmark_results = evaluate_all()
    
    # Step 4: Explainable AI (SHAP & LIME) Global Importance Computation
    print("\n[STEP 4/5] Computing global SHAP explanations & feature importance...")
    from xai.shap_explainer import IDSShapExplainer
    shap_exp = IDSShapExplainer('random_forest')
    shap_info = shap_exp.compute_global_importance(n_samples=300)
    print("Top 5 Global Influential Features across Dataset:")
    for item in shap_info['rankings'][:5]:
        print(f"  * {item['feature']}: {item['importance']:.4f}")
        
    # Step 5: Test End-to-End Prediction and Local Explanation
    print("\n[STEP 5/5] Validating dual SHAP & LIME local explanation engine...")
    from xai.explanation_engine import XAIExplanationEngine
    engine = XAIExplanationEngine()
    import pandas as pd
    test_df = pd.read_csv('data/processed/test.csv')
    sample_flow = test_df.iloc[0].to_dict()
    res = engine.predict_and_explain(sample_flow, model_name='random_forest')
    
    print("\nSample Flow Explanation Verified:")
    print(f"  Target Port: {sample_flow.get('Destination_Port')}")
    print(f"  Ground Truth: {sample_flow.get('Label')}")
    print(f"  Prediction: {res['prediction']} (Category: {res['attack_category']}, Risk: {res['risk_score']}%)")
    print(f"  Top SHAP Risk Factor: {res['shap']['top_risk_factors'][0]['feature'] if res['shap']['top_risk_factors'] else 'None'}")
    print(f"  LIME Fidelity R^2: {res['lime']['surrogate_fidelity_score']}")
    print(f"  SOC Action: {res['advisory']['incident_action']}")
    
    elapsed = time.time() - start_time
    print("\n" + "=" * 70)
    print(f"ALL PIPELINE STAGES COMPLETED SUCCESSFULLY IN {elapsed:.2f} SECONDS!")
    print("=" * 70)

if __name__ == '__main__':
    run()
