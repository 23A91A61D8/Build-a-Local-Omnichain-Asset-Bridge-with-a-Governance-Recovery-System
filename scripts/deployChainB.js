const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying to Chain B with:", deployer.address);

  // 1️⃣ Deploy WrappedVaultToken (no constructor args)
  const WrappedVaultToken = await ethers.getContractFactory("WrappedVaultToken");
  const wrappedToken = await WrappedVaultToken.deploy();
  await wrappedToken.waitForDeployment();

  console.log("WrappedVaultToken:", wrappedToken.target);

  // 2️⃣ Deploy BridgeMint (needs wrapped token address)
  const BridgeMint = await ethers.getContractFactory("BridgeMint");
  const bridgeMint = await BridgeMint.deploy(wrappedToken.target);
  await bridgeMint.waitForDeployment();

  console.log("BridgeMint:", bridgeMint.target);

  // 3️⃣ Deploy GovernanceVoting (NOW needs wrapped token address)
  const GovernanceVoting = await ethers.getContractFactory("GovernanceVoting");
  const governanceVoting = await GovernanceVoting.deploy(wrappedToken.target);
  await governanceVoting.waitForDeployment();

  console.log("GovernanceVoting:", governanceVoting.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});