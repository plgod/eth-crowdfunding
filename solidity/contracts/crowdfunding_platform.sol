// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title Crowdfunding Platform
 * @dev Crowdfunding on blockchain
 */
contract CrowdfundingPlatform {
    enum CampaignState { Funding, Funded }

    struct Campaign {
        address payable owner;
        uint goal;
        uint balance;
        mapping (address => uint) backers;
    }

    uint public numCampaigns;
    mapping(uint => Campaign) public campaigns;

    function launchCampaign(uint _goal) public returns (uint) {
        numCampaigns;
        Campaign storage newCampaign = campaigns[numCampaigns];
        newCampaign.owner = payable(msg.sender);
        newCampaign.goal = _goal;
        newCampaign.balance = 0;

        return ++numCampaigns;
    }
}
