from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.ensemble import IsolationForest

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

# Training data — normal transaction patterns
training_data = np.array([
    # Normal patient logins
    [1, 0.1, 0.2],
    [2, 0.2, 0.1],
    [1, 0.1, 0.3],
    [2, 0.3, 0.2],
    [1, 0.2, 0.1],
    [1, 0.1, 0.2],
    [2, 0.1, 0.1],
    [1, 0.3, 0.2],
    [1, 0.1, 0.1],
    [2, 0.2, 0.3],
    [1, 0.3, 0.1],
    [2, 0.1, 0.2],
    [1, 0.2, 0.2],
    [2, 0.3, 0.3],
    [1, 0.1, 0.2],
    [2, 0.2, 0.2],
    # Slightly above normal — still legitimate
    [3, 0.4, 0.3],
    [3, 0.3, 0.4],
    [4, 0.4, 0.3],
    [3, 0.4, 0.4],
])

model = IsolationForest(contamination=0.1, random_state=42)
model.fit(training_data)

attack_log = []

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/detect', methods=['POST'])
def detect():
    try:
        data = request.json
        features = np.array([[
            data['transaction_count'],
            data['avg_value'],
            data['time_variance']
        ]])

        prediction = model.predict(features)
        score = model.score_samples(features)
        is_anomaly = prediction[0] == -1

        event = {
            'is_anomaly': bool(is_anomaly),
            'confidence': float(abs(score[0])),
            'message': '🚨 Attack detected! Suspicious pattern flagged.' if is_anomaly else 'Normal activity',
            'transaction_count': data['transaction_count'],
            'avg_value': data['avg_value'],
        }
        attack_log.append(event)

        return jsonify(event)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/events', methods=['GET'])
def get_events():
    recent = attack_log[-10:][::-1]
    anomaly = any(e['is_anomaly'] for e in recent)
    return jsonify({
        'events': recent,
        'anomaly_detected': anomaly,
        'reason': '🚨 Replay attack detected!' if anomaly else ''
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)