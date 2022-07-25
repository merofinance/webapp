import { providers, Signer } from "ethers";
import { Mero, MeroOptions, Web3Mero } from "./mero";
import { MockMero } from "./mock";
import MockSigner from "./mock/signer";

export function createMero(signer: Signer | providers.Provider, options: MeroOptions): Mero {
  if (signer instanceof MockSigner) {
    return new MockMero();
  }
  return new Web3Mero(signer, options);
}
