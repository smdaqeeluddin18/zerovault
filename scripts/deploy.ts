import { network } from "hardhat";

const { ethers } = await network.connect();

// Deploy Verifier
const Verifier = await ethers.getContractFactory("Groth16Verifier");
const verifier = await Verifier.deploy();
await verifier.waitForDeployment();
const verifierAddress = await verifier.getAddress();
console.log("Verifier deployed to:", verifierAddress);

// Deploy IdentityRegistry
const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
const registry = await IdentityRegistry.deploy();
await registry.waitForDeployment();
console.log("IdentityRegistry deployed to:", await registry.getAddress());

// Deploy AccessControl
const AccessControl = await ethers.getContractFactory("AccessControl");
const access = await AccessControl.deploy(verifierAddress);
await access.waitForDeployment();
console.log("AccessControl deployed to:", await access.getAddress());