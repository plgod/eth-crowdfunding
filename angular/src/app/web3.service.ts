import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import Web3 from "web3";
import { CrowdfundingCampaignContract } from "./models/crowdfunding-campaign.contract";

@Injectable({
  providedIn: "root",
})
export class Web3Service {
  private web3js: Web3;
  private isConnected = false;
  private isMetamask: boolean;
  public accounts: string[];
  private primaryAccount = new BehaviorSubject<string>(null);

  public readonly primaryAccount$: Observable<
    string
  > = this.primaryAccount.asObservable();

  constructor() {
    this.isMetamask = !!window["ethereum"];
    if (this.isMetamask) {
      this.web3js = new Web3(window["ethereum"]);
    }
  }

  async connectAccount() {
    this.accounts = await this.web3js.eth.requestAccounts();
    console.log(this.accounts);
    this.primaryAccount.next(this.accounts[0]);
  }

  getBalance(contractAddress: string): Promise<number> {
    const contract = new this.web3js.eth.Contract(
      CrowdfundingCampaignContract,
      contractAddress
    );

    return contract.methods.getBalance().call();
  }

  getGoal(contractAddress: string): Promise<number> {
    const contract = new this.web3js.eth.Contract(
      CrowdfundingCampaignContract,
      contractAddress
    );

    return contract.methods.getGoal().call();
  }

  pledge(contractAddress: string, amount: number) {
    if (!this.primaryAccount.value) {
      console.error("Web3: pledge called but no account connected");
      return;
    }

    const contract = new this.web3js.eth.Contract(
      CrowdfundingCampaignContract,
      contractAddress
    );

    contract.methods
      .backCampaign()
      .send({ from: this.primaryAccount.value, value: amount });
    console.log("Pledge sent to MetaMask");
  }
}
