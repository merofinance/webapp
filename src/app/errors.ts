/* eslint-disable max-classes-per-file */
import { CustomError } from "ts-custom-error";

export interface ErrorState {
  message: string;
  title?: string;
  hideContact?: boolean;
  hideButton?: boolean;
  redirectOnClose?: boolean;
  switchToMainnetButton?: boolean;
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

  get switchToMainnetButton(): boolean {
    return true;
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
      switchToMainnetButton: this.switchToMainnetButton,
    };
  }
}

export class UnsupportedNetwork extends BackdError {
  constructor() {
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

  get switchToMainnetButton(): boolean {
    return true;
  }

  formatMessage(): string {
    return "errors.unsupportedNetworkBody";
  }
}
