import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#0077b6' }}>🏥 ZeroVault Health</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>
        Secure Patient Identity Management using Zero Knowledge Proofs
      </p>
      <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto 30px' }}>
        Verify your medical identity without exposing personal data. 
        Your privacy is protected by cryptography, not promises.
      </p>
      <button 
        onClick={() => navigate('/register')}
        style={{ padding: '12px 25px', fontSize: '16px', margin: '10px', 
        cursor: 'pointer', backgroundColor: '#0077b6', color: 'white', 
        border: 'none', borderRadius: '8px' }}
      >
        🔐 Register Patient Identity
      </button>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{ padding: '12px 25px', fontSize: '16px', margin: '10px', 
        cursor: 'pointer', backgroundColor: '#00b4d8', color: 'white', 
        border: 'none', borderRadius: '8px' }}
      >
        📋 Patient Dashboard
      </button>
      <button 
        onClick={() => navigate('/login')}
        style={{ padding: '12px 25px', fontSize: '16px', margin: '10px', 
        cursor: 'pointer', backgroundColor: '#023e8a', color: 'white', 
        border: 'none', borderRadius: '8px' }}
      >
        ✅ Prove Eligibility (ZKP)
      </button>
    </div>
  );
}

export default Home;