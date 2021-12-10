import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import InfoCard from "../../components/InfoCard";
import { Pool } from "../../lib";
import { selectDepositedPools, selectPrices } from "../../state/poolsListSlice";
import { selectBalances } from "../../state/userSlice";
import Asset from "../../components/Asset";
import { GradientText } from "../../styles/GradientText";
import { TOPUP_ACTION_ROUTE } from "../../lib/constants";
import Loader from "../../components/Loader";
import { selectBalance } from "../../state/selectors";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const EmptyText = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const AssetContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ManageButton = styled.button`
  margin-left: 1rem;
  cursor: pointer;
`;

const ManageText = styled(GradientText)`
  font-size: 1rem;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Underlying = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-bottom: 0.2rem;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Usd = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.5;

  font-size: 1.2rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Total = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-top: 0.4rem;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const YourDeposits = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const balances = useSelector(selectBalances);
  const prices = useSelector(selectPrices);
  const balance = useSelector(selectBalance());
  const depositedPools = useSelector(selectDepositedPools);

  const hasDeposits = depositedPools && depositedPools.length > 0;

  return (
    <InfoCard
      id="your-deposits"
      collapsible
      header={t("actions.deposits.header")}
      content={
        <Content>
          {!hasDeposits && (
            <EmptyText id="your-deposits-empty">{t("actions.deposits.empty")}</EmptyText>
          )}
          {hasDeposits && depositedPools && (
            <>
              {depositedPools.map((pool: Pool) => {
                const price = prices[pool.underlying.symbol];
                const balance = balances[pool.lpToken.address];
                return (
                  <Row id={`your-deposits-${pool.underlying.symbol.toLowerCase()}`} key={pool.name}>
                    <AssetContainer>
                      <Asset tiny token={pool.underlying} />
                      <ManageButton
                        onClick={() => {
                          navigate(
                            `${TOPUP_ACTION_ROUTE}/deposit/${pool.lpToken.symbol.toLowerCase()}`
                          );
                        }}
                      >
                        <ManageText>{t("actions.deposits.manage")}</ManageText>
                      </ManageButton>
                    </AssetContainer>

                    <Balances>
                      <Underlying>
                        {balance ? (
                          `${balance.toCryptoString()} ${pool.underlying.symbol}`
                        ) : (
                          <Loader />
                        )}
                      </Underlying>
                      <Usd>{balance && price ? balance.toUsdValue(price) : <Loader />}</Usd>
                    </Balances>
                  </Row>
                );
              })}
              <Total id="your-deposits-total">
                {balance ? `= ${balance.toUsdValue(1)}` : <Loader />}
              </Total>
            </>
          )}
        </Content>
      }
    />
  );
};

export default YourDeposits;
