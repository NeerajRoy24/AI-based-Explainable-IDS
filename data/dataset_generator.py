"""
dataset_generator.py
Generates a realistic, high-fidelity network intrusion dataset aligned with CICIDS2017/2018 flow standards.
Simulates realistic benign traffic distributions and distinct attack traffic signatures:
- BENIGN (Normal Web, File Transfer, DNS, Database)
- DoS-SynFlood (SYN packet flood, 0 backward packets, high packet rates)
- DDoS-LOIC (High-rate volumetric attack to web ports)
- PortScan (Rapid probe of sequential/random ports, minimal packet count, low duration)
- BruteForce-SSH (Port 22, repetitive authentication payload bursts)
- Botnet-C2 (Periodic beaconing, tight IAT variance, small payload pingbacks)
- WebAttack (HTTP/HTTPS payloads, anomalous header lengths and forward packet lengths)
"""

import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split

FEATURES = [
    'Destination_Port',
    'Flow_Duration',
    'Total_Fwd_Packets',
    'Total_Bwd_Packets',
    'Total_Length_Fwd_Packets',
    'Total_Length_Bwd_Packets',
    'Fwd_Packet_Length_Max',
    'Fwd_Packet_Length_Mean',
    'Bwd_Packet_Length_Mean',
    'Flow_Bytes_s',
    'Flow_Packets_s',
    'Flow_IAT_Mean',
    'Flow_IAT_Std',
    'Fwd_IAT_Total',
    'Bwd_IAT_Total',
    'Fwd_PSH_Flags',
    'Fwd_Header_Length',
    'Bwd_Header_Length',
    'Fwd_Packets_s',
    'Bwd_Packets_s',
    'Packet_Length_Mean',
    'Packet_Length_Std',
    'SYN_Flag_Count',
    'RST_Flag_Count',
    'ACK_Flag_Count',
    'Down_Up_Ratio',
    'Average_Packet_Size',
    'Init_Win_bytes_forward',
    'Init_Win_bytes_backward'
]

ATTACK_CLASSES = [
    'BENIGN',
    'DoS-SynFlood',
    'DDoS-LOIC',
    'PortScan',
    'BruteForce-SSH',
    'Botnet-C2',
    'WebAttack'
]

def generate_network_flow_dataset(n_samples: int = 15000, random_state: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(random_state)
    
    # Class distribution: ~50% Benign, ~50% attacks distributed across categories
    weights = [0.50, 0.12, 0.10, 0.10, 0.08, 0.05, 0.05]
    counts = rng.multinomial(n_samples, weights)
    
    records = []
    
    # 1. BENIGN Traffic
    n = counts[0]
    dest_ports = rng.choice([80, 443, 53, 22, 3306, 8080, 445], size=n, p=[0.35, 0.40, 0.12, 0.03, 0.03, 0.05, 0.02])
    duration = rng.exponential(scale=150000, size=n) + 500  # microseconds
    fwd_pkts = rng.poisson(lam=12, size=n) + 1
    bwd_pkts = rng.poisson(lam=14, size=n) + 1
    fwd_len_mean = rng.normal(loc=250, scale=80, size=n).clip(40, 1460)
    bwd_len_mean = rng.normal(loc=650, scale=200, size=n).clip(40, 1460)
    tot_fwd_len = fwd_pkts * fwd_len_mean
    tot_bwd_len = bwd_pkts * bwd_len_mean
    flow_bytes_s = (tot_fwd_len + tot_bwd_len) / (duration / 1e6 + 1e-5)
    flow_pkts_s = (fwd_pkts + bwd_pkts) / (duration / 1e6 + 1e-5)
    iat_mean = duration / (fwd_pkts + bwd_pkts + 1)
    iat_std = iat_mean * rng.uniform(0.3, 1.2, size=n)
    
    for i in range(n):
        records.append({
            'Destination_Port': int(dest_ports[i]),
            'Flow_Duration': float(duration[i]),
            'Total_Fwd_Packets': int(fwd_pkts[i]),
            'Total_Bwd_Packets': int(bwd_pkts[i]),
            'Total_Length_Fwd_Packets': float(tot_fwd_len[i]),
            'Total_Length_Bwd_Packets': float(tot_bwd_len[i]),
            'Fwd_Packet_Length_Max': float(fwd_len_mean[i] * rng.uniform(1.2, 2.5)),
            'Fwd_Packet_Length_Mean': float(fwd_len_mean[i]),
            'Bwd_Packet_Length_Mean': float(bwd_len_mean[i]),
            'Flow_Bytes_s': float(flow_bytes_s[i]),
            'Flow_Packets_s': float(flow_pkts_s[i]),
            'Flow_IAT_Mean': float(iat_mean[i]),
            'Flow_IAT_Std': float(iat_std[i]),
            'Fwd_IAT_Total': float(duration[i] * 0.9),
            'Bwd_IAT_Total': float(duration[i] * 0.85),
            'Fwd_PSH_Flags': int(rng.choice([0, 1], p=[0.75, 0.25])),
            'Fwd_Header_Length': int(fwd_pkts[i] * 20),
            'Bwd_Header_Length': int(bwd_pkts[i] * 20),
            'Fwd_Packets_s': float(fwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Bwd_Packets_s': float(bwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Packet_Length_Mean': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Packet_Length_Std': float(rng.uniform(80, 250)),
            'SYN_Flag_Count': int(rng.choice([0, 1], p=[0.9, 0.1])),
            'RST_Flag_Count': int(rng.choice([0, 1], p=[0.97, 0.03])),
            'ACK_Flag_Count': int(rng.choice([0, 1], p=[0.15, 0.85])),
            'Down_Up_Ratio': float(bwd_pkts[i] / (fwd_pkts[i] + 1e-5)),
            'Average_Packet_Size': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Init_Win_bytes_forward': int(rng.choice([8192, 14600, 29200, 65535])),
            'Init_Win_bytes_backward': int(rng.choice([8192, 14600, 29200, 65535])),
            'Label': 'BENIGN',
            'Is_Malicious': 0
        })

    # 2. DoS-SynFlood Traffic (SYN flag high, zero backward packets, tiny duration, high packet rate)
    n = counts[1]
    dest_ports = rng.choice([80, 443, 8080], size=n)
    duration = rng.uniform(50, 4000, size=n)  # very short flows
    fwd_pkts = rng.integers(1, 4, size=n)
    bwd_pkts = np.zeros(n, dtype=int)  # Victim doesn't complete handshake
    fwd_len_mean = rng.uniform(40, 60, size=n)  # Tiny SYN packets without payload
    bwd_len_mean = np.zeros(n)
    tot_fwd_len = fwd_pkts * fwd_len_mean
    tot_bwd_len = np.zeros(n)
    flow_pkts_s = fwd_pkts / (duration / 1e6 + 1e-5)
    flow_bytes_s = tot_fwd_len / (duration / 1e6 + 1e-5)
    
    for i in range(n):
        records.append({
            'Destination_Port': int(dest_ports[i]),
            'Flow_Duration': float(duration[i]),
            'Total_Fwd_Packets': int(fwd_pkts[i]),
            'Total_Bwd_Packets': 0,
            'Total_Length_Fwd_Packets': float(tot_fwd_len[i]),
            'Total_Length_Bwd_Packets': 0.0,
            'Fwd_Packet_Length_Max': float(fwd_len_mean[i]),
            'Fwd_Packet_Length_Mean': float(fwd_len_mean[i]),
            'Bwd_Packet_Length_Mean': 0.0,
            'Flow_Bytes_s': float(flow_bytes_s[i]),
            'Flow_Packets_s': float(flow_pkts_s[i]),
            'Flow_IAT_Mean': float(duration[i] / (fwd_pkts[i] + 1)),
            'Flow_IAT_Std': float(rng.uniform(5, 50)),
            'Fwd_IAT_Total': float(duration[i]),
            'Bwd_IAT_Total': 0.0,
            'Fwd_PSH_Flags': 0,
            'Fwd_Header_Length': int(fwd_pkts[i] * 20),
            'Bwd_Header_Length': 0,
            'Fwd_Packets_s': float(flow_pkts_s[i]),
            'Bwd_Packets_s': 0.0,
            'Packet_Length_Mean': float(fwd_len_mean[i]),
            'Packet_Length_Std': float(rng.uniform(0, 10)),
            'SYN_Flag_Count': 1,  # Key signature
            'RST_Flag_Count': 0,
            'ACK_Flag_Count': 0,  # No ACK yet
            'Down_Up_Ratio': 0.0,
            'Average_Packet_Size': float(fwd_len_mean[i]),
            'Init_Win_bytes_forward': int(rng.choice([1024, 2048, 4096])),
            'Init_Win_bytes_backward': 0,
            'Label': 'DoS-SynFlood',
            'Is_Malicious': 1
        })

    # 3. DDoS-LOIC (Massive packet floods, asymmetric byte consumption on web ports)
    n = counts[2]
    dest_ports = rng.choice([80, 443], size=n)
    duration = rng.uniform(500000, 3000000, size=n)
    fwd_pkts = rng.integers(150, 800, size=n)
    bwd_pkts = rng.integers(1, 20, size=n)  # Service exhausted, rarely responds
    fwd_len_mean = rng.uniform(250, 400, size=n)
    bwd_len_mean = rng.uniform(20, 60, size=n)
    tot_fwd_len = fwd_pkts * fwd_len_mean
    tot_bwd_len = bwd_pkts * bwd_len_mean
    flow_pkts_s = (fwd_pkts + bwd_pkts) / (duration / 1e6 + 1e-5)
    flow_bytes_s = (tot_fwd_len + tot_bwd_len) / (duration / 1e6 + 1e-5)
    
    for i in range(n):
        records.append({
            'Destination_Port': int(dest_ports[i]),
            'Flow_Duration': float(duration[i]),
            'Total_Fwd_Packets': int(fwd_pkts[i]),
            'Total_Bwd_Packets': int(bwd_pkts[i]),
            'Total_Length_Fwd_Packets': float(tot_fwd_len[i]),
            'Total_Length_Bwd_Packets': float(tot_bwd_len[i]),
            'Fwd_Packet_Length_Max': float(fwd_len_mean[i] * 1.5),
            'Fwd_Packet_Length_Mean': float(fwd_len_mean[i]),
            'Bwd_Packet_Length_Mean': float(bwd_len_mean[i]),
            'Flow_Bytes_s': float(flow_bytes_s[i]),
            'Flow_Packets_s': float(flow_pkts_s[i]),
            'Flow_IAT_Mean': float(duration[i] / (fwd_pkts[i] + 1)),
            'Flow_IAT_Std': float(rng.uniform(10, 150)),
            'Fwd_IAT_Total': float(duration[i] * 0.98),
            'Bwd_IAT_Total': float(duration[i] * 0.1),
            'Fwd_PSH_Flags': int(rng.choice([0, 1], p=[0.4, 0.6])),
            'Fwd_Header_Length': int(fwd_pkts[i] * 20),
            'Bwd_Header_Length': int(bwd_pkts[i] * 20),
            'Fwd_Packets_s': float(fwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Bwd_Packets_s': float(bwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Packet_Length_Mean': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Packet_Length_Std': float(rng.uniform(100, 300)),
            'SYN_Flag_Count': 0,
            'RST_Flag_Count': int(rng.choice([0, 1], p=[0.8, 0.2])),
            'ACK_Flag_Count': 1,
            'Down_Up_Ratio': float(bwd_pkts[i] / fwd_pkts[i]),
            'Average_Packet_Size': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Init_Win_bytes_forward': 65535,
            'Init_Win_bytes_backward': int(rng.choice([0, 512, 1024])),
            'Label': 'DDoS-LOIC',
            'Is_Malicious': 1
        })

    # 4. PortScan (Scans across diverse random ports, 1-2 packets, immediate RST or timeout)
    n = counts[3]
    dest_ports = rng.integers(1, 65535, size=n)
    duration = rng.uniform(100, 5000, size=n)
    fwd_pkts = rng.integers(1, 3, size=n)
    bwd_pkts = rng.choice([0, 1], size=n, p=[0.6, 0.4])
    fwd_len_mean = rng.uniform(40, 64, size=n)
    bwd_len_mean = np.where(bwd_pkts > 0, 40.0, 0.0)
    tot_fwd_len = fwd_pkts * fwd_len_mean
    tot_bwd_len = bwd_pkts * bwd_len_mean
    flow_pkts_s = (fwd_pkts + bwd_pkts) / (duration / 1e6 + 1e-5)
    flow_bytes_s = (tot_fwd_len + tot_bwd_len) / (duration / 1e6 + 1e-5)
    
    for i in range(n):
        records.append({
            'Destination_Port': int(dest_ports[i]),
            'Flow_Duration': float(duration[i]),
            'Total_Fwd_Packets': int(fwd_pkts[i]),
            'Total_Bwd_Packets': int(bwd_pkts[i]),
            'Total_Length_Fwd_Packets': float(tot_fwd_len[i]),
            'Total_Length_Bwd_Packets': float(tot_bwd_len[i]),
            'Fwd_Packet_Length_Max': float(fwd_len_mean[i]),
            'Fwd_Packet_Length_Mean': float(fwd_len_mean[i]),
            'Bwd_Packet_Length_Mean': float(bwd_len_mean[i]),
            'Flow_Bytes_s': float(flow_bytes_s[i]),
            'Flow_Packets_s': float(flow_pkts_s[i]),
            'Flow_IAT_Mean': float(duration[i] / (fwd_pkts[i] + 1)),
            'Flow_IAT_Std': float(rng.uniform(0, 30)),
            'Fwd_IAT_Total': float(duration[i]),
            'Bwd_IAT_Total': 0.0,
            'Fwd_PSH_Flags': 0,
            'Fwd_Header_Length': int(fwd_pkts[i] * 20),
            'Bwd_Header_Length': int(bwd_pkts[i] * 20),
            'Fwd_Packets_s': float(fwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Bwd_Packets_s': float(bwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Packet_Length_Mean': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Packet_Length_Std': float(rng.uniform(0, 15)),
            'SYN_Flag_Count': 1,
            'RST_Flag_Count': int(rng.choice([0, 1], p=[0.6, 0.4])),
            'ACK_Flag_Count': 0,
            'Down_Up_Ratio': float(bwd_pkts[i] / fwd_pkts[i]),
            'Average_Packet_Size': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Init_Win_bytes_forward': int(rng.choice([1024, 2048, 65535])),
            'Init_Win_bytes_backward': int(rng.choice([0, 512])),
            'Label': 'PortScan',
            'Is_Malicious': 1
        })

    # 5. BruteForce-SSH (Port 22, repeated password attempts with signature sizes)
    n = counts[4]
    dest_ports = np.full(n, 22)
    duration = rng.uniform(200000, 1500000, size=n)
    fwd_pkts = rng.integers(15, 35, size=n)
    bwd_pkts = rng.integers(12, 30, size=n)
    fwd_len_mean = rng.uniform(80, 150, size=n)  # SSH auth packet lengths
    bwd_len_mean = rng.uniform(70, 130, size=n)
    tot_fwd_len = fwd_pkts * fwd_len_mean
    tot_bwd_len = bwd_pkts * bwd_len_mean
    flow_pkts_s = (fwd_pkts + bwd_pkts) / (duration / 1e6 + 1e-5)
    flow_bytes_s = (tot_fwd_len + tot_bwd_len) / (duration / 1e6 + 1e-5)
    
    for i in range(n):
        records.append({
            'Destination_Port': 22,
            'Flow_Duration': float(duration[i]),
            'Total_Fwd_Packets': int(fwd_pkts[i]),
            'Total_Bwd_Packets': int(bwd_pkts[i]),
            'Total_Length_Fwd_Packets': float(tot_fwd_len[i]),
            'Total_Length_Bwd_Packets': float(tot_bwd_len[i]),
            'Fwd_Packet_Length_Max': float(fwd_len_mean[i] * 2.2),
            'Fwd_Packet_Length_Mean': float(fwd_len_mean[i]),
            'Bwd_Packet_Length_Mean': float(bwd_len_mean[i]),
            'Flow_Bytes_s': float(flow_bytes_s[i]),
            'Flow_Packets_s': float(flow_pkts_s[i]),
            'Flow_IAT_Mean': float(duration[i] / (fwd_pkts[i] + bwd_pkts[i] + 1)),
            'Flow_IAT_Std': float(rng.uniform(1500, 6000)),
            'Fwd_IAT_Total': float(duration[i] * 0.95),
            'Bwd_IAT_Total': float(duration[i] * 0.90),
            'Fwd_PSH_Flags': 1,  # Auth payloads pushed
            'Fwd_Header_Length': int(fwd_pkts[i] * 20),
            'Bwd_Header_Length': int(bwd_pkts[i] * 20),
            'Fwd_Packets_s': float(fwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Bwd_Packets_s': float(bwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Packet_Length_Mean': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Packet_Length_Std': float(rng.uniform(40, 90)),
            'SYN_Flag_Count': 1,
            'RST_Flag_Count': int(rng.choice([0, 1], p=[0.7, 0.3])),
            'ACK_Flag_Count': 1,
            'Down_Up_Ratio': float(bwd_pkts[i] / fwd_pkts[i]),
            'Average_Packet_Size': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Init_Win_bytes_forward': 65535,
            'Init_Win_bytes_backward': 65535,
            'Label': 'BruteForce-SSH',
            'Is_Malicious': 1
        })

    # 6. Botnet-C2 (Periodic beaconing, very low IAT variance, small command payloads)
    n = counts[5]
    dest_ports = rng.choice([443, 8080, 6667, 4444], size=n)
    duration = rng.uniform(3000000, 8000000, size=n)
    fwd_pkts = rng.integers(6, 12, size=n)
    bwd_pkts = rng.integers(4, 10, size=n)
    fwd_len_mean = rng.uniform(45, 80, size=n)
    bwd_len_mean = rng.uniform(45, 75, size=n)
    tot_fwd_len = fwd_pkts * fwd_len_mean
    tot_bwd_len = bwd_pkts * bwd_len_mean
    flow_pkts_s = (fwd_pkts + bwd_pkts) / (duration / 1e6 + 1e-5)
    flow_bytes_s = (tot_fwd_len + tot_bwd_len) / (duration / 1e6 + 1e-5)
    
    for i in range(n):
        records.append({
            'Destination_Port': int(dest_ports[i]),
            'Flow_Duration': float(duration[i]),
            'Total_Fwd_Packets': int(fwd_pkts[i]),
            'Total_Bwd_Packets': int(bwd_pkts[i]),
            'Total_Length_Fwd_Packets': float(tot_fwd_len[i]),
            'Total_Length_Bwd_Packets': float(tot_bwd_len[i]),
            'Fwd_Packet_Length_Max': float(fwd_len_mean[i] * 1.3),
            'Fwd_Packet_Length_Mean': float(fwd_len_mean[i]),
            'Bwd_Packet_Length_Mean': float(bwd_len_mean[i]),
            'Flow_Bytes_s': float(flow_bytes_s[i]),
            'Flow_Packets_s': float(flow_pkts_s[i]),
            'Flow_IAT_Mean': float(duration[i] / (fwd_pkts[i] + bwd_pkts[i] + 1)),
            'Flow_IAT_Std': float(rng.uniform(2, 20)),  # Low variance indicates automated beaconing
            'Fwd_IAT_Total': float(duration[i] * 0.96),
            'Bwd_IAT_Total': float(duration[i] * 0.94),
            'Fwd_PSH_Flags': 1,
            'Fwd_Header_Length': int(fwd_pkts[i] * 20),
            'Bwd_Header_Length': int(bwd_pkts[i] * 20),
            'Fwd_Packets_s': float(fwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Bwd_Packets_s': float(bwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Packet_Length_Mean': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Packet_Length_Std': float(rng.uniform(5, 25)),
            'SYN_Flag_Count': 0,
            'RST_Flag_Count': 0,
            'ACK_Flag_Count': 1,
            'Down_Up_Ratio': float(bwd_pkts[i] / fwd_pkts[i]),
            'Average_Packet_Size': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Init_Win_bytes_forward': 32768,
            'Init_Win_bytes_backward': 32768,
            'Label': 'Botnet-C2',
            'Is_Malicious': 1
        })

    # 7. WebAttack (SQL Injection / XSS: Port 80/443, abnormal payload length, high forward packet size)
    n = counts[6]
    dest_ports = rng.choice([80, 443, 8080], size=n)
    duration = rng.uniform(80000, 900000, size=n)
    fwd_pkts = rng.integers(5, 15, size=n)
    bwd_pkts = rng.integers(4, 12, size=n)
    fwd_len_mean = rng.uniform(600, 1400, size=n)  # Large injection payloads
    bwd_len_mean = rng.uniform(200, 800, size=n)
    tot_fwd_len = fwd_pkts * fwd_len_mean
    tot_bwd_len = bwd_pkts * bwd_len_mean
    flow_pkts_s = (fwd_pkts + bwd_pkts) / (duration / 1e6 + 1e-5)
    flow_bytes_s = (tot_fwd_len + tot_bwd_len) / (duration / 1e6 + 1e-5)
    
    for i in range(n):
        records.append({
            'Destination_Port': int(dest_ports[i]),
            'Flow_Duration': float(duration[i]),
            'Total_Fwd_Packets': int(fwd_pkts[i]),
            'Total_Bwd_Packets': int(bwd_pkts[i]),
            'Total_Length_Fwd_Packets': float(tot_fwd_len[i]),
            'Total_Length_Bwd_Packets': float(tot_bwd_len[i]),
            'Fwd_Packet_Length_Max': float(fwd_len_mean[i] * 1.4),
            'Fwd_Packet_Length_Mean': float(fwd_len_mean[i]),
            'Bwd_Packet_Length_Mean': float(bwd_len_mean[i]),
            'Flow_Bytes_s': float(flow_bytes_s[i]),
            'Flow_Packets_s': float(flow_pkts_s[i]),
            'Flow_IAT_Mean': float(duration[i] / (fwd_pkts[i] + bwd_pkts[i] + 1)),
            'Flow_IAT_Std': float(rng.uniform(500, 2500)),
            'Fwd_IAT_Total': float(duration[i] * 0.92),
            'Bwd_IAT_Total': float(duration[i] * 0.88),
            'Fwd_PSH_Flags': 1,
            'Fwd_Header_Length': int(fwd_pkts[i] * 20),
            'Bwd_Header_Length': int(bwd_pkts[i] * 20),
            'Fwd_Packets_s': float(fwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Bwd_Packets_s': float(bwd_pkts[i] / (duration[i] / 1e6 + 1e-5)),
            'Packet_Length_Mean': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Packet_Length_Std': float(rng.uniform(150, 450)),
            'SYN_Flag_Count': 0,
            'RST_Flag_Count': int(rng.choice([0, 1], p=[0.85, 0.15])),
            'ACK_Flag_Count': 1,
            'Down_Up_Ratio': float(bwd_pkts[i] / fwd_pkts[i]),
            'Average_Packet_Size': float((tot_fwd_len[i] + tot_bwd_len[i]) / (fwd_pkts[i] + bwd_pkts[i])),
            'Init_Win_bytes_forward': 65535,
            'Init_Win_bytes_backward': 65535,
            'Label': 'WebAttack',
            'Is_Malicious': 1
        })

    df = pd.DataFrame(records)
    # Shuffle dataframe
    df = df.sample(frac=1.0, random_state=random_state).reset_index(drop=True)
    return df

def save_and_split_dataset(output_dir: str = 'data/processed', n_samples: int = 15000):
    os.makedirs(output_dir, exist_ok=True)
    raw_dir = 'data/raw'
    os.makedirs(raw_dir, exist_ok=True)
    
    print(f"Generating realistic intrusion detection dataset with {n_samples} flow records...")
    df = generate_network_flow_dataset(n_samples=n_samples)
    
    raw_csv = os.path.join(raw_dir, 'cicids_flow_dataset.csv')
    df.to_csv(raw_csv, index=False)
    print(f"Saved full raw dataset to {raw_csv}")
    
    # Strictly split before fitting any preprocessing (ML Best Practice)
    train_df, test_df = train_test_split(df, test_size=0.20, random_state=42, stratify=df['Label'])
    train_df, val_df = train_test_split(train_df, test_size=0.15, random_state=42, stratify=train_df['Label'])
    
    train_df.to_csv(os.path.join(output_dir, 'train.csv'), index=False)
    val_df.to_csv(os.path.join(output_dir, 'val.csv'), index=False)
    test_df.to_csv(os.path.join(output_dir, 'test.csv'), index=False)
    
    print(f"Saved splits -> Train: {len(train_df)}, Val: {len(val_df)}, Test: {len(test_df)}")
    print("Class breakdown in training set:")
    print(train_df['Label'].value_counts())
    return train_df, val_df, test_df

if __name__ == '__main__':
    save_and_split_dataset()
