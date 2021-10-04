import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Radio from "../../components/Radio";
import Button from "../../components/Button";
import { selectPool } from "../../state/selectors";
import Seo from "../../components/Seo";
import PoolDeposit from "./PoolDeposit";
import PoolWithdraw from "./PoolWithdraw";
import PoolInformation from "./PoolInformation";
import { selectBalance } from "../../state/userSlice";
import { useDevice } from "../../app/hooks/use-device";
import Overview from "../../components/Overview";
import { useBackd } from "../../app/hooks/use-backd";
import { fetchState } from "../../state/poolsListSlice";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import BackButton from "../../components/BackButton";

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

  margin-top: 6.4rem;
  @media (max-width: 1439px) {
    margin-top: 0;
  }
`;

const ButtonContainer = styled.div`
  @media (max-width: 1439px) {
    display: none;
  }
`;

const PoolPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { poolName } = useParams<DepositWithdrawParams>();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));
  const { isMobile } = useDevice();

  const [tab, setTab] = useState("deposit");

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
          <Radio
            options={[
              {
                label: t("pool.tabs.deposit.tab"),
                value: "deposit",
              },
              {
                label: t("pool.tabs.withdraw.tab"),
                value: "withdraw",
              },
            ]}
            active={tab}
            setOption={(value: string) => setTab(value)}
          />
          {tab === "deposit" && <PoolDeposit pool={pool} />}
          {tab === "withdraw" && <PoolWithdraw pool={pool} />}
        </Content>
      </ContentContainer>
      <InfoCards>
        <Overview
          description={t("pool.overview", { asset: pool.underlying.symbol, strategy: pool.name })}
          link="https://docs.backd.fund/"
        />
        <PoolInformation pool={pool} />
        {tab !== "positions" && !balance.isZero() && (
          <ButtonContainer>
            <Button
              medium
              text={`+ ${t("pool.tabs.positions.buttons.nav")}`}
              click={() => setTab("positions")}
              background="#0A0525"
            />
          </ButtonContainer>
        )}
      </InfoCards>
    </StyledPoolPage>
  );
};

export default PoolPage;
