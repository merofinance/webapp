import { BigNumber } from "ethers";
import { bigNumberToString, formatCrypto, formatCurrency, stringToBigNumber } from "./numeric";

export interface PlainTokenValue {
  value: string;
  decimals: number;
}

export class TokenValue {
  private _value: BigNumber;
  private _decimals: number;

  constructor(value: BigNumber = BigNumber.from(0), decimals: number = 18) {
    this._decimals = decimals;
    this._value = value;
  }

  static fromUnscaled(value: number | string, decimals: number = 18) {
    return new TokenValue(stringToBigNumber(value.toString() || "0", decimals), decimals);
  }

  static fromPlain(value: PlainTokenValue) {
    const decimals = value.decimals || 18;
    return new TokenValue(stringToBigNumber(value.value || "0", decimals), decimals);
  }

  get value(): BigNumber {
    return this._value;
  }

  get decimals(): number {
    return this._decimals;
  }

  toPlain = (): PlainTokenValue => {
    return {
      value: this.toString(),
      decimals: this._decimals,
    };
  };

  isZero = () => this.value.isZero();

  isNegative = () => this.value.isNegative();

  assertSameDecimals(other: TokenValue) {
    console.assert(this.decimals === other.decimals, "should have the same number of decimals");
  }

  add(other: TokenValue) {
    this.assertSameDecimals(other);
    return new TokenValue(this.value.add(other.value), this.decimals);
  }

  sub(other: TokenValue) {
    this.assertSameDecimals(other);
    return new TokenValue(this.value.sub(other.value), this.decimals);
  }

  eq(other: TokenValue) {
    return this.value.eq(other.value) && this.decimals === other.decimals;
  }

  gt(other: TokenValue) {
    this.assertSameDecimals(other);
    return this.value.gt(other.value);
  }

  gte(other: TokenValue) {
    this.assertSameDecimals(other);
    return this.value.gte(other.value);
  }

  lt(other: TokenValue) {
    this.assertSameDecimals(other);
    return this.value.lt(other.value);
  }

  lte(other: TokenValue) {
    this.assertSameDecimals(other);
    return this.value.lte(other.value);
  }

  mul(value: number | string) {
    const scale = BigNumber.from(10).pow(this.decimals);
    const scaledValue = stringToBigNumber(value.toString(), this.decimals);
    return new TokenValue(this.value.mul(scaledValue).div(scale), this.decimals);
  }

  toString = () => bigNumberToString(this._value, this._decimals);

  toCryptoString = () => formatCrypto(Number(this.toString()));

  toUsdValue = (price: number) => formatCurrency(Number(this.toString()) * price);
}
