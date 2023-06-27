import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { UAuthConnector } from "@uauth/web3-react";
import { PrivateKeyConnector } from "../lib/private-key-connector";
import { RPC } from "../lib/constants";

export const privateKeyConnector = new PrivateKeyConnector({
  supportedChainIds: [42, 137],
});

export const supportedChainIds = [
  ...Array.from(Array(1000).keys()),
  1337,
  42161,
  43114,
  8217,
  42220,
  42262,
  32659,
  1284,
  4689,
  10000,
  333999,
  1313161554,
  1666600000,
  43114,
  43113,
];

export const injectedConnector = new InjectedConnector({
  supportedChainIds,
});

export const walletConnectConnector = new WalletConnectConnector({
  supportedChainIds,
  rpc: {
    1: RPC,
    5: RPC,
    1337: ``,
  },
  qrcode: true,
});

export const unstoppableDomainsConnector = new UAuthConnector({
  clientID: "82a859bc-97fb-4ba4-b9a8-6f8e4003f4e1",
  redirectUri: "https://mero.finance/",
  postLogoutRedirectUri: "https://mero.finance/",

  // Scope must include openid and wallet
  scope: "openid wallet",

  // Injected and walletconnect connectors are required.
  connectors: { injected: injectedConnector, walletconnect: walletConnectConnector },
});
