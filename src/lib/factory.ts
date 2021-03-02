import { providers, Signer } from "ethers";
import { Backd, Web3Backd } from "./backd";
import { MockBackd } from "./mock";
import MockSigner from "./mock/signer";

export function createBackd(signer: Signer | providers.Provider): Backd {
  if (signer instanceof MockSigner) {
    return new MockBackd();
  }
  return new Web3Backd(signer);
}
