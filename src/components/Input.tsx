import React, { useState } from "react";
import styled from "styled-components";
import Button from "./styles/Button";

type InputProps = {
  focused?: boolean;
  hover?: boolean;
  background?: string;
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 5.2rem;
`;

const Glow = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to right, rgba(197, 50, 249, 0.25), rgba(50, 178, 229, 0.25));
  border-radius: 1.8rem;

  transition: all 0.3s;
  width: ${(props: InputProps) => (props.focused ? "calc(100% + 12px)" : "100%")};
  height: ${(props: InputProps) => (props.focused ? "calc(100% + 12px)" : "100%")};
`;

const Border = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-radius: ${(props: InputProps) => (props.hover || props.focused ? "1.6rem" : "1.5rem")};
  width: ${(props: InputProps) =>
    props.hover || props.focused ? "calc(100% + 4px)" : "calc(100% + 2px)"};
  height: ${(props: InputProps) =>
    props.hover || props.focused ? "calc(100% + 4px)" : "calc(100% + 2px)"};
  background: ${(props: InputProps) =>
    props.focused
      ? "linear-gradient(to right, rgb(197, 50, 249), rgb(50, 178, 229))"
      : "rgba(209, 209, 209, 1)"};
`;

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 1.2rem;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
  display: flex;
  align-items: center;
  letter-spacing: 0.15px;
  -moz-appearance: textfield;
  border-radius: 1.4rem;

  ::-webkit-outer-spin-button {
    display: none;
  }
  ::-webkit-inner-spin-button {
    display: none;
  }

  background-color: ${(props: InputProps) => props.background ?? "var(--bg)"};
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
  const [focused, setFocused] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <Container onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Glow focused={focused} />
      <Border hover={hover} focused={focused} />
      <StyledInput
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        background={props.background}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        hover={hover}
        focused={focused}
      />
      <Label>{props.label}</Label>
      {props.buttonText && props.buttonAction && (
        <ButtonContainer>
          <Button primary small text={props.buttonText} click={() => props.buttonAction!()} />
        </ButtonContainer>
      )}
    </Container>
  );
};

export default Input;
