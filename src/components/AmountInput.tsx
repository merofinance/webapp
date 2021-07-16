import React, { useState } from "react";
import styled from "styled-components";
import { formatAmountInput } from "../lib/text";
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
};

const AmountInput = ({ value, setValue, label, max }: Props) => {
  return (
    <StyledAmountInput>
      <Available>{`Available: ${max}`}</Available>
      <Input
        valid={true}
        label={label}
        value={value}
        type="number"
        onChange={(v: string) => setValue(v)}
        background="#10092e"
        buttonText="max"
        buttonAction={() => setValue(formatAmountInput(max))}
        errorMessage="Invalid amount"
      />
      <AmountSlider value={value} max={max} setValue={setValue} />
    </StyledAmountInput>
  );
};

export default AmountInput;
