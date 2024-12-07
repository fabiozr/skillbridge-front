// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Escrow {
    address payable public client;
    address payable public professional;
    uint256 public amount;
    bool public milestoneCompleted;
    address public arbitrator;
    bool public disputeRaised;
    bool public resolved;

    constructor(address payable _client, address payable _professional, uint256 _amount, address _arbitrator) {
        client = _client;
        professional = _professional;
        amount = _amount;
        milestoneCompleted = false;
        arbitrator = _arbitrator;
        disputeRaised = false;
        resolved = false;
    }

    function deposit() payable public {
        require(msg.sender == client, "Only the client can deposit.");
        require(msg.value == amount, "Incorrect deposit amount.");
    }

    function releasePayment() public {
        require(msg.sender == client, "Only the client can release payment.");
        require(milestoneCompleted, "Milestone not yet completed.");
        require(!disputeRaised, "Cannot release payment during a dispute.");
        professional.transfer(amount);
    }

    function markMilestoneCompleted() public {
        require(msg.sender == client, "Only the client can mark milestone completed.");
        milestoneCompleted = true;
    }

    function raiseDispute() public {
        require(msg.sender == client || msg.sender == professional, "Only involved parties can raise a dispute.");
        require(!milestoneCompleted, "Cannot raise dispute after milestone completion.");
        disputeRaised = true;
    }

    function resolveDispute(bool _payProfessional) public {
        require(msg.sender == arbitrator, "Only the arbitrator can resolve disputes.");
        require(disputeRaised, "No dispute raised.");
        resolved = true;
        disputeRaised = false; // Reset dispute status
        if (_payProfessional) {
            professional.transfer(amount);
        } else {
            client.transfer(amount);
        }
    }
}



contract Reviews {
    event ReviewAdded(address indexed professional, string reviewHash);

    function addReview(address _professional, string memory _reviewHash) public {
        emit ReviewAdded(_professional, _reviewHash);
    }
}