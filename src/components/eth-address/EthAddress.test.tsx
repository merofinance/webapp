import { render, screen } from "@testing-library/react";
import React from "react";
import { EthAddress } from "./EthAddress";

const sampleAddress = "0x8091D16B0fF88C261360E4f53790fDa71BF567aE";

test("throws an error for invalid addresses", () => {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  const f = () => render(<EthAddress value="invalid-address" />);
  expect(f).toThrowError(/invalid address/);
  spy.mockReset();
  spy.mockRestore();
});

test("leaves input unchanged if no truncation", () => {
  render(<EthAddress value={sampleAddress} />);
  expect(screen.getByText(sampleAddress)).toBeInTheDocument();
});
