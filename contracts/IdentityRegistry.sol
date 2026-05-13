// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IdentityRegistry {
    address public owner;
    mapping(address => bytes32) public identityCommitments;
    mapping(address => bool) public isRegistered;

    event IdentityRegistered(address indexed user, bytes32 commitment);

    constructor() {
        owner = msg.sender;
    }

    function registerIdentity(bytes32 commitment) external {
        require(!isRegistered[msg.sender], 'Already registered');
        identityCommitments[msg.sender] = commitment;
        isRegistered[msg.sender] = true;
        emit IdentityRegistered(msg.sender, commitment);
    }

    function getCommitment(address user) external view returns (bytes32) {
        return identityCommitments[user];
    }

    function resetRegistration(address user) external {
        require(msg.sender == owner, 'Not owner');
        isRegistered[user] = false;
        identityCommitments[user] = 0;
    }
}