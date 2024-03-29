import styled from "styled-components";
import HoverFeedback from "./HoverFeedback";

export interface RadioOptionType {
  label: string;
  value: string;
  disabledText?: string;
}

const StyledRadio = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1.5rem;
`;

interface OptionProps {
  active: boolean;
  disabled?: boolean;
  gradient?: boolean;
}

const RadioOption = styled.button`
  text-transform: capitalize;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 14px;

  cursor: ${(props: OptionProps) => (props.disabled ? "auto" : "pointer")};
  opacity: ${(props: OptionProps) => (props.disabled ? "0.5" : "1")};
  background-color: ${(props: OptionProps) =>
    !props.gradient ? "none" : props.active ? "rgba(197, 50, 249, 0.1)" : "transparent"};
  border: solid 1px
    ${(props: OptionProps) =>
      !props.gradient
        ? "none"
        : props.active
        ? "rgba(197, 50, 249, 0.7)"
        : "rgba(197, 50, 249, 0.5)"};
  margin-right: ${(props: OptionProps) => (props.gradient ? "1.6rem" : "0")};
  height: ${(props: OptionProps) => (props.gradient ? "3.8rem" : "4.9rem")};
  width: ${(props: OptionProps) => (props.gradient ? "22.8rem" : "15.2rem")};

  :hover {
    opacity: ${(props: OptionProps) => (props.active || props.disabled ? "1" : "0.7")};
  }

  @media (max-width: 600px) {
    line-height: 26px;
    height: 3.8rem;
    width: 13.9rem;
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
  color: ${(props: OptionProps) => (props.active ? "var(--main)" : "var(--sub)")};

  background: ${(props: OptionProps) => (props.gradient ? "var(--gradient)" : "none")};
  background-clip: ${(props: OptionProps) => (props.gradient ? "text" : "none")};
  -webkit-background-clip: ${(props: OptionProps) => (props.gradient ? "text" : "none")};
  -webkit-text-fill-color: ${(props: OptionProps) => (props.gradient ? "transparent" : "none")};
  font-weight: ${(props: OptionProps) => (props.gradient ? "500" : "700")};
  opacity: ${(props: OptionProps) => (!props.active && props.gradient ? "0.4" : "1")};

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

interface IndicatorProps {
  activeIndex: number;
  gradient?: boolean;
}

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

  display: ${(props: IndicatorProps) => (props.gradient ? "none" : "block")};

  @media (max-width: 600px) {
    display: none;
  }
`;

interface Props {
  options: RadioOptionType[];
  active: string;
  setOption: (value: string) => void;
  gradient?: boolean;
  hideDisabled?: boolean;
}

const Radio = ({ options, active, setOption, gradient, hideDisabled }: Props): JSX.Element => {
  return (
    <StyledRadio>
      <ActiveIndicator
        activeIndex={options.map((option: RadioOptionType) => option.value).indexOf(active)}
        gradient={gradient}
      />
      {options
        .filter((option: RadioOptionType) => (!hideDisabled ? true : !option.disabledText))
        .map((option: RadioOptionType) => (
          <HoverFeedback key={option.label} text={option.disabledText}>
            <RadioOption
              id={`radio-option-${option.value}`}
              onClick={() => setOption(option.value)}
              active={option.value === active}
              disabled={!!option.disabledText}
              gradient={gradient}
            >
              <RadioText active={option.value === active} gradient={gradient}>
                {option.label}
              </RadioText>
            </RadioOption>
          </HoverFeedback>
        ))}
    </StyledRadio>
  );
};

export default Radio;
