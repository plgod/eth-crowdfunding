import { Component, OnInit } from "@angular/core";
import { Web3Service } from "./web3.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public account: string;

  constructor(public web3: Web3Service) {}

  ngOnInit() {
    this.web3.primaryAccount$.subscribe(account => {
      this.account = account;
    });
  }

  onConnectWallet(): void {
    console.log("IN CONNECT WALLET");
    this.web3.connectAccount();
  }
}
