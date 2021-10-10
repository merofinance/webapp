import { BigNumber, BigNumberish } from "ethers";
import { DEFAULT_DECIMALS } from "./constants";

export function scale(number: BigNumberish, decimals: number = DEFAULT_DECIMALS): BigNumber {
  return BigNumber.from(number).mul(BigNumber.from(10).pow(decimals));
}

function flooredLog(value: BigNumber, base = 10): number {
  let result = 0;
  while (value.gt(base)) {
    result++;
    value = value.div(base);
  }
  return result;
}

export function bigNumberToFloat(
  value: BigNumber,
  decimals: number = DEFAULT_DECIMALS,
  significantDigits = 5
): number {
  const log = flooredLog(value);
  const decimalsScale = Math.min(Math.max(0, log - significantDigits + 1), decimals);
  const rounded = value.div(BigNumber.from(10).pow(decimalsScale)).toNumber();
  return rounded / 10 ** Math.max(0, decimals - decimalsScale);
}

function countLeadingZeros(value: number, base = 10): number {
  let result = 0;
  while (value < 1) {
    result++;
    value *= base;
  }
  return result;
}

export function floatToBigNumber(
  value: number,
  decimals: number = DEFAULT_DECIMALS,
  significantDigits = 5
): BigNumber {
  const leadingZeros = countLeadingZeros(value);
  const decimalScale = leadingZeros + significantDigits;
  if (decimalScale > decimals) {
    throw new Error(`decimalScale (${decimalScale}) > decimals ${decimals}`);
  }
  const scaledSignificant = Math.round(value * 10 ** decimalScale);
  return scale(scaledSignificant, decimals - decimalScale);
}

const roundToOneDp = (value: number): string => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });
};

const roundToTwoDp = (value: number): string => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const numberToCompactString = (value: number): string => {
  if (value >= 1_000_000_000_000) return `${roundToOneDp(value / 1_000_000_000_000)}t`;
  if (value >= 1_000_000_000) return `${roundToOneDp(value / 1_000_000_000)}b`;
  if (value >= 1_000_000) return `${roundToOneDp(value / 1_000_000)}m`;
  if (value >= 1_000) return `${roundToOneDp(value / 1_000)}k`;
  return roundToTwoDp(value);
};

export const numberToCompactCurrency = (value: number): string => {
  return `$${numberToCompactString(value)}`;
};

export const formatCurrency = (number: number): string => {
  return `$${number.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
};

export const formatPercent = (number: number): string => {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2, style: "percent" });
};

export const formatCrypto = (number: number, parameters: Intl.NumberFormatOptions = {}): string => {
  let decimals = Math.max(5 - Math.floor(number ** (1 / 10)), 0);
  if (number < 0.0001) decimals = 18;
  return number.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    ...parameters,
  });
};

export const bigNumberToString = (number: BigNumber, decimals: number): string => {
  let string = number.toString();
  while (string.length < decimals) string = `0${string}`;
  const decimalLocation = string.length - decimals;
  const whole = string.slice(0, decimalLocation) || "0";
  const fraction = string.slice(decimalLocation).replace(/0+$/, "");
  return whole + (fraction ? `.${fraction}` : "");
};

export const stringToBigNumber = (value: string, decimals: number): BigNumber => {
  if (!value || value === ".") throw new Error("errors.invalidNumber");
  if (value.substring(0, 1) === "-") throw new Error("errors.negativeNumber");
  value = value.replace(/,/g, "");

  const [num, power] = value.split("e");

  if (power) {
    decimals += Number(power);
  }

  const comps = num.split(".");
  const whole = comps[0] || "0";

  if (decimals >= 0) {
    let fraction = comps[1] || "0";
    if (fraction.length <= decimals) {
      while (fraction.length < decimals) fraction += "0";
    } else {
      fraction = fraction.substring(0, decimals) || "0";
    }

    const base = BigNumber.from(10).pow(BigNumber.from(decimals));
    return BigNumber.from(whole).mul(base).add(fraction);
  }
  const base = BigNumber.from(10).pow(BigNumber.from(-decimals));
  return BigNumber.from(whole).div(base);
};
