import React from "react";
import styled from "styled-components";

export type RadioOption = {
  label: string;
  value: string;
};

const StyledRadio = styled.div`
  display: flex;
`;

const RadioOption = styled.button`
  width: 15.2rem;
  height: 4.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

type Props = {
  options: RadioOption[];
  setOption: (value: string) => void;
};

const Radio = (props: Props) => {
  return (
    <StyledRadio>
      {props.options.map((option: RadioOption) => (
        <RadioOption onClick={() => props.setOption(option.value)}>{option.label}</RadioOption>
      ))}
    </StyledRadio>
  );
};

export default Radio;
