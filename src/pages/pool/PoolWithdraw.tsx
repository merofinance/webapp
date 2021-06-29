import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import ProgressButtons from "../../components/ProgressButtons";
import { selectBalance } from "../../features/user/userSlice";
import { Pool } from "../../lib";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  pool: Pool;
};

const PoolWithdraw = (props: Props) => {
  const totalBalance = useSelector(selectBalance(props.pool));
  const staked = useSelector(selectBalance(props.pool.stakerVaultAddress));
  const availableToWithdraw = totalBalance - staked;

  const [withdrawAmount, setWithdrawAmount] = useState(0);

  return (
    <ContentSection
      header={`Withdraw ${props.pool.underlying.symbol.toUpperCase()}`}
      statistics={[
        {
          header: "Your deposits",
          value: "$130,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "Locked in position",
          value: "$90,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "Rewards accrued",
          value: "$14,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
      ]}
      content={
        <Content>
          <AmountInput
            value={withdrawAmount}
            setValue={(v: number) => setWithdrawAmount(v)}
            label={`Enter an amount of ${props.pool.underlying.symbol.toUpperCase()} to withdraw`}
            max={availableToWithdraw}
          />
          <ProgressButtons pool={props.pool} value={withdrawAmount} />
        </Content>
      }
    />
  );
};

export default PoolWithdraw;
