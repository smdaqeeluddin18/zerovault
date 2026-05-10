// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IdentityRegistry {
    mapping(address => bytes32) public identityCommitments;
    mapping(address => bool)    public isRegistered;

    event IdentityRegistered(address indexed user, bytes32 commitment);

    function registerIdentity(bytes32 commitment) external {
        require(!isRegistered[msg.sender], 'Already registered');
        identityCommitments[msg.sender] = commitment;
        isRegistered[msg.sender] = true;
        emit IdentityRegistered(msg.sender, commitment);
    }

    function getCommitment(address user) external view returns (bytes32) {
        return identityCommitments[user];
    }
}