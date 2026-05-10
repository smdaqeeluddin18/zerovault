import requests
import time

print('🚨 Simulating replay attack on ZeroVault Health...')
print('=' * 50)

for i in range(20):
    res = requests.post('http://localhost:5000/detect', json={
        'transaction_count': 999,
        'avg_value': 99.9,
        'time_variance': 99.9
    })
    data = res.json()
    
    if data['is_anomaly']:
        print(f'  Attempt {i+1}: 🚨 ANOMALY DETECTED - {data["message"]}')
    else:
        print(f'  Attempt {i+1}: ✅ Passed - confidence: {data["confidence"]:.3f}')
    
    time.sleep(0.3)

print('=' * 50)
print('Attack simulation complete.')