import React, { useState } from 'react';
import { ethers } from 'ethers';

function Register() {
  const [status, setStatus] = useState('');
  const [secret, setSecret] = useState('');

  const registerIdentity = async () => {
    try {
      setStatus('Connecting to MetaMask...');
      if (!window.ethereum) {
  setStatus('❌ Please install MetaMask extension to use ZeroVault!');
  return;
}
const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const commitment = ethers.keccak256(ethers.toUtf8Bytes(secret));

      const contractAddress = '0xCC2838Aa9f10376F6030897D5061a3069cAcf365';
      const abi = [
        'function registerIdentity(bytes32 commitment) external',
        'function isRegistered(address) view returns (bool)'
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);
      setStatus('Registering identity...');
      const tx = await contract.registerIdentity(commitment);
      await tx.wait();
      setStatus('✅ Identity registered successfully!');
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#0077b6' }}>🔐 Register Patient Identity</h2>
      <p style={{ color: '#555' }}>Enter your secret health key to register on the blockchain</p>
      <input
        type="password"
        placeholder="Enter your secret health key"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', margin: '10px', 
        width: '300px', borderRadius: '8px', border: '1px solid #0077b6' }}
      />
      <br />
      <button
        onClick={registerIdentity}
        style={{ padding: '12px 25px', fontSize: '16px', cursor: 'pointer',
        backgroundColor: '#0077b6', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        Register Identity
      </button>
      <p style={{ color: status.includes('✅') ? 'green' : 'red' }}>{status}</p>
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

export default Register;