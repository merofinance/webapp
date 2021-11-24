import "@percy/cypress";
import { INFURA_ID } from "../../src/lib/constants";
import PrivateKeyProvider from "truffle-privatekey-provider";
import Web3 from "web3";

export const WEB3_TIMEOUT = 50_000;

export const percySnapshot = () => {
  // This delay is to give time for animations to finish before taking screenshots
  // We had some flakiness before from animations still being in progress
  cy.wait(2000);
  cy.percySnapshot();
};

export const initWeb3 = () => {
  cy.on("window:before:load", (win) => {
    win.testing = true;
    const provider = new PrivateKeyProvider(
      Cypress.env("PRIVATE_KEY"),
      `https://kovan.infura.io/v3/${INFURA_ID}`
    );
    win.web3 = new Web3(provider);
  });
};
