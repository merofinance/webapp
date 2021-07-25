import React from "react";
import styled from "styled-components";
import { Value } from "./NewPosition";

const StyledNewPositionInput = styled.div`
  width: 67%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type InputBorderProps = {
  valid: boolean;
};

const InputBorder = styled.div`
  position: relative;
  width: 100%;
  padding: 1px;

  background: ${(props: InputBorderProps) =>
    props.valid
      ? "linear-gradient(to right, #c532f9, #32b2e5)"
      : "linear-gradient(to right, var(--error), var(--error))"};

  height: 3.2rem;
  border-radius: 7px;
  @media (max-width: 600px) {
    height: 2.4rem;
    border-radius: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: #252140;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.15px;
  font-weight: 400;

  font-size: 1.2rem;
  border-radius: 6px;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    border-radius: 3px;
  }

  ::-webkit-outer-spin-button {
    display: none;
  }
  ::-webkit-inner-spin-button {
    display: none;
  }

  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Error = styled.div`
  position: absolute;
  left: 50%;
  top: calc(100% + 0.6rem);
  transform: translateX(-50%);
  background-color: var(--error);
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
`;

type Props = {
  type: string;
  value: string;
  error: string;
  setValue: (v: string) => void;
};

const NewPositionInput = (props: Props) => {
  return (
    <Value>
      <StyledNewPositionInput>
        <InputBorder valid={!props.error}>
          <Input
            type={props.type}
            value={props.value}
            placeholder="0"
            onChange={(e) => props.setValue(e.target.value)}
          />
          {props.error && <Error>{props.error}</Error>}
        </InputBorder>
      </StyledNewPositionInput>
    </Value>
  );
};

export default NewPositionInput;
