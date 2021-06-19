import React, { useState } from "react";
import styled from "styled-components";
import Overview from "../../components/Overview";
import Radio, { RadioOptionType } from "../../components/Radio";
import Statistic from "../../components/Statistic";
import PoolDeposit from "./PoolDeposit";
import PoolOverview from "./PoolOverview";
import PoolPositions from "./PoolPositions";
import PoolWithdraw from "./PoolWithdraw";

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

const PoolPage = () => {
  const [tab, setTab] = useState("deposit");
  const token = "dai"; // TODO

  return (
    <StyledPoolPage>
      <Radio options={tabs} active={tab} setOption={(value: string) => setTab(value)} />
      <Content>
        {tab === "deposit" && <PoolDeposit token={token} />}
        {tab === "withdraw" && <PoolWithdraw token={token} />}
        {tab === "positions" && <PoolPositions token={token} />}
        <PoolOverview pool={token} />
      </Content>
    </StyledPoolPage>
  );
};

export default PoolPage;
