import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import { selectBalance } from "../../features/user/userSlice";
import { Pool } from "../../lib";
import { useDevice } from "../../lib/hooks";
import { TokenValue } from "../../lib/token-value";
import PoolStatistics from "./PoolStatistics";
import WithdrawalButton from "./WithdrawButton";

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
  const availableToWithdraw = totalBalance.sub(staked);
  const { isMobile } = useDevice();

  const [withdrawAmount, setWithdrawAmount] = useState("");

  return (
    <ContentSection
      header={`Withdraw ${pool.underlying.symbol.toUpperCase()}`}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <Content>
          <AmountInput
            token={pool.underlying}
            value={withdrawAmount}
            setValue={(v: string) => setWithdrawAmount(v)}
            label={
              isMobile
                ? "Enter amount to withdraw"
                : `Enter an amount of ${pool.underlying.symbol} to withdraw`
            }
            max={availableToWithdraw}
          />
          <WithdrawalButton
            pool={pool}
            value={new TokenValue(withdrawAmount, staked.decimals)}
            complete={() => setWithdrawAmount("")}
          />
        </Content>
      }
    />
  );
};

export default PoolWithdraw;
