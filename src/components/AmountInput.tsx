import React, { useState } from "react";
import styled from "styled-components";
import AmountSlider from "./AmountSlider";
import Button from "./styles/Button";

const StyledAmountInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0.6rem 0;
`;

const Available = styled.div`
  width: 100%;
  text-align: right;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
  margin-bottom: 0.6rem;
  padding-right: 0.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  padding: 4px;
  background: linear-gradient(to right, rgba(197, 50, 249, 0.25), rgba(50, 178, 229, 0.25));
  border-radius: 4px;
  margin-bottom: 1.4rem;
`;

const InputBorder = styled.div`
  padding: 2px;
  background: linear-gradient(to right, rgb(197, 50, 249), rgb(50, 178, 229));
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  height: 5.2rem;
  background-color: #10092e;
  padding: 0 1.2rem;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
  display: flex;
  align-items: center;
  letter-spacing: 0.15px;
  -moz-appearance: textfield;

  ::-webkit-outer-spin-button {
    display: none;
  }
  ::-webkit-inner-spin-button {
    display: none;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 1.6rem;
  top: -2px;
  background-color: #10092e;
  padding: 0 4px;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.2;
  letter-spacing: 0.15px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 2.4rem;
  top: 50%;
  transform: translateY(-50%);
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
      <InputContainer>
        <InputBorder>
          <Input
            type="number"
            placeholder={"0"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InputBorder>
        <Label>{props.label}</Label>
        <ButtonContainer>
          <Button primary small text="max" click={() => setValue(props.max.toString())} />
        </ButtonContainer>
      </InputContainer>
      <AmountSlider value={value} max={props.max} setValue={(v: string) => setValue(v)} />
    </StyledAmountInput>
  );
};

export default AmountInput;
