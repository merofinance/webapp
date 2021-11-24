import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import PoolsRow from "../pools/PoolsRow";
import swirls from "../../assets/background/swirls.svg";
import { useBackd } from "../../app/hooks/use-backd";
import { fetchPreviewState, fetchState, selectPools } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import { Header2, Header4 } from "../../styles/Headers";
import { AppDispatch } from "../../app/store";
import { useIsLive } from "../../app/hooks/use-is-live";

const StyledPreview = styled.div`
  position: relative;
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const TableContainer = styled.div`
  position: relative;

  width: 79%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
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

const Swirls = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 98vw;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Preview = (): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const { protocolLive } = useIsLive();
  const dispatch = useDispatch<AppDispatch>();
  const pools = useSelector(selectPools);
  const updated = useWeb3Updated();

  useEffect(() => {
    if (!backd) {
      if (protocolLive) dispatch(fetchPreviewState());
      return;
    }
    dispatch(fetchState(backd));
  }, [updated]);

  if (!protocolLive) return <div />;

  return (
    <StyledPreview>
      <Header2>{t("pools.preview.header")}</Header2>
      <Header4>{t("pools.preview.subHeader")}</Header4>
      <TableContainer>
        <Swirls src={swirls} alt="decorative swirls" />
        <Table>
          <thead>
            <HeaderRow>
              <Header>{t("headers.asset")}</Header>
              <Header>{t("headers.apy")}</Header>
              <Header>{t("headers.tvl")}</Header>
              <ChevronHeader />
            </HeaderRow>
          </thead>
          {pools.map((pool: Pool) => (
            <PoolsRow key={pool.name} preview pool={pool} />
          ))}
        </Table>
      </TableContainer>
    </StyledPreview>
  );
};

export default Preview;
