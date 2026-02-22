const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Granting MINTER_ROLE to BridgeMint...");

  const wrappedTokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const bridgeMintAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  const wrappedToken = await ethers.getContractAt(
    "WrappedVaultToken",
    wrappedTokenAddress
  );

  const MINTER_ROLE = ethers.keccak256(
    ethers.toUtf8Bytes("MINTER_ROLE")
  );

  await wrappedToken.grantRole(MINTER_ROLE, bridgeMintAddress);

  console.log("MINTER_ROLE granted to BridgeMint");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});