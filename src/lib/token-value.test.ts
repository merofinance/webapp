import { BigNumber } from "ethers";
import { TokenValue } from "./token-value";

test("should create from string", () => {
  const testCases = ["1", "12.34", "0.123", "1010020102102", "10100201202.2334234293"];
  testCases.forEach((value: string) => {
    new TokenValue(value);
  });
});

test("should create from number", () => {
  const testCases = [1, 12.34, 0.123, 1010020102102];
  testCases.forEach((value: number) => {
    new TokenValue(value);
  });
});

test("should export as string", () => {
  const testCases = [
    { value: "1", expected: "1" },
    { value: 1, expected: "1" },
    { value: "10", expected: "10" },
    { value: 10, expected: "10" },
    { value: "0.1", expected: "0.1" },
    { value: 0.1, expected: "0.1" },
    { value: "0.11923", expected: "0.11923" },
    { value: 0.11923, expected: "0.11923" },
    { value: "12.34", expected: "12.34" },
    { value: 12.34, expected: "12.34" },
    { value: "12912309.341004102", expected: "12912309.341004102" },
    { value: "0000012912309.34100410200000", expected: "12912309.341004102" },
    { value: "000123.123120103000", expected: "123.123120103" },
  ];

  testCases.forEach(({ value, expected }) => {
    const tokenValue = new TokenValue(value);
    expect(tokenValue.toString()).toBe(expected);
  });
});

test("should export as number", () => {
  const testCases = [
    { value: "1", expected: "1" },
    { value: 1, expected: "1" },
    { value: "10", expected: "10" },
    { value: 10, expected: "10" },
    { value: "0.1", expected: "0.1" },
    { value: 0.1, expected: "0.1" },
    { value: "0.11923", expected: "0.11923" },
    { value: 0.11923, expected: "0.11923" },
    { value: "12.34", expected: "12.34" },
    { value: 12.34, expected: "12.34" },
    { value: "12912309.341004102", expected: "12912309.341004102" },
    { value: "0000012912309.34100410200000", expected: "12912309.341004102" },
    { value: "000123.123120103000", expected: "123.123120103" },
  ];

  testCases.forEach(({ value, expected }) => {
    const tokenValue = new TokenValue(value);
    expect(tokenValue.toString()).toBe(expected);
  });
});
