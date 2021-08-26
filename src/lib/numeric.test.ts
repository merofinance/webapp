import { BigNumber } from "ethers";
import {
  bigNumberToFloat,
  floatToBigNumber,
  formatCrypto,
  numberToCompactCurrency,
  scale,
  stringToBigNumber,
} from "./numeric";

const epsilon = 0.000000001;

test("should convert big numbers to floats", () => {
  const testCases = [
    { value: scale(15683, 15), digits: 5, decimals: 18, expected: 15.683 },
    { value: scale(501340, 0), digits: 5, decimals: 6, expected: 0.50134 },
    { value: scale(5432, 0), digits: 3, decimals: 6, expected: 0.00543 },
    { value: scale(84180923, 18), digits: 5, decimals: 18, expected: 84180923 },
  ];
  testCases.forEach(({ value, digits, decimals, expected }) => {
    const actual = bigNumberToFloat(value, decimals, digits);
    expect(Math.abs(actual - expected)).toBeLessThan(epsilon);
  });
});

test("should convert floats to big numbers", () => {
  const testCases = [
    { expected: scale(15683, 15), digits: 5, decimals: 18, value: 15.683 },
    { expected: scale(501340, 0), digits: 5, decimals: 6, value: 0.50134 },
    { expected: scale(5430, 0), digits: 3, decimals: 6, value: 0.00543 },
    { expected: scale(84180923, 18), digits: 5, decimals: 18, value: 84180923 },
  ];
  testCases.forEach(({ value, digits, decimals, expected }) => {
    const actual = floatToBigNumber(value, decimals, digits);
    expect(actual.sub(expected).abs().toNumber()).toEqual(0);
  });
});

test("should convert numbers to compact currencies", () => {
  const testCases = [
    { value: 1_203_912, expected: "$1.2m" },
    { value: 1_125_234_230, expected: "$1.1b" },
    { value: 1, expected: "$1.00" },
    { value: 0.213123, expected: "$0.21" },
    { value: 700.123, expected: "$700.12" },
    { value: 0, expected: "$0.00" },
    { value: 12_544, expected: "$12.5k" },
    { value: 456_000, expected: "$456k" },
    { value: 988_912_123_123.123123, expected: "$988.9b" },
    { value: 989_988_912_123_123, expected: "$990t" },
    { value: 889_989_988_912_123_123, expected: "$889,990t" },
  ];
  testCases.forEach(({ value, expected }) =>
    expect(numberToCompactCurrency(value)).toEqual(expected)
  );
});

test("should format numbers as crypto", () => {
  const testCases = [
    { value: 121231.120102, expected: "121,231.12" },
    { value: 121231, expected: "121,231" },
    { value: 0.120102, expected: "0.1201" },
    { value: 0.0000000123, expected: "0.0000000123" },
    { value: 11.12010210230123, expected: "11.1201" },
    { value: 0, expected: "0" },
    { value: 123102031023, expected: "123,102,031,023" },
    { value: 12.000000111, expected: "12" },
  ];
  testCases.forEach(({ value, expected }) => expect(formatCrypto(value)).toEqual(expected));
});

test("stringToBigNumber should convert strings to big numbers", () => {
  const testCases = [
    { value: "1.23", decimals: 5, expected: BigNumber.from(123000) },
    { value: "0.000000000000000001", decimals: 18, expected: BigNumber.from(1) },
    { value: "0.0000000000000000001", decimals: 18, expected: BigNumber.from(0) },
    { value: "0.00000000000000000001", decimals: 20, expected: BigNumber.from(1) },
    { value: "123.45", decimals: 1, expected: BigNumber.from(1234) },
    { value: "28319", decimals: 4, expected: BigNumber.from(283190000) },
    {
      value: "10000000000000000000000",
      decimals: 4,
      expected: BigNumber.from(10).pow(26),
    },
  ];
  testCases.forEach(({ value, decimals, expected }) => {
    expect(stringToBigNumber(value, decimals).eq(expected)).toBeTruthy();
  });
});

test("stringToBigNumber should truncate", () => {
  const testCases = [
    { value: "1.2345", decimals: 2, expected: BigNumber.from(123) },
    { value: "0.001", decimals: 2, expected: BigNumber.from(0) },
    { value: "1.1", decimals: 2, expected: BigNumber.from("110") },
  ];
  testCases.forEach(({ value, decimals, expected }) => {
    expect(stringToBigNumber(value, decimals).eq(expected)).toBeTruthy();
  });
});

test("stringToBigNumber should accept scientific notation", () => {
  const testCases = [
    { value: "3.456e11", decimals: 3, expected: BigNumber.from(345600000000000) },
    { value: "934e5", decimals: 0, expected: BigNumber.from(93400000) },
    { value: "12.45e0", decimals: 2, expected: BigNumber.from(1245) },
    { value: "0.45e1", decimals: 4, expected: BigNumber.from(45000) },
    {
      value: "10e2",
      decimals: 18,
      expected: BigNumber.from(1000).mul(BigNumber.from(10).pow(18)),
    },
  ];
  testCases.forEach(({ value, decimals, expected }) => {
    expect(stringToBigNumber(value, decimals).eq(expected)).toBeTruthy();
  });
});

test("stringToBigNumber should error for negative numbers", () => {
  const testCases = [
    { value: "-100", decimals: 2 },
    { value: "-0", decimals: 2 },
    { value: "-1", decimals: 2 },
    { value: (100 - 300).toString(), decimals: 2 },
  ];
  testCases.forEach(({ value, decimals }) => {
    expect(() => stringToBigNumber(value, decimals)).toThrowError("Negative numbers not supported");
  });
});

test("stringToBigNumber should error for invalid numbers", () => {
  const testCases = [
    { value: "", decimals: 2 },
    { value: ".", decimals: 2 },
  ];
  testCases.forEach(({ value, decimals }) => {
    expect(() => stringToBigNumber(value, decimals)).toThrowError("Not a valid number");
  });
});

test("stringToBigNumber should remove commars", () => {
  const testCases = [
    { value: "1,000", decimals: 2, expected: BigNumber.from(100000) },
    { value: "265,232,123.121", decimals: 6, expected: BigNumber.from(265232123121000) },
  ];
  testCases.forEach(({ value, decimals, expected }) => {
    expect(stringToBigNumber(value, decimals).eq(expected)).toBeTruthy();
  });
});
