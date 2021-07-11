import React, { useState } from "react";
import styled from "styled-components";
import Seo from "../../components/Seo";
import ClaimOverview from "./ClaimOverview";
import ClaimAccordion from "./ClaimAccordion";

const claims: string[] = ["meow", "woof"];

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

const ClaimPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <StyledPoolsPage>
      <Seo
        title="Claim Rewards & Yield"
        description="Claim rewards from Backd yield farming strategies and collateral top up fees"
      />
      <ClaimOverview />
      <Headers>
        <Header>Asset</Header>
        <Header>Claimable (USD)</Header>
        <Header>APR</Header>
        <ButtonHeader />
      </Headers>
      {claims.map((claim: string, index: number) => (
        <ClaimAccordion
          key={claim}
          open={openIndex !== null && openIndex === index}
          toggle={() => {
            if (openIndex !== null && openIndex === index) setOpenIndex(null);
            else setOpenIndex(index);
          }}
        />
      ))}
    </StyledPoolsPage>
  );
};

export default ClaimPage;
