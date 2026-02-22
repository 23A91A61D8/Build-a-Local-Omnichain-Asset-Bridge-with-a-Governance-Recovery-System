const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Granting roles using:", deployer.address);

  // === Chain A Addresses ===
  const bridgeLockAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // === Chain B Addresses ===
  const bridgeMintAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  const bridgeLock = await ethers.getContractAt(
    "BridgeLock",
    bridgeLockAddress
  );

  const bridgeMint = await ethers.getContractAt(
    "BridgeMint",
    bridgeMintAddress
  );

  const RELAYER_ROLE = ethers.keccak256(
    ethers.toUtf8Bytes("RELAYER_ROLE")
  );

  await bridgeLock.grantRole(RELAYER_ROLE, deployer.address);
  console.log("RELAYER_ROLE granted on BridgeLock");

  await bridgeMint.grantRole(RELAYER_ROLE, deployer.address);
  console.log("RELAYER_ROLE granted on BridgeMint");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});