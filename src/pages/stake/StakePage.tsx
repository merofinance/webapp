import React, { useState } from "react";
import styled from "styled-components";
import Seo from "../../components/Seo";
import StakeSummary from "./StakeSummary";
import StakeAccordion from "./StakeAccodion";

const pools: string[] = ["meow", "woof"];

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.6rem;
  margin-bottom: 0.5rem;
`;

const Header = styled.div`
  flex: 1;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  color: rgba(255, 255, 255, 0.87);
  opacity: 0.6;
`;

const ButtonHeader = styled.div`
  flex: 1.8;
`;

const StakePage = () => {
  const [activePool, setActivePool] = useState<number | null>(0);

  const isOpen = (index: number): boolean => activePool !== null && activePool === index;

  return (
    <StyledPoolsPage>
      <Seo title="" description="" />
      <StakeSummary />
      <Headers>
        <Header>Asset</Header>
        <Header>Claimable (USD)</Header>
        <Header>APR</Header>
        <ButtonHeader />
      </Headers>
      {pools.map((pool: string, index: number) => (
        <StakeAccordion
          key={pool}
          open={isOpen(index)}
          toggle={() => {
            if (isOpen(index)) setActivePool(null);
            else setActivePool(index);
          }}
          rows={["meow", "woof", "cat"]}
        />
      ))}
    </StyledPoolsPage>
  );
};

export default StakePage;
