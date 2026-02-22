const { ethers } = require("hardhat");

async function main() {
  const [user] = await ethers.getSigners();

  console.log("Testing Lock from user:", user.address);

  // 🔹 Chain A contract addresses
  const vaultTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const bridgeLockAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const VaultToken = await ethers.getContractAt(
    "VaultToken",
    vaultTokenAddress
  );

  const BridgeLock = await ethers.getContractAt(
    "BridgeLock",
    bridgeLockAddress
  );

  const amount = ethers.parseEther("100");

  // Approve tokens
  const approveTx = await VaultToken.approve(
    bridgeLockAddress,
    amount
  );
  await approveTx.wait();

  console.log("Approved 100 tokens");

  // Call lock()
  const lockTx = await BridgeLock.lock(amount);
  await lockTx.wait();

  console.log("Lock transaction sent!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});