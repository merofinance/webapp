import { BigNumber, BigNumberish } from "ethers";

export function scale(number: BigNumberish, decimals: number = 18) {
  return BigNumber.from(number).mul(BigNumber.from(10).pow(decimals));
}

export function flooredLog(value: BigNumber, base: number = 10): number {
  let result = 0;
  while (value.gt(base)) {
    result++;
    value = value.div(base);
  }
  return result;
}

export function bigNumberToFloat(
  value: BigNumber,
  significantDigits: number = 5,
  decimals: number = 18
): number {
  const log = flooredLog(value);
  const decimalsScale = Math.min(
    Math.max(0, log - significantDigits + 1),
    decimals
  );
  const rounded = value.div(BigNumber.from(10).pow(decimalsScale)).toNumber();
  return rounded / Math.pow(10, Math.max(0, decimals - decimalsScale));
}
