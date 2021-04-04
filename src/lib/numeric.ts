import { BigNumber, BigNumberish } from "ethers";

export function scale(number: BigNumberish, decimals: number = 18) {
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
  decimals: number = 18,
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
  decimals: number = 18,
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
