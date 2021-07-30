import { BigNumber } from "ethers";
import { isString } from "formik";
import { bigNumberToString, formatCrypto, formatCurrency, stringToBigNumber } from "./numeric";

export interface PlainTokenValue {
  value: string;
  decimals: number;
}

export class TokenValue {
  private _value: BigNumber;
  private _decimals: number;

  constructor(value: string | number | BigNumber | PlainTokenValue = 0, decimals: number = 18) {
    this._decimals = decimals;
    if (!value) this._value = BigNumber.from(0);
    else if (isString(value)) this._value = stringToBigNumber(value, decimals);
    else if (typeof value === "number") this._value = stringToBigNumber(value.toString(), decimals);
    else if (value instanceof BigNumber) this._value = value;
    else {
      this._decimals = value.decimals;
      this._value = stringToBigNumber(value.value, this._decimals);
    }
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

  multiplyByPrice(price: number) {
    const priceScaled = Math.round(price * 100);
    return new TokenValue(this.value.mul(priceScaled).div(100), this.decimals);
  }

  toString = () => bigNumberToString(this._value, this._decimals);

  toCryptoString = () => formatCrypto(Number(this.toString()));

  toUsdValue = (price: number) => formatCurrency(Number(this.toString()) * price);
}
