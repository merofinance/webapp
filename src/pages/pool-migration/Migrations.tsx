import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useBackd } from "../../app/hooks/use-backd";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import Loader from "../../components/Loader";
import { Optional, Pool } from "../../lib/types";
import { fetchState, selectPools } from "../../state/poolsListSlice";
import Migration from "./Migration";

const StyledMigrations = styled.div`
  margin-top: 7.6rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.7rem;

  @media (max-width: 1387px) {
    > div:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: 1076px) {
    > div:nth-child(2) {
      display: none;
    }
  }
`;

const Header = styled.div`
  flex: 1;
  font-size: 1.4rem;
  font-weight: 700;
  opacity: 0.6;
  letter-spacing: 0.15px;
`;

const HeaderEnd = styled.div`
  flex: 2.5;
`;

const Rows = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Migrations = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const backd = useBackd();
  const updated = useWeb3Updated();
  const pools = useSelector(selectPools);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  return (
    <StyledMigrations>
      <Headers>
        <Header>{t("headers.asset")}</Header>
        <Header>{t("headers.apy")}</Header>
        <Header>{t("headers.tvl")}</Header>
        <Header>{t("headers.deposits")}</Header>
        <HeaderEnd />
      </Headers>
      <Rows>
        {!pools && (
          <>
            <Loader row />
            <Loader row />
            <Loader row />
          </>
        )}
        {pools && pools.map((pool: Pool) => <Migration pool={pool} />)}
      </Rows>
    </StyledMigrations>
  );
};

export default Migrations;
