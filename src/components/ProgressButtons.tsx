import React, { useState } from "react";
import styled from "styled-components";
import Button from "./styles/Button";
import tick from "../assets/ui/tick.svg";

const StyledProgressButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.7rem;
`;

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: 1rem;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ProgressSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type NumberProps = {
  current: boolean;
  complete: boolean;
};

const Number = styled.div`
  position: relative;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  background: ${(props: NumberProps) =>
    props.current ? "#C532F9" : props.complete ? "#16C784" : "#535068"};
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
  background: ${(props: NumberProps) =>
    props.complete
      ? "linear-gradient(to right, #16C784, #C532F9)"
      : props.current
      ? "linear-gradient(to right, #C532F9, #535068)"
      : "#535068"};
`;

type Props = {
  token: string;
  symbol: string;
  buttonText: string;
};

const ProgressButtons = (props: Props) => {
  const [approved, setApproved] = useState(false);

  return (
    <StyledProgressButtons>
      <Buttons>
        <Button
          primary
          medium
          wide
          text={`Approve ${props.symbol.toUpperCase()}`}
          click={() => setApproved(true)}
          complete={approved}
        />
        <Button primary medium wide text={props.buttonText} disabled={!approved} />
      </Buttons>
      <ProgressContainer>
        <ProgressSection>
          <Line complete={approved} current={!approved} />
          <Number complete={approved} current={!approved}>
            {approved ? <Tick src={tick} /> : "1"}
          </Number>
        </ProgressSection>
        <ProgressSection>
          <Number complete={false} current={approved}>
            2
          </Number>
        </ProgressSection>
      </ProgressContainer>
    </StyledProgressButtons>
  );
};

export default ProgressButtons;
