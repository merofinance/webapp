import { BigNumber, BigNumberish } from "ethers";
import { DEFAULT_DECIMALS } from "./constants";

export function scale(number: BigNumberish, decimals: number = DEFAULT_DECIMALS) {
  return BigNumber.from(number).mul(BigNumber.from(10).pow(decimals));
}

function flooredLog(value: BigNumber, base: number = 10): number {
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
  significantDigits: number = 5
): number {
  const log = flooredLog(value);
  const decimalsScale = Math.min(Math.max(0, log - significantDigits + 1), decimals);
  const rounded = value.div(BigNumber.from(10).pow(decimalsScale)).toNumber();
  return rounded / Math.pow(10, Math.max(0, decimals - decimalsScale));
}

function countLeadingZeros(value: number, base: number = 10): number {
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
  significantDigits: number = 5
): BigNumber {
  const leadingZeros = countLeadingZeros(value);
  const decimalScale = leadingZeros + significantDigits;
  if (decimalScale > decimals) {
    throw new Error(`decimalScale (${decimalScale}) > decimals ${decimals}`);
  }
  const scaledSignificant = Math.round(value * Math.pow(10, decimalScale));
  return scale(scaledSignificant, decimals - decimalScale);
}

export const numberToCompactCurrency = (value: number) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}b`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
  return formatCurrency(value);
};

export const formatCurrency = (number: number) => {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
};

export const formatPercent = (number: number) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2, style: "percent" });
};

export const formatCrypto = (number: number) => {
  const decimals = Math.max(5 - Math.floor(Math.pow(number, 1 / 10)), 0);
  return number.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
  });
};

export const bigNumberToString = (number: BigNumber, decimals: number) => {
  let string = number.toString();
  while (string.length < decimals) string = "0" + string;
  let decimalLocation = string.length - decimals;
  let whole = string.slice(0, decimalLocation) || "0";
  let fraction = string.slice(decimalLocation).replace(/0+$/, "");
  return whole + (fraction ? "." + fraction : "");
};

export const stringToBigNumber = (value: string, decimals: number) => {
  if (!value || value === ".") throw new Error("Not a valid number");
  if (value.substring(0, 1) === "-") throw new Error("Negative numbers not supported");

  let comps = value.split(".");
  let whole = comps[0] || "0";
  let fraction = comps[1] || "0";
  while (fraction.length < decimals) fraction += "0";

  const base = BigNumber.from(10).pow(BigNumber.from(decimals));
  return BigNumber.from(whole).mul(base).add(fraction);
};
