// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

import "./crowdfunding_platform.sol";

contract Crowdfunding is CrowdfundingPlatform {
    function getGoal(uint _campaignId) public view returns (uint) {
        return campaigns[_campaignId].goal;
    }

    function getBalance(uint _campaignId) public view returns(uint) {
        return campaigns[_campaignId].balance;
    }

    function pledge(uint _campaignId) public payable {
        require(msg.value != 0);
        campaigns[_campaignId].balance += msg.value;
        campaigns[_campaignId].backers[msg.sender] += msg.value;
    }

    function claim(uint _campaignId) public {
        require(msg.sender == campaigns[_campaignId].owner, "Only owner can withdraw funds.");
        require(campaigns[_campaignId].balance >= campaigns[_campaignId].goal, "Goal is not yet reached.");
        
        payable(msg.sender).transfer(campaigns[_campaignId].balance);
    }
}