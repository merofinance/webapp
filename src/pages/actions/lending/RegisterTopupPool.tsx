import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import RowSelector from "../../../components/RowSelector";
import { selectEthPrice, selectPools, selectPrices } from "../../../state/poolsListSlice";
import { Pool } from "../../../lib";
import { formatPercent, numberToCompactCurrency } from "../../../lib/numeric";
import { selectBalances } from "../../../state/userSlice";
import { selectPositions } from "../../../state/positionsSlice";
import { ScaledNumber } from "../../../lib/scaled-number";
import { Position } from "../../../lib/types";
import RegisterTopupPoolDeposit from "./RegisterTopupPoolDeposit";
import Asset from "../../../components/Asset";
import { useDevice } from "../../../app/hooks/use-device";
import { RowOptionType } from "../../../components/RowOption";
import {
  GWEI_DECIMALS,
  GWEI_SCALE,
  TOPUP_ACTION_ROUTE,
  TOPUP_GAS_COST,
} from "../../../lib/constants";

interface TopupParams {
  address: string;
  protocol: string;
}

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.2rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
  margin-top: 1.6rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 6rem;
  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const RegisterTopupPool = () => {
  const { t } = useTranslation();
  const { address, protocol } = useParams<TopupParams>();
  const history = useHistory();
  const { isMobile } = useDevice();
  const pools = useSelector(selectPools);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);
  const prices = useSelector(selectPrices);
  const ethPrice = useSelector(selectEthPrice);
  const [pool, setPool] = useState("");
  const [depositing, setDepositing] = useState(false);

  const hasSufficientBalance = (pool: Pool) => {
    const lpBalance = balances[pool.lpToken.address];
    const usdBalance = lpBalance.mul(prices[pool.underlying.symbol]);
    const gasCostUsd = new ScaledNumber(
      ScaledNumber.fromUnscaled(50, GWEI_DECIMALS).value.mul(TOPUP_GAS_COST).div(GWEI_SCALE)
    ).mul(ethPrice);
    return usdBalance.gte(gasCostUsd);
  };

  const hasDeposits = pools.some((pool: Pool) => hasSufficientBalance(pool));
  const selected = pools.filter((p: Pool) => p.lpToken.symbol.toLocaleLowerCase() === pool)[0];

  const options: RowOptionType[] = pools.map((pool: Pool) => {
    const value = pool.lpToken.symbol.toLowerCase();
    return {
      value,
      id: `${pool.underlying.symbol.toLowerCase()}-pool-option`,
      columns: [
        {
          label: t("headers.asset"),
          value: <Asset tiny token={pool.underlying} />,
        },
        {
          label: t("headers.deposits"),
          value: (balances[pool.lpToken.address] || new ScaledNumber())
            .add(
              positions
                .filter((position: Position) => position.depositToken === pool.lpToken.symbol)
                .reduce((a: ScaledNumber, b: Position) => a.add(b.maxTopUp), new ScaledNumber())
            )
            .toCompactUsdValue(prices[pool.underlying.symbol]),
        },
        {
          label: t("headers.apy"),
          value: formatPercent(pool.apy),
        },
        {
          label: t("headers.tvl"),
          value: numberToCompactCurrency(pool.totalAssets * prices[pool.underlying.symbol]),
        },
      ],
    };
  });

  if (depositing)
    return (
      <RegisterTopupPoolDeposit
        poolName={selected.lpToken.symbol}
        hasSufficientBalance={hasSufficientBalance(selected)}
      />
    );

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
        content={
          <Content>
            <Header id="register-topup-pool-header">
              {hasDeposits
                ? t("actions.topup.stages.pool.header")
                : t("actions.topup.stages.pool.noDepositsHeader")}
            </Header>
            {!hasDeposits && <SubHeader>{t("actions.topup.stages.pool.subHeader")}</SubHeader>}
            <RowSelector
              value={pool}
              setValue={(value: string) => setPool(value)}
              options={options}
            />
            <ButtonContainer>
              <Button
                id="register-topup-pool-button"
                primary
                medium
                width={isMobile ? "100%" : "44%"}
                text={t("components.continue")}
                click={() => {
                  if (!hasSufficientBalance(selected)) setDepositing(true);
                  else history.push(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}/${pool}`);
                }}
                disabled={!pool}
                hoverText={t("actions.topup.stages.pool.incomplete")}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupPool;
