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

const PoolWithdraw = ({ pool }: Props) => {
  const totalBalance = useSelector(selectBalance(pool));
  const staked = useSelector(selectBalance(pool.stakerVaultAddress));
  const availableToWithdraw = totalBalance - staked;

  const [withdrawAmount, setWithdrawAmount] = useState(0);

  return (
    <ContentSection
      header={`Withdraw ${pool.underlying.symbol.toUpperCase()}`}
      pool={pool}
      content={
        <Content>
          <AmountInput
            value={withdrawAmount}
            setValue={(v: number) => setWithdrawAmount(v)}
            label={`Enter an amount of ${pool.underlying.symbol.toUpperCase()} to withdraw`}
            max={availableToWithdraw}
          />
          <ProgressButtons
            pool={pool}
            value={withdrawAmount}
            complete={() => setWithdrawAmount(0)}
          />
        </Content>
      }
    />
  );
};

export default PoolWithdraw;
