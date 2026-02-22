const { ethers } = require("ethers");
const config = require("./config");
const {
  loadState,
  isProcessed,
  markProcessed
} = require("./persistence");

const state = loadState();

const providerA = new ethers.JsonRpcProvider(config.chainA.rpc);
const providerB = new ethers.JsonRpcProvider(config.chainB.rpc);

const walletA = new ethers.Wallet(config.privateKey, providerA);
const walletB = new ethers.Wallet(config.privateKey, providerB);

// 🔥 ADDED THIS LINE
console.log("Relayer wallet address:", walletB.address);

const bridgeLockABI = [
  "event Locked(address indexed user,uint256 amount,uint256 nonce)",
  "function unlock(address user,uint256 amount,uint256 nonce)"
];

const bridgeMintABI = [
  "event Burned(address indexed user,uint256 amount,uint256 nonce)",
  "function mintWrapped(address user,uint256 amount,uint256 nonce)"
];

const governanceABI = [
  "event ProposalPassed(uint256 proposalId,bytes data)",
  "function pauseBridge()"
];

// Chain A contracts
const bridgeLock = new ethers.Contract(
  config.addresses.bridgeLock,
  bridgeLockABI,
  walletA
);

const governanceA = new ethers.Contract(
  config.addresses.governanceA,
  governanceABI,
  walletA
);

// Chain B contracts
const bridgeMint = new ethers.Contract(
  config.addresses.bridgeMint,
  bridgeMintABI,
  walletB
);

const governanceB = new ethers.Contract(
  config.addresses.governanceB,
  governanceABI,
  walletB
);

// Wait confirmations
async function waitForConfirmations(tx) {
  await tx.wait(config.confirmations);
}

// Handle Lock → Mint
async function handleLocked(user, amount, nonce) {
  const key = `lock-${nonce}`;
  if (isProcessed(state, key)) return;

  console.log("Locked event detected:", nonce);

  try {
    const tx = await bridgeMint.mintWrapped(user, amount, nonce);
    await waitForConfirmations(tx);

    markProcessed(state, key);
    console.log("Minted on Chain B:", nonce);
  } catch (err) {
    console.error("Mint failed:", err.message);
  }
}

// Handle Burn → Unlock
async function handleBurned(user, amount, nonce) {
  const key = `burn-${nonce}`;
  if (isProcessed(state, key)) return;

  console.log("Burned event detected:", nonce);

  try {
    const tx = await bridgeLock.unlock(user, amount, nonce);
    await waitForConfirmations(tx);

    markProcessed(state, key);
    console.log("Unlocked on Chain A:", nonce);
  } catch (err) {
    console.error("Unlock failed:", err.message);
  }
}

// Handle Governance
async function handleProposalPassed(proposalId) {
  const key = `proposal-${proposalId}`;
  if (isProcessed(state, key)) return;

  console.log("ProposalPassed detected:", proposalId);

  try {
    const tx = await governanceA.pauseBridge();
    await waitForConfirmations(tx);

    markProcessed(state, key);
    console.log("Bridge paused from governance.");
  } catch (err) {
    console.error("Pause failed:", err.message);
  }
}

// Start listeners
function start() {
  console.log("Relayer started...");

  bridgeLock.on("Locked", handleLocked);
  bridgeMint.on("Burned", handleBurned);
  governanceB.on("ProposalPassed", handleProposalPassed);
}

start();