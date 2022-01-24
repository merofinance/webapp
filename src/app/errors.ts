/* eslint-disable max-classes-per-file */
import { CustomError } from "ts-custom-error";
import { chainIds } from "../lib/constants";

export interface ErrorState {
  message: string;
  title?: string;
  hideContact?: boolean;
  hideButton?: boolean;
  redirectOnClose?: boolean;
}

export class BackdError extends CustomError {
  get title(): string {
    return "errors.header";
  }

  get hideContact(): boolean {
    return false;
  }

  get hideButton(): boolean {
    return false;
  }

  get redirectOnClose(): boolean {
    return false;
  }

  formatMessage(): string {
    return this.message;
  }

  toErrorState(): ErrorState {
    return {
      title: this.title,
      message: this.formatMessage(),
      hideContact: this.hideContact,
      hideButton: this.hideButton,
      redirectOnClose: this.redirectOnClose,
    };
  }
}

export class UnsupportedNetwork extends BackdError {
  constructor(readonly chainId: number) {
    super("errors.unsupportedNetwork");
  }

  get title(): string {
    return "errors.unsupportedNetwork";
  }

  get hideContact(): boolean {
    return true;
  }

  get hideButton(): boolean {
    return true;
  }

  get redirectOnClose(): boolean {
    return true;
  }

  formatMessage(): string {
    let network = chainIds[this.chainId];
    if (!network) {
      network = `chain id ${this.chainId}`;
    }

    if (this.chainId === 1) return "errors.tryTestnet";

    return (
      `Please change network. You are currently using ${network}, which is not supported. ` +
      "Backd currently supports Kovan and chain id 1337 for developement."
    );
  }
}
