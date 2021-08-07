import React from "react";
import styled from "styled-components";

export type RadioOptionType = {
  label: string;
  value: string;
};

const StyledRadio = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1.5rem;
`;

type OptionProps = {
  active: boolean;
};

const RadioOption = styled.button`
  text-transform: capitalize;
  position: relative;
  width: 15.2rem;
  height: 4.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    opacity: ${(props: OptionProps) => (props.active ? "1" : "0.7")};
  }

  @media (max-width: 600px) {
    line-height: 26px;
    height: 3.8rem;
    width: 13.9rem;
    border-radius: 14px;
    background-color: ${(props: OptionProps) =>
      props.active ? "rgba(197, 50, 249, 0.1)" : "transparent"};
    border: solid 1px
      ${(props: OptionProps) =>
        props.active ? "rgba(197, 50, 249, 0.7)" : "rgba(197, 50, 249, 0.5)"};
    margin: 0 0.8rem;
  }
`;

const RadioText = styled.div`
  font-size: 1.5rem;
  transition: color 0.3s;
  font-weight: 700;
  color: ${(props: OptionProps) => (props.active ? "var(--main)" : "var(--sub)")};

  @media (max-width: 600px) {
    font-size: 1.4rem;
    letter-spacing: 0.46px;
    font-weight: 500;
    background: var(--gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

type IndicatorProps = {
  activeIndex: number;
};

const ActiveIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 15.2rem;
  height: 4.9rem;
  border-radius: 1.2rem;
  background-color: #322c4b;
  transition: transform 0.3s;
  transform: ${(props: IndicatorProps) => `translateX(${props.activeIndex * 15.2}rem)`};

  @media (max-width: 600px) {
    display: none;
  }
`;

type Props = {
  options: RadioOptionType[];
  active: string;
  setOption: (value: string) => void;
};

const Radio = (props: Props): JSX.Element => {
  return (
    <StyledRadio>
      <ActiveIndicator
        activeIndex={props.options
          .map((option: RadioOptionType) => option.value)
          .indexOf(props.active)}
      />
      {props.options.map((option: RadioOptionType) => (
        <RadioOption
          key={option.label}
          id={`Radio Option - ${option.value}`}
          onClick={() => props.setOption(option.value)}
          active={option.value === props.active}
        >
          <RadioText active={option.value === props.active}>{option.label}</RadioText>
        </RadioOption>
      ))}
    </StyledRadio>
  );
};

export default Radio;
