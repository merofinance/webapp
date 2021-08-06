import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Bytes, Signer } from "ethers";
import { Deferrable } from "ethers/lib/utils";
import { masterAccount } from "./data";

export default class MockSigner extends Signer {
  getAddress(): Promise<string> {
    return Promise.resolve(masterAccount);
  }

  signMessage(message: string | Bytes): Promise<string> {
    return Promise.resolve(message.toString());
  }

  signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
    const data = transaction.data?.toString() || "";
    return Promise.resolve(data);
  }

  connect(provider: Provider): Signer {
    return this;
  }
}
