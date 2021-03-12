import { providers, Signer } from "ethers";
import { Backd, BackdOptions, Web3Backd } from "./backd";
import { MockBackd } from "./mock";
import MockSigner from "./mock/signer";

export function createBackd(
  signer: Signer | providers.Provider,
  options: BackdOptions
): Backd {
  if (signer instanceof MockSigner) {
    return new MockBackd();
  }
  return new Web3Backd(signer, options);
}
