import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AmountInput from "../../components/AmountInput";
import MultiStepButtons from "../../components/MultiStepButtons";
import { selectBalance } from "../../features/user/userSlice";
import { Token } from "../../lib/types";

const StyledStakeTokens = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.6rem;
  letter-spacing: 0.46px;
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-end;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.8rem;
`;

type Props = {
  token: Token;
};

const StakeTokens = ({ token }: Props) => {
  const balance = useSelector(selectBalance(token.address));
  const [value, setValue] = useState(0);
  const [approved, setApproved] = useState(false);

  const approve = async () => {
    setApproved(true);
  };

  const stake = async () => {
    setApproved(false);
    setValue(0);
  };

  return (
    <StyledStakeTokens>
      <Description>
        Stake BKD and earn a share in x% of platform revenue, paid out in bkdDAI tokens. More
      </Description>
      <Content>
        <AmountInput
          noSlider
          value={value}
          setValue={(v: number) => setValue(v)}
          label="Enter an amount of BKD to stake"
          max={balance}
        />
        <MultiStepButtons
          stepsOnTop
          disabled={value === 0}
          firstText={`Approve ${token.symbol}`}
          firstAction={approve}
          firstComplete={approved}
          firstHoverText="Enter Amount"
          secondText="Deposit and Stake"
          secondAction={stake}
          secondHoverText={`Approve ${token.symbol}`}
        />
      </Content>
    </StyledStakeTokens>
  );
};

export default StakeTokens;
