import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#0077b6',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <div 
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <span style={{ fontSize: '24px' }}>🏥</span>
        <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          ZeroVault Health
        </span>
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={() => navigate('/register')}
          style={{ padding: '8px 15px', backgroundColor: 'transparent',
          color: 'white', border: '1px solid white', borderRadius: '6px', cursor: 'pointer' }}
        >
          Register
        </button>
        <button
          onClick={() => navigate('/login')}
          style={{ padding: '8px 15px', backgroundColor: 'white',
          color: '#0077b6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Prove Eligibility
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 15px', backgroundColor: 'transparent',
          color: 'white', border: '1px solid white', borderRadius: '6px', cursor: 'pointer' }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default Header;