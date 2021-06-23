import React from "react";
import styled from "styled-components";
import Button from "./styles/Button";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.6rem 0;
`;

const InputContainer = styled.div`
  position: relative;
  padding: 4px;
  background: linear-gradient(to right, rgba(197, 50, 249, 0.25), rgba(50, 178, 229, 0.25));
  border-radius: 4px;
`;

const InputBorder = styled.div`
  padding: 2px;
  background: linear-gradient(to right, rgb(197, 50, 249), rgb(50, 178, 229));
  border-radius: 4px;
`;

type InputProps = {
  background?: string;
};

const StyledInput = styled.input`
  width: 100%;
  height: 5.2rem;
  background-color: ${(props: InputProps) => props.background ?? "var(--bg)"};
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
  value: string;
  valid: boolean;
  background?: string;
  onChange: (v: string) => void;
  buttonText?: string;
  buttonAction?: () => void;
  type?: string;
};

const Input = (props: Props) => {
  return (
    <Container>
      <InputContainer>
        <InputBorder>
          <StyledInput
            type={props.type ?? "text"}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            background={props.background}
          />
        </InputBorder>
        <Label>{props.label}</Label>
        {props.buttonText && props.buttonAction && (
          <ButtonContainer>
            <Button primary small text={props.buttonText} click={() => props.buttonAction!()} />
          </ButtonContainer>
        )}
      </InputContainer>
    </Container>
  );
};

export default Input;
