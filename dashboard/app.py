"""
app.py
FastAPI Web Application providing an interactive Security Operations Center (SOC)
dashboard for the AI-based Explainable Intrusion Detection System.
"""

import os
import json
import random
import numpy as np
import pandas as pd
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import Dict, Any, Optional

from xai.explanation_engine import XAIExplanationEngine
from data.dataset_generator import FEATURES, ATTACK_CLASSES

app = FastAPI(
    title="Explainable AI Intrusion Detection System (XAI-IDS)",
    description="Operational SOC Analyst Dashboard with SHAP & LIME transparency",
    version="1.0.0"
)

# Static and template setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATES_DIR)

# Initialize explanation engine lazily or at startup
engine = None

def get_engine():
    global engine
    if engine is None:
        engine = XAIExplanationEngine()
    return engine

class FlowPredictionRequest(BaseModel):
    model_name: str = 'random_forest'
    features: Dict[str, Any]

class WhatIfRequest(BaseModel):
    model_name: str = 'random_forest'
    original_features: Dict[str, Any]
    modifications: Dict[str, Any]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "features": FEATURES,
            "attack_classes": ATTACK_CLASSES
        }
    )

@app.get("/api/models")
async def get_models():
    models = [
        {"id": "random_forest", "name": "Random Forest Classifier", "type": "Tree Ensemble", "recommended": True},
        {"id": "xgboost", "name": "XGBoost Classifier", "type": "Gradient Boosted Trees", "recommended": False},
        {"id": "deep_neural_network_mlp", "name": "Deep Neural Network (MLP)", "type": "Multi-Layer Perceptron", "recommended": False},
        {"id": "gradient_boosting", "name": "Gradient Boosting Classifier", "type": "Ensemble", "recommended": False},
        {"id": "logistic_regression", "name": "Logistic Regression Baseline", "type": "Linear Baseline", "recommended": False}
    ]
    return JSONResponse(content={"models": models})

@app.get("/api/benchmark")
async def get_benchmark():
    benchmark_path = os.path.join("reports", "model_benchmark_report.json")
    if os.path.exists(benchmark_path):
        with open(benchmark_path, "r") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    return JSONResponse(content={"error": "Benchmark report not yet generated"}, status_code=404)

@app.get("/api/sample-flows")
async def get_sample_flows():
    """Returns representative curated flows for each attack type and benign traffic."""
    test_path = os.path.join("data", "processed", "test.csv")
    if not os.path.exists(test_path):
        return JSONResponse(content={"error": "Dataset not found"}, status_code=404)
        
    df = pd.read_csv(test_path)
    samples = {}
    for label in ATTACK_CLASSES:
        subset = df[df['Label'] == label]
        if not subset.empty:
            row = subset.iloc[0].to_dict()
            samples[label] = {k: (int(v) if isinstance(v, (np.integer, int)) else round(float(v), 2) if isinstance(v, (np.floating, float)) else v) for k, v in row.items()}
            
    return JSONResponse(content=samples)

@app.get("/api/stream-flow")
async def stream_flow():
    """Simulates a real-time incoming network packet flow for live SOC monitoring."""
    test_path = os.path.join("data", "processed", "test.csv")
    if not os.path.exists(test_path):
        return JSONResponse(content={"error": "Dataset not found"}, status_code=404)
        
    df = pd.read_csv(test_path)
    random_row = df.sample(n=1).iloc[0].to_dict()
    clean_row = {
        k: (int(v) if isinstance(v, (np.integer, int)) else round(float(v), 2) if isinstance(v, (np.floating, float)) else v)
        for k, v in random_row.items()
    }
    return JSONResponse(content=clean_row)

@app.post("/api/predict-explain")
async def predict_explain(req: FlowPredictionRequest):
    eng = get_engine()
    try:
        result = eng.predict_and_explain(req.features, model_name=req.model_name)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/api/what-if")
async def what_if_simulation(req: WhatIfRequest):
    eng = get_engine()
    try:
        result = eng.simulate_what_if(req.original_features, req.modifications, model_name=req.model_name)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/api/compare-models")
async def compare_models(req: FlowPredictionRequest):
    eng = get_engine()
    try:
        result = eng.compare_models(req.features)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/api/global-importance")
async def global_importance(model: str = "random_forest"):
    eng = get_engine()
    try:
        shap_eng = eng._get_shap(model)
        data = shap_eng.compute_global_importance(n_samples=250)
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
