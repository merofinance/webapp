import { percySnapshot } from "../support";
import { INFURA_ID } from "../../src/lib/constants";
import PrivateKeyProvider from "truffle-privatekey-provider";
import Web3 from "web3";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    cy.on("window:before:load", (win) => {
      const provider = new PrivateKeyProvider(
        "633361498918c6396a2d2e35de29285192cbed197ca3bcdacced769c21107bd7",
        `https://kovan.infura.io/v3/${INFURA_ID}`
      );
      win.web3 = new Web3(provider);
    });
    cy.visit("/pools");
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
  });

  it("Should load Pools", () => {
    cy.get("#pool-row-bdai", { timeout: 30_000 }).should("be.visible");
  });

  it("Should navigate to Pool", () => {
    cy.get("#pool-row-bdai", { timeout: 30_000 }).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pool/bDAI");
    });
  });

  it("Should load balance", () => {
    cy.get("#available-amount", { timeout: 30_000 }).contains(".", { timeout: 30_000 });
  });

  it("Should input value", () => {
    cy.get("#amount-input").focus();
    cy.get("#amount-input").type("10");
  });

  it("Should Deposit", () => {
    cy.get("#action-button").click();
  });
});
