import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import { selectBalance } from "../../features/user/userSlice";
import { Pool } from "../../lib";
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

const PoolDeposit = ({ pool }: Props) => {
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));
  const [depositAmount, setDepositAmount] = useState("");

  return (
    <ContentSection
      header={`Deposit ${pool.underlying.symbol.toUpperCase()}`}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <Content>
          <AmountInput
            value={depositAmount}
            setValue={(v: string) => setDepositAmount(v)}
            label={`Enter an amount of ${pool.underlying.symbol.toUpperCase()} to deposit`}
            max={availableToDeposit}
          />
          <DepositButtons
            pool={pool}
            value={Number(depositAmount)}
            complete={() => setDepositAmount("")}
          />
        </Content>
      }
    />
  );
};

export default PoolDeposit;
