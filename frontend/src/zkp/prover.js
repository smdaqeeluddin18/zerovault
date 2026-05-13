import { groth16 } from 'snarkjs';

export async function generateIdentityProof(secret, nullifier) {
  try {
    const input = {
      secret: secret.toString(),
      nullifier: nullifier.toString(),
    };

    const { proof, publicSignals } = await groth16.fullProve(
      input,
      '/identity.wasm',
      '/identity_0001.zkey'
    );

    const calldata = await groth16.exportSolidityCallData(proof, publicSignals);
    const argv = calldata.replace(/['[\]\s]/g, '').split(',');

    const a = [argv[0], argv[1]];
    const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
    const c = [argv[6], argv[7]];
    const input_signal = [argv[8]];

    return { proof, publicSignals, calldata: { a, b, c, input: input_signal } };
  } catch (err) {
    console.error('Proof generation failed:', err);
    throw err;
  }
}