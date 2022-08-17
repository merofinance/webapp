import "@percy/cypress";
import { INFURA_ID } from "../../src/lib/constants";
import PrivateKeyProvider from "truffle-privatekey-provider";
import Web3 from "web3";
import abi from "./erc20-abi.json";

export const WEB3_TIMEOUT = 40000;

const ADDRESS = "0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D";
const DAI = "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd";

export const percySnapshot = () => {
  // This delay is to give time for animations to finish before taking screenshots
  // We had some flakiness before from animations still being in progress
  cy.wait(2000);
  cy.percySnapshot();
};

const getProvider = (privateKey) => {
  return new Web3(new PrivateKeyProvider(privateKey, `https://kovan.infura.io/v3/${INFURA_ID}`));
};

const sendCrypto = (privateKey) => {
  const web3 = getProvider(Cypress.env("PRIVATE_KEY"));
  const address = web3.eth.accounts.privateKeyToAccount(privateKey).address;
  web3.eth.Contract.setProvider(web3);
  const contract = new web3.eth.Contract(abi, DAI, { from: ADDRESS });
  contract.methods
    .transfer(address, web3.utils.toWei("500", "ether"))
    .send({ from: ADDRESS })
    .on("transactionHash", () => {
      web3.eth.sendTransaction({
        from: ADDRESS,
        to: address,
        value: web3.utils.toWei("0.05", "ether"),
      });
    });
};

export const initWeb3 = (path, main = false) => {
  cy.readFile("data.json").then((data) => {
    let privateKey;
    if (main) {
      privateKey = Cypress.env("PRIVATE_KEY");
    } else if (data.privateKey) {
      privateKey = data.privateKey;
    } else {
      const web3 = new Web3();
      privateKey = web3.eth.accounts.create().privateKey;
      sendCrypto(privateKey);
      cy.writeFile("data.json", { privateKey });
    }
    cy.on("window:before:load", (win) => {
      win.testing = true;
      win.web3 = getProvider(privateKey);
    });
    cy.visit(path);
  });
};

export const returnCrypto = () => {
  cy.readFile("data.json").then((data) => {
    const web3 = getProvider(data.privateKey);
    const address = web3.eth.accounts.privateKeyToAccount(data.privateKey).address;
    web3.eth.Contract.setProvider(web3);
    const contract = new web3.eth.Contract(abi, DAI, { from: address });
    contract.methods
      .balanceOf(address)
      .call({ from: address })
      .then((daiBalance) => {
        contract.methods
          .transfer(ADDRESS, daiBalance)
          .send({ from: address })
          .on("receipt", () => {
            web3.eth.getGasPrice().then((gweiPrice) => {
              const gasPrice = Number(gweiPrice);
              const gasLimit = 21000;
              const gasCost = gasLimit * gasPrice;
              web3.eth.getBalance(address).then((ethBalance) => {
                web3.eth.sendTransaction({
                  from: address,
                  to: ADDRESS,
                  value: Math.floor((Number(ethBalance) - gasCost) * 0.95),
                  gasPrice,
                  gasLimit,
                });
              });
            });
          });
      });
  });
};
