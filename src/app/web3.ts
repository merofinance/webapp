import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { InjectedConnector } from "@web3-react/injected-connector";
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

export async function activateIfAuthorized({
  active,
  activate,
}: Pick<Web3ReactContextInterface<Backd>, "activate" | "active">): Promise<void> {
  const authorized = await injectedConnector.isAuthorized();
  if (!active && authorized) {
    await activate(injectedConnector);
  }
}
