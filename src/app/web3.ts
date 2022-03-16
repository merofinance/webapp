import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { PrivateKeyConnector } from "../lib/private-key-connector";
import { INFURA_ID } from "../lib/constants";

export const privateKeyConnector = new PrivateKeyConnector({
  supportedChainIds: [42],
});

export const supportedChainIds = [
  1, // Mainet
  42, // Kovan
  1337, // Dev
];

export const injectedConnector = new InjectedConnector({
  supportedChainIds,
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
});
