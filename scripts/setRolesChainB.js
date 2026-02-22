const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Granting RELAYER_ROLE on Chain B");

  const bridgeMintAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  const bridgeMint = await ethers.getContractAt(
    "BridgeMint",
    bridgeMintAddress
  );

  const RELAYER_ROLE = ethers.keccak256(
    ethers.toUtf8Bytes("RELAYER_ROLE")
  );

  await bridgeMint.grantRole(RELAYER_ROLE, deployer.address);

  console.log("RELAYER_ROLE granted on BridgeMint (Chain B)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});