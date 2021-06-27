import React from "react";
import styled from "styled-components";
import PoolsRow from "../pools/PoolsRow";

const StyledPreview = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Table = styled.table`
  width: 79%;
`;

const HeaderRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 1.7rem;
`;

const Header = styled.th`
  flex: 1;
  text-align: left;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
`;

const Preview = () => {
  return (
    <StyledPreview>
      <Table>
        <HeaderRow>
          <Header>Asset</Header>
          <Header>APY</Header>
          <Header>TVL</Header>
          <Header></Header>
        </HeaderRow>
        <PoolsRow preview asset={"eth"} />
        <PoolsRow preview asset={"usdc"} />
        <PoolsRow preview asset={"dai"} />
      </Table>
    </StyledPreview>
  );
};

export default Preview;
