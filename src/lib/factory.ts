import { Signer } from "ethers";
import { Backd } from "./backd";
import { MockBackd } from "./mock";
import MockSigner from "./mock/signer";

export async function createBackd(signer: Signer): Promise<Backd> {
  if (signer instanceof MockSigner) {
    return new MockBackd();
  }
  throw new Error("real signer not supported yet");
}
