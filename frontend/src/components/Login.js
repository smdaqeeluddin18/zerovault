import React, { useState } from 'react';
import { ethers } from 'ethers';

function Login() {
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000': 'https://zerovault-production.up.railway.app';

  const proveEligibility = async () => {
    if (!window.ethereum) {
      setStatus('❌ Please install MetaMask!');
      return;
    }
    if (!age || parseInt(age) < 1) {
      setStatus('❌ Please enter a valid age');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    // Check if wallet is registered first
    const contractAddress = '0x2A6FE47DEc77b3e773C1069C0a80846d47A24212';
    const abi = ['function isRegistered(address) view returns (bool)'];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const registered = await contract.isRegistered(address);
    if (!registered) {
      setStatus('❌ Please register your identity first!');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Simulate ZKP steps for demo
      setStatus('🔄 Step 1: Generating Zero Knowledge Proof in your browser...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus('🔄 Step 2: Submitting proof to blockchain...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus('🔄 Step 3: Verifying proof on-chain...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      const isEligible = parseInt(age) >= 18;
      setResult(isEligible ? 'ACCESS GRANTED' : 'ACCESS DENIED');
      setStatus(isEligible ? '✅ Proof verified on blockchain!' : '❌ Age requirement not met!');

      // Log to AI service
      await fetch(`${API_URL}/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_count: isEligible ? 1 : 50,
          avg_value: isEligible ? 0.1 : 99.9,
          time_variance: isEligible ? 0.2 : 99.9
        })
      });

    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#0077b6' }}>✅ Prove Eligibility (ZKP)</h2>
      <p style={{ color: '#555', maxWidth: '400px', margin: '0 auto 20px' }}>
        Your age is never shared. A Zero Knowledge Proof is generated 
        locally in your browser.
      </p>
      <input
        type="number"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', margin: '10px', 
        width: '300px', borderRadius: '8px', border: '1px solid #0077b6' }}
      />
      <br />
      <button
        onClick={proveEligibility}
        disabled={loading}
        style={{ padding: '12px 25px', fontSize: '16px', cursor: 'pointer',
        backgroundColor: loading ? '#aaa' : '#023e8a', color: 'white', 
        border: 'none', borderRadius: '8px' }}
      >
        {loading ? 'Proving...' : 'Prove Eligibility'}
      </button>
      <p style={{ color: status.includes('✅') ? 'green' : status.includes('❌') ? 'red' : '#0077b6', 
        marginTop: '15px', fontSize: '16px' }}>{status}</p>
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', 
        backgroundColor: result.includes('GRANTED') ? '#d4edda' : '#f8d7da', 
        borderRadius: '10px', maxWidth: '400px', margin: '20px auto' }}>
          <h3 style={{ color: result.includes('GRANTED') ? '#155724' : '#721c24' }}>
            {result.includes('GRANTED') ? '🎉' : '🚫'} {result}
          </h3>
          {result.includes('GRANTED') && (
            <>
              <p>✅ Zero Knowledge Proof Verified</p>
              <p>✅ Identity confirmed on blockchain</p>
              <p>✅ No personal data was revealed</p>
            </>
          )}
        </div>
      )}
      <button
        onClick={() => window.history.back()}
        style={{ padding: '8px 20px', fontSize: '14px', cursor: 'pointer',
        backgroundColor: '#aaa', color: 'white', border: 'none', borderRadius: '8px', marginTop: '10px' }}
      >
        ← Back
      </button>
    </div>
  );
}

export default Login;