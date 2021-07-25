import { bigNumberToFloat, floatToBigNumber, numberToCompactCurrency, scale } from "./numeric";

const epsilon = 0.000000001;

test("converts big numbers to floats", () => {
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

test("converts floats numbers to big numbers", () => {
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

test("converts number to compact currency", () => {
  const testCases = [
    { value: 1_203_912, expected: "$1.2m" },
    { value: 1_125_234_230, expected: "$1.1b" },
    { value: 1, expected: "$1.00" },
    { value: 0.213123, expected: "$0.21" },
    { value: 700.123, expected: "$700.12" },
    { value: 0, expected: "$0.00" },
    { value: 12_544, expected: "$12.5k" },
    { value: 456_000, expected: "$456k" },
    { value: 988_912_123_123, expected: "$988.9b" },
    { value: 989_988_912_123_123, expected: "$990t" },
    { value: 889_989_988_912_123_123, expected: "$889,990t" },
  ];
  testCases.forEach(({ value, expected }) =>
    expect(numberToCompactCurrency(value)).toEqual(expected)
  );
});
