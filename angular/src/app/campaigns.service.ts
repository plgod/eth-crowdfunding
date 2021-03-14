import { Injectable } from "@angular/core";
import { CAMPAIGNS, ICampaign } from "./mock-campaigns";
import { of } from "rxjs";
import { Web3Service } from "./web3.service";

export interface ICampaignWithBlockchainInfo extends ICampaign {
  goal: number;
  currentFunding: number;
}

@Injectable({
  providedIn: "root"
})
export class CampaignsService {
  constructor(private web3: Web3Service) {}

  campaigns$ = of(CAMPAIGNS);

  async resolveCampaign(
    campaign: ICampaign
  ): Promise<ICampaignWithBlockchainInfo> {
    return {
      ...campaign,
      goal: 1000000,
      currentFunding: await this.web3.getBalance(campaign.contractAddress)
    };
  }
}
