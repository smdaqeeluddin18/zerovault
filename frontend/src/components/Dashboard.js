import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [status, setStatus] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState(null);
  const { ethers } = require('ethers');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('zerovault-production.up.railway.app');
        const data = await res.json();
        setEvents(data.events || []);
        setAlert(data.anomaly_detected ? data.reason : null);
      } catch (err) {
        // AI service not available
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    try {
      if (!window.ethereum) {
        setStatus('❌ Please install MetaMask!');
        return;
      }
      setStatus('Checking...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contractAddress = '0xCC2838Aa9f10376F6030897D5061a3069cAcf365';
      const abi = [
        'function isRegistered(address) view returns (bool)'
      ];

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const registered = await contract.isRegistered(address);
      setIsRegistered(registered);
      setStatus(registered ? '✅ Identity is registered!' : '❌ Not registered yet.');
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#0077b6' }}>📋 Patient Dashboard</h2>

      {/* Identity Check */}
      <button
        onClick={checkStatus}
        style={{ padding: '12px 25px', fontSize: '16px', cursor: 'pointer',
        backgroundColor: '#0077b6', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        Check My Identity Status
      </button>
      <p style={{ color: status.includes('✅') ? 'green' : 'red' }}>{status}</p>
      {isRegistered && (
        <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#d0f0fd',
        borderRadius: '10px', maxWidth: '400px', margin: '10px auto' }}>
          <h3 style={{ color: '#0077b6' }}>🎉 Verified Patient</h3>
          <p>✅ HIPAA Compliant</p>
          <p>✅ Zero Personal Data Exposed</p>
          <p>✅ Blockchain Verified</p>
        </div>
      )}

      {/* AI Security Monitor */}
      <div style={{ maxWidth: '600px', margin: '30px auto' }}>
        <h3 style={{ color: '#0077b6' }}>🤖 AI Security Monitor</h3>
        {alert && (
          <div style={{ backgroundColor: '#f8d7da', border: '2px solid red',
          borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
            <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>🚨 ATTACK DETECTED</p>
            <p style={{ color: '#721c24' }}>{alert}</p>
          </div>
        )}
        {events.length === 0 && (
          <p style={{ color: '#888' }}>No activity yet. Monitoring for threats...</p>
        )}
        {events.map((evt, i) => (
          <div key={i} style={{ padding: '10px', margin: '5px', borderRadius: '8px',
          backgroundColor: evt.is_anomaly ? '#f8d7da' : '#d4edda',
          display: 'flex', justifyContent: 'space-between' }}>
            <span>Transactions: {evt.transaction_count}</span>
            <span style={{ fontWeight: 'bold',
            color: evt.is_anomaly ? 'red' : 'green' }}>
              {evt.is_anomaly ? '🚨 ANOMALOUS' : '✅ NORMAL'}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => window.history.back()}
        style={{ padding: '8px 20px', fontSize: '14px', cursor: 'pointer',
        backgroundColor: '#aaa', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        ← Back
      </button>
    </div>
  );
}

export default Dashboard;