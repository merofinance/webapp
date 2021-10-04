import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import BackButton from "../../../components/BackButton";
import RowSelector, { RowOptionType } from "../../../components/RowSelector";
import { selectPools, selectPrices } from "../../../state/poolsListSlice";
import { Pool } from "../../../lib";
import { formatPercent, numberToCompactCurrency } from "../../../lib/numeric";
import { selectBalances } from "../../../state/userSlice";
import { selectPositions } from "../../../state/positionsSlice";
import { ScaledNumber } from "../../../lib/scaled-number";
import { Position } from "../../../lib/types";
import RegisterTopupPoolDeposit from "./RegisterTopupPoolDeposit";

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
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
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
`;

const RegisterTopupPool = () => {
  const { t } = useTranslation();
  const { address, protocol } = useParams<TopupParams>();
  const history = useHistory();
  const pools = useSelector(selectPools);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);
  const prices = useSelector(selectPrices);
  const [pool, setPool] = useState("");
  const [depositing, setDepositing] = useState(false);

  const hasSufficientBalance = (pool: Pool) => {
    const lpBalance = Number(balances[pool.lpToken.address]);
    const usdBalance = lpBalance * prices[pool.underlying.symbol];
    return usdBalance >= 50;
  };

  const hasDeposits = pools.some((pool: Pool) => hasSufficientBalance(pool));
  const selected = pools.filter((p: Pool) => p.lpToken.symbol.toLocaleLowerCase() === pool)[0];

  const options: RowOptionType[] = pools.map((pool: Pool) => {
    return {
      value: pool.lpToken.symbol.toLowerCase(),
      columns: [
        {
          label: t("headers.asset"),
          value: pool.underlying.symbol,
        },
        {
          label: t("headers.apy"),
          value: formatPercent(pool.apy),
        },
        {
          label: t("headers.tvl"),
          value: numberToCompactCurrency(pool.totalAssets * prices[pool.underlying.symbol]),
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
      ],
    };
  });

  if (depositing) return <RegisterTopupPoolDeposit poolName={selected.lpToken.symbol} />;

  return (
    <Container>
      <BackButton />
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
        content={
          <Content>
            <Header>
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
                primary
                medium
                width="44%"
                text={t("components.continue")}
                click={() => {
                  if (hasSufficientBalance(selected)) setDepositing(true);
                  else history.push(`/actions/register/topup/${address}/${protocol}/${pool}`);
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
