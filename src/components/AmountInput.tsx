import React, { useState } from "react";
import styled from "styled-components";
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
  label: string;
  max: number;
};

const AmountInput = (props: Props) => {
  const [value, setValue] = useState("");

  return (
    <StyledAmountInput>
      <Available>{`Available: ${props.max}`}</Available>
      <Input
        valid={true}
        label={props.label}
        value={value}
        type="number"
        onChange={(v: string) => setValue(v)}
        background="#10092e"
        buttonText="max"
        buttonAction={() => setValue(props.max.toString())}
        errorMessage="Invalid amount"
      />
      <AmountSlider value={value} max={props.max} setValue={(v: string) => setValue(v)} />
    </StyledAmountInput>
  );
};

export default AmountInput;
