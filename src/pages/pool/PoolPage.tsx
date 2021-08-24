import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import styled from "styled-components";
import Radio from "../../components/Radio";
import Button from "../../components/Button";
import { selectPool } from "../../state/selectors";
import Seo from "../../components/Seo";
import PoolDeposit from "./PoolDeposit";
import PoolPositions from "./PoolPositions";
import PoolWithdraw from "./PoolWithdraw";
import PoolInformation from "./PoolInformation";
import { selectBalance } from "../../state/userSlice";
import { useDevice } from "../../app/hooks/use-device";
import Overview from "../../components/Overview";

type DepositWithdrawParams = {
  poolName: string;
};

const StyledPoolPage = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1439px) {
    flex-direction: column-reverse;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6.4rem;
  @media (max-width: 1439px) {
    margin-top: 0;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2.4rem;

  @media (max-width: 1439px) {
    display: none;
  }
`;

const PoolPage = (): JSX.Element => {
  const { poolName } = useParams<DepositWithdrawParams>();
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));
  const { isMobile } = useDevice();

  const [tab, setTab] = useState("deposit");

  if (!pool) return <Redirect to="/" />;

  return (
    <StyledPoolPage>
      <Seo
        title={`${pool.underlying.symbol} Pool`}
        description={`Deposit ${pool.underlying.symbol} to farm yield while protecting your DeFi loan (Aave, Compound, etc.) from liquidation`}
      />
      <Content>
        <Radio
          options={[
            {
              label: "Deposit",
              value: "deposit",
            },
            {
              label: "Withdraw",
              value: "withdraw",
            },
            {
              label: isMobile ? "Positions" : "Top-up Positions",
              value: "positions",
            },
          ]}
          active={tab}
          setOption={(value: string) => setTab(value)}
        />
        {tab === "deposit" && <PoolDeposit pool={pool} />}
        {tab === "withdraw" && <PoolWithdraw pool={pool} />}
        {tab === "positions" && <PoolPositions pool={pool} />}
      </Content>
      <InfoCards>
        <Overview
          description="Deposit ABC to begin earning yield via the STRATEGY_NAME. Once you have deposited, you can make your liquidity reactive by opening a top-up position."
          link="https://docs.backd.fund/"
        />
        <PoolInformation pool={pool} />
        {tab !== "positions" && !balance.isZero() && (
          <ButtonContainer>
            <Button
              medium
              text="+ Create a Top-up Position"
              click={() => setTab("positions")}
              background="#0A0525"
            />
          </ButtonContainer>
        )}
      </InfoCards>
    </StyledPoolPage>
  );
};

export default PoolPage;
