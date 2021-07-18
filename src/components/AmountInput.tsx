import React from "react";
import styled from "styled-components";
import { formatCrypto } from "../lib/numeric";
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
  value: string;
  setValue: (v: string) => void;
  label: string;
  max: number;
  noSlider?: boolean;
};

const AmountInput = ({ value, setValue, label, max, noSlider }: Props) => {
  const error = () => {
    const amount = Number(value);
    if (amount < 0) return "Amount must be a positive number";
    if (amount > max) return "Amount exceeds available balance";
    return "";
  };

  return (
    <StyledAmountInput>
      <Available>{`Available: ${formatCrypto(max)}`}</Available>
      <Input
        valid={!error()}
        label={label}
        value={value}
        type="number"
        onChange={(v: string) => setValue(v)}
        background="#10092e"
        buttonText="max"
        buttonAction={() => setValue(max.toString())}
        errorMessage={error()}
      />
      {!noSlider && <AmountSlider value={value} max={max} setValue={setValue} />}
    </StyledAmountInput>
  );
};

export default AmountInput;
