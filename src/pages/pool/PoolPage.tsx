import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import styled from "styled-components";
import Radio, { RadioOptionType } from "../../components/Radio";
import Button from "../../components/Button";
import { selectPool } from "../../features/pool/selectors";
import Seo from "../../components/Seo";
import PoolDeposit from "./PoolDeposit";
import PoolPositions from "./PoolPositions";
import PoolWithdraw from "./PoolWithdraw";
import PoolOverview from "./PoolOverview";
import { selectBalance } from "../../features/user/userSlice";

type DepositWithdrawParams = {
  poolName: string;
};

const tabs: RadioOptionType[] = [
  {
    label: "Deposit",
    value: "deposit",
  },
  {
    label: "Withdraw",
    value: "withdraw",
  },
  {
    label: "Top-up Positions",
    value: "positions",
  },
];

const StyledPoolPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 2.4rem;
`;

const PoolPage = () => {
  let { poolName } = useParams<DepositWithdrawParams>();
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));

  const [tab, setTab] = useState("deposit");

  if (!pool) {
    return <Redirect to="/" />; // TODO Implement pool not found
  }

  return (
    <StyledPoolPage>
      <Seo
        title="DAI Pool"
        description="Deposit DAI to farm yield while protecting your DeFi loan (Aave, Compound, etc.) from liquidation"
      />
      <Radio options={tabs} active={tab} setOption={(value: string) => setTab(value)} />
      <Content>
        {tab === "deposit" && <PoolDeposit pool={pool} />}
        {tab === "withdraw" && <PoolWithdraw pool={pool} />}
        {tab === "positions" && <PoolPositions pool={pool} />}
        <RightColumn>
          <PoolOverview pool={pool} />
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
        </RightColumn>
      </Content>
    </StyledPoolPage>
  );
};

export default PoolPage;
