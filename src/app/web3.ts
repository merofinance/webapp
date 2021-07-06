import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Backd } from "../lib/backd";

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
    1: process.env.RPC_URL_1 as string,
    3: process.env.RPC_URL_3 as string,
    4: process.env.RPC_URL_4 as string,
    5: process.env.RPC_URL_5 as string,
    42: process.env.RPC_URL_42 as string,
    1337: process.env.RPC_URL_1337 as string,
  },
  qrcode: true,
  pollingInterval: 12000,
});

export async function activateIfAuthorized({
  active,
  activate,
}: Pick<Web3ReactContextInterface<Backd>, "activate" | "active">): Promise<void> {
  const authorized = await injectedConnector.isAuthorized();
  if (!active && authorized) {
    await activate(injectedConnector);
  }
}
