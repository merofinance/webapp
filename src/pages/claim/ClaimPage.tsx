import React from "react";
import styled from "styled-components";
import Seo from "../../components/Seo";
import ClaimList from "./ClaimList";
import ClaimOverview from "./ClaimOverview";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ClaimPage = () => {
  return (
    <StyledPoolsPage>
      <Seo title="Claims" description="test" />
      <ClaimOverview />
      <ClaimList />
    </StyledPoolsPage>
  );
};

export default ClaimPage;
