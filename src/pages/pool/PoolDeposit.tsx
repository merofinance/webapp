import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import { selectBalance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { TokenValue } from "../../lib/scaled-number";
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
  const [depositAmount, setDepositAmount] = useState("");
  const { isMobile } = useDevice();

  return (
    <ContentSection
      header={`Deposit ${pool.underlying.symbol.toUpperCase()}`}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <Content>
          <AmountInput
            token={pool.underlying}
            value={depositAmount}
            setValue={(v: string) => setDepositAmount(v)}
            label={
              isMobile
                ? "Enter amount to deposit"
                : `Enter an amount of ${pool.underlying.symbol} to deposit`
            }
            max={availableToDeposit}
          />
          <DepositButtons
            pool={pool}
            value={TokenValue.fromUnscaled(depositAmount, pool.underlying.decimals)}
            complete={() => setDepositAmount("")}
          />
        </Content>
      }
    />
  );
};

export default PoolDeposit;
