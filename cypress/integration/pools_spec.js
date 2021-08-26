import { percySnapshot } from "../support";
import { INFURA_ID } from "../../src/lib/constants";
import PrivateKeyProvider from "truffle-privatekey-provider";
import Web3 from "web3";
import { ethers } from "ethers";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    cy.on("window:before:load", (win) => {
      const provider = new PrivateKeyProvider(
        "633361498918c6396a2d2e35de29285192cbed197ca3bcdacced769c21107bd7",
        `https://kovan.infura.io/v3/${INFURA_ID}`
      );
      win.ethereum = new Web3(provider);
    });
    cy.visit("/pools");
    cy.contains("MetaMask").click();
  });
});
