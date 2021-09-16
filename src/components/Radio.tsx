import React from "react";
import styled from "styled-components";

export type RadioOptionType = {
  label: string;
  value: string;
  disabledText?: string;
};

const StyledRadio = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1.5rem;
`;

type OptionProps = {
  active: boolean;
  disabled?: boolean;
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

  cursor: ${(props: OptionProps) => (props.disabled ? "auto" : "pointer")};

  :hover {
    opacity: ${(props: OptionProps) => (props.active || props.disabled ? "1" : "0.7")};

    > div {
      transform: scale(1);
    }
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

const HoverTextContainer = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 0.6rem);
  width: 100%;
  transition: transform 0.2s;
  transform: scale(0) translateY(-1rem);
  z-index: 1;
`;

const HoverText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  transform: translateX(-50%);
  background-color: #433b6b;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
`;

type Props = {
  options: RadioOptionType[];
  active: string;
  setOption: (value: string) => void;
};

const Radio = ({ options, active, setOption }: Props): JSX.Element => {
  return (
    <StyledRadio>
      <ActiveIndicator
        activeIndex={options.map((option: RadioOptionType) => option.value).indexOf(active)}
      />
      {options.map((option: RadioOptionType) => (
        <RadioOption
          key={option.label}
          id={`radio-option-${option.value}`}
          onClick={() => setOption(option.value)}
          active={option.value === active}
          disabled={!!option.disabledText}
        >
          <RadioText active={option.value === active}>{option.label}</RadioText>
          {option.disabledText && (
            <HoverTextContainer>
              <HoverText>{option.disabledText}</HoverText>
            </HoverTextContainer>
          )}
        </RadioOption>
      ))}
    </StyledRadio>
  );
};

export default Radio;
