import { Component, OnInit } from "@angular/core";
import { Web3Service } from "./web3.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public accounts: string[];

  constructor(public web3: Web3Service) {}

  onConnectWallet(): void {
    this.web3.connectAccount();
  }
}
