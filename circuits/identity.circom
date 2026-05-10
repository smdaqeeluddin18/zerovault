pragma circom 2.0.0;

template IdentityVerifier() {
    signal input secret;
    signal input nullifier;
    signal output commitment;

    commitment <== secret * nullifier;
}

component main = IdentityVerifier();