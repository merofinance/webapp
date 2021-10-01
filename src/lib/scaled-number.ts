import { BigNumber } from "ethers";
import {
  bigNumberToString,
  formatCrypto,
  formatCurrency,
  numberToCompactCurrency,
  stringToBigNumber,
} from "./numeric";

export interface PlainScaledNumber {
  value: string;
  decimals: number;
}

export class ScaledNumber {
  private _value: BigNumber;

  private _decimals: number;

  constructor(value = BigNumber.from(0), decimals = 18) {
    this._decimals = decimals;
    this._value = value;
  }

  static fromUnscaled(value: number | string = 0, decimals = 18): ScaledNumber {
    return new ScaledNumber(stringToBigNumber(value.toString() || "0", decimals), decimals);
  }

  static fromPlain(value: PlainScaledNumber): ScaledNumber {
    if (!value) return new ScaledNumber();
    return new ScaledNumber(BigNumber.from(value.value), value.decimals);
  }

  static isValid(value: number | string, decimals = 18): boolean {
    try {
      ScaledNumber.fromUnscaled(value, decimals);
      return true;
    } catch {
      return false;
    }
  }

  get value(): BigNumber {
    return this._value;
  }

  get decimals(): number {
    return this._decimals;
  }

  toPlain = (): PlainScaledNumber => {
    return {
      value: this._value.toString(),
      decimals: this._decimals,
    };
  };

  isZero = (): boolean => this.value.isZero();

  isNegative = (): boolean => this.value.isNegative();

  assertSameDecimals(other: ScaledNumber): void {
    console.assert(this.decimals === other.decimals, "should have the same number of decimals");
  }

  add(other: ScaledNumber): ScaledNumber {
    this.assertSameDecimals(other);
    return new ScaledNumber(this.value.add(other.value), this.decimals);
  }

  sub(other: ScaledNumber): ScaledNumber {
    this.assertSameDecimals(other);
    return new ScaledNumber(this.value.sub(other.value), this.decimals);
  }

  eq(other: ScaledNumber): boolean {
    return this.value.eq(other.value) && this.decimals === other.decimals;
  }

  gt(other: ScaledNumber): boolean {
    this.assertSameDecimals(other);
    return this.value.gt(other.value);
  }

  gte(other: ScaledNumber): boolean {
    this.assertSameDecimals(other);
    return this.value.gte(other.value);
  }

  lt(other: ScaledNumber): boolean {
    this.assertSameDecimals(other);
    return this.value.lt(other.value);
  }

  lte(other: ScaledNumber): boolean {
    this.assertSameDecimals(other);
    return this.value.lte(other.value);
  }

  mul(value: number | string): ScaledNumber {
    const scale = BigNumber.from(10).pow(this.decimals);
    const scaledValue = stringToBigNumber(value.toString(), this.decimals);
    return new ScaledNumber(this.value.mul(scaledValue).div(scale), this.decimals);
  }

  div(value: ScaledNumber): ScaledNumber {
    if (value.isZero()) return new ScaledNumber();
    const scale = BigNumber.from(10).pow(this.decimals);
    return new ScaledNumber(this.value.mul(scale).div(value.value), this.decimals);
  }

  toString = (): string => bigNumberToString(this._value, this._decimals);

  toCryptoString = (parameters: Intl.NumberFormatOptions = {}): string =>
    formatCrypto(Number(this.toString()), parameters);

  toUsdValue = (price: number): string => formatCurrency(Number(this.toString()) * price);

  toCompactUsdValue = (price: number): string =>
    numberToCompactCurrency(Number(this.toString()) * price);
}
