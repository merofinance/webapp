import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import { selectBalance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { ScaledNumber } from "../../lib/scaled-number";
import DepositButtons from "./DepositButtons";
import PoolStatistics from "./PoolStatistics";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  pool: Pool;
};

const PoolDeposit = ({ pool }: Props): JSX.Element => {
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));
  const { isMobile } = useDevice();

  const [depositAmount, setDepositAmount] = useState("");

  const error = () => {
    if (depositAmount && Number(depositAmount) <= 0) return "Amount must be a positive number";
    try {
      const amount = ScaledNumber.fromUnscaled(depositAmount, pool.underlying.decimals);
      if (amount.gt(availableToDeposit)) return "Amount exceeds available balance";
      return "";
    } catch {
      return "Invalid number";
    }
  };

  return (
    <ContentSection
      header={`Deposit ${pool.underlying.symbol.toUpperCase()}`}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <Content>
          <AmountInput
            value={depositAmount}
            setValue={(v: string) => setDepositAmount(v)}
            label={
              isMobile
                ? "Enter amount to deposit"
                : `Enter an amount of ${pool.underlying.symbol} to deposit`
            }
            max={availableToDeposit}
            error={error()}
          />
          <DepositButtons
            pool={pool}
            value={ScaledNumber.fromUnscaled(depositAmount, pool.underlying.decimals)}
            complete={() => setDepositAmount("")}
            valid={!error()}
          />
        </Content>
      }
    />
  );
};

export default PoolDeposit;
