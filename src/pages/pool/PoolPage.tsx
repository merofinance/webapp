import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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

const StyledPoolPage = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  @media (max-width: 1220px) {
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
  @media (max-width: 1220px) {
    display: none;
  }
`;

const PoolPage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { poolName } = useParams<"poolName">();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  if (!pool) {
    navigate("/");
    return <div />;
  }

  return (
    <StyledPoolPage>
      <Seo
        title={t("metadata.pool.title", { asset: pool.underlying.symbol })}
        description={t("metadata.pool.description", { asset: pool.underlying.symbol })}
      />
      <BackButton />
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
              id="create-topup-button"
              medium
              wide
              text={`+ ${t("actions.register.nav")}`}
              click={() => navigate("/actions")}
              background="#0A0525"
            />
          </ButtonContainer>
        )}
      </InfoCards>
    </StyledPoolPage>
  );
};

export default PoolPage;
