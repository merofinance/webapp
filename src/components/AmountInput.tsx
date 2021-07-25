import React from "react";
import styled from "styled-components";
import { TokenValue } from "../lib/token-value";
import { Token } from "../lib/types";
import AmountSlider from "./AmountSlider";
import Input from "./Input";

const StyledAmountInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Available = styled.div`
  width: 100%;
  text-align: right;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
`;

type Props = {
  token: Token;
  value: string;
  setValue: (v: string) => void;
  label: string;
  max: TokenValue;
  noSlider?: boolean;
};

const AmountInput = ({ token, value, setValue, label, max, noSlider }: Props) => {
  const error = () => {
    if (Number(value) <= 0) return "Amount must be a positive number";
    try {
      const amount = new TokenValue(value, token.decimals);
      if (amount.value.gt(max.value)) return "Amount exceeds available balance";
      return "";
    } catch {
      return "Invalid number";
    }
  };

  return (
    <StyledAmountInput>
      <Available>{`Available: ${max.toCryptoString()}`}</Available>
      <Input
        valid={!error()}
        label={label}
        value={value}
        type="number"
        onChange={(v: string) => setValue(v)}
        background="#100830"
        buttonText="max"
        buttonAction={() => setValue(max.toString())}
        errorMessage={error()}
      />
      {!noSlider && <AmountSlider value={value} max={max} setValue={setValue} />}
    </StyledAmountInput>
  );
};

export default AmountInput;
