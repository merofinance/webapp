import React from "react";
import styled from "styled-components";
import { Value } from "./NewPosition";

const InputBorder = styled.div`
  background: linear-gradient(to right, #c532f9, #32b2e5);
  padding: 1px;
  border-radius: 7px;
  height: 3.2rem;
  width: 67%;
`;

const Input = styled.input`
  width: 100%;
  background-color: #252140;
  border-radius: 6px;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  letter-spacing: 0.15px;
  font-weight: 400;

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

type Props = {
  type: string;
  value: string;
  setValue: (v: string) => void;
};

const NewPositionInput = (props: Props) => {
  return (
    <Value>
      <InputBorder>
        <Input
          type={props.type}
          value={props.value}
          placeholder="0"
          onChange={(e) => props.setValue(e.target.value)}
        />
      </InputBorder>
    </Value>
  );
};

export default NewPositionInput;
