import { Component, OnInit } from "@angular/core";
import { Web3Service } from "./web3.service";
import { CAMPAIGNS } from "./mock-campaigns";
import { filter, map } from "rxjs/operators";
import {
  CampaignsService,
  ICampaignWithBlockchainInfo,
} from "./campaigns.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public account: string;
  selectedCategory: string = "All";
  categories = [
    "All",
    "Arts",
    "Sports",
    "Tech",
    "Food",
    "Music",
    "Games",
    "Travel",
    "Misc",
  ];
  campaigns: any[];

  constructor(
    public web3: Web3Service,
    private campaignsService: CampaignsService
  ) {}

  ngOnInit() {
    this.resolveCampaigns();
    this.web3.primaryAccount$.subscribe((account) => (this.account = account));
  }

  private async resolveCampaigns() {
    this.campaigns = await this.web3.getCampaigns();
    // this.campaigns = await this.campaignsService.campaigns$
    //   .pipe(
    //     map((campaigns) =>
    //       Promise.all(
    //         campaigns.map((campaign) =>
    //           this.campaignsService.resolveCampaign(campaign)
    //         )
    //       )
    //     )
    //   )
    //   .toPromise();
  }

  onConnectWallet(): void {
    console.log("IN CONNECT WALLET");
    this.web3.connectMetamask();
  }

  onChangeCategory(category: string) {
    this.selectedCategory = category;
  }

  onPledge(campaignId: number) {
    this.web3.pledge(campaignId, 250000000);
  }
}
