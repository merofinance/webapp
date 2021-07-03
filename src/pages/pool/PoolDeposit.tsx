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

const PoolDeposit = ({ pool }: Props) => {
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));
  const [depositAmount, setDepositAmount] = useState(0);

  return (
    <ContentSection
      header={`Deposit ${pool.underlying.symbol.toUpperCase()}`}
      pool={pool}
      content={
        <Content>
          <AmountInput
            value={depositAmount}
            setValue={(v: number) => setDepositAmount(v)}
            label={`Enter an amount of ${pool.underlying.symbol.toUpperCase()} to deposit`}
            max={availableToDeposit}
          />
          <ProgressButtons deposit pool={pool} value={depositAmount} />
        </Content>
      }
    />
  );
};

export default PoolDeposit;
