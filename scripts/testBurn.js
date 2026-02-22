const { ethers } = require("hardhat");

async function main() {
  const [user] = await ethers.getSigners();

  console.log("Testing Burn from user:", user.address);

  // 🔹 Chain B contracts
  const wrappedTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const bridgeMintAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const WrappedToken = await ethers.getContractAt(
    "WrappedVaultToken",
    wrappedTokenAddress
  );

  const BridgeMint = await ethers.getContractAt(
    "BridgeMint",
    bridgeMintAddress
  );

  const amount = ethers.parseEther("100");

  // Approve BridgeMint to burn
  const approveTx = await WrappedToken.approve(
    bridgeMintAddress,
    amount
  );
  await approveTx.wait();

  console.log("Approved 100 wrapped tokens");

  // Call burn()
  const burnTx = await BridgeMint.burn(amount);
  await burnTx.wait();

  console.log("Burn transaction sent!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});