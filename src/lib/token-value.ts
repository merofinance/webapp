import { BigNumber } from "ethers";
import { isString } from "formik";
import { bigNumberToString, formatCrypto, formatCurrency, stringToBigNumber } from "./numeric";

export interface SerializedTokenValue {
  value: string;
  decimals: number;
}

export class TokenValue {
  private _value: BigNumber;
  private _decimals: number;

  constructor(
    value: string | number | BigNumber | SerializedTokenValue = 0,
    decimals: number = 18
  ) {
    this._decimals = decimals;
    if (!value) this._value = BigNumber.from(0);
    else if (isString(value)) this._value = stringToBigNumber(value, decimals);
    else if (typeof value === "number") this._value = stringToBigNumber(value.toString(), decimals);
    else if ((value as BigNumber)._isBigNumber) this._value = value as BigNumber;
    else {
      this._decimals = (value as SerializedTokenValue).decimals;
      this._value = stringToBigNumber((value as SerializedTokenValue).value, this._decimals);
    }
  }

  get value(): BigNumber {
    return this._value;
  }

  get decimals(): number {
    return this._decimals;
  }

  get serialized(): SerializedTokenValue {
    return {
      value: this.toString(),
      decimals: this._decimals,
    };
  }

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

  toString = () => bigNumberToString(this._value, this._decimals);

  toNumber = () => Number(this.toString());

  toCryptoString = () => formatCrypto(this.toNumber());

  toUsdValue = (price: number) => formatCurrency(this.toNumber() * price);
}
