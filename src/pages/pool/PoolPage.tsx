import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import { selectPool } from "../../state/selectors";
import Seo from "../../components/Seo";
import PoolDeposit from "./PoolDeposit";
import PoolWithdraw from "./PoolWithdraw";
import PoolInformation from "./PoolInformation";
import { selectBalance } from "../../state/userSlice";
import Overview from "../../components/Overview";
import { useBackd } from "../../app/hooks/use-backd";
import { fetchState } from "../../state/poolsListSlice";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import BackButton from "../../components/BackButton";
import Tabs from "../../components/Tabs";
import PoolStatistics from "./PoolStatistics";
import ContentSection from "../../components/ContentSection";

interface DepositWithdrawParams {
  poolName: string;
}

const StyledPoolPage = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  @media (max-width: 1439px) {
    flex-direction: column;

    > div:nth-child(2) {
      order: 3;
    }
  }
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding-left: 2rem;
  @media (max-width: 1439px) {
    display: none;
  }
`;

const PoolPage = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { poolName } = useParams<DepositWithdrawParams>();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  if (!pool) return <Redirect to="/" />;

  return (
    <StyledPoolPage>
      <BackButton />
      <Seo
        title={`${pool.underlying.symbol} Pool`}
        description={`Deposit ${pool.underlying.symbol} to farm yield and register LP tokens for actions such as liquidation protection (Aave & Compound)`}
      />
      <ContentContainer>
        <Content>
          <ContentSection
            noContentPadding
            header={t("pool.header", { asset: pool.underlying.symbol })}
            statistics={<PoolStatistics pool={pool} />}
            content={
              <Tabs
                tabs={[
                  {
                    label: "pool.tabs.deposit.tab",
                    content: <PoolDeposit pool={pool} />,
                  },
                  {
                    label: "pool.tabs.withdraw.tab",
                    content: <PoolWithdraw pool={pool} />,
                  },
                ]}
              />
            }
          />
        </Content>
      </ContentContainer>
      <InfoCards>
        <Overview
          description={t("pool.overview", { asset: pool.underlying.symbol, strategy: pool.name })}
          link="https://docs.backd.fund/"
        />
        <PoolInformation pool={pool} />
        {!balance.isZero() && (
          <ButtonContainer>
            <Button
              medium
              wide
              text={`+ ${t("actions.register.nav")}`}
              click={() => history.push("/actions")}
              background="#0A0525"
            />
          </ButtonContainer>
        )}
      </InfoCards>
    </StyledPoolPage>
  );
};

export default PoolPage;
