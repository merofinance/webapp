import { BigNumber } from "ethers";
import { bigNumberToString, formatCrypto, formatCurrency, stringToBigNumber } from "./numeric";

export interface PlainTokenValue {
  value: string;
  decimals: number;
}

export class TokenValue {
  private _value: BigNumber;

  private _decimals: number;

  constructor(value = BigNumber.from(0), decimals = 18) {
    this._decimals = decimals;
    this._value = value;
  }

  static fromUnscaled(value: number | string, decimals = 18): TokenValue {
    return new TokenValue(stringToBigNumber(value.toString() || "0", decimals), decimals);
  }

  static fromPlain(value: PlainTokenValue): TokenValue {
    return new TokenValue(BigNumber.from(value.value), value.decimals);
  }

  get value(): BigNumber {
    return this._value;
  }

  get decimals(): number {
    return this._decimals;
  }

  toPlain = (): PlainTokenValue => {
    return {
      value: this._value.toString(),
      decimals: this._decimals,
    };
  };

  isZero = (): boolean => this.value.isZero();

  isNegative = (): boolean => this.value.isNegative();

  assertSameDecimals(other: TokenValue): void {
    console.assert(this.decimals === other.decimals, "should have the same number of decimals");
  }

  add(other: TokenValue): TokenValue {
    this.assertSameDecimals(other);
    return new TokenValue(this.value.add(other.value), this.decimals);
  }

  sub(other: TokenValue): TokenValue {
    this.assertSameDecimals(other);
    return new TokenValue(this.value.sub(other.value), this.decimals);
  }

  eq(other: TokenValue): boolean {
    return this.value.eq(other.value) && this.decimals === other.decimals;
  }

  gt(other: TokenValue): boolean {
    this.assertSameDecimals(other);
    return this.value.gt(other.value);
  }

  gte(other: TokenValue): boolean {
    this.assertSameDecimals(other);
    return this.value.gte(other.value);
  }

  lt(other: TokenValue): boolean {
    this.assertSameDecimals(other);
    return this.value.lt(other.value);
  }

  lte(other: TokenValue): boolean {
    this.assertSameDecimals(other);
    return this.value.lte(other.value);
  }

  mul(value: number | string): TokenValue {
    const scale = BigNumber.from(10).pow(this.decimals);
    const scaledValue = stringToBigNumber(value.toString(), this.decimals);
    return new TokenValue(this.value.mul(scaledValue).div(scale), this.decimals);
  }

  toString = (): string => bigNumberToString(this._value, this._decimals);

  toCryptoString = (): string => formatCrypto(Number(this.toString()));

  toUsdValue = (price: number): string => formatCurrency(Number(this.toString()) * price);
}
