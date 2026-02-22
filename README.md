# Build-a-Local-Omnichain-Asset-Bridge-with-a-Governance-Recovery-System

## 📌 Project Overview

This project implements a simple **Omnichain Token Bridge** using:

- Hardhat
- Solidity
- Docker
- Node.js Relayer
- Two Local Blockchains (Chain A & Chain B)

The bridge allows:

✔ Lock tokens on Chain A  
✔ Mint wrapped tokens on Chain B  
✔ Burn wrapped tokens on Chain B  
✔ Unlock original tokens on Chain A  

---

## 🏗 Architecture

Chain A:
- BridgeLock Contract
- Governance Contract

Chain B:
- BridgeMint Contract
- Governance Contract

Relayer:
- Listens for Lock & Burn events
- Executes Mint & Unlock transactions

---

## 🛠 Technologies Used

- Solidity
- Hardhat
- Node.js
- Ethers.js
- Docker
- dotenv

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install

## 🎯 Conclusion

This project successfully demonstrates the implementation of a basic Omnichain Token Bridge using Solidity, Hardhat, Docker, and a Node.js-based relayer.

Through this project, cross-chain communication between two independent blockchain networks (Chain A and Chain B) was achieved. The system securely handles token locking, minting, burning, and unlocking through event detection and relayer execution.

The architecture ensures:
- Secure token custody
- Automated cross-chain event handling
- Docker-based multi-network simulation
- Proper separation of contracts and relayer logic

This project helped in understanding:
- Smart contract interaction across chains
- Event listening and relayer mechanisms
- Docker-based blockchain simulation
- Governance contract structure
- Real-world bridge design fundamentals

Overall, the Omnichain Bridge was successfully implemented, tested, and validated with Lock → Mint and Burn → Unlock flows working correctly.