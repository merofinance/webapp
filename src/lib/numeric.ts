import { BigNumber, BigNumberish } from "ethers";
import { DEFAULT_DECIMALS } from "./constants";

export function scale(number: BigNumberish, decimals: number = DEFAULT_DECIMALS): BigNumber {
  return BigNumber.from(number).mul(BigNumber.from(10).pow(decimals));
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
