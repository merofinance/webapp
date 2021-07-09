import React, { useState } from "react";
import styled from "styled-components";
import Radio, { RadioOptionType } from "../../components/Radio";
import Seo from "../../components/Seo";
import Button from "../../components/styles/Button";
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

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 2.4rem;
`;

const PoolPage = () => {
  const [tab, setTab] = useState("deposit");
  const token = "dai"; // TODO

  return (
    <StyledPoolPage>
      <Seo title="Pool" description="test" />
      <Radio options={tabs} active={tab} setOption={(value: string) => setTab(value)} />
      <Content>
        {tab === "deposit" && <PoolDeposit token={token} />}
        {tab === "withdraw" && <PoolWithdraw token={token} />}
        {tab === "positions" && <PoolPositions token={token} />}
        <RightColumn>
          <PoolOverview pool={token} />
          {tab !== "positions" && (
            <ButtonContainer>
              <Button medium text="+ Create a Top-up Position" click={() => setTab("positions")} />
            </ButtonContainer>
          )}
        </RightColumn>
      </Content>
    </StyledPoolPage>
  );
};

export default PoolPage;
