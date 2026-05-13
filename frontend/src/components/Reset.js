import React, { useState } from 'react';
import { ethers } from 'ethers';

function Reset() {
  const [status, setStatus] = useState('');

  const resetIdentity = async () => {
    try {
      if (!window.ethereum) {
        setStatus('❌ Please install MetaMask!');
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractAddress = '0x2A6FE47DEc77b3e773C1069C0a80846d47A24212';
      const abi = ['function resetRegistration(address user) external'];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      
      setStatus('Resetting...');
      const address = await signer.getAddress();
      const tx = await contract.resetRegistration(address);
      await tx.wait();
      setStatus('✅ Reset successful! You can register again.');
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#0077b6' }}>🔄 Reset Registration (Demo Only)</h2>
      <button
        onClick={resetIdentity}
        style={{ padding: '12px 25px', fontSize: '16px', cursor: 'pointer',
        backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        Reset My Registration
      </button>
      <p>{status}</p>
    </div>
  );
}

export default Reset;