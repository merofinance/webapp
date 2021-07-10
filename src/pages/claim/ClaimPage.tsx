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

const ClaimPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <StyledPoolsPage>
      <Seo
        title="Claim Rewards & Yield"
        description="Claim rewards from Backd yield farming strategies and collateral top up fees"
      />
      <ClaimOverview />
      {claims.map((claim: string, index: number) => (
        <ClaimAccordion
          open={!!openIndex && openIndex === index}
          toggle={() => {
            if (!!openIndex && openIndex === index) setOpenIndex(null);
            setOpenIndex(index);
          }}
        />
      ))}
    </StyledPoolsPage>
  );
};

export default ClaimPage;
