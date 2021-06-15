import React from "react";
import styled from "styled-components";
import PoolsList from "./PoolsList";
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
      <PoolsList />
    </StyledPoolsPage>
  );
};

export default PoolsPage;
