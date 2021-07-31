import { BigNumber } from "ethers";
import { PlainTokenValue, TokenValue } from "./token-value";
import fc from "fast-check";

test("should create from string", () => {
  const testCases = ["1", "12.34", "0.123", "1010020102102", "10100201202.2334234293", ""];
  testCases.forEach((value: string) => TokenValue.fromUnscaled(value));
});

test("should create from number", () => {
  const testCases = [1, 12.34, 0.123, 1010020102102];
  testCases.forEach((value: number) => TokenValue.fromUnscaled(value));
});

test("should create from big number", () => {
  const testCases = [
    BigNumber.from(1),
    BigNumber.from(10000000000),
    BigNumber.from(123102),
    BigNumber.from(0),
  ];
  testCases.forEach((value: BigNumber) =>
    expect(new TokenValue(value).value.eq(value)).toBeTruthy()
  );
});

test("should create from plain token value", () => {
  const testCases = [
    {
      value: "100000000",
      decimals: 8,
    },
    {
      value: "1",
      decimals: 0,
    },
    {
      value: "12910239123",
      decimals: 5,
    },
    {
      value: "21390120318230123021312031",
      decimals: 10,
    },
  ];
  testCases.forEach((value: PlainTokenValue) => TokenValue.fromPlain(value));
});

test("should export as string from unscaled", () => {
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
    { value: "", expected: "0" },
    { value: "12912309.341004102", expected: "12912309.341004102" },
    { value: "0000012912309.34100410200000", expected: "12912309.341004102" },
    { value: "000123.123120103000", expected: "123.123120103" },
  ];

  testCases.forEach(({ value, expected }) => {
    expect(TokenValue.fromUnscaled(value).toString()).toBe(expected);
  });
});

test("should export as string from scaled", () => {
  const testCases = [
    { value: BigNumber.from("123000000000000000000"), decimals: 18, expected: "123" },
    { value: BigNumber.from("123450000000000000000"), decimals: undefined, expected: "123.45" },
    { value: BigNumber.from("123450000000000000000"), decimals: 6, expected: "123450000000000" },
    { value: BigNumber.from(1), decimals: 0, expected: "1" },
    { value: BigNumber.from(1), decimals: 5, expected: "0.00001" },
    { value: BigNumber.from(134).div(10), decimals: 1, expected: "1.3" },
  ];

  testCases.forEach(({ value, decimals, expected }) => {
    const tokenValue = new TokenValue(value, decimals);
    expect(tokenValue.toString()).toBe(expected);
  });
});

test("should export as string from plain", () => {
  const testCases = [
    { value: { value: "7.1819", decimals: 4 }, expected: "7.1819" },
    { value: { value: "0.001910293", decimals: 10 }, expected: "0.001910293" },
    { value: { value: "0.001910293", decimals: 5 }, expected: "0.00191" },
  ];

  testCases.forEach(({ value, expected }) => {
    expect(TokenValue.fromPlain(value).toString()).toBe(expected);
  });
});

test("toPlain/fromPlain should be symmetric for integers", () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 0 }),
      fc.integer({ min: 0, max: 27 }),
      (value: number, decimals: number) => {
        const tokenValue = TokenValue.fromUnscaled(value, decimals);
        const backAndForth = TokenValue.fromPlain(tokenValue.toPlain());
        expect(tokenValue.eq(backAndForth)).toBeTruthy();
      }
    )
  );
});

test("toPlain/fromPlain should be symmetric for floats", () => {
  fc.assert(
    fc.property(
      fc.float({ min: 0 }),
      fc.integer({ min: 0, max: 27 }),
      (value: number, decimals: number) => {
        const tokenValue = TokenValue.fromUnscaled(value, decimals);
        const backAndForth = TokenValue.fromPlain(tokenValue.toPlain());
        expect(tokenValue.eq(backAndForth)).toBeTruthy();
      }
    )
  );
});
