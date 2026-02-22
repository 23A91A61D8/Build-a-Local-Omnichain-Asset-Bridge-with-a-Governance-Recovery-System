require("dotenv").config();

module.exports = {
  chainA: {
    rpc: process.env.CHAIN_A_RPC,
  },
  chainB: {
    rpc: process.env.CHAIN_B_RPC,
  },
  confirmations: parseInt(process.env.CONFIRMATIONS || "3"),
  privateKey: process.env.PRIVATE_KEY,
  addresses: {
    bridgeLock: process.env.CHAIN_A_BRIDGELOCK,
    governanceA: process.env.CHAIN_A_GOVERNANCE,
    bridgeMint: process.env.CHAIN_B_BRIDGEMINT,
    governanceB: process.env.CHAIN_B_GOVERNANCE,
  }
};
