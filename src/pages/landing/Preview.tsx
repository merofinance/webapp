import React from "react";
import styled from "styled-components";
import PoolsRow from "../pools/PoolsRow";
import swirl1 from "../../assets/background/swirl-1.svg";
import swirl2 from "../../assets/background/swirl-2.svg";

const StyledPreview = styled.div`
  position: relative;
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Table = styled.table`
  position: relative;
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

const Swirl = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
`;

const Preview = () => {
  return (
    <StyledPreview>
      <Swirl src={swirl1} alt="decorative swirl" />
      <Swirl src={swirl2} alt="decorative swirl" />
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
