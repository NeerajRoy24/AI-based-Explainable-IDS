// Pre-bundled fallback datasets for standalone GitHub Pages hosting
const BUNDLED_BENCHMARK = {"binary_evaluation": {"Random_Forest": {"accuracy": 1.0, "precision": 1.0, "recall": 1.0, "f1_score": 1.0, "roc_auc": 1.0, "latency_ms_per_sample": 0.01582, "throughput_samples_per_sec": 63205.8, "f1_95ci": [1.0, 1.0], "accuracy_95ci": [1.0, 1.0], "confusion_matrix": [[1477, 0], [0, 1523]], "train_time_sec": 0.4023}, "XGBoost": {"accuracy": 0.9993, "precision": 1.0, "recall": 0.9987, "f1_score": 0.9993, "roc_auc": 1.0, "latency_ms_per_sample": 0.00131, "throughput_samples_per_sec": 766126.8, "f1_95ci": [0.9983, 1.0], "accuracy_95ci": [0.9983, 1.0], "confusion_matrix": [[1477, 0], [2, 1521]], "train_time_sec": 0.4418}, "Deep_Neural_Network_MLP": {"accuracy": 1.0, "precision": 1.0, "recall": 1.0, "f1_score": 1.0, "roc_auc": 1.0, "latency_ms_per_sample": 0.00164, "throughput_samples_per_sec": 609842.7, "f1_95ci": [1.0, 1.0], "accuracy_95ci": [1.0, 1.0], "confusion_matrix": [[1477, 0], [0, 1523]], "train_time_sec": 1.5402}, "Gradient_Boosting": {"accuracy": 0.999, "precision": 0.9987, "recall": 0.9993, "f1_score": 0.999, "roc_auc": 1.0, "latency_ms_per_sample": 0.002, "throughput_samples_per_sec": 499725.1, "f1_95ci": [0.998, 1.0], "accuracy_95ci": [0.998, 1.0], "confusion_matrix": [[1475, 2], [1, 1522]], "train_time_sec": 6.0643}, "Logistic_Regression": {"accuracy": 0.9977, "precision": 0.9961, "recall": 0.9993, "f1_score": 0.9977, "roc_auc": 1.0, "latency_ms_per_sample": 0.00017, "throughput_samples_per_sec": 5890425.9, "f1_95ci": [0.996, 0.9993], "accuracy_95ci": [0.996, 0.9993], "confusion_matrix": [[1471, 6], [1, 1522]], "train_time_sec": 0.0225}}, "multiclass_evaluation": {"Random_Forest": {"accuracy": 0.9993, "f1_macro": 0.9991, "f1_weighted": 0.9993, "precision_macro": 0.9992, "recall_macro": 0.9991, "roc_auc_ovr": 1.0, "confusion_matrix": [[1477, 0, 0, 0, 0, 0, 0], [0, 157, 0, 0, 0, 0, 0], [0, 0, 250, 0, 0, 0, 0], [0, 0, 0, 300, 0, 0, 0], [0, 0, 0, 0, 361, 0, 0], [0, 0, 0, 0, 2, 307, 0], [0, 0, 0, 0, 0, 0, 146]], "classification_report": {"BENIGN": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 1477.0}, "Botnet-C2": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 157.0}, "BruteForce-SSH": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 250.0}, "DDoS-LOIC": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 300.0}, "DoS-SynFlood": {"precision": 0.9944903581267218, "recall": 1.0, "f1-score": 0.9972375690607734, "support": 361.0}, "PortScan": {"precision": 1.0, "recall": 0.9935275080906149, "f1-score": 0.9967532467532467, "support": 309.0}, "WebAttack": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 146.0}, "accuracy": 0.9993333333333333, "macro avg": {"precision": 0.9992129083038174, "recall": 0.9990753582986593, "f1-score": 0.9991415451162887, "support": 3000.0}, "weighted avg": {"precision": 0.9993370064279155, "recall": 0.9993333333333333, "f1-score": 0.9993331718925641, "support": 3000.0}}, "train_time_sec": 0.3946}, "XGBoost": {"accuracy": 0.9993, "f1_macro": 0.9991, "f1_weighted": 0.9993, "precision_macro": 0.9992, "recall_macro": 0.9991, "roc_auc_ovr": 1.0, "confusion_matrix": [[1477, 0, 0, 0, 0, 0, 0], [0, 157, 0, 0, 0, 0, 0], [0, 0, 250, 0, 0, 0, 0], [0, 0, 0, 300, 0, 0, 0], [0, 0, 0, 0, 361, 0, 0], [0, 0, 0, 0, 2, 307, 0], [0, 0, 0, 0, 0, 0, 146]], "classification_report": {"BENIGN": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 1477.0}, "Botnet-C2": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 157.0}, "BruteForce-SSH": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 250.0}, "DDoS-LOIC": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 300.0}, "DoS-SynFlood": {"precision": 0.9944903581267218, "recall": 1.0, "f1-score": 0.9972375690607734, "support": 361.0}, "PortScan": {"precision": 1.0, "recall": 0.9935275080906149, "f1-score": 0.9967532467532467, "support": 309.0}, "WebAttack": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 146.0}, "accuracy": 0.9993333333333333, "macro avg": {"precision": 0.9992129083038174, "recall": 0.9990753582986593, "f1-score": 0.9991415451162887, "support": 3000.0}, "weighted avg": {"precision": 0.9993370064279155, "recall": 0.9993333333333333, "f1-score": 0.9993331718925641, "support": 3000.0}}, "train_time_sec": 0.7396}, "Deep_Neural_Network_MLP": {"accuracy": 0.9953, "f1_macro": 0.994, "f1_weighted": 0.9953, "precision_macro": 0.9947, "recall_macro": 0.9935, "roc_auc_ovr": 0.9995, "confusion_matrix": [[1477, 0, 0, 0, 0, 0, 0], [0, 157, 0, 0, 0, 0, 0], [0, 0, 250, 0, 0, 0, 0], [0, 0, 0, 300, 0, 0, 0], [0, 0, 0, 0, 361, 0, 0], [0, 0, 0, 0, 14, 295, 0], [0, 0, 0, 0, 0, 0, 146]], "classification_report": {"BENIGN": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 1477.0}, "Botnet-C2": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 157.0}, "BruteForce-SSH": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 250.0}, "DDoS-LOIC": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 300.0}, "DoS-SynFlood": {"precision": 0.9626666666666667, "recall": 1.0, "f1-score": 0.9809782608695652, "support": 361.0}, "PortScan": {"precision": 1.0, "recall": 0.9546925566343042, "f1-score": 0.9768211920529801, "support": 309.0}, "WebAttack": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 146.0}, "accuracy": 0.9953333333333333, "macro avg": {"precision": 0.9946666666666666, "recall": 0.993527508090615, "f1-score": 0.9939713504175065, "support": 3000.0}, "weighted avg": {"precision": 0.9955075555555556, "recall": 0.9953333333333333, "f1-score": 0.9953236335060947, "support": 3000.0}}, "train_time_sec": 2.8247}, "Gradient_Boosting": {"accuracy": 1.0, "f1_macro": 1.0, "f1_weighted": 1.0, "precision_macro": 1.0, "recall_macro": 1.0, "roc_auc_ovr": 1.0, "confusion_matrix": [[1477, 0, 0, 0, 0, 0, 0], [0, 157, 0, 0, 0, 0, 0], [0, 0, 250, 0, 0, 0, 0], [0, 0, 0, 300, 0, 0, 0], [0, 0, 0, 0, 361, 0, 0], [0, 0, 0, 0, 0, 309, 0], [0, 0, 0, 0, 0, 0, 146]], "classification_report": {"BENIGN": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 1477.0}, "Botnet-C2": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 157.0}, "BruteForce-SSH": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 250.0}, "DDoS-LOIC": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 300.0}, "DoS-SynFlood": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 361.0}, "PortScan": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 309.0}, "WebAttack": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 146.0}, "accuracy": 1.0, "macro avg": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 3000.0}, "weighted avg": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 3000.0}}, "train_time_sec": 48.9685}, "Logistic_Regression": {"accuracy": 0.994, "f1_macro": 0.9922, "f1_weighted": 0.994, "precision_macro": 0.9932, "recall_macro": 0.9917, "roc_auc_ovr": 0.9996, "confusion_matrix": [[1477, 0, 0, 0, 0, 0, 0], [0, 157, 0, 0, 0, 0, 0], [0, 0, 250, 0, 0, 0, 0], [0, 0, 0, 300, 0, 0, 0], [0, 0, 0, 0, 361, 0, 0], [0, 0, 0, 0, 18, 291, 0], [0, 0, 0, 0, 0, 0, 146]], "classification_report": {"BENIGN": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 1477.0}, "Botnet-C2": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 157.0}, "BruteForce-SSH": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 250.0}, "DDoS-LOIC": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 300.0}, "DoS-SynFlood": {"precision": 0.9525065963060686, "recall": 1.0, "f1-score": 0.9756756756756757, "support": 361.0}, "PortScan": {"precision": 1.0, "recall": 0.941747572815534, "f1-score": 0.97, "support": 309.0}, "WebAttack": {"precision": 1.0, "recall": 1.0, "f1-score": 1.0, "support": 146.0}, "accuracy": 0.994, "macro avg": {"precision": 0.9932152280437242, "recall": 0.9916782246879334, "f1-score": 0.9922393822393822, "support": 3000.0}, "weighted avg": {"precision": 0.9942849604221636, "recall": 0.994, "f1-score": 0.993982972972973, "support": 3000.0}}, "train_time_sec": 0.1005}}, "model_comparison_summary": [{"Model": "Random_Forest", "Binary_Accuracy": 100.0, "Binary_F1": 100.0, "Binary_ROC_AUC": 1.0, "Multi_F1_Macro": 99.91, "Latency_ms": 0.0158, "Throughput_sps": 63206.0, "Train_Time_s": 0.8}, {"Model": "XGBoost", "Binary_Accuracy": 99.93, "Binary_F1": 99.93, "Binary_ROC_AUC": 1.0, "Multi_F1_Macro": 99.91, "Latency_ms": 0.0013, "Throughput_sps": 766127.0, "Train_Time_s": 1.18}, {"Model": "Deep_Neural_Network_MLP", "Binary_Accuracy": 100.0, "Binary_F1": 100.0, "Binary_ROC_AUC": 1.0, "Multi_F1_Macro": 99.4, "Latency_ms": 0.0016, "Throughput_sps": 609843.0, "Train_Time_s": 4.36}, {"Model": "Gradient_Boosting", "Binary_Accuracy": 99.9, "Binary_F1": 99.9, "Binary_ROC_AUC": 1.0, "Multi_F1_Macro": 100.0, "Latency_ms": 0.002, "Throughput_sps": 499725.0, "Train_Time_s": 55.03}, {"Model": "Logistic_Regression", "Binary_Accuracy": 99.77, "Binary_F1": 99.77, "Binary_ROC_AUC": 1.0, "Multi_F1_Macro": 99.22, "Latency_ms": 0.0002, "Throughput_sps": 5890426.0, "Train_Time_s": 0.12}]};
const BUNDLED_SAMPLE_FLOWS = {"BENIGN": {"Destination_Port": 80, "Flow_Duration": 196497.77, "Total_Fwd_Packets": 13, "Total_Bwd_Packets": 12, "Total_Length_Fwd_Packets": 3741.43, "Total_Length_Bwd_Packets": 7234.15, "Fwd_Packet_Length_Max": 515.14, "Fwd_Packet_Length_Mean": 287.8, "Bwd_Packet_Length_Mean": 602.85, "Flow_Bytes_s": 55853.16, "Flow_Packets_s": 127.22, "Flow_IAT_Mean": 7557.61, "Flow_IAT_Std": 6743.72, "Fwd_IAT_Total": 176848.0, "Bwd_IAT_Total": 167023.11, "Fwd_PSH_Flags": 1, "Fwd_Header_Length": 260, "Bwd_Header_Length": 240, "Fwd_Packets_s": 66.16, "Bwd_Packets_s": 61.07, "Packet_Length_Mean": 439.02, "Packet_Length_Std": 249.56, "SYN_Flag_Count": 0, "RST_Flag_Count": 0, "ACK_Flag_Count": 0, "Down_Up_Ratio": 0.92, "Average_Packet_Size": 439.02, "Init_Win_bytes_forward": 8192, "Init_Win_bytes_backward": 29200, "Label": "BENIGN", "Is_Malicious": 0}, "DoS-SynFlood": {"Destination_Port": 443, "Flow_Duration": 881.5, "Total_Fwd_Packets": 3, "Total_Bwd_Packets": 0, "Total_Length_Fwd_Packets": 149.4, "Total_Length_Bwd_Packets": 0.0, "Fwd_Packet_Length_Max": 49.8, "Fwd_Packet_Length_Mean": 49.8, "Bwd_Packet_Length_Mean": 0.0, "Flow_Bytes_s": 167582.27, "Flow_Packets_s": 3365.11, "Flow_IAT_Mean": 220.38, "Flow_IAT_Std": 48.9, "Fwd_IAT_Total": 881.5, "Bwd_IAT_Total": 0.0, "Fwd_PSH_Flags": 0, "Fwd_Header_Length": 60, "Bwd_Header_Length": 0, "Fwd_Packets_s": 3365.11, "Bwd_Packets_s": 0.0, "Packet_Length_Mean": 49.8, "Packet_Length_Std": 4.92, "SYN_Flag_Count": 1, "RST_Flag_Count": 0, "ACK_Flag_Count": 0, "Down_Up_Ratio": 0.0, "Average_Packet_Size": 49.8, "Init_Win_bytes_forward": 1024, "Init_Win_bytes_backward": 0, "Label": "DoS-SynFlood", "Is_Malicious": 1}, "DDoS-LOIC": {"Destination_Port": 443, "Flow_Duration": 1996752.94, "Total_Fwd_Packets": 170, "Total_Bwd_Packets": 10, "Total_Length_Fwd_Packets": 52453.75, "Total_Length_Bwd_Packets": 230.78, "Fwd_Packet_Length_Max": 462.83, "Fwd_Packet_Length_Mean": 308.55, "Bwd_Packet_Length_Mean": 23.08, "Flow_Bytes_s": 26384.97, "Flow_Packets_s": 90.15, "Flow_IAT_Mean": 11676.92, "Flow_IAT_Std": 75.65, "Fwd_IAT_Total": 1956817.88, "Bwd_IAT_Total": 199675.29, "Fwd_PSH_Flags": 0, "Fwd_Header_Length": 3400, "Bwd_Header_Length": 200, "Fwd_Packets_s": 85.14, "Bwd_Packets_s": 5.01, "Packet_Length_Mean": 292.69, "Packet_Length_Std": 227.77, "SYN_Flag_Count": 0, "RST_Flag_Count": 0, "ACK_Flag_Count": 1, "Down_Up_Ratio": 0.06, "Average_Packet_Size": 292.69, "Init_Win_bytes_forward": 65535, "Init_Win_bytes_backward": 1024, "Label": "DDoS-LOIC", "Is_Malicious": 1}, "PortScan": {"Destination_Port": 27829, "Flow_Duration": 2931.87, "Total_Fwd_Packets": 2, "Total_Bwd_Packets": 0, "Total_Length_Fwd_Packets": 127.53, "Total_Length_Bwd_Packets": 0.0, "Fwd_Packet_Length_Max": 63.76, "Fwd_Packet_Length_Mean": 63.76, "Bwd_Packet_Length_Mean": 0.0, "Flow_Bytes_s": 43349.85, "Flow_Packets_s": 679.84, "Flow_IAT_Mean": 977.29, "Flow_IAT_Std": 25.67, "Fwd_IAT_Total": 2931.87, "Bwd_IAT_Total": 0.0, "Fwd_PSH_Flags": 0, "Fwd_Header_Length": 40, "Bwd_Header_Length": 0, "Fwd_Packets_s": 679.84, "Bwd_Packets_s": 0.0, "Packet_Length_Mean": 63.76, "Packet_Length_Std": 13.72, "SYN_Flag_Count": 1, "RST_Flag_Count": 1, "ACK_Flag_Count": 0, "Down_Up_Ratio": 0.0, "Average_Packet_Size": 63.76, "Init_Win_bytes_forward": 2048, "Init_Win_bytes_backward": 0, "Label": "PortScan", "Is_Malicious": 1}, "BruteForce-SSH": {"Destination_Port": 22, "Flow_Duration": 837782.98, "Total_Fwd_Packets": 29, "Total_Bwd_Packets": 26, "Total_Length_Fwd_Packets": 3093.98, "Total_Length_Bwd_Packets": 2314.68, "Fwd_Packet_Length_Max": 234.72, "Fwd_Packet_Length_Mean": 106.69, "Bwd_Packet_Length_Mean": 89.03, "Flow_Bytes_s": 6455.84, "Flow_Packets_s": 65.65, "Flow_IAT_Mean": 14960.41, "Flow_IAT_Std": 2117.03, "Fwd_IAT_Total": 795893.83, "Bwd_IAT_Total": 754004.68, "Fwd_PSH_Flags": 1, "Fwd_Header_Length": 580, "Bwd_Header_Length": 520, "Fwd_Packets_s": 34.61, "Bwd_Packets_s": 31.03, "Packet_Length_Mean": 98.34, "Packet_Length_Std": 44.4, "SYN_Flag_Count": 1, "RST_Flag_Count": 1, "ACK_Flag_Count": 1, "Down_Up_Ratio": 0.9, "Average_Packet_Size": 98.34, "Init_Win_bytes_forward": 65535, "Init_Win_bytes_backward": 65535, "Label": "BruteForce-SSH", "Is_Malicious": 1}, "Botnet-C2": {"Destination_Port": 8080, "Flow_Duration": 7835816.68, "Total_Fwd_Packets": 7, "Total_Bwd_Packets": 7, "Total_Length_Fwd_Packets": 377.65, "Total_Length_Bwd_Packets": 517.51, "Fwd_Packet_Length_Max": 70.13, "Fwd_Packet_Length_Mean": 53.95, "Bwd_Packet_Length_Mean": 73.93, "Flow_Bytes_s": 114.24, "Flow_Packets_s": 1.79, "Flow_IAT_Mean": 522387.78, "Flow_IAT_Std": 18.81, "Fwd_IAT_Total": 7522384.01, "Bwd_IAT_Total": 7365667.68, "Fwd_PSH_Flags": 1, "Fwd_Header_Length": 140, "Bwd_Header_Length": 140, "Fwd_Packets_s": 0.89, "Bwd_Packets_s": 0.89, "Packet_Length_Mean": 63.94, "Packet_Length_Std": 7.92, "SYN_Flag_Count": 0, "RST_Flag_Count": 0, "ACK_Flag_Count": 1, "Down_Up_Ratio": 1.0, "Average_Packet_Size": 63.94, "Init_Win_bytes_forward": 32768, "Init_Win_bytes_backward": 32768, "Label": "Botnet-C2", "Is_Malicious": 1}, "WebAttack": {"Destination_Port": 443, "Flow_Duration": 91845.52, "Total_Fwd_Packets": 6, "Total_Bwd_Packets": 6, "Total_Length_Fwd_Packets": 7900.73, "Total_Length_Bwd_Packets": 3955.62, "Fwd_Packet_Length_Max": 1843.5, "Fwd_Packet_Length_Mean": 1316.79, "Bwd_Packet_Length_Mean": 659.27, "Flow_Bytes_s": 129076.12, "Flow_Packets_s": 130.64, "Flow_IAT_Mean": 7065.04, "Flow_IAT_Std": 1544.21, "Fwd_IAT_Total": 84497.88, "Bwd_IAT_Total": 80824.05, "Fwd_PSH_Flags": 1, "Fwd_Header_Length": 120, "Bwd_Header_Length": 120, "Fwd_Packets_s": 65.32, "Bwd_Packets_s": 65.32, "Packet_Length_Mean": 988.03, "Packet_Length_Std": 240.56, "SYN_Flag_Count": 0, "RST_Flag_Count": 0, "ACK_Flag_Count": 1, "Down_Up_Ratio": 1.0, "Average_Packet_Size": 988.03, "Init_Win_bytes_forward": 65535, "Init_Win_bytes_backward": 65535, "Label": "WebAttack", "Is_Malicious": 1}};
const BUNDLED_EXPLANATIONS = {"BENIGN": {"model_name": "random_forest", "prediction": "BENIGN TRAFFIC", "is_malicious": false, "attack_category": "BENIGN", "risk_score": 0.0, "severity": "LOW (BENIGN)", "badge_color": "#10b981", "malicious_probability": 0.0, "class_confidences": {"BENIGN": 1.0, "Botnet-C2": 0.0, "BruteForce-SSH": 0.0, "DDoS-LOIC": 0.0, "DoS-SynFlood": 0.0, "PortScan": 0.0, "WebAttack": 0.0}, "shap": {"model_name": "random_forest", "prediction": "BENIGN", "malicious_probability": 0.0, "base_value": 0.5078, "top_risk_factors": [{"feature": "Fwd_PSH_Flags", "raw_value": 1.0, "shap_value": 0.001301199724237824, "abs_shap": 0.001301199724237824, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.25}, {"feature": "Fwd_Packets_s", "raw_value": 66.16, "shap_value": 0.00040245150441621167, "abs_shap": 0.00040245150441621167, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.08}], "top_benign_factors": [{"feature": "Total_Length_Bwd_Packets", "raw_value": 7234.15, "shap_value": -0.0724174796016676, "abs_shap": 0.0724174796016676, "direction": "Decreases Risk (Benign)", "contribution_percentage": 14.17}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 602.85, "shap_value": -0.06768831194627727, "abs_shap": 0.06768831194627727, "direction": "Decreases Risk (Benign)", "contribution_percentage": 13.24}, {"feature": "Packet_Length_Std", "raw_value": 249.56, "shap_value": -0.05401058609385415, "abs_shap": 0.05401058609385415, "direction": "Decreases Risk (Benign)", "contribution_percentage": 10.57}, {"feature": "Bwd_Packets_s", "raw_value": 61.07, "shap_value": -0.03855388869820481, "abs_shap": 0.03855388869820481, "direction": "Decreases Risk (Benign)", "contribution_percentage": 7.54}, {"feature": "Flow_IAT_Std", "raw_value": 6743.72, "shap_value": -0.036683464144358746, "abs_shap": 0.036683464144358746, "direction": "Decreases Risk (Benign)", "contribution_percentage": 7.18}], "all_attributions": [{"feature": "Total_Length_Bwd_Packets", "raw_value": 7234.15, "shap_value": -0.0724174796016676, "abs_shap": 0.0724174796016676, "direction": "Decreases Risk (Benign)", "contribution_percentage": 14.17}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 602.85, "shap_value": -0.06768831194627727, "abs_shap": 0.06768831194627727, "direction": "Decreases Risk (Benign)", "contribution_percentage": 13.24}, {"feature": "Packet_Length_Std", "raw_value": 249.56, "shap_value": -0.05401058609385415, "abs_shap": 0.05401058609385415, "direction": "Decreases Risk (Benign)", "contribution_percentage": 10.57}, {"feature": "Bwd_Packets_s", "raw_value": 61.07, "shap_value": -0.03855388869820481, "abs_shap": 0.03855388869820481, "direction": "Decreases Risk (Benign)", "contribution_percentage": 7.54}, {"feature": "Flow_IAT_Std", "raw_value": 6743.72, "shap_value": -0.036683464144358746, "abs_shap": 0.036683464144358746, "direction": "Decreases Risk (Benign)", "contribution_percentage": 7.18}, {"feature": "Packet_Length_Mean", "raw_value": 439.02, "shap_value": -0.03461347808121638, "abs_shap": 0.03461347808121638, "direction": "Decreases Risk (Benign)", "contribution_percentage": 6.77}, {"feature": "Fwd_Packet_Length_Mean", "raw_value": 287.8, "shap_value": -0.028081853992515303, "abs_shap": 0.028081853992515303, "direction": "Decreases Risk (Benign)", "contribution_percentage": 5.49}, {"feature": "Init_Win_bytes_backward", "raw_value": 29200.0, "shap_value": -0.02500167501081875, "abs_shap": 0.02500167501081875, "direction": "Decreases Risk (Benign)", "contribution_percentage": 4.89}, {"feature": "Init_Win_bytes_forward", "raw_value": 8192.0, "shap_value": -0.023344544369729527, "abs_shap": 0.023344544369729527, "direction": "Decreases Risk (Benign)", "contribution_percentage": 4.57}, {"feature": "Average_Packet_Size", "raw_value": 439.02, "shap_value": -0.022765776026385205, "abs_shap": 0.022765776026385205, "direction": "Decreases Risk (Benign)", "contribution_percentage": 4.45}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 515.14, "shap_value": -0.021829950282966748, "abs_shap": 0.021829950282966748, "direction": "Decreases Risk (Benign)", "contribution_percentage": 4.27}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 3741.43, "shap_value": -0.010282126935268355, "abs_shap": 0.010282126935268355, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.01}, {"feature": "Total_Bwd_Packets", "raw_value": 12.0, "shap_value": -0.00962788020430504, "abs_shap": 0.00962788020430504, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.88}, {"feature": "Flow_Duration", "raw_value": 196497.77, "shap_value": -0.0083530794026625, "abs_shap": 0.0083530794026625, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.63}, {"feature": "Fwd_Header_Length", "raw_value": 260.0, "shap_value": -0.00802519007992397, "abs_shap": 0.00802519007992397, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.57}, {"feature": "Down_Up_Ratio", "raw_value": 0.92, "shap_value": -0.007682000081679961, "abs_shap": 0.007682000081679961, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.5}, {"feature": "Fwd_IAT_Total", "raw_value": 176848.0, "shap_value": -0.006512077953568499, "abs_shap": 0.006512077953568499, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.27}, {"feature": "Total_Fwd_Packets", "raw_value": 13.0, "shap_value": -0.0061469284051137545, "abs_shap": 0.0061469284051137545, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.2}, {"feature": "Bwd_Header_Length", "raw_value": 240.0, "shap_value": -0.006031262437197376, "abs_shap": 0.006031262437197376, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.18}, {"feature": "SYN_Flag_Count", "raw_value": 0.0, "shap_value": -0.005646699175026094, "abs_shap": 0.005646699175026094, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.1}, {"feature": "ACK_Flag_Count", "raw_value": 0.0, "shap_value": -0.005100110791301064, "abs_shap": 0.005100110791301064, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.0}, {"feature": "Bwd_IAT_Total", "raw_value": 167023.11, "shap_value": -0.004797983650683568, "abs_shap": 0.004797983650683568, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.94}, {"feature": "Flow_Packets_s", "raw_value": 127.22, "shap_value": -0.0020426798123532723, "abs_shap": 0.0020426798123532723, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.4}, {"feature": "Flow_Bytes_s", "raw_value": 55853.16, "shap_value": -0.0020286148723839947, "abs_shap": 0.0020286148723839947, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.4}, {"feature": "Flow_IAT_Mean", "raw_value": 7557.61, "shap_value": -0.0016325500751642923, "abs_shap": 0.0016325500751642923, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.32}, {"feature": "Fwd_PSH_Flags", "raw_value": 1.0, "shap_value": 0.001301199724237824, "abs_shap": 0.001301199724237824, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.25}, {"feature": "Destination_Port", "raw_value": 80.0, "shap_value": -0.0005628897654636553, "abs_shap": 0.0005628897654636553, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.11}, {"feature": "Fwd_Packets_s", "raw_value": 66.16, "shap_value": 0.00040245150441621167, "abs_shap": 0.00040245150441621167, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.08}, {"feature": "RST_Flag_Count", "raw_value": 0.0, "shap_value": -5.275220917103571e-06, "abs_shap": 5.275220917103571e-06, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.0}]}, "lime": {"model_name": "random_forest", "prediction": "BENIGN", "malicious_probability": 0.0, "local_surrogate_prediction": 0.1886, "surrogate_fidelity_score": 0.1203, "rules": [{"rule": "Flow_IAT_Std > 3371.49", "weight": -0.0642, "impact": "Supports Benign Flow", "abs_weight": 0.0642}, {"rule": "199.19 < Fwd_Packet_Length_Mean <= 297.42", "weight": -0.0488, "impact": "Supports Benign Flow", "abs_weight": 0.0488}, {"rule": "404.37 < Bwd_Packet_Length_Mean <= 688.21", "weight": -0.0458, "impact": "Supports Benign Flow", "abs_weight": 0.0458}, {"rule": "14600.00 < Init_Win_bytes_backward <= 65535.00", "weight": -0.0321, "impact": "Supports Benign Flow", "abs_weight": 0.0321}, {"rule": "0.00 < Fwd_PSH_Flags <= 1.00", "weight": 0.0319, "impact": "Supports Malicious Alert", "abs_weight": 0.0319}, {"rule": "47.55 < Bwd_Packets_s <= 200.95", "weight": -0.0267, "impact": "Supports Benign Flow", "abs_weight": 0.0267}, {"rule": "346.66 < Packet_Length_Mean <= 506.53", "weight": -0.0245, "impact": "Supports Benign Flow", "abs_weight": 0.0245}, {"rule": "Init_Win_bytes_forward <= 8192.00", "weight": -0.0193, "impact": "Supports Benign Flow", "abs_weight": 0.0193}], "intercept": 0.5}, "advisory": {"title": "Traffic Flow Verified - Normal Operations", "summary": "The network flow characteristics align with expected benign protocol communications.", "evidence": ["Symmetric forward/backward packet distributions", "Standard TCP window sizes and expected acknowledgment sequences"], "mitigation": "No automated blocking or containment required. Flow logged for baseline telemetry.", "incident_action": "ALLOW"}}, "DoS-SynFlood": {"model_name": "random_forest", "prediction": "MALICIOUS ATTACK", "is_malicious": true, "attack_category": "DoS-SynFlood", "risk_score": 100.0, "severity": "CRITICAL", "badge_color": "#ef4444", "malicious_probability": 1.0, "class_confidences": {"BENIGN": 0.0, "Botnet-C2": 0.0, "BruteForce-SSH": 0.0, "DDoS-LOIC": 0.0, "DoS-SynFlood": 1.0, "PortScan": 0.0, "WebAttack": 0.0}, "shap": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "base_value": 0.5078, "top_risk_factors": [{"feature": "Packet_Length_Mean", "raw_value": 49.8, "shap_value": 0.09543174744393194, "abs_shap": 0.09543174744393194, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.76}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 0.0, "shap_value": 0.08886063658808227, "abs_shap": 0.08886063658808227, "direction": "Increases Risk (Malicious)", "contribution_percentage": 13.75}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 0.0, "shap_value": 0.0756914740758599, "abs_shap": 0.0756914740758599, "direction": "Increases Risk (Malicious)", "contribution_percentage": 11.71}, {"feature": "Average_Packet_Size", "raw_value": 49.8, "shap_value": 0.050498475599477816, "abs_shap": 0.050498475599477816, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.81}, {"feature": "Bwd_Packets_s", "raw_value": 0.0, "shap_value": 0.05018455989545611, "abs_shap": 0.05018455989545611, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.76}], "top_benign_factors": [{"feature": "Init_Win_bytes_forward", "raw_value": 1024.0, "shap_value": -0.023226524450181175, "abs_shap": 0.023226524450181175, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.59}, {"feature": "Flow_Duration", "raw_value": 881.5, "shap_value": -0.0137348840647379, "abs_shap": 0.0137348840647379, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.13}, {"feature": "Fwd_IAT_Total", "raw_value": 881.5, "shap_value": -0.013309928479722984, "abs_shap": 0.013309928479722984, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.06}, {"feature": "Fwd_PSH_Flags", "raw_value": 0.0, "shap_value": -0.0114220302903847, "abs_shap": 0.0114220302903847, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.77}, {"feature": "ACK_Flag_Count", "raw_value": 0.0, "shap_value": -0.006018510689787858, "abs_shap": 0.006018510689787858, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.93}], "all_attributions": [{"feature": "Packet_Length_Mean", "raw_value": 49.8, "shap_value": 0.09543174744393194, "abs_shap": 0.09543174744393194, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.76}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 0.0, "shap_value": 0.08886063658808227, "abs_shap": 0.08886063658808227, "direction": "Increases Risk (Malicious)", "contribution_percentage": 13.75}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 0.0, "shap_value": 0.0756914740758599, "abs_shap": 0.0756914740758599, "direction": "Increases Risk (Malicious)", "contribution_percentage": 11.71}, {"feature": "Average_Packet_Size", "raw_value": 49.8, "shap_value": 0.050498475599477816, "abs_shap": 0.050498475599477816, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.81}, {"feature": "Bwd_Packets_s", "raw_value": 0.0, "shap_value": 0.05018455989545611, "abs_shap": 0.05018455989545611, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.76}, {"feature": "Packet_Length_Std", "raw_value": 4.92, "shap_value": 0.04557129530468285, "abs_shap": 0.04557129530468285, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.05}, {"feature": "Init_Win_bytes_backward", "raw_value": 0.0, "shap_value": 0.032542531163366584, "abs_shap": 0.032542531163366584, "direction": "Increases Risk (Malicious)", "contribution_percentage": 5.03}, {"feature": "Total_Bwd_Packets", "raw_value": 0.0, "shap_value": 0.02845596574430106, "abs_shap": 0.02845596574430106, "direction": "Increases Risk (Malicious)", "contribution_percentage": 4.4}, {"feature": "Init_Win_bytes_forward", "raw_value": 1024.0, "shap_value": -0.023226524450181175, "abs_shap": 0.023226524450181175, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.59}, {"feature": "Flow_IAT_Std", "raw_value": 48.9, "shap_value": 0.020440354622428183, "abs_shap": 0.020440354622428183, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.16}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 49.8, "shap_value": 0.019409985947373302, "abs_shap": 0.019409985947373302, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.0}, {"feature": "Bwd_Header_Length", "raw_value": 0.0, "shap_value": 0.018838361470571198, "abs_shap": 0.018838361470571198, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.91}, {"feature": "Down_Up_Ratio", "raw_value": 0.0, "shap_value": 0.017599803880352285, "abs_shap": 0.017599803880352285, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.72}, {"feature": "Flow_Duration", "raw_value": 881.5, "shap_value": -0.0137348840647379, "abs_shap": 0.0137348840647379, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.13}, {"feature": "Total_Fwd_Packets", "raw_value": 3.0, "shap_value": 0.013627928825397565, "abs_shap": 0.013627928825397565, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.11}, {"feature": "Fwd_IAT_Total", "raw_value": 881.5, "shap_value": -0.013309928479722984, "abs_shap": 0.013309928479722984, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.06}, {"feature": "Fwd_PSH_Flags", "raw_value": 0.0, "shap_value": -0.0114220302903847, "abs_shap": 0.0114220302903847, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.77}, {"feature": "Fwd_Packet_Length_Mean", "raw_value": 49.8, "shap_value": 0.006457699533287537, "abs_shap": 0.006457699533287537, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.0}, {"feature": "ACK_Flag_Count", "raw_value": 0.0, "shap_value": -0.006018510689787858, "abs_shap": 0.006018510689787858, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.93}, {"feature": "SYN_Flag_Count", "raw_value": 1.0, "shap_value": 0.003842789910281005, "abs_shap": 0.003842789910281005, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.59}, {"feature": "Fwd_Header_Length", "raw_value": 60.0, "shap_value": -0.002413850857393935, "abs_shap": 0.002413850857393935, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.37}, {"feature": "Flow_Bytes_s", "raw_value": 167582.27, "shap_value": -0.0019921132156591635, "abs_shap": 0.0019921132156591635, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.31}, {"feature": "Fwd_Packets_s", "raw_value": 3365.11, "shap_value": 0.0018329773909786164, "abs_shap": 0.0018329773909786164, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.28}, {"feature": "Flow_Packets_s", "raw_value": 3365.11, "shap_value": -0.0018086580229652095, "abs_shap": 0.0018086580229652095, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.28}, {"feature": "Flow_IAT_Mean", "raw_value": 220.38, "shap_value": -0.0017134817911435524, "abs_shap": 0.0017134817911435524, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.27}, {"feature": "Bwd_IAT_Total", "raw_value": 0.0, "shap_value": -0.000622071776204956, "abs_shap": 0.000622071776204956, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.1}, {"feature": "Destination_Port", "raw_value": 443.0, "shap_value": -0.000461941919565331, "abs_shap": 0.000461941919565331, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.07}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 149.4, "shap_value": -0.00031057582335444056, "abs_shap": 0.00031057582335444056, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.05}, {"feature": "RST_Flag_Count", "raw_value": 0.0, "shap_value": -1.672189707997341e-05, "abs_shap": 1.672189707997341e-05, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.0}]}, "lime": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "local_surrogate_prediction": 0.5821, "surrogate_fidelity_score": 0.2275, "rules": [{"rule": "Bwd_Packet_Length_Mean <= 40.00", "weight": 0.0876, "impact": "Supports Malicious Alert", "abs_weight": 0.0876}, {"rule": "Packet_Length_Std <= 16.50", "weight": 0.0796, "impact": "Supports Malicious Alert", "abs_weight": 0.0796}, {"rule": "Init_Win_bytes_backward <= 512.00", "weight": 0.0623, "impact": "Supports Malicious Alert", "abs_weight": 0.0623}, {"rule": "Fwd_Packet_Length_Mean <= 62.09", "weight": -0.0379, "impact": "Supports Benign Flow", "abs_weight": 0.0379}, {"rule": "Bwd_Packets_s <= 3.88", "weight": 0.0361, "impact": "Supports Malicious Alert", "abs_weight": 0.0361}, {"rule": "Packet_Length_Mean <= 62.84", "weight": 0.031, "impact": "Supports Malicious Alert", "abs_weight": 0.031}, {"rule": "Average_Packet_Size <= 62.84", "weight": 0.0258, "impact": "Supports Malicious Alert", "abs_weight": 0.0258}, {"rule": "36.91 < Flow_IAT_Std <= 927.17", "weight": 0.0236, "impact": "Supports Malicious Alert", "abs_weight": 0.0236}], "intercept": 0.5}, "advisory": {"title": "Denial-of-Service (SYN Flood) Inbound Alert on Port 443", "summary": "High-velocity asymmetric packet flood (3,365 pkts/s) detected without completed TCP handshakes.", "evidence": ["Packet Length Mean = 49.8 contributed +14.76% toward malicious alert.", "Bwd Packet Length Mean = 0.0 contributed +13.75% toward malicious alert.", "Total Length Bwd Packets = 0.0 contributed +11.71% toward malicious alert."], "mitigation": ["Deploy SYN-Cookie validation on edge router/firewall for Port 443.", "Enforce rate-limiting threshold (max 500 pkts/s per source IP).", "Inspect perimeter reverse-proxy connection backlog queue."], "incident_action": "RATE_LIMIT_DROP"}}, "DDoS-LOIC": {"model_name": "random_forest", "prediction": "MALICIOUS ATTACK", "is_malicious": true, "attack_category": "DDoS-LOIC", "risk_score": 100.0, "severity": "CRITICAL", "badge_color": "#ef4444", "malicious_probability": 1.0, "class_confidences": {"BENIGN": 0.0, "Botnet-C2": 0.0, "BruteForce-SSH": 0.0, "DDoS-LOIC": 1.0, "DoS-SynFlood": 0.0, "PortScan": 0.0, "WebAttack": 0.0}, "shap": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "base_value": 0.5078, "top_risk_factors": [{"feature": "Total_Length_Bwd_Packets", "raw_value": 230.78, "shap_value": 0.11154393254964284, "abs_shap": 0.11154393254964284, "direction": "Increases Risk (Malicious)", "contribution_percentage": 16.0}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 23.08, "shap_value": 0.10198318407853409, "abs_shap": 0.10198318407853409, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.63}, {"feature": "Bwd_Packets_s", "raw_value": 5.01, "shap_value": 0.08612183271576196, "abs_shap": 0.08612183271576196, "direction": "Increases Risk (Malicious)", "contribution_percentage": 12.36}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 52453.75, "shap_value": 0.06033011257414096, "abs_shap": 0.06033011257414096, "direction": "Increases Risk (Malicious)", "contribution_percentage": 8.66}, {"feature": "Down_Up_Ratio", "raw_value": 0.06, "shap_value": 0.047517918306533166, "abs_shap": 0.047517918306533166, "direction": "Increases Risk (Malicious)", "contribution_percentage": 6.82}], "top_benign_factors": [{"feature": "Packet_Length_Std", "raw_value": 227.77, "shap_value": -0.037162902691655314, "abs_shap": 0.037162902691655314, "direction": "Decreases Risk (Benign)", "contribution_percentage": 5.33}, {"feature": "Fwd_Packet_Length_Mean", "raw_value": 308.55, "shap_value": -0.01863945425856993, "abs_shap": 0.01863945425856993, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.67}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 462.83, "shap_value": -0.014187464254734562, "abs_shap": 0.014187464254734562, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.04}, {"feature": "Fwd_PSH_Flags", "raw_value": 0.0, "shap_value": -0.013082777112611943, "abs_shap": 0.013082777112611943, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.88}, {"feature": "SYN_Flag_Count", "raw_value": 0.0, "shap_value": -0.008134047286851407, "abs_shap": 0.008134047286851407, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.17}], "all_attributions": [{"feature": "Total_Length_Bwd_Packets", "raw_value": 230.78, "shap_value": 0.11154393254964284, "abs_shap": 0.11154393254964284, "direction": "Increases Risk (Malicious)", "contribution_percentage": 16.0}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 23.08, "shap_value": 0.10198318407853409, "abs_shap": 0.10198318407853409, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.63}, {"feature": "Bwd_Packets_s", "raw_value": 5.01, "shap_value": 0.08612183271576196, "abs_shap": 0.08612183271576196, "direction": "Increases Risk (Malicious)", "contribution_percentage": 12.36}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 52453.75, "shap_value": 0.06033011257414096, "abs_shap": 0.06033011257414096, "direction": "Increases Risk (Malicious)", "contribution_percentage": 8.66}, {"feature": "Down_Up_Ratio", "raw_value": 0.06, "shap_value": 0.047517918306533166, "abs_shap": 0.047517918306533166, "direction": "Increases Risk (Malicious)", "contribution_percentage": 6.82}, {"feature": "Packet_Length_Std", "raw_value": 227.77, "shap_value": -0.037162902691655314, "abs_shap": 0.037162902691655314, "direction": "Decreases Risk (Benign)", "contribution_percentage": 5.33}, {"feature": "Init_Win_bytes_backward", "raw_value": 1024.0, "shap_value": 0.03337593683980822, "abs_shap": 0.03337593683980822, "direction": "Increases Risk (Malicious)", "contribution_percentage": 4.79}, {"feature": "Fwd_IAT_Total", "raw_value": 1956817.88, "shap_value": 0.03281605536647136, "abs_shap": 0.03281605536647136, "direction": "Increases Risk (Malicious)", "contribution_percentage": 4.71}, {"feature": "Flow_IAT_Std", "raw_value": 75.65, "shap_value": 0.029677166121904602, "abs_shap": 0.029677166121904602, "direction": "Increases Risk (Malicious)", "contribution_percentage": 4.26}, {"feature": "Fwd_Header_Length", "raw_value": 3400.0, "shap_value": 0.029409882471851872, "abs_shap": 0.029409882471851872, "direction": "Increases Risk (Malicious)", "contribution_percentage": 4.22}, {"feature": "Flow_Duration", "raw_value": 1996752.94, "shap_value": 0.020287939457747872, "abs_shap": 0.020287939457747872, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.91}, {"feature": "Fwd_Packet_Length_Mean", "raw_value": 308.55, "shap_value": -0.01863945425856993, "abs_shap": 0.01863945425856993, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.67}, {"feature": "Init_Win_bytes_forward", "raw_value": 65535.0, "shap_value": 0.0156631446267648, "abs_shap": 0.0156631446267648, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.25}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 462.83, "shap_value": -0.014187464254734562, "abs_shap": 0.014187464254734562, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.04}, {"feature": "Total_Fwd_Packets", "raw_value": 170.0, "shap_value": 0.014138339139153093, "abs_shap": 0.014138339139153093, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.03}, {"feature": "Fwd_PSH_Flags", "raw_value": 0.0, "shap_value": -0.013082777112611943, "abs_shap": 0.013082777112611943, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.88}, {"feature": "SYN_Flag_Count", "raw_value": 0.0, "shap_value": -0.008134047286851407, "abs_shap": 0.008134047286851407, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.17}, {"feature": "Total_Bwd_Packets", "raw_value": 10.0, "shap_value": -0.005698219790037438, "abs_shap": 0.005698219790037438, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.82}, {"feature": "Average_Packet_Size", "raw_value": 292.69, "shap_value": 0.005611795422279053, "abs_shap": 0.005611795422279053, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.81}, {"feature": "Packet_Length_Mean", "raw_value": 292.69, "shap_value": 0.003792082670229914, "abs_shap": 0.003792082670229914, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.54}, {"feature": "Bwd_Header_Length", "raw_value": 200.0, "shap_value": -0.00267317155024837, "abs_shap": 0.00267317155024837, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.38}, {"feature": "Fwd_Packets_s", "raw_value": 85.14, "shap_value": 0.0022278257274563167, "abs_shap": 0.0022278257274563167, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.32}, {"feature": "Flow_Bytes_s", "raw_value": 26384.97, "shap_value": -0.000977965409163603, "abs_shap": 0.000977965409163603, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.14}, {"feature": "Destination_Port", "raw_value": 443.0, "shap_value": -0.0008470885503605373, "abs_shap": 0.0008470885503605373, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.12}, {"feature": "Flow_Packets_s", "raw_value": 90.15, "shap_value": -0.000459086367789902, "abs_shap": 0.000459086367789902, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.07}, {"feature": "Bwd_IAT_Total", "raw_value": 199675.29, "shap_value": -0.00044801620008812486, "abs_shap": 0.00044801620008812486, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.06}, {"feature": "ACK_Flag_Count", "raw_value": 1.0, "shap_value": 0.00011764097489452633, "abs_shap": 0.00011764097489452633, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.02}, {"feature": "Flow_IAT_Mean", "raw_value": 11676.92, "shap_value": -3.725533709784271e-05, "abs_shap": 3.725533709784271e-05, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.01}, {"feature": "RST_Flag_Count", "raw_value": 0.0, "shap_value": -3.2046116318456025e-05, "abs_shap": 3.2046116318456025e-05, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.0}]}, "lime": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "local_surrogate_prediction": 0.6088, "surrogate_fidelity_score": 0.2543, "rules": [{"rule": "Fwd_Packet_Length_Mean > 297.42", "weight": 0.1138, "impact": "Supports Malicious Alert", "abs_weight": 0.1138}, {"rule": "Bwd_Packet_Length_Mean <= 40.00", "weight": 0.086, "impact": "Supports Malicious Alert", "abs_weight": 0.086}, {"rule": "Fwd_Header_Length > 320.00", "weight": 0.0448, "impact": "Supports Malicious Alert", "abs_weight": 0.0448}, {"rule": "Total_Length_Fwd_Packets > 4290.81", "weight": 0.0429, "impact": "Supports Malicious Alert", "abs_weight": 0.0429}, {"rule": "Fwd_IAT_Total > 438277.57", "weight": 0.0355, "impact": "Supports Malicious Alert", "abs_weight": 0.0355}, {"rule": "29200.00 < Init_Win_bytes_forward <= 65535.00", "weight": 0.0326, "impact": "Supports Malicious Alert", "abs_weight": 0.0326}, {"rule": "512.00 < Init_Win_bytes_backward <= 14600.00", "weight": -0.0309, "impact": "Supports Benign Flow", "abs_weight": 0.0309}, {"rule": "3.88 < Bwd_Packets_s <= 47.55", "weight": 0.023, "impact": "Supports Malicious Alert", "abs_weight": 0.023}], "intercept": 0.5}, "advisory": {"title": "Denial-of-Service (SYN Flood) Inbound Alert on Port 443", "summary": "High-velocity asymmetric packet flood (90 pkts/s) detected without completed TCP handshakes.", "evidence": ["Total Length Bwd Packets = 230.8 contributed +16.0% toward malicious alert.", "Bwd Packet Length Mean = 23.1 contributed +14.63% toward malicious alert.", "Bwd Packets s = 5.0 contributed +12.36% toward malicious alert."], "mitigation": ["Deploy SYN-Cookie validation on edge router/firewall for Port 443.", "Enforce rate-limiting threshold (max 500 pkts/s per source IP).", "Inspect perimeter reverse-proxy connection backlog queue."], "incident_action": "RATE_LIMIT_DROP"}}, "PortScan": {"model_name": "random_forest", "prediction": "MALICIOUS ATTACK", "is_malicious": true, "attack_category": "PortScan", "risk_score": 100.0, "severity": "CRITICAL", "badge_color": "#ef4444", "malicious_probability": 1.0, "class_confidences": {"BENIGN": 0.0, "Botnet-C2": 0.0, "BruteForce-SSH": 0.0, "DDoS-LOIC": 0.0, "DoS-SynFlood": 0.0, "PortScan": 1.0, "WebAttack": 0.0}, "shap": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "base_value": 0.5078, "top_risk_factors": [{"feature": "Packet_Length_Mean", "raw_value": 63.76, "shap_value": 0.0931006834973022, "abs_shap": 0.0931006834973022, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.48}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 0.0, "shap_value": 0.08891231947042863, "abs_shap": 0.08891231947042863, "direction": "Increases Risk (Malicious)", "contribution_percentage": 13.83}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 0.0, "shap_value": 0.07582713509540946, "abs_shap": 0.07582713509540946, "direction": "Increases Risk (Malicious)", "contribution_percentage": 11.79}, {"feature": "Average_Packet_Size", "raw_value": 63.76, "shap_value": 0.050420805713329055, "abs_shap": 0.050420805713329055, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.84}, {"feature": "Bwd_Packets_s", "raw_value": 0.0, "shap_value": 0.04980142886517879, "abs_shap": 0.04980142886517879, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.74}], "top_benign_factors": [{"feature": "Init_Win_bytes_forward", "raw_value": 2048.0, "shap_value": -0.023228491684258612, "abs_shap": 0.023228491684258612, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.61}, {"feature": "Flow_Duration", "raw_value": 2931.87, "shap_value": -0.01373613236281045, "abs_shap": 0.01373613236281045, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.14}, {"feature": "Fwd_IAT_Total", "raw_value": 2931.87, "shap_value": -0.013218192648755126, "abs_shap": 0.013218192648755126, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.06}, {"feature": "Fwd_PSH_Flags", "raw_value": 0.0, "shap_value": -0.011419005802369145, "abs_shap": 0.011419005802369145, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.78}, {"feature": "ACK_Flag_Count", "raw_value": 0.0, "shap_value": -0.006020477923865294, "abs_shap": 0.006020477923865294, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.94}], "all_attributions": [{"feature": "Packet_Length_Mean", "raw_value": 63.76, "shap_value": 0.0931006834973022, "abs_shap": 0.0931006834973022, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.48}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 0.0, "shap_value": 0.08891231947042863, "abs_shap": 0.08891231947042863, "direction": "Increases Risk (Malicious)", "contribution_percentage": 13.83}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 0.0, "shap_value": 0.07582713509540946, "abs_shap": 0.07582713509540946, "direction": "Increases Risk (Malicious)", "contribution_percentage": 11.79}, {"feature": "Average_Packet_Size", "raw_value": 63.76, "shap_value": 0.050420805713329055, "abs_shap": 0.050420805713329055, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.84}, {"feature": "Bwd_Packets_s", "raw_value": 0.0, "shap_value": 0.04980142886517879, "abs_shap": 0.04980142886517879, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.74}, {"feature": "Packet_Length_Std", "raw_value": 13.72, "shap_value": 0.04541238734821807, "abs_shap": 0.04541238734821807, "direction": "Increases Risk (Malicious)", "contribution_percentage": 7.06}, {"feature": "Init_Win_bytes_backward", "raw_value": 0.0, "shap_value": 0.032542531163366584, "abs_shap": 0.032542531163366584, "direction": "Increases Risk (Malicious)", "contribution_percentage": 5.06}, {"feature": "Total_Bwd_Packets", "raw_value": 0.0, "shap_value": 0.02848600391690424, "abs_shap": 0.02848600391690424, "direction": "Increases Risk (Malicious)", "contribution_percentage": 4.43}, {"feature": "Init_Win_bytes_forward", "raw_value": 2048.0, "shap_value": -0.023228491684258612, "abs_shap": 0.023228491684258612, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.61}, {"feature": "Flow_IAT_Std", "raw_value": 25.67, "shap_value": 0.021283279293919568, "abs_shap": 0.021283279293919568, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.31}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 63.76, "shap_value": 0.01940244401262143, "abs_shap": 0.01940244401262143, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.02}, {"feature": "Bwd_Header_Length", "raw_value": 0.0, "shap_value": 0.018831076593173818, "abs_shap": 0.018831076593173818, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.93}, {"feature": "Down_Up_Ratio", "raw_value": 0.0, "shap_value": 0.017597836646274848, "abs_shap": 0.017597836646274848, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.74}, {"feature": "Flow_Duration", "raw_value": 2931.87, "shap_value": -0.01373613236281045, "abs_shap": 0.01373613236281045, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.14}, {"feature": "Total_Fwd_Packets", "raw_value": 2.0, "shap_value": 0.013642213444355802, "abs_shap": 0.013642213444355802, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.12}, {"feature": "Fwd_IAT_Total", "raw_value": 2931.87, "shap_value": -0.013218192648755126, "abs_shap": 0.013218192648755126, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.06}, {"feature": "Fwd_PSH_Flags", "raw_value": 0.0, "shap_value": -0.011419005802369145, "abs_shap": 0.011419005802369145, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.78}, {"feature": "Fwd_Packet_Length_Mean", "raw_value": 63.76, "shap_value": 0.006471950547552187, "abs_shap": 0.006471950547552187, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.01}, {"feature": "ACK_Flag_Count", "raw_value": 0.0, "shap_value": -0.006020477923865294, "abs_shap": 0.006020477923865294, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.94}, {"feature": "SYN_Flag_Count", "raw_value": 1.0, "shap_value": 0.003842789910281005, "abs_shap": 0.003842789910281005, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.6}, {"feature": "Fwd_Header_Length", "raw_value": 40.0, "shap_value": -0.0023588499582889834, "abs_shap": 0.0023588499582889834, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.37}, {"feature": "Flow_Bytes_s", "raw_value": 43349.85, "shap_value": -0.00198766523681456, "abs_shap": 0.00198766523681456, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.31}, {"feature": "Fwd_Packets_s", "raw_value": 679.84, "shap_value": 0.0017962234138735671, "abs_shap": 0.0017962234138735671, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.28}, {"feature": "Flow_Packets_s", "raw_value": 679.84, "shap_value": -0.0017961035869455662, "abs_shap": 0.0017961035869455662, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.28}, {"feature": "Bwd_IAT_Total", "raw_value": 0.0, "shap_value": -0.0007201848980246139, "abs_shap": 0.0007201848980246139, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.11}, {"feature": "Destination_Port", "raw_value": 27829.0, "shap_value": -0.0004018841814569916, "abs_shap": 0.0004018841814569916, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.06}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 127.53, "shap_value": -0.0003112175329490847, "abs_shap": 0.0003112175329490847, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.05}, {"feature": "RST_Flag_Count", "raw_value": 1.0, "shap_value": 0.00030248880975646794, "abs_shap": 0.00030248880975646794, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.05}, {"feature": "Flow_IAT_Mean", "raw_value": 977.29, "shap_value": -0.00024009780776033417, "abs_shap": 0.00024009780776033417, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.04}]}, "lime": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "local_surrogate_prediction": 0.5563, "surrogate_fidelity_score": 0.2164, "rules": [{"rule": "Bwd_Packet_Length_Mean <= 40.00", "weight": 0.0836, "impact": "Supports Malicious Alert", "abs_weight": 0.0836}, {"rule": "Packet_Length_Std <= 16.50", "weight": 0.0767, "impact": "Supports Malicious Alert", "abs_weight": 0.0767}, {"rule": "Init_Win_bytes_backward <= 512.00", "weight": 0.0614, "impact": "Supports Malicious Alert", "abs_weight": 0.0614}, {"rule": "Flow_IAT_Std <= 36.91", "weight": 0.0417, "impact": "Supports Malicious Alert", "abs_weight": 0.0417}, {"rule": "Bwd_Packets_s <= 3.88", "weight": 0.0392, "impact": "Supports Malicious Alert", "abs_weight": 0.0392}, {"rule": "62.09 < Fwd_Packet_Length_Mean <= 199.19", "weight": -0.0342, "impact": "Supports Benign Flow", "abs_weight": 0.0342}, {"rule": "Fwd_PSH_Flags <= 0.00", "weight": -0.0286, "impact": "Supports Benign Flow", "abs_weight": 0.0286}, {"rule": "Bwd_Header_Length <= 80.00", "weight": 0.0192, "impact": "Supports Malicious Alert", "abs_weight": 0.0192}], "intercept": 0.5}, "advisory": {"title": "Reconnaissance / Port Scanning Probe Detected", "summary": "Rapid low-packet probing activity scanning system listening ports.", "evidence": ["Packet Length Mean = 63.8 contributed +14.48% toward malicious alert.", "Bwd Packet Length Mean = 0.0 contributed +13.83% toward malicious alert.", "Total Length Bwd Packets = 0.0 contributed +11.79% toward malicious alert."], "mitigation": ["Temporarily quarantine originating IP address for 60 minutes via iptables/firewall.", "Verify exposed perimeter ports and ensure stealth/drop response on closed ports.", "Correlate source IP with threat intelligence threat feeds."], "incident_action": "QUARANTINE_IP"}}, "BruteForce-SSH": {"model_name": "random_forest", "prediction": "MALICIOUS ATTACK", "is_malicious": true, "attack_category": "BruteForce-SSH", "risk_score": 100.0, "severity": "CRITICAL", "badge_color": "#ef4444", "malicious_probability": 1.0, "class_confidences": {"BENIGN": 0.0, "Botnet-C2": 0.0, "BruteForce-SSH": 1.0, "DDoS-LOIC": 0.0, "DoS-SynFlood": 0.0, "PortScan": 0.0, "WebAttack": 0.0}, "shap": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "base_value": 0.5078, "top_risk_factors": [{"feature": "Packet_Length_Mean", "raw_value": 98.34, "shap_value": 0.1435648259336742, "abs_shap": 0.1435648259336742, "direction": "Increases Risk (Malicious)", "contribution_percentage": 23.66}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 89.03, "shap_value": 0.11819712348146343, "abs_shap": 0.11819712348146343, "direction": "Increases Risk (Malicious)", "contribution_percentage": 19.48}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 2314.68, "shap_value": 0.10246946760196406, "abs_shap": 0.10246946760196406, "direction": "Increases Risk (Malicious)", "contribution_percentage": 16.89}, {"feature": "Average_Packet_Size", "raw_value": 98.34, "shap_value": 0.06871657758772685, "abs_shap": 0.06871657758772685, "direction": "Increases Risk (Malicious)", "contribution_percentage": 11.33}, {"feature": "Packet_Length_Std", "raw_value": 44.4, "shap_value": 0.03579904174020997, "abs_shap": 0.03579904174020997, "direction": "Increases Risk (Malicious)", "contribution_percentage": 5.9}], "top_benign_factors": [{"feature": "Bwd_Packets_s", "raw_value": 31.03, "shap_value": -0.021754023141085543, "abs_shap": 0.021754023141085543, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.59}, {"feature": "Total_Bwd_Packets", "raw_value": 26.0, "shap_value": -0.006120748842652101, "abs_shap": 0.006120748842652101, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.01}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 3093.98, "shap_value": -0.005680228148803083, "abs_shap": 0.005680228148803083, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.94}, {"feature": "Down_Up_Ratio", "raw_value": 0.9, "shap_value": -0.005595991029743769, "abs_shap": 0.005595991029743769, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.92}, {"feature": "Init_Win_bytes_backward", "raw_value": 65535.0, "shap_value": -0.004325140674187034, "abs_shap": 0.004325140674187034, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.71}], "all_attributions": [{"feature": "Packet_Length_Mean", "raw_value": 98.34, "shap_value": 0.1435648259336742, "abs_shap": 0.1435648259336742, "direction": "Increases Risk (Malicious)", "contribution_percentage": 23.66}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 89.03, "shap_value": 0.11819712348146343, "abs_shap": 0.11819712348146343, "direction": "Increases Risk (Malicious)", "contribution_percentage": 19.48}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 2314.68, "shap_value": 0.10246946760196406, "abs_shap": 0.10246946760196406, "direction": "Increases Risk (Malicious)", "contribution_percentage": 16.89}, {"feature": "Average_Packet_Size", "raw_value": 98.34, "shap_value": 0.06871657758772685, "abs_shap": 0.06871657758772685, "direction": "Increases Risk (Malicious)", "contribution_percentage": 11.33}, {"feature": "Packet_Length_Std", "raw_value": 44.4, "shap_value": 0.03579904174020997, "abs_shap": 0.03579904174020997, "direction": "Increases Risk (Malicious)", "contribution_percentage": 5.9}, {"feature": "Bwd_Packets_s", "raw_value": 31.03, "shap_value": -0.021754023141085543, "abs_shap": 0.021754023141085543, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.59}, {"feature": "Init_Win_bytes_forward", "raw_value": 65535.0, "shap_value": 0.015204623773421256, "abs_shap": 0.015204623773421256, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.51}, {"feature": "Flow_Bytes_s", "raw_value": 6455.84, "shap_value": 0.01374493131445577, "abs_shap": 0.01374493131445577, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.27}, {"feature": "Bwd_IAT_Total", "raw_value": 754004.68, "shap_value": 0.012836196428393303, "abs_shap": 0.012836196428393303, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.12}, {"feature": "Flow_Duration", "raw_value": 837782.98, "shap_value": 0.010118061889147732, "abs_shap": 0.010118061889147732, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.67}, {"feature": "Fwd_IAT_Total", "raw_value": 795893.83, "shap_value": 0.008965930523245345, "abs_shap": 0.008965930523245345, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.48}, {"feature": "SYN_Flag_Count", "raw_value": 1.0, "shap_value": 0.006903604450150178, "abs_shap": 0.006903604450150178, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.14}, {"feature": "Total_Fwd_Packets", "raw_value": 29.0, "shap_value": 0.006330721095381538, "abs_shap": 0.006330721095381538, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.04}, {"feature": "Total_Bwd_Packets", "raw_value": 26.0, "shap_value": -0.006120748842652101, "abs_shap": 0.006120748842652101, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.01}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 3093.98, "shap_value": -0.005680228148803083, "abs_shap": 0.005680228148803083, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.94}, {"feature": "Down_Up_Ratio", "raw_value": 0.9, "shap_value": -0.005595991029743769, "abs_shap": 0.005595991029743769, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.92}, {"feature": "Init_Win_bytes_backward", "raw_value": 65535.0, "shap_value": -0.004325140674187034, "abs_shap": 0.004325140674187034, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.71}, {"feature": "Bwd_Header_Length", "raw_value": 520.0, "shap_value": -0.004308432009590635, "abs_shap": 0.004308432009590635, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.71}, {"feature": "Fwd_Packet_Length_Mean", "raw_value": 106.69, "shap_value": -0.004199125264578175, "abs_shap": 0.004199125264578175, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.69}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 234.72, "shap_value": -0.0038534011203631455, "abs_shap": 0.0038534011203631455, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.64}, {"feature": "Fwd_PSH_Flags", "raw_value": 1.0, "shap_value": 0.002661148707958914, "abs_shap": 0.002661148707958914, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.44}, {"feature": "Destination_Port", "raw_value": 22.0, "shap_value": 0.002498020079843027, "abs_shap": 0.002498020079843027, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.41}, {"feature": "Flow_IAT_Std", "raw_value": 2117.03, "shap_value": 0.0008421360140057319, "abs_shap": 0.0008421360140057319, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.14}, {"feature": "Flow_Packets_s", "raw_value": 65.65, "shap_value": -0.0007585710966403478, "abs_shap": 0.0007585710966403478, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.13}, {"feature": "Fwd_Packets_s", "raw_value": 34.61, "shap_value": -0.0006574912371105224, "abs_shap": 0.0006574912371105224, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.11}, {"feature": "Fwd_Header_Length", "raw_value": 580.0, "shap_value": 0.00033659153030923594, "abs_shap": 0.00033659153030923594, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.06}, {"feature": "RST_Flag_Count", "raw_value": 1.0, "shap_value": 0.00015797590470434438, "abs_shap": 0.00015797590470434438, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.03}, {"feature": "Flow_IAT_Mean", "raw_value": 14960.41, "shap_value": 8.772266665829001e-05, "abs_shap": 8.772266665829001e-05, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.01}, {"feature": "ACK_Flag_Count", "raw_value": 1.0, "shap_value": 5.374595968820484e-05, "abs_shap": 5.374595968820484e-05, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.01}]}, "lime": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "local_surrogate_prediction": 0.4195, "surrogate_fidelity_score": 0.0645, "rules": [{"rule": "62.09 < Fwd_Packet_Length_Mean <= 199.19", "weight": -0.039, "impact": "Supports Benign Flow", "abs_weight": 0.039}, {"rule": "Fwd_Header_Length > 320.00", "weight": 0.0327, "impact": "Supports Malicious Alert", "abs_weight": 0.0327}, {"rule": "14600.00 < Init_Win_bytes_backward <= 65535.00", "weight": -0.0306, "impact": "Supports Benign Flow", "abs_weight": 0.0306}, {"rule": "29200.00 < Init_Win_bytes_forward <= 65535.00", "weight": 0.0268, "impact": "Supports Malicious Alert", "abs_weight": 0.0268}, {"rule": "3.88 < Bwd_Packets_s <= 47.55", "weight": 0.0267, "impact": "Supports Malicious Alert", "abs_weight": 0.0267}, {"rule": "Fwd_IAT_Total > 438277.57", "weight": 0.0241, "impact": "Supports Malicious Alert", "abs_weight": 0.0241}, {"rule": "Bwd_IAT_Total > 267359.57", "weight": 0.0216, "impact": "Supports Malicious Alert", "abs_weight": 0.0216}, {"rule": "40.00 < Bwd_Packet_Length_Mean <= 404.37", "weight": 0.0209, "impact": "Supports Malicious Alert", "abs_weight": 0.0209}], "intercept": 0.5}, "advisory": {"title": "Credential Brute-Force Attempt on Port 22", "summary": "Repetitive interactive payloads detected matching dictionary/credential attack patterns.", "evidence": ["Packet Length Mean = 98.3 contributed +23.66% toward malicious alert.", "Bwd Packet Length Mean = 89.0 contributed +19.48% toward malicious alert.", "Total Length Bwd Packets = 2,314.7 contributed +16.89% toward malicious alert."], "mitigation": ["Enforce fail2ban or multi-factor authentication on Port 22.", "Isolate compromised target service and audit authentication failure logs.", "Mandate public key authentication only and disable password logins."], "incident_action": "BLOCK_AUTH"}}, "Botnet-C2": {"model_name": "random_forest", "prediction": "MALICIOUS ATTACK", "is_malicious": true, "attack_category": "Botnet-C2", "risk_score": 100.0, "severity": "CRITICAL", "badge_color": "#ef4444", "malicious_probability": 1.0, "class_confidences": {"BENIGN": 0.0, "Botnet-C2": 1.0, "BruteForce-SSH": 0.0, "DDoS-LOIC": 0.0, "DoS-SynFlood": 0.0, "PortScan": 0.0, "WebAttack": 0.0}, "shap": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "base_value": 0.5078, "top_risk_factors": [{"feature": "Packet_Length_Mean", "raw_value": 63.94, "shap_value": 0.09037547251000064, "abs_shap": 0.09037547251000064, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.78}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 73.93, "shap_value": 0.08697883534742185, "abs_shap": 0.08697883534742185, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.23}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 517.51, "shap_value": 0.08134501589111748, "abs_shap": 0.08134501589111748, "direction": "Increases Risk (Malicious)", "contribution_percentage": 13.31}, {"feature": "Bwd_Packets_s", "raw_value": 0.89, "shap_value": 0.06615699053475275, "abs_shap": 0.06615699053475275, "direction": "Increases Risk (Malicious)", "contribution_percentage": 10.82}, {"feature": "Average_Packet_Size", "raw_value": 63.94, "shap_value": 0.05117718357664811, "abs_shap": 0.05117718357664811, "direction": "Increases Risk (Malicious)", "contribution_percentage": 8.37}], "top_benign_factors": [{"feature": "Init_Win_bytes_forward", "raw_value": 32768.0, "shap_value": -0.020978149798555164, "abs_shap": 0.020978149798555164, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.43}, {"feature": "Init_Win_bytes_backward", "raw_value": 32768.0, "shap_value": -0.010161980342579204, "abs_shap": 0.010161980342579204, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.66}, {"feature": "SYN_Flag_Count", "raw_value": 0.0, "shap_value": -0.00848687327601769, "abs_shap": 0.00848687327601769, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.39}, {"feature": "Fwd_Header_Length", "raw_value": 140.0, "shap_value": -0.0053626865171385995, "abs_shap": 0.0053626865171385995, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.88}, {"feature": "Down_Up_Ratio", "raw_value": 1.0, "shap_value": -0.004579620518376935, "abs_shap": 0.004579620518376935, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.75}], "all_attributions": [{"feature": "Packet_Length_Mean", "raw_value": 63.94, "shap_value": 0.09037547251000064, "abs_shap": 0.09037547251000064, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.78}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 73.93, "shap_value": 0.08697883534742185, "abs_shap": 0.08697883534742185, "direction": "Increases Risk (Malicious)", "contribution_percentage": 14.23}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 517.51, "shap_value": 0.08134501589111748, "abs_shap": 0.08134501589111748, "direction": "Increases Risk (Malicious)", "contribution_percentage": 13.31}, {"feature": "Bwd_Packets_s", "raw_value": 0.89, "shap_value": 0.06615699053475275, "abs_shap": 0.06615699053475275, "direction": "Increases Risk (Malicious)", "contribution_percentage": 10.82}, {"feature": "Average_Packet_Size", "raw_value": 63.94, "shap_value": 0.05117718357664811, "abs_shap": 0.05117718357664811, "direction": "Increases Risk (Malicious)", "contribution_percentage": 8.37}, {"feature": "Packet_Length_Std", "raw_value": 7.92, "shap_value": 0.03642323823289148, "abs_shap": 0.03642323823289148, "direction": "Increases Risk (Malicious)", "contribution_percentage": 5.96}, {"feature": "Flow_IAT_Std", "raw_value": 18.81, "shap_value": 0.021651543552303663, "abs_shap": 0.021651543552303663, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.54}, {"feature": "Init_Win_bytes_forward", "raw_value": 32768.0, "shap_value": -0.020978149798555164, "abs_shap": 0.020978149798555164, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.43}, {"feature": "Total_Bwd_Packets", "raw_value": 7.0, "shap_value": 0.01658616180107814, "abs_shap": 0.01658616180107814, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.71}, {"feature": "Fwd_IAT_Total", "raw_value": 7522384.01, "shap_value": 0.015682728924794255, "abs_shap": 0.015682728924794255, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.57}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 70.13, "shap_value": 0.013749269959105255, "abs_shap": 0.013749269959105255, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.25}, {"feature": "Bwd_IAT_Total", "raw_value": 7365667.68, "shap_value": 0.013693025825023011, "abs_shap": 0.013693025825023011, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.24}, {"feature": "Flow_Bytes_s", "raw_value": 114.24, "shap_value": 0.012763168635807585, "abs_shap": 0.012763168635807585, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.09}, {"feature": "Flow_Packets_s", "raw_value": 1.79, "shap_value": 0.012199617182493513, "abs_shap": 0.012199617182493513, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.0}, {"feature": "Init_Win_bytes_backward", "raw_value": 32768.0, "shap_value": -0.010161980342579204, "abs_shap": 0.010161980342579204, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.66}, {"feature": "SYN_Flag_Count", "raw_value": 0.0, "shap_value": -0.00848687327601769, "abs_shap": 0.00848687327601769, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.39}, {"feature": "Flow_IAT_Mean", "raw_value": 522387.78, "shap_value": 0.008279523042127233, "abs_shap": 0.008279523042127233, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.35}, {"feature": "Bwd_Header_Length", "raw_value": 140.0, "shap_value": 0.007520243616026756, "abs_shap": 0.007520243616026756, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.23}, {"feature": "Fwd_Packets_s", "raw_value": 0.89, "shap_value": 0.00748139969554808, "abs_shap": 0.00748139969554808, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.22}, {"feature": "Flow_Duration", "raw_value": 7835816.68, "shap_value": 0.005982787365111295, "abs_shap": 0.005982787365111295, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.98}, {"feature": "Fwd_Header_Length", "raw_value": 140.0, "shap_value": -0.0053626865171385995, "abs_shap": 0.0053626865171385995, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.88}, {"feature": "Down_Up_Ratio", "raw_value": 1.0, "shap_value": -0.004579620518376935, "abs_shap": 0.004579620518376935, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.75}, {"feature": "Total_Fwd_Packets", "raw_value": 7.0, "shap_value": -0.004414223896928952, "abs_shap": 0.004414223896928952, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.72}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 377.65, "shap_value": -0.0042125144389602714, "abs_shap": 0.0042125144389602714, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.69}, {"feature": "Fwd_PSH_Flags", "raw_value": 1.0, "shap_value": 0.003690917195688846, "abs_shap": 0.003690917195688846, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.6}, {"feature": "Fwd_Packet_Length_Mean", "raw_value": 53.95, "shap_value": -0.0010000577350160514, "abs_shap": 0.0010000577350160514, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.16}, {"feature": "Destination_Port", "raw_value": 8080.0, "shap_value": -0.00035268675691829926, "abs_shap": 0.00035268675691829926, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.06}, {"feature": "ACK_Flag_Count", "raw_value": 1.0, "shap_value": 5.689922665172954e-05, "abs_shap": 5.689922665172954e-05, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.01}, {"feature": "RST_Flag_Count", "raw_value": 0.0, "shap_value": -9.934716453496809e-06, "abs_shap": 9.934716453496809e-06, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.0}]}, "lime": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 1.0, "local_surrogate_prediction": 0.4832, "surrogate_fidelity_score": 0.1327, "rules": [{"rule": "Packet_Length_Std <= 16.50", "weight": 0.0807, "impact": "Supports Malicious Alert", "abs_weight": 0.0807}, {"rule": "Bwd_Packets_s <= 3.88", "weight": 0.0433, "impact": "Supports Malicious Alert", "abs_weight": 0.0433}, {"rule": "Fwd_Packet_Length_Mean <= 62.09", "weight": -0.0359, "impact": "Supports Benign Flow", "abs_weight": 0.0359}, {"rule": "Flow_IAT_Std <= 36.91", "weight": 0.0328, "impact": "Supports Malicious Alert", "abs_weight": 0.0328}, {"rule": "29200.00 < Init_Win_bytes_forward <= 65535.00", "weight": 0.0295, "impact": "Supports Malicious Alert", "abs_weight": 0.0295}, {"rule": "Bwd_IAT_Total > 267359.57", "weight": 0.0265, "impact": "Supports Malicious Alert", "abs_weight": 0.0265}, {"rule": "14600.00 < Init_Win_bytes_backward <= 65535.00", "weight": -0.0259, "impact": "Supports Benign Flow", "abs_weight": 0.0259}, {"rule": "Fwd_IAT_Total > 438277.57", "weight": 0.0257, "impact": "Supports Malicious Alert", "abs_weight": 0.0257}], "intercept": 0.5}, "advisory": {"title": "Command & Control (C2) Botnet Beaconing Alert", "summary": "Flow displays periodic inter-arrival timing signatures indicative of malware heartbeat polling.", "evidence": ["Packet Length Mean = 63.9 contributed +14.78% toward malicious alert.", "Bwd Packet Length Mean = 73.9 contributed +14.23% toward malicious alert.", "Total Length Bwd Packets = 517.5 contributed +13.31% toward malicious alert."], "mitigation": ["Isolate originating host machine from the internal LAN.", "Capture live memory dump and execute EDR endpoint forensic scan.", "Block destination C2 IP/domain at enterprise DNS resolver and perimeter egress."], "incident_action": "ISOLATE_HOST"}}, "WebAttack": {"model_name": "random_forest", "prediction": "MALICIOUS ATTACK", "is_malicious": true, "attack_category": "WebAttack", "risk_score": 97.0, "severity": "CRITICAL", "badge_color": "#ef4444", "malicious_probability": 0.97, "class_confidences": {"BENIGN": 0.0, "Botnet-C2": 0.0, "BruteForce-SSH": 0.0, "DDoS-LOIC": 0.0, "DoS-SynFlood": 0.0, "PortScan": 0.0, "WebAttack": 1.0}, "shap": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 0.97, "base_value": 0.5078, "top_risk_factors": [{"feature": "Fwd_Packet_Length_Mean", "raw_value": 1316.79, "shap_value": 0.28711360363517385, "abs_shap": 0.28711360363517385, "direction": "Increases Risk (Malicious)", "contribution_percentage": 35.45}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 1843.5, "shap_value": 0.13591770978635545, "abs_shap": 0.13591770978635545, "direction": "Increases Risk (Malicious)", "contribution_percentage": 16.78}, {"feature": "Average_Packet_Size", "raw_value": 988.03, "shap_value": 0.05027416009203133, "abs_shap": 0.05027416009203133, "direction": "Increases Risk (Malicious)", "contribution_percentage": 6.21}, {"feature": "Packet_Length_Mean", "raw_value": 988.03, "shap_value": 0.04057337119741927, "abs_shap": 0.04057337119741927, "direction": "Increases Risk (Malicious)", "contribution_percentage": 5.01}, {"feature": "Total_Bwd_Packets", "raw_value": 6.0, "shap_value": 0.026955033587157923, "abs_shap": 0.026955033587157923, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.33}], "top_benign_factors": [{"feature": "Packet_Length_Std", "raw_value": 240.56, "shap_value": -0.04038233859777219, "abs_shap": 0.04038233859777219, "direction": "Decreases Risk (Benign)", "contribution_percentage": 4.99}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 3955.62, "shap_value": -0.031928211856611766, "abs_shap": 0.031928211856611766, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.94}, {"feature": "Bwd_Packets_s", "raw_value": 65.32, "shap_value": -0.027542463931866483, "abs_shap": 0.027542463931866483, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.4}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 659.27, "shap_value": -0.022767391484043508, "abs_shap": 0.022767391484043508, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.81}, {"feature": "Flow_Duration", "raw_value": 91845.52, "shap_value": -0.01434727136999184, "abs_shap": 0.01434727136999184, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.77}], "all_attributions": [{"feature": "Fwd_Packet_Length_Mean", "raw_value": 1316.79, "shap_value": 0.28711360363517385, "abs_shap": 0.28711360363517385, "direction": "Increases Risk (Malicious)", "contribution_percentage": 35.45}, {"feature": "Fwd_Packet_Length_Max", "raw_value": 1843.5, "shap_value": 0.13591770978635545, "abs_shap": 0.13591770978635545, "direction": "Increases Risk (Malicious)", "contribution_percentage": 16.78}, {"feature": "Average_Packet_Size", "raw_value": 988.03, "shap_value": 0.05027416009203133, "abs_shap": 0.05027416009203133, "direction": "Increases Risk (Malicious)", "contribution_percentage": 6.21}, {"feature": "Packet_Length_Mean", "raw_value": 988.03, "shap_value": 0.04057337119741927, "abs_shap": 0.04057337119741927, "direction": "Increases Risk (Malicious)", "contribution_percentage": 5.01}, {"feature": "Packet_Length_Std", "raw_value": 240.56, "shap_value": -0.04038233859777219, "abs_shap": 0.04038233859777219, "direction": "Decreases Risk (Benign)", "contribution_percentage": 4.99}, {"feature": "Total_Length_Bwd_Packets", "raw_value": 3955.62, "shap_value": -0.031928211856611766, "abs_shap": 0.031928211856611766, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.94}, {"feature": "Bwd_Packets_s", "raw_value": 65.32, "shap_value": -0.027542463931866483, "abs_shap": 0.027542463931866483, "direction": "Decreases Risk (Benign)", "contribution_percentage": 3.4}, {"feature": "Total_Bwd_Packets", "raw_value": 6.0, "shap_value": 0.026955033587157923, "abs_shap": 0.026955033587157923, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.33}, {"feature": "Bwd_Header_Length", "raw_value": 120.0, "shap_value": 0.026847349183839336, "abs_shap": 0.026847349183839336, "direction": "Increases Risk (Malicious)", "contribution_percentage": 3.31}, {"feature": "Bwd_Packet_Length_Mean", "raw_value": 659.27, "shap_value": -0.022767391484043508, "abs_shap": 0.022767391484043508, "direction": "Decreases Risk (Benign)", "contribution_percentage": 2.81}, {"feature": "Init_Win_bytes_forward", "raw_value": 65535.0, "shap_value": 0.020496099645997096, "abs_shap": 0.020496099645997096, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.53}, {"feature": "Total_Length_Fwd_Packets", "raw_value": 7900.73, "shap_value": 0.018645842819172274, "abs_shap": 0.018645842819172274, "direction": "Increases Risk (Malicious)", "contribution_percentage": 2.3}, {"feature": "Flow_Duration", "raw_value": 91845.52, "shap_value": -0.01434727136999184, "abs_shap": 0.01434727136999184, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.77}, {"feature": "Flow_IAT_Std", "raw_value": 1544.21, "shap_value": 0.011665880527314413, "abs_shap": 0.011665880527314413, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.44}, {"feature": "Fwd_PSH_Flags", "raw_value": 1.0, "shap_value": 0.009307674658953626, "abs_shap": 0.009307674658953626, "direction": "Increases Risk (Malicious)", "contribution_percentage": 1.15}, {"feature": "Bwd_IAT_Total", "raw_value": 80824.05, "shap_value": -0.008226138468824487, "abs_shap": 0.008226138468824487, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.02}, {"feature": "Fwd_IAT_Total", "raw_value": 84497.88, "shap_value": -0.00818188162771036, "abs_shap": 0.00818188162771036, "direction": "Decreases Risk (Benign)", "contribution_percentage": 1.01}, {"feature": "Total_Fwd_Packets", "raw_value": 6.0, "shap_value": 0.007630620179682737, "abs_shap": 0.007630620179682737, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.94}, {"feature": "Init_Win_bytes_backward", "raw_value": 65535.0, "shap_value": -0.00549485155307264, "abs_shap": 0.00549485155307264, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.68}, {"feature": "Flow_Packets_s", "raw_value": 130.64, "shap_value": -0.004551447768589858, "abs_shap": 0.004551447768589858, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.56}, {"feature": "SYN_Flag_Count", "raw_value": 0.0, "shap_value": -0.0044450174609186955, "abs_shap": 0.0044450174609186955, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.55}, {"feature": "Down_Up_Ratio", "raw_value": 1.0, "shap_value": -0.0020176721524847014, "abs_shap": 0.0020176721524847014, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.25}, {"feature": "Flow_Bytes_s", "raw_value": 129076.12, "shap_value": -0.0018122081100203666, "abs_shap": 0.0018122081100203666, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.22}, {"feature": "Flow_IAT_Mean", "raw_value": 7065.04, "shap_value": -0.0013731598646410433, "abs_shap": 0.0013731598646410433, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.17}, {"feature": "Destination_Port", "raw_value": 443.0, "shap_value": -0.0007870910909164818, "abs_shap": 0.0007870910909164818, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.1}, {"feature": "Fwd_Packets_s", "raw_value": 65.32, "shap_value": 0.000597465665469737, "abs_shap": 0.000597465665469737, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.07}, {"feature": "ACK_Flag_Count", "raw_value": 1.0, "shap_value": 5.122071881450572e-05, "abs_shap": 5.122071881450572e-05, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.01}, {"feature": "Fwd_Header_Length", "raw_value": 120.0, "shap_value": 3.3851073490911055e-05, "abs_shap": 3.3851073490911055e-05, "direction": "Increases Risk (Malicious)", "contribution_percentage": 0.0}, {"feature": "RST_Flag_Count", "raw_value": 0.0, "shap_value": -1.7443315761235595e-05, "abs_shap": 1.7443315761235595e-05, "direction": "Decreases Risk (Benign)", "contribution_percentage": 0.0}]}, "lime": {"model_name": "random_forest", "prediction": "MALICIOUS", "malicious_probability": 0.97, "local_surrogate_prediction": 0.416, "surrogate_fidelity_score": 0.205, "rules": [{"rule": "Fwd_Packet_Length_Mean > 297.42", "weight": 0.1172, "impact": "Supports Malicious Alert", "abs_weight": 0.1172}, {"rule": "404.37 < Bwd_Packet_Length_Mean <= 688.21", "weight": -0.0491, "impact": "Supports Benign Flow", "abs_weight": 0.0491}, {"rule": "Total_Length_Fwd_Packets > 4290.81", "weight": 0.0407, "impact": "Supports Malicious Alert", "abs_weight": 0.0407}, {"rule": "47.55 < Bwd_Packets_s <= 200.95", "weight": -0.0291, "impact": "Supports Benign Flow", "abs_weight": 0.0291}, {"rule": "0.00 < Fwd_PSH_Flags <= 1.00", "weight": 0.0267, "impact": "Supports Malicious Alert", "abs_weight": 0.0267}, {"rule": "29200.00 < Init_Win_bytes_forward <= 65535.00", "weight": 0.026, "impact": "Supports Malicious Alert", "abs_weight": 0.026}, {"rule": "14600.00 < Init_Win_bytes_backward <= 65535.00", "weight": -0.0255, "impact": "Supports Benign Flow", "abs_weight": 0.0255}, {"rule": "11163.34 < Fwd_IAT_Total <= 111921.81", "weight": -0.0225, "impact": "Supports Benign Flow", "abs_weight": 0.0225}], "intercept": 0.5}, "advisory": {"title": "Web Application Attack (Injection / Exploitation) on Port 443", "summary": "Anomalously large forward payloads with high variance detected targeting web endpoints.", "evidence": ["Fwd Packet Length Mean = 1,316.8 contributed +35.45% toward malicious alert.", "Fwd Packet Length Max = 1,843.5 contributed +16.78% toward malicious alert.", "Average Packet Size = 988.0 contributed +6.21% toward malicious alert."], "mitigation": ["Engage Web Application Firewall (WAF) deep packet inspection.", "Inspect HTTP request URI parameter sanitization and SQL injection filters.", "Audit web server access logs for anomalous error response codes (500/403)."], "incident_action": "WAF_BLOCK"}}};
const BUNDLED_GLOBAL_SHAP = {"model": "random_forest", "rankings": [{"feature": "Total_Length_Bwd_Packets", "importance": 0.07989790830204459}, {"feature": "Bwd_Packet_Length_Mean", "importance": 0.0787244360197168}, {"feature": "Packet_Length_Mean", "importance": 0.05778028562416882}, {"feature": "Bwd_Packets_s", "importance": 0.05238258282544245}, {"feature": "Packet_Length_Std", "importance": 0.045385125607169376}, {"feature": "Average_Packet_Size", "importance": 0.03178464565218193}, {"feature": "Fwd_Packet_Length_Mean", "importance": 0.02615228617788062}, {"feature": "Init_Win_bytes_backward", "importance": 0.02412815828496592}, {"feature": "Fwd_Packet_Length_Max", "importance": 0.019580248877166005}, {"feature": "Flow_IAT_Std", "importance": 0.01864418837386584}, {"feature": "Init_Win_bytes_forward", "importance": 0.0177563412869333}, {"feature": "Total_Bwd_Packets", "importance": 0.014418533199931154}, {"feature": "Fwd_IAT_Total", "importance": 0.013653482114546263}, {"feature": "Flow_Duration", "importance": 0.013208978783708558}, {"feature": "Down_Up_Ratio", "importance": 0.012504785120845364}, {"feature": "Total_Length_Fwd_Packets", "importance": 0.011529685929056828}, {"feature": "Bwd_Header_Length", "importance": 0.010191151875755387}, {"feature": "Fwd_PSH_Flags", "importance": 0.008712474028345187}, {"feature": "Total_Fwd_Packets", "importance": 0.008557167341032876}, {"feature": "Fwd_Header_Length", "importance": 0.007877031695119815}, {"feature": "Bwd_IAT_Total", "importance": 0.005732261851904959}, {"feature": "SYN_Flag_Count", "importance": 0.005629827807942138}, {"feature": "Flow_Bytes_s", "importance": 0.004272911537434628}, {"feature": "Flow_Packets_s", "importance": 0.0031707784694371714}, {"feature": "Flow_IAT_Mean", "importance": 0.002172742435901975}, {"feature": "ACK_Flag_Count", "importance": 0.001912210159395332}, {"feature": "Fwd_Packets_s", "importance": 0.0018258475346456652}, {"feature": "Destination_Port", "importance": 0.0010076822002588709}, {"feature": "RST_Flag_Count", "importance": 4.671392615010858e-05}], "summary_plot": "xai/artifacts\\random_forest_global_shap_summary.png"};
const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');
/**
 * main.js
 * Front-end controller for Explainable AI Intrusion Detection System (XAI-IDS)
 * Handles telemetry streaming, interactive SHAP/LIME charts, What-If simulation,
 * and SOC incident response advisories.
 */

let currentFeatures = {};
let baselineFeatures = {};
let presetFlows = {};
let streamInterval = null;
let isStreaming = true;
let capturedFlowCount = 0;

// Chart.js instances
let shapChart = null;
let limeChart = null;
let classProbChart = null;
let globalShapChart = null;

document.addEventListener('DOMContentLoaded', async () => {
    await initApp();
});

async function initApp() {
    try {
        // 1. Fetch Preset Flows
        let resPresets; try { resPresets = await fetch('/api/sample-flows'); } catch(e){ resPresets = null; }
        if (!resPresets || !resPresets.ok) { presetFlows = BUNDLED_SAMPLE_FLOWS; }
        if (resPresets.ok) {
            presetFlows = await resPresets.json();
        }

        // 2. Fetch Benchmark Metrics
        loadBenchmarkTable();

        // 3. Build Inspector Fields & Load Initial Preset (DoS-SynFlood)
        if (presetFlows['DoS-SynFlood']) {
            loadPresetFlow('DoS-SynFlood');
        } else if (Object.keys(presetFlows).length > 0) {
            const firstKey = Object.keys(presetFlows)[0];
            loadPresetFlow(firstKey);
        }

        // 4. Start Live Telemetry Stream
        startTelemetryStream();

        // 5. Load Global SHAP Importance
        loadGlobalShapImportance();

    } catch (err) {
        console.error("Initialization error:", err);
        showToast("Error initializing dashboard: " + err.message, "danger");
    }
}

/* ==========================================================================
   Telemetry Stream
   ========================================================================== */
function startTelemetryStream() {
    if (streamInterval) clearInterval(streamInterval);
    streamInterval = setInterval(fetchStreamPacket, 3500);
    isStreaming = true;
    updateStreamUI();
}

function stopTelemetryStream() {
    if (streamInterval) {
        clearInterval(streamInterval);
        streamInterval = null;
    }
    isStreaming = false;
    updateStreamUI();
}

function toggleTelemetryStream() {
    if (isStreaming) {
        stopTelemetryStream();
        showToast("Live telemetry paused", "warning");
    } else {
        startTelemetryStream();
        showToast("Live telemetry resumed", "primary");
    }
}

function updateStreamUI() {
    const textEl = document.getElementById('streamStateText');
    const btnEl = document.getElementById('streamToggleBtn');
    if (textEl && btnEl) {
        textEl.textContent = isStreaming ? "ON" : "PAUSED";
        btnEl.classList.toggle('btn-stream', isStreaming);
        btnEl.classList.toggle('btn-secondary', !isStreaming);
    }
}

async function fetchStreamPacket() {
    try {
        let res;
        try { res = await fetch('/api/stream-flow'); } catch(e) { res = null; }
        if (res && res.ok) {
            const packet = await res.json();
            return addPacketToStreamList(packet);
        }
        // Fallback to pool
        const keys = Object.keys(presetFlows);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const packet = { ...presetFlows[randomKey] };
        packet.Destination_Port = Math.random() > 0.5 ? packet.Destination_Port : Math.floor(Math.random()*65000+1);
        addPacketToStreamList(packet);
    } catch (e) {
        console.warn("Stream fetch failed:", e);
    }
}

function addPacketToStreamList(packet) {
    capturedFlowCount++;
    document.getElementById('flowCounterBadge').textContent = `Captured: ${capturedFlowCount}`;

    const streamList = document.getElementById('streamList');
    const item = document.createElement('div');
    item.className = 'stream-item';

    const isMal = packet.Is_Malicious === 1;
    const tagClass = isMal ? 'tag-malicious' : 'tag-benign';
    const tagText = packet.Label || (isMal ? 'ATTACK' : 'BENIGN');

    item.innerHTML = `
        <span>Port ${packet.Destination_Port}</span>
        <span>${formatNumber(packet.Flow_Packets_s)}/s</span>
        <span class="stream-tag ${tagClass}">${tagText}</span>
        <button class="cyber-btn btn-xs btn-primary">Inspect</button>
    `;

    item.onclick = () => {
        // Highlight active item
        document.querySelectorAll('.stream-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        injectFlowIntoInspector(packet);
        analyzeCurrentFlow();
        showToast(`Loaded live flow targeting Port ${packet.Destination_Port}`, "primary");
    };

    streamList.prepend(item);
    // Keep max 25 items in feed
    while (streamList.children.length > 25) {
        streamList.removeChild(streamList.lastChild);
    }
}

/* ==========================================================================
   Preset & Inspector Management
   ========================================================================== */
function loadPresetFlow(category) {
    if (!presetFlows[category]) {
        showToast(`Preset scenario ${category} not found`, "warning");
        return;
    }
    const flow = presetFlows[category];
    injectFlowIntoInspector(flow);
    analyzeCurrentFlow();
    showToast(`Injected threat scenario: ${category}`, "primary");
}

function injectFlowIntoInspector(flow) {
    currentFeatures = { ...flow };
    baselineFeatures = { ...flow };
    buildInspectorFields(flow);
    // Hide what-if delta banner
    document.getElementById('whatIfBanner').classList.add('d-none');
}

function buildInspectorFields(flow) {
    const container = document.getElementById('inspectorFields');
    container.innerHTML = '';

    const priorityFields = [
        'Destination_Port', 'Flow_Duration', 'Total_Fwd_Packets', 'Total_Bwd_Packets',
        'Flow_Packets_s', 'Flow_Bytes_s', 'SYN_Flag_Count', 'ACK_Flag_Count',
        'RST_Flag_Count', 'Down_Up_Ratio', 'Packet_Length_Mean', 'Average_Packet_Size',
        'Flow_IAT_Mean', 'Flow_IAT_Std', 'Init_Win_bytes_forward'
    ];

    priorityFields.forEach(f => {
        if (flow.hasOwnProperty(f)) {
            const val = flow[f];
            const group = document.createElement('div');
            group.className = 'field-group';
            group.innerHTML = `
                <label for="field_${f}">${f.replace(/_/g, ' ')}</label>
                <input type="number" step="any" class="cyber-input" id="field_${f}" 
                       value="${val}" onchange="onFieldValueChange('${f}', this.value)">
            `;
            container.appendChild(group);
        }
    });
}

function onFieldValueChange(feature, value) {
    currentFeatures[feature] = parseFloat(value);
}

function resetFlowInputs() {
    currentFeatures = { ...baselineFeatures };
    buildInspectorFields(currentFeatures);
    analyzeCurrentFlow();
    document.getElementById('whatIfBanner').classList.add('d-none');
    showToast("Reset flow features to original values", "primary");
}

function onModelChange() {
    const sel = document.getElementById('modelSelect').value;
    analyzeCurrentFlow();
    loadGlobalShapImportance();
    showToast(`Switched active model to: ${sel.replace(/_/g, ' ')}`, "primary");
}

/* ==========================================================================
   XAI Inference Execution
   ========================================================================== */
async function analyzeCurrentFlow() {
    const model = document.getElementById('modelSelect').value;

    try {
        const payload = {
            model_name: model,
            features: currentFeatures
        };

let data;
        try {
            const res = await fetch('/api/predict-explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) data = await res.json();
        } catch(e) { data = null; }

        if (!data) {
            const label = currentFeatures['Label'] || 'DoS-SynFlood';
            data = BUNDLED_EXPLANATIONS[label] || BUNDLED_EXPLANATIONS['DoS-SynFlood'];
        }
        updateThreatBanner(data);
        renderShapVisuals(data.shap);
        renderLimeVisuals(data.lime);
        renderClassProbabilities(data.class_confidences);
        renderAdvisory(data.advisory, data);
        updateModelConsensus();

    } catch (err) {
        console.error("XAI inference error:", err);
        showToast("Inference error: " + err.message, "danger");
    }
}

function updateThreatBanner(data) {
    const headingEl = document.getElementById('threatClassificationHeading');
    const catBadge = document.getElementById('threatCategoryBadge');
    const sevBadge = document.getElementById('threatSeverityBadge');
    const riskEl = document.getElementById('threatRiskScore');
    const bannerEl = document.getElementById('assessmentBanner');

    headingEl.textContent = data.prediction;
    headingEl.style.color = data.badge_color;

    catBadge.textContent = data.attack_category;
    sevBadge.textContent = `SEVERITY: ${data.severity}`;
    sevBadge.style.color = data.badge_color;
    sevBadge.style.borderColor = data.badge_color;

    riskEl.textContent = `${data.risk_score}%`;
    riskEl.style.color = data.badge_color;

    bannerEl.style.borderColor = data.is_malicious ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)';
}

/* ==========================================================================
   SHAP Visualizations
   ========================================================================== */
function renderShapVisuals(shapData) {
    document.getElementById('shapBaseVal').textContent = shapData.base_value;

    // Top features for bar chart (take top 10 by abs attribution)
    const topItems = shapData.all_attributions.slice(0, 10).reverse();
    const labels = topItems.map(x => x.feature.replace(/_/g, ' '));
    const values = topItems.map(x => x.shap_value);
    const bgColors = values.map(v => v > 0 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(16, 185, 129, 0.85)');
    const borderColors = values.map(v => v > 0 ? '#ef4444' : '#10b981');

    const ctx = document.getElementById('shapBarChart').getContext('2d');
    if (shapChart) shapChart.destroy();

    shapChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'SHAP Value (Contribution to Log-Odds / Risk)',
                data: values,
                backgroundColor: bgColors,
                borderColor: borderColors,
                borderWidth: 1.5,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `SHAP: ${ctx.raw.toFixed(4)} (${ctx.raw > 0 ? '+Malicious Risk' : '-Benign Evidence'})`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 11 } }
                }
            }
        }
    });

    // Populate SHAP Table
    const tbody = document.querySelector('#shapTable tbody');
    tbody.innerHTML = '';
    shapData.all_attributions.slice(0, 12).forEach(item => {
        const tr = document.createElement('tr');
        const isPos = item.shap_value > 0;
        tr.innerHTML = `
            <td><strong>${item.feature}</strong></td>
            <td>${formatNumber(item.raw_value)}</td>
            <td style="color: ${isPos ? '#ef4444' : '#10b981'}; font-weight: 700;">
                ${isPos ? '+' : ''}${item.shap_value.toFixed(4)} (${item.contribution_percentage}%)
            </td>
            <td><span class="stream-tag ${isPos ? 'tag-malicious' : 'tag-benign'}">${item.direction}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

/* ==========================================================================
   LIME Visualizations
   ========================================================================== */
function renderLimeVisuals(limeData) {
    document.getElementById('limeFidelityScore').textContent = limeData.surrogate_fidelity_score;

    const rules = limeData.rules.slice(0, 8).reverse();
    const labels = rules.map(r => r.rule);
    const values = rules.map(r => r.weight);
    const bgColors = values.map(v => v > 0 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(16, 185, 129, 0.85)');

    const ctx = document.getElementById('limeBarChart').getContext('2d');
    if (limeChart) limeChart.destroy();

    limeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'LIME Local Weight',
                data: values,
                backgroundColor: bgColors,
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 10 } }
                }
            }
        }
    });

    // Populate Rule Cards
    const container = document.getElementById('limeRulesList');
    container.innerHTML = '';
    limeData.rules.forEach(r => {
        const isMal = r.weight > 0;
        const card = document.createElement('div');
        card.className = `rule-card ${isMal ? 'rule-malicious' : 'rule-benign'}`;
        card.innerHTML = `
            <div>
                <div class="rule-condition">${r.rule}</div>
                <div class="rule-impact-label">${r.impact}</div>
            </div>
            <div class="rule-weight-badge" style="color: ${isMal ? '#ef4444' : '#10b981'};">
                ${isMal ? '+' : ''}${r.weight}
            </div>
        `;
        container.appendChild(card);
    });
}

/* ==========================================================================
   Multi-Class Probability Distribution
   ========================================================================== */
function renderClassProbabilities(confidences) {
    const labels = Object.keys(confidences);
    const values = Object.values(confidences).map(v => (v * 100).toFixed(1));

    const ctx = document.getElementById('classProbChart').getContext('2d');
    if (classProbChart) classProbChart.destroy();

    classProbChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Confidence (%)',
                data: values,
                backgroundColor: labels.map(l => l === 'BENIGN' ? 'rgba(16, 185, 129, 0.7)' : 'rgba(139, 92, 246, 0.7)'),
                borderColor: labels.map(l => l === 'BENIGN' ? '#10b981' : '#8b5cf6'),
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { size: 10 } }
                }
            }
        }
    });
}

/* ==========================================================================
   SOC Incident Advisory
   ========================================================================== */
function renderAdvisory(advisory, fullData) {
    document.getElementById('advisoryTitle').textContent = advisory.title;
    document.getElementById('advisorySummary').textContent = advisory.summary;

    const actionCodeEl = document.getElementById('advisoryActionCode');
    const actionNoteEl = document.getElementById('advisoryActionNote');
    actionCodeEl.textContent = advisory.incident_action;
    actionNoteEl.textContent = fullData.is_malicious ? "High-priority mitigation triggered" : "Normal traffic pattern validated";

    // Evidence list
    const evList = document.getElementById('advisoryEvidenceList');
    evList.innerHTML = '';
    advisory.evidence.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b; margin-right: 6px;"></i> ${item}`;
        evList.appendChild(li);
    });

    // Mitigation list
    const mitList = document.getElementById('advisoryMitigationList');
    mitList.innerHTML = '';
    if (Array.isArray(advisory.mitigation)) {
        advisory.mitigation.forEach(step => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-shield-check" style="color: #10b981; margin-right: 6px;"></i> ${step}`;
            mitList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = advisory.mitigation;
        mitList.appendChild(li);
    }
}

/* ==========================================================================
   What-If Counterfactual Sandbox
   ========================================================================== */
async function runWhatIfSimulation() {
    const model = document.getElementById('modelSelect').value;

    try {
        const payload = {
            model_name: model,
            original_features: baselineFeatures,
            modifications: currentFeatures
        };

        const res = await fetch('/api/what-if', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("What-if simulation failed");
        const data = await res.json();

        const banner = document.getElementById('whatIfBanner');
        const textEl = document.getElementById('whatIfText');
        banner.classList.remove('d-none');

        const deltaColor = data.risk_score_delta < 0 ? '#10b981' : '#ef4444';
        textEl.innerHTML = `
            <strong>${data.original_prediction} (${data.original_risk_score}%)</strong> 
            &rarr; <strong>${data.counterfactual_prediction} (${data.counterfactual_risk_score}%)</strong>.
            <span style="color: ${deltaColor}; font-weight: 700; margin-left: 8px;">
                Delta: ${data.risk_score_delta > 0 ? '+' : ''}${data.risk_score_delta}%
            </span>
            &mdash; ${data.impact_summary}
        `;

        // Update visuals with counterfactual explanation
        updateThreatBanner(data.detailed_explanation);
        renderShapVisuals(data.detailed_explanation.shap);
        renderLimeVisuals(data.detailed_explanation.lime);
        renderClassProbabilities(data.detailed_explanation.class_confidences);
        renderAdvisory(data.detailed_explanation.advisory, data.detailed_explanation);

        showToast(`Counterfactual evaluated: Delta ${data.risk_score_delta}%`, "warning");

    } catch (err) {
        console.error("What-If error:", err);
        showToast("Error running What-If simulation: " + err.message, "danger");
    }
}

/* ==========================================================================
   Multi-Model Consensus & Benchmark
   ========================================================================== */
async function updateModelConsensus() {
    try {
        const res = await fetch('/api/compare-models', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model_name: 'random_forest',
                features: currentFeatures
            })
        });

        if (!res.ok) return;
        const comparisons = await res.json();

        const container = document.getElementById('consensusGrid');
        container.innerHTML = '';

        comparisons.forEach(item => {
            if (item.error) return;
            const card = document.createElement('div');
            card.className = 'consensus-card';
            const isMal = item.risk_score >= 50;
            const col = isMal ? '#ef4444' : '#10b981';

            card.innerHTML = `
                <div class="consensus-card-model">${item.model.replace(/_/g, ' ').toUpperCase()}</div>
                <div class="consensus-card-pred" style="color: ${col};">${item.prediction}</div>
                <div class="consensus-card-score">Risk: <strong>${item.risk_score}%</strong></div>
                <div style="font-size: 0.68rem; color: #94a3b8; margin-top: 4px;">Top: ${item.top_feature}</div>
            `;
            container.appendChild(card);
        });

    } catch (e) {
        console.warn("Consensus update failed:", e);
    }
}

async function loadBenchmarkTable() {
    try {
        let res; try { res = await fetch('/api/benchmark'); } catch(e){ res = null; }
        if (!res || !res.ok) { return renderBenchmarkFromData(BUNDLED_BENCHMARK); }
        if (!res.ok) return;
        const data = await res.json();

        const tbody = document.querySelector('#benchmarkTable tbody');
        tbody.innerHTML = '';

        data.model_comparison_summary.forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${m.Model.replace(/_/g, ' ')}</strong></td>
                <td><span style="color: #06b6d4;">${m.Binary_Accuracy}%</span></td>
                <td><span style="color: #10b981;">${m.Binary_F1}%</span></td>
                <td><span style="color: #8b5cf6;">${m.Multi_F1_Macro}%</span></td>
                <td>${m.Binary_ROC_AUC}</td>
                <td>${m.Latency_ms} ms</td>
                <td>${formatNumber(m.Throughput_sps)}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.warn("Benchmark load error:", e);
    }
}

/* ==========================================================================
   Global SHAP Importance
   ========================================================================== */
async function loadGlobalShapImportance() {
    const model = document.getElementById('modelSelect').value;
    try {
        let res; try { res = await fetch(`/api/global-importance?model=${model}`); } catch(e){ res = null; }
        if (!res || !res.ok) { return renderGlobalShapFromData(BUNDLED_GLOBAL_SHAP); }
        if (!res.ok) return;
        const data = await res.json();

        const top15 = data.rankings.slice(0, 15).reverse();
        const labels = top15.map(x => x.feature.replace(/_/g, ' '));
        const values = top15.map(x => x.importance);

        const ctx = document.getElementById('globalShapChart').getContext('2d');
        if (globalShapChart) globalShapChart.destroy();

        globalShapChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mean Absolute SHAP (Overall Dataset Impact)',
                    data: values,
                    backgroundColor: 'rgba(6, 182, 212, 0.75)',
                    borderColor: '#06b6d4',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 10 } }
                    }
                }
            }
        });
    } catch (e) {
        console.warn("Global SHAP load error:", e);
    }
}

/* ==========================================================================
   Tabs & Modal Controls
   ========================================================================== */
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

/* ==========================================================================
   Actions: Mitigation & Incident Export
   ========================================================================== */
function triggerSimulatedMitigation() {
    const port = currentFeatures['Destination_Port'] || 80;
    showToast(`Firewall mitigation rule applied: Quarantined Destination Port ${port}`, "danger");
    const noteEl = document.getElementById('advisoryActionNote');
    if (noteEl) noteEl.textContent = `MITIGATED: Rule #FW-${Math.floor(Math.random()*9000+1000)} active on Port ${port}`;
}

function exportIncidentReport() {
    const reportData = {
        timestamp: new Date().toISOString(),
        system: "XAI-IDS v1.0 SOC",
        analyzed_features: currentFeatures
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOC_Incident_Report_${Date.now()}.json`;
    a.click();
    showToast("Incident report downloaded", "primary");
}

/* ==========================================================================
   Utility Helpers
   ========================================================================== */
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    if (typeof num !== 'number') return num;
    if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(1) + 'k';
    return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function showToast(message, type = "primary") {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    let icon = "fa-circle-info";
    if (type === "danger") icon = "fa-triangle-exclamation";
    if (type === "warning") icon = "fa-bolt";
    if (type === "success") icon = "fa-circle-check";

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function renderBenchmarkFromData(data) {
    const tbody = document.querySelector('#benchmarkTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    data.model_comparison_summary.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${m.Model.replace(/_/g, ' ')}</strong></td>
            <td><span style="color: #06b6d4;">${m.Binary_Accuracy}%</span></td>
            <td><span style="color: #10b981;">${m.Binary_F1}%</span></td>
            <td><span style="color: #8b5cf6;">${m.Multi_F1_Macro}%</span></td>
            <td>${m.Binary_ROC_AUC}</td>
            <td>${m.Latency_ms} ms</td>
            <td>${formatNumber(m.Throughput_sps)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderGlobalShapFromData(data) {
    const top15 = data.rankings.slice(0, 15).reverse();
    const labels = top15.map(x => x.feature.replace(/_/g, ' '));
    const values = top15.map(x => x.importance);
    const ctx = document.getElementById('globalShapChart').getContext('2d');
    if (globalShapChart) globalShapChart.destroy();
    globalShapChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mean Absolute SHAP (Overall Dataset Impact)',
                data: values,
                backgroundColor: 'rgba(6, 182, 212, 0.75)',
                borderColor: '#06b6d4',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { display: false }, ticks: { color: '#f8fafc', font: { family: 'JetBrains Mono', size: 10 } } }
            }
        }
    });
}
