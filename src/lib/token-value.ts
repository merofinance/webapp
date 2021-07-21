import { BigNumber } from "ethers";
import { isString } from "formik";

export class TokenValue {
  private _value: BigNumber;
  private _decimals: number;

  constructor(value: string | number | BigNumber, decimals: number = 18) {
    this._decimals = decimals;
    if (isString(value)) this._value = this.stringToBigNumber(value);
    else if (typeof value === "number") this._value = this.stringToBigNumber(value.toString());
    else this._value = value;
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
}
