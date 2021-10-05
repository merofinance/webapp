import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InfoCard from "../../components/InfoCard";
import { Pool } from "../../lib";
import { selectPools, selectPrices } from "../../state/poolsListSlice";
import { selectBalances } from "../../state/userSlice";
import Asset from "../../components/Asset";
import { ScaledNumber } from "../../lib/scaled-number";
import { formatCurrency } from "../../lib/numeric";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Underlying = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-bottom: 0.2rem;
`;

const Usd = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.5;
`;

const Total = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-top: 0.4rem;
`;

const YourDeposits = () => {
  const { t } = useTranslation();
  const pools = useSelector(selectPools);
  const balances = useSelector(selectBalances);
  const prices = useSelector(selectPrices);

  const depositedPools = pools.filter((pool: Pool) => !balances[pool.lpToken.address]?.isZero());

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || new ScaledNumber();
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const totalUsd = depositedPools.reduce(
    (a: ScaledNumber, b: Pool) => a.add(getBalance(b).mul(getPrice(b))),
    new ScaledNumber()
  );

  return (
    <InfoCard
      defaultOpen
      collapsible
      header={t("headers.deposits")}
      content={
        <Content>
          {depositedPools.map((pool: Pool) => (
            <Row key={pool.name}>
              <Asset tiny token={pool.underlying} />
              <Balances>
                <Underlying>{`${balances[pool.lpToken.address]?.toCryptoString() || 0} ${
                  pool.underlying.symbol
                }`}</Underlying>
                <Usd>
                  {balances[pool.lpToken.address]?.toUsdValue(prices[pool.underlying.symbol]) ||
                    "$0"}
                </Usd>
              </Balances>
            </Row>
          ))}
          <Total>{`= ${formatCurrency(Number(totalUsd.toString()))}`}</Total>
        </Content>
      }
    />
  );
};

export default YourDeposits;
