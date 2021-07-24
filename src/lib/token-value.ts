import { BigNumber } from "ethers";
import { isString } from "formik";

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
    else if (isString(value)) this._value = this.stringToBigNumber(value);
    else if (typeof value === "number") this._value = this.stringToBigNumber(value.toString());
    else if ((value as BigNumber)._isBigNumber) this._value = value as BigNumber;
    else {
      this._value = this.stringToBigNumber((value as SerializedTokenValue).value);
      this._decimals = (value as SerializedTokenValue).decimals;
    }
  }

  get base(): BigNumber {
    return BigNumber.from(10).pow(BigNumber.from(this._decimals));
  }

  get value(): BigNumber {
    return this._value;
  }

  get decimals(): number {
    return this._decimals;
  }

  get isZero(): boolean {
    return !this.toString();
  }

  get serialized(): SerializedTokenValue {
    return {
      value: this.toString(),
      decimals: this._decimals,
    };
  }

  private stringToBigNumber = (value: string) => {
    if (!value || value === ".") throw new Error("Not a valid number");
    if (value.substring(0, 1) === "-") throw new Error("Negative numbers not supported");

    let comps = value.split(".");
    let whole = comps[0] || "0";
    let fraction = comps[1] || "0";
    while (fraction.length < this._decimals) {
      fraction += "0";
    }

    return BigNumber.from(whole).mul(this.base).add(fraction);
  };

  toString = () => {
    let string = this._value.toString();
    let decimalLocation = string.length - this._decimals;
    let whole = string.slice(0, decimalLocation) || "0";
    let fraction = string.slice(decimalLocation).replace(/0+$/, "");
    return whole + (fraction ? "." + fraction : "");
  };

  toNumber = () => {
    return Number(this.toString());
  };

  toCryptoString = () => {
    const decimals = Math.max(5 - Math.floor(Math.pow(this.toNumber(), 1 / 10)), 0);
    return this.toNumber().toLocaleString(undefined, {
      maximumFractionDigits: decimals,
    });
  };

  toUsdValue = (price: number) => {
    const usd = this.value.mul(BigNumber.from(price));
    return usd.toNumber().toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: "currency",
      currency: "USD",
    });
  };
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
