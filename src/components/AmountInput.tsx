import React from "react";
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
  value: number;
  setValue: (v: number) => void;
  label: string;
  max: number;
};

const AmountInput = (props: Props) => {
  return (
    <StyledAmountInput>
      <Available>{`Available: ${props.max}`}</Available>
      <Input
        valid={true}
        label={props.label}
        value={props.value.toString()}
        type="number"
        onChange={(v: string) => props.setValue(Number(v))}
        background="#10092e"
        buttonText="max"
        buttonAction={() => props.setValue(props.max)}
        errorMessage="Invalid amount"
      />
      <AmountSlider
        value={props.value}
        max={props.max}
        setValue={(v: number) => props.setValue(v)}
      />
    </StyledAmountInput>
  );
};

export default AmountInput;
