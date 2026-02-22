// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GovernanceVoting is AccessControl {

    IERC20 public wrappedToken;

    struct Proposal {
        uint256 voteCount;
        bool executed;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalPassed(uint256 proposalId, bytes data);

    constructor(address _wrappedToken) {
        wrappedToken = IERC20(_wrappedToken);
    }

    function createProposal() external returns (uint256) {
        proposalCount++;
        return proposalCount;
    }

    function vote(uint256 proposalId) external {
        require(wrappedToken.balanceOf(msg.sender) > 0, "Must hold wrapped token");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        proposals[proposalId].voteCount++;
        hasVoted[proposalId][msg.sender] = true;

        if (proposals[proposalId].voteCount >= 1) {
            proposals[proposalId].executed = true;
            emit ProposalPassed(proposalId, "");
        }
    }
}