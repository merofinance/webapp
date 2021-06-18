import React from "react";
import styled from "styled-components";
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
      <ClaimOverview />
      <ClaimList />
    </StyledPoolsPage>
  );
};

export default ClaimPage;
