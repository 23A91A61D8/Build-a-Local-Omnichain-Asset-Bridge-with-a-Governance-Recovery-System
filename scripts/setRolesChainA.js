const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Granting RELAYER_ROLE on Chain A");

  const bridgeLockAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const bridgeLock = await ethers.getContractAt(
    "BridgeLock",
    bridgeLockAddress
  );

  const RELAYER_ROLE = ethers.keccak256(
    ethers.toUtf8Bytes("RELAYER_ROLE")
  );

  await bridgeLock.grantRole(RELAYER_ROLE, deployer.address);

  console.log("RELAYER_ROLE granted on BridgeLock (Chain A)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});