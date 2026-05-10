// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVerifier {
    function verifyProof(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[1] calldata input
    ) external view returns (bool);
}

contract AccessControl {
    IVerifier public verifier;
    mapping(address => uint256) public lastAccessTime;

    event AccessGranted(address indexed patient, uint256 timestamp);
    event AccessDenied(address indexed patient);

    constructor(address _verifier) {
        verifier = IVerifier(_verifier);
    }

    function requestAccess(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[1] calldata input
    ) external returns (bool) {
        bool valid = verifier.verifyProof(a, b, c, input);
        if (valid) {
            lastAccessTime[msg.sender] = block.timestamp;
            emit AccessGranted(msg.sender, block.timestamp);
        } else {
            emit AccessDenied(msg.sender);
        }
        return valid;
    }
}