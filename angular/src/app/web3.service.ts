import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import Web3 from "web3";

@Injectable({
  providedIn: "root",
})
export class Web3Service {
  private web3js: Web3;
  public accounts: string[];
  private primaryAccount = new Subject<string>();
  public readonly primaryAccount$: Observable<
    string
  > = this.primaryAccount.asObservable();

  constructor() {
    this.web3js = new Web3(window["ethereum"]);
  }

  async connectAccount() {
    this.accounts = await this.web3js.eth.requestAccounts();
    this.primaryAccount.next(this.accounts[0]);
    console.log(this.accounts);
  }
}
