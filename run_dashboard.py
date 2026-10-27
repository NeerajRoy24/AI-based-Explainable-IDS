"""
run_dashboard.py
Launcher script for the XAI-IDS Interactive SOC Web Dashboard.
Runs Uvicorn server on http://127.0.0.1:8000
"""

import uvicorn
import os
import sys

if __name__ == '__main__':
    print("=" * 65)
    print("  LAUNCHING EXPLAINABLE AI INTRUSION DETECTION SYSTEM (XAI-IDS)")
    print("  SOC Analyst Dashboard: http://127.0.0.1:8000")
    print("  Student: Neeraj Roy (24BDS0427) | Faculty: Dr. D. Anuradha")
    print("=" * 65)
    uvicorn.run("dashboard.app:app", host="127.0.0.1", port=8000, reload=False)
