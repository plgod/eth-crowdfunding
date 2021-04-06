import { Injectable } from "@angular/core";
import { BigNumber, ethers } from "ethers";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import * as Crowdfunding from "./abi/Crowdfunding.json";

@Injectable({
  providedIn: "root",
})
export class Web3Service {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;
  private _isConnected = false;
  private isMetamask: boolean;
  public accounts: string[];
  private primaryAccount = new BehaviorSubject<string>(null);

  public get isConnected(): boolean {
    return this._isConnected;
  }

  public readonly primaryAccount$: Observable<
    string
  > = this.primaryAccount.asObservable();

  constructor() {
    this.isMetamask = !!window["ethereum"];
    if (this.isMetamask) {
      console.log("window.ethereum exists, using that provider (likely MetaMask)");
      this.provider = new ethers.providers.Web3Provider(window["ethereum"]);
      this.signer = this.provider.getSigner();
    }
    else {
      console.log("No MetaMask, using nothing for now.")
      // this.provider = new ethers.providers.InfuraProvider("wss://rinkeby.infura.io/ws");
    }
  }

  async getCampaigns(): Promise<any> {
    const contract = new ethers.Contract(
      Crowdfunding.networks[5777].address,
      Crowdfunding.abi,
      this.provider
    )

    const numCampaigns = await contract.numCampaigns();
    let campaigns: any[] = [];

    for (let i = 0; i < numCampaigns; i++) {
      const campaign = await contract.campaigns(i);
      campaigns.push({ owner: campaign.owner, balance: campaign.balance, goal: campaign.goal });
      console.log(campaign);
    }

    return campaigns;
  }

  getBalance(contractAddress: string): Promise<number> {
    const contract = new ethers.Contract(
      contractAddress,
      Crowdfunding.abi,
      this.provider
    );

    return contract.getBalance();
  }

  getGoal(contractAddress: string): Promise<number> {
    const contract = new ethers.Contract(
      contractAddress,
      Crowdfunding.abi,
      this.provider
    );

    return contract.getGoal();
  }

  async pledge(campaignId: number, amount: number) {
    // TODO check if account connected

    const contract = new ethers.Contract(
      Crowdfunding.networks[5777].address,
      Crowdfunding.abi,
      this.signer
    );

    await this.connectMetamask();

    contract.pledge(campaignId, {value: BigNumber.from(amount)});
    console.log("Pledge sent to MetaMask");
  }

  async connectMetamask() {
    if (!this._isConnected && this.isMetamask) {
      this.primaryAccount.next(await window["ethereum"].enable());
      this._isConnected = true;
    }
  }
}
