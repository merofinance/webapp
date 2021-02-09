import { bigNumberToFloat, scale } from "./numeric";

const epsilon = 0.000000001;

test("rounds numerical values", () => {
  const testCases = [
    { value: scale(15683, 15), digits: 5, decimals: 18, expected: 15.683 },
    { value: scale(501340, 0), digits: 5, decimals: 6, expected: 0.50134 },
    { value: scale(5432, 0), digits: 3, decimals: 6, expected: 0.00543 },
    { value: scale(84180923, 18), digits: 5, decimals: 18, expected: 84180923 },
  ];
  testCases.forEach(({ value, digits, decimals, expected }) => {
    const actual = bigNumberToFloat(value, digits, decimals);
    expect(Math.abs(actual - expected)).toBeLessThan(epsilon);
  });
});
