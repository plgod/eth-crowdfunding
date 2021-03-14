import { Component, OnInit } from "@angular/core";
import { Web3Service } from "./web3.service";
import { CAMPAIGNS } from "./mock-campaigns";
import { filter } from "rxjs/operators";
import {
  CampaignsService,
  ICampaignWithBlockchainInfo
} from "./campaigns.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
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
    "Misc"
  ];
  campaigns: ICampaignWithBlockchainInfo[];

  constructor(
    public web3: Web3Service,
    private campaignsService: CampaignsService
  ) {}

  ngOnInit() {
    this.resolveCampaigns();
  }

  private async resolveCampaigns() {
    const account = await this.web3.primaryAccount$;
    console.log(account);
    this.campaigns = [
      await this.campaignsService.resolveCampaign(
        (await this.campaignsService.campaigns$.toPromise())[0]
      )
    ];
  }

  onConnectWallet(): void {
    console.log("IN CONNECT WALLET");
    this.web3.connectAccount();
  }

  onChangeCategory(category: string) {
    this.selectedCategory = category;
  }
}
