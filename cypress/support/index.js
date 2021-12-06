import "@percy/cypress";
import { INFURA_ID } from "../../src/lib/constants";
import PrivateKeyProvider from "truffle-privatekey-provider";
import Web3 from "web3";
import abi from "./erc20-abi.json";

export const WEB3_TIMEOUT = 40_000;

const ADDRESS = "0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D";

export const percySnapshot = () => {
  // This delay is to give time for animations to finish before taking screenshots
  // We had some flakiness before from animations still being in progress
  cy.wait(2000);
  cy.percySnapshot();
};

export const initWeb3 = (main = false) => {
  cy.on("window:before:load", (win) => {
    win.testing = true;

    // Getting Main Provider (source of ETH and DAI)
    const mainProvider = new PrivateKeyProvider(
      Cypress.env("PRIVATE_KEY"),
      `https://kovan.infura.io/v3/${INFURA_ID}`
    );
    if (main) {
      console.log("Setting as main provider");
      win.web3 = new Web3(mainProvider);
      return;
    } else {
      console.log("Not main provider");
    }
    const mainWeb3 = new Web3(mainProvider);

    // Checking if Account already exists
    if (global.privateKey) {
      const newProvider = new PrivateKeyProvider(
        global.privateKey,
        `https://kovan.infura.io/v3/${INFURA_ID}`
      );
      win.web3 = new Web3(newProvider);
      return;
    }

    // Creating Account to test with
    const newAccount = mainWeb3.eth.accounts.create();
    global.privateKey = newAccount.privateKey;
    global.address = newAccount.address;
    const newProvider = new PrivateKeyProvider(
      newAccount.privateKey,
      `https://kovan.infura.io/v3/${INFURA_ID}`
    );

    // Sending ETH and DAI to test account
    mainWeb3.eth.Contract.setProvider(mainProvider);
    const contract = new mainWeb3.eth.Contract(abi, "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", {
      from: ADDRESS,
    });
    contract.methods
      .transfer(newAccount.address, mainWeb3.utils.toWei("500", "ether"))
      .send({ from: ADDRESS })
      .on("receipt", () => {
        mainWeb3.eth.sendTransaction({
          from: ADDRESS,
          to: newAccount.address,
          value: mainWeb3.utils.toWei("0.02", "ether"),
        });
      });

    win.web3 = new Web3(newProvider);
  });
};

export const returnDai = () => {
  const provider = new PrivateKeyProvider(
    global.privateKey,
    `https://kovan.infura.io/v3/${INFURA_ID}`
  );
  const web3 = new Web3(provider);
  web3.eth.Contract.setProvider(web3);
  const contract = new web3.eth.Contract(abi, "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", {
    from: global.address,
  });

  contract.methods
    .balanceOf(global.address)
    .call({ from: global.address })
    .then((result) => {
      contract.methods.transfer(ADDRESS, result).send({ from: global.address });
    });
};
