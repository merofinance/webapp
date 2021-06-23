import React, { useRef, useState } from "react";
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
  left: 0.7rem;
  top: 1.5rem;
  padding: 0 5px;
  font-size: 1.6rem;
  letter-spacing: 0.15px;

  transition: transform 0.3s;
  transform-origin: left;
  background-color: ${(props: InputProps) => props.background ?? "var(--bg)"};
  font-weight: ${(props: InputProps) => (props.focused ? "600" : "400")};
  transform: ${(props: InputProps) =>
    props.focused ? "translate(0.4rem, -2.7rem) scale(0.75)" : "translate(0, 0) scale(1)"};
  cursor: ${(props: InputProps) => (props.focused ? "auto" : "text")};
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1.8rem;
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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Glow focused={focused} />
      <Border hover={hover} focused={focused} />
      <StyledInput
        ref={inputRef}
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        background={props.background}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        hover={hover}
        focused={focused}
      />
      <Label
        onClick={() => inputRef.current?.focus()}
        focused={focused || !!props.value}
        background={props.background}
      >
        {props.label}
      </Label>
      {props.buttonText && props.buttonAction && (
        <ButtonContainer>
          <Button primary small text={props.buttonText} click={() => props.buttonAction!()} />
        </ButtonContainer>
      )}
    </Container>
  );
};

export default Input;
