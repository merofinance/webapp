import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import { selectBalance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { ScaledNumber } from "../../lib/scaled-number";
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

const PoolWithdraw = ({ pool }: Props): JSX.Element => {
  const totalBalance = useSelector(selectBalance(pool));
  const staked = useSelector(selectBalance(pool.stakerVaultAddress));
  const availableToWithdraw = totalBalance.sub(staked);
  const { isMobile } = useDevice();

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const error = () => {
    if (withdrawAmount && Number(withdrawAmount) <= 0) return "Amount must be a positive number";
    try {
      const amount = ScaledNumber.fromUnscaled(withdrawAmount, pool.underlying.decimals);
      if (amount.gt(availableToWithdraw)) return "Amount exceeds available balance";
      return "";
    } catch {
      return "Invalid number";
    }
  };

  return (
    <ContentSection
      header={`Withdraw ${pool.underlying.symbol.toUpperCase()}`}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <Content>
          <AmountInput
            value={withdrawAmount}
            setValue={(v: string) => setWithdrawAmount(v)}
            label={
              isMobile
                ? "Enter amount to withdraw"
                : `Enter an amount of ${pool.underlying.symbol} to withdraw`
            }
            max={availableToWithdraw}
            error={error()}
          />
          <WithdrawalButton
            pool={pool}
            value={ScaledNumber.fromUnscaled(withdrawAmount, staked.decimals)}
            complete={() => setWithdrawAmount("")}
            valid={!error()}
          />
        </Content>
      }
    />
  );
};

export default PoolWithdraw;
