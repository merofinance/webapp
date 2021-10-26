import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { PrivateKeyConnector } from "../lib/private-key-connector";
import { INFURA_ID } from "../lib/constants";

export const privateKeyConnector = new PrivateKeyConnector({
  supportedChainIds: [42],
});

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    1337, // Dev
  ],
});

export const walletConnectConnector = new WalletConnectConnector({
  rpc: {
    1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    3: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    4: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    5: `https://goerli.infura.io/v3/${INFURA_ID}`,
    42: `https://kovan.infura.io/v3/${INFURA_ID}`,
    1337: ``,
  },
  qrcode: true,
  pollingInterval: 12000,
});
