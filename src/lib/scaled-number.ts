import { BigNumber } from "ethers";
import {
  bigNumberToString,
  formatCrypto,
  formatCurrency,
  formatPercent,
  numberToCompactCurrency,
  stringToBigNumber,
} from "./numeric";
import { Optional } from "./types";

export interface PlainScaledNumber {
  value: string;
  decimals: number;
}

export class ScaledNumber {
  private _value: BigNumber;

  private _decimals: number;

  constructor(value: Optional<BigNumber> = BigNumber.from(0), decimals = 18) {
    this._decimals = decimals;
    this._value = value || BigNumber.from(0);
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

  private scale = (decimals: number) => {
    return BigNumber.from(10).pow(decimals);
  };

  toPlain = (): PlainScaledNumber => {
    return {
      value: this._value.toString(),
      decimals: this._decimals,
    };
  };

  isZero = (): boolean => this.value.isZero();

  isNegative = (): boolean => this.value.isNegative();

  standardizeDecimals(other: ScaledNumber): ScaledNumber {
    if (this.decimals === other.decimals) return other;
    if (this.decimals >= other.decimals) {
      return new ScaledNumber(
        other.value.mul(BigNumber.from(10).pow(this._decimals - other.decimals)),
        this.decimals
      );
    }
    return new ScaledNumber(
      other.value.div(BigNumber.from(10).pow(other.decimals - this._decimals)),
      this.decimals
    );
  }

  add(other: ScaledNumber): ScaledNumber {
    other = this.standardizeDecimals(other);
    return new ScaledNumber(this.value.add(other.value), this.decimals);
  }

  sub(other: ScaledNumber): ScaledNumber {
    other = this.standardizeDecimals(other);
    return new ScaledNumber(this.value.sub(other.value), this.decimals);
  }

  eq(other: ScaledNumber): boolean {
    return this.value.eq(other.value) && this.decimals === other.decimals;
  }

  gt(other: ScaledNumber): boolean {
    other = this.standardizeDecimals(other);
    return this.value.gt(other.value);
  }

  gte(other: ScaledNumber): boolean {
    other = this.standardizeDecimals(other);
    return this.value.gte(other.value);
  }

  lt(other: ScaledNumber): boolean {
    other = this.standardizeDecimals(other);
    return this.value.lt(other.value);
  }

  lte(other: ScaledNumber): boolean {
    other = this.standardizeDecimals(other);
    return this.value.lte(other.value);
  }

  max(other: ScaledNumber): ScaledNumber {
    other = this.standardizeDecimals(other);
    return this.value.gt(other.value) ? this : other;
  }

  min(other: ScaledNumber): ScaledNumber {
    other = this.standardizeDecimals(other);
    return this.value.lt(other.value) ? this : other;
  }

  mul(value: number | string | ScaledNumber): ScaledNumber {
    const scaledValue =
      value instanceof ScaledNumber
        ? value.value
        : stringToBigNumber(value.toString(), this.decimals);
    const scaledDecimals = value instanceof ScaledNumber ? value.decimals : this.decimals;
    return new ScaledNumber(
      this.value.mul(scaledValue).div(this.scale(scaledDecimals)),
      this.decimals
    );
  }

  div(value: number | string | ScaledNumber): ScaledNumber {
    const scaledValue =
      value instanceof ScaledNumber
        ? value.value
        : stringToBigNumber(value.toString(), this.decimals);
    if (scaledValue.isZero()) return new ScaledNumber();
    const scaledDecimals = value instanceof ScaledNumber ? value.decimals : this.decimals;
    return new ScaledNumber(
      this.value.mul(this.scale(scaledDecimals)).div(scaledValue),
      this.decimals
    );
  }

  toString = (): string => bigNumberToString(this._value, this._decimals);

  toCryptoString = (parameters: Intl.NumberFormatOptions = {}): string =>
    formatCrypto(Number(this.toString()), parameters);

  toUsdValue = (price: number): string => formatCurrency(Number(this.toString()) * price);

  toCompactUsdValue = (price: number): string =>
    numberToCompactCurrency(Number(this.toString()) * price);

  toPercent = (): string => formatPercent(Number(this.toString()));
}
