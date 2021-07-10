import React, { useEffect } from "react";
import styled from "styled-components";
import PoolsRow from "../pools/PoolsRow";
import swirl1 from "../../assets/background/swirl-1.svg";
import swirl2 from "../../assets/background/swirl-2.svg";
import { useBackd } from "../../app/hooks/use-backd";
import { useDispatch, useSelector } from "react-redux";
import { fetchState, selectPools } from "../../features/pools-list/poolsListSlice";
import { Pool } from "../../lib";

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

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const HeaderRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 1.7rem;

  @media (max-width: 600px) {
    th:nth-child(1) {
      flex: 1.1;
    }
    th:nth-child(2) {
      flex: 0.9;
    }
  }
`;

const Header = styled.th`
  flex: 1;
  text-align: left;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const ChevronHeader = styled.th`
  flex: 1;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Swirl = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Preview = () => {
  const backd = useBackd();
  const dispatch = useDispatch();
  const pools = useSelector(selectPools);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [backd, dispatch]);

  return (
    <StyledPreview>
      <Swirl src={swirl1} alt="decorative swirl" />
      <Swirl src={swirl2} alt="decorative swirl" />
      <Table>
        <HeaderRow>
          <Header>Asset</Header>
          <Header>APY</Header>
          <Header>TVL</Header>
          <ChevronHeader />
        </HeaderRow>
        {pools.map((pool: Pool) => (
          <PoolsRow key={pool.name} preview pool={pool} />
        ))}
      </Table>
    </StyledPreview>
  );
};

export default Preview;
