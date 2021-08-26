import React from "react";
import styled from "styled-components";

import Button from "./Button";
import tick from "../assets/ui/tick.svg";

interface ButtonsProps {
  stepsOnTop?: boolean;
}

const StyledMuliStepButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props: ButtonsProps) => (props.stepsOnTop ? "column-reverse" : "column")};
`;

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: ${(props: ButtonsProps) => (props.stepsOnTop ? "0" : "1rem")};
  margin-top: ${(props: ButtonsProps) => (props.stepsOnTop ? "1.1rem" : "0")};

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1.8rem;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ProgressSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type StepProps = {
  complete: boolean;
  disabled: boolean;
};

const Number = styled.div`
  position: relative;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  background: ${(props: StepProps) =>
    props.disabled ? "#535068" : props.complete ? "#16C784" : "#C532F9"};
  color: var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.4rem;
`;

const Tick = styled.img`
  height: 1.1rem;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  top: 50%;
  left: 0;
  transform: translate(50%, calc(-50% - 1px));
  background: ${(props: StepProps) =>
    props.disabled
      ? "#535068"
      : props.complete
      ? "linear-gradient(to right, #16C784, #C532F9)"
      : "linear-gradient(to right, #C532F9, #535068)"};
`;

interface Props {
  disabled: boolean;
  firstText: string;
  firstAction: () => void;
  firstComplete: boolean;
  firstHoverText: string;
  firstLoading: boolean;
  secondText: string;
  secondAction: () => void;
  secondHoverText: string;
  secondLoading: boolean;
  stepsOnTop?: boolean;
}

const MultiStepButtons = ({
  disabled,
  firstText,
  firstAction,
  firstComplete,
  firstHoverText,
  firstLoading,
  secondText,
  secondAction,
  secondHoverText,
  secondLoading,
  stepsOnTop,
}: Props): JSX.Element => {
  return (
    <StyledMuliStepButtons stepsOnTop={stepsOnTop}>
      <Buttons stepsOnTop={stepsOnTop}>
        <Button
          web3
          primary
          medium
          wide
          text={firstText}
          click={firstAction}
          complete={firstComplete}
          loading={firstLoading}
          disabled={disabled}
          hoverText={firstHoverText}
        />
        <Button
          web3
          primary
          medium
          wide
          text={secondText}
          click={secondAction}
          disabled={!firstComplete || disabled}
          loading={secondLoading}
          hoverText={disabled ? firstHoverText : secondHoverText}
        />
      </Buttons>
      <ProgressContainer>
        <ProgressSection>
          <Line complete={firstComplete} disabled={disabled} />
          <Number complete={firstComplete} disabled={disabled}>
            {firstComplete && !disabled ? <Tick src={tick} alt="tick" /> : "1"}
          </Number>
        </ProgressSection>
        <ProgressSection>
          <Number complete={false} disabled={!firstComplete || disabled}>
            2
          </Number>
        </ProgressSection>
      </ProgressContainer>
    </StyledMuliStepButtons>
  );
};

export default MultiStepButtons;
