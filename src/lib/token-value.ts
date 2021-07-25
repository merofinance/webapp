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

// function shiftDecimal(value, decimals) {
//   if (decimals === 0) return value;

//   const str = `${value}`;
//   const eAt = str.indexOf("e");
//   if (eAt > -1) {
//     decimals += parseInt(str.substr(eAt + 1));
//     str = str.substr(0, eAt);
//     if (decimals === 0) return str;
//   }

//   let int, flt;
//   const decimalAt = str.indexOf(".");
//   if (decimalAt === -1) {
//     int = str.trimStart("0");
//     flt = "";
//   } else {
//     int = str.substr(0, decimalAt).trimStart("0");
//     flt = str.substr(decimalAt + 1).trimEnd("0");
//   }

//   if (decimals > 0) {
//     if (flt.length < decimals) flt = flt.padEnd(decimals, "0");

//     int += flt.substr(0, decimals);
//     flt = flt.substr(decimals);
//   } else {
//     decimals = Math.abs(decimals);
//     if (int.length < decimals) int = int.padStart(decimals, "0");

//     flt = int.substr(-decimals) + flt;
//     int = int.substr(0, int.length - decimals);
//   }

//   if (int && flt) return `${int}.${flt}`;
//   else if (int) return `${int}`;
//   else if (flt) return `0.${flt}`;
//   else return "0";
// }
