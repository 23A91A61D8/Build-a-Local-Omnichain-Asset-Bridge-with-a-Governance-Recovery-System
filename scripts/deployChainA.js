const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying to Chain A with:", deployer.address);

  const VaultToken = await ethers.getContractFactory("VaultToken");
  const vaultToken = await VaultToken.deploy();
  await vaultToken.waitForDeployment();

  const BridgeLock = await ethers.getContractFactory("BridgeLock");
  const bridgeLock = await BridgeLock.deploy(vaultToken.target);
  await bridgeLock.waitForDeployment();

  const GovernanceEmergency = await ethers.getContractFactory("GovernanceEmergency");
  const governance = await GovernanceEmergency.deploy(bridgeLock.target);
  await governance.waitForDeployment();

  console.log("VaultToken:", vaultToken.target);
  console.log("BridgeLock:", bridgeLock.target);
  console.log("GovernanceEmergency:", governance.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});