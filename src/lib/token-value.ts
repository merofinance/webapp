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

  get isZero(): boolean {
    return !this.toString() || this.toString() === "0";
  }

  get serialized(): SerializedTokenValue {
    return {
      value: this.toString(),
      decimals: this._decimals,
    };
  }

  toString = () => bigNumberToString(this._value, this._decimals);

  toNumber = () => Number(this.toString());

  toCryptoString = () => formatCrypto(this.toNumber());

  toUsdValue = (price: number) => formatCurrency(this.toNumber() * price);
}
