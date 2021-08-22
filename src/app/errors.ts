/* eslint-disable max-classes-per-file */
import { CustomError } from "ts-custom-error";
import { chainIds } from "../lib/constants";

export interface ErrorState {
  message: string;
  title?: string;
  hideContact?: boolean;
}

export class BackdError extends CustomError {
  get title(): string {
    return "An Error Occured";
  }

  get hideContact(): boolean {
    return false;
  }

  formatMessage(): string {
    return this.message;
  }

  toErrorState(): ErrorState {
    return { title: this.title, message: this.formatMessage(), hideContact: this.hideContact };
  }
}

export class UnsupportedNetwork extends BackdError {
  constructor(readonly chainId: number) {
    super("unsupported network selected");
  }

  get title(): string {
    return "Network not supported";
  }

  get hideContact(): boolean {
    return true;
  }

  formatMessage(): string {
    let network = chainIds[this.chainId];
    if (!network) {
      network = `chain id ${this.chainId}`;
    }

    if (this.chainId === 1)
      return "Backd is not yet live on mainnet. You can test it now on Kovan by switching networks.";

    return (
      `Please change network. You are currently using ${network}, which is not supported. ` +
      "Backd currently supports Kovan and chain id 1337 for developement."
    );
  }
}