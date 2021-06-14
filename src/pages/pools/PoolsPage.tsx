import React from "react";
import styled from "styled-components";
import PoolsOverview from "./PoolsOverview";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PoolsPage = () => {
  return (
    <StyledPoolsPage>
      <PoolsOverview />
    </StyledPoolsPage>
  );
};

export default PoolsPage;
