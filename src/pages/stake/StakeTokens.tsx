import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AmountInput from "../../components/AmountInput";
import MultiStepButtons from "../../components/MultiStepButtons";
import LaunchIcon from "@material-ui/icons/Launch";
import { selectBalance } from "../../features/user/userSlice";
import { Token } from "../../lib/types";
import { GradientLink } from "../../styles/GradientText";

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
  margin-bottom: 2rem;
`;

const MoreLink = styled(GradientLink)`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.6rem;
  letter-spacing: 0.46px;
  cursor: pointer;
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
  const [value, setValue] = useState("");
  const [approved, setApproved] = useState(false);

  const approve = async () => {
    setApproved(true);
  };

  const stake = async () => {
    setApproved(false);
    setValue("");
  };

  return (
    <StyledStakeTokens>
      <Description>
        Stake BKD and earn a share in x% of platform revenue, paid out in bkdDAI tokens.{" "}
        <MoreLink href="" target="_blank">
          More
          <LaunchIcon style={{ fill: "var(--secondary)" }} />
        </MoreLink>
      </Description>
      <Content>
        <AmountInput
          token={token}
          noSlider
          value={value}
          setValue={(v: string) => setValue(v)}
          label="Enter an amount of BKD to stake"
          max={balance}
        />
        <MultiStepButtons
          stepsOnTop
          disabled={!value}
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
