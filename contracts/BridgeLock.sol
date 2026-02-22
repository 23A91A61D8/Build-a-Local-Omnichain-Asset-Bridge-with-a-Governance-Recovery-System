// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract BridgeLock is AccessControl, Pausable {

    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    IERC20 public immutable vaultToken;

    uint256 public currentNonce;
    mapping(uint256 => bool) public processedNonces;

    event Locked(address indexed user, uint256 amount, uint256 nonce);
    event Unlocked(address indexed user, uint256 amount, uint256 nonce);

    constructor(address _vaultToken) {
        vaultToken = IERC20(_vaultToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function lock(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be > 0");

        vaultToken.transferFrom(msg.sender, address(this), amount);

        uint256 nonce = currentNonce;
        currentNonce++;

        emit Locked(msg.sender, amount, nonce);
    }

    function unlock(
        address user,
        uint256 amount,
        uint256 nonce
    ) external onlyRole(RELAYER_ROLE) whenNotPaused {

        require(!processedNonces[nonce], "Nonce already processed");

        processedNonces[nonce] = true;

        vaultToken.transfer(user, amount);

        emit Unlocked(user, amount, nonce);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
