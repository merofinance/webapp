import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentSection from "../../../../components/ContentSection";
import Button from "../../../../components/Button";
import RowSelector from "../../../../components/RowSelector";
import { selectEthPrice, selectPools, selectPrices } from "../../../../state/poolsListSlice";
import { Pool } from "../../../../lib";
import { formatPercent, numberToCompactCurrency } from "../../../../lib/numeric";
import { selectBalances } from "../../../../state/userSlice";
import { selectPositions } from "../../../../state/positionsSlice";
import { ScaledNumber } from "../../../../lib/scaled-number";
import { Optional, Position } from "../../../../lib/types";
import Asset from "../../../../components/Asset";
import { RowOptionType } from "../../../../components/RowOption";
import { TOPUP_ACTION_ROUTE } from "../../../../lib/constants";

const Container = styled.div`
  position: relative;
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

const TopupPool = (): JSX.Element => {
  const { t } = useTranslation();
  const { address, protocol } = useParams<"address" | "protocol">();
  const navigate = useNavigate();
  const pools = useSelector(selectPools);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);
  const prices = useSelector(selectPrices);
  const ethPrice = useSelector(selectEthPrice);
  const [pool, setPool] = useState("");

  const hasSufficientBalance = (pool: Optional<Pool>) => {
    if (!pool) return false;
    const lpBalance = balances[pool.lpToken.address];
    const price = prices[pool.underlying.symbol];
    if (!lpBalance || !price || !ethPrice) return false;
    const usdBalance = lpBalance.mul(price);
    return usdBalance.gt(ScaledNumber.fromUnscaled(10, lpBalance.decimals));
  };

  const hasDeposits = pools ? pools.some((pool: Pool) => hasSufficientBalance(pool)) : false;
  const selected = pools
    ? pools.filter((p: Pool) => p.lpToken.symbol.toLowerCase() === pool)[0]
    : null;

  const options: RowOptionType[] = pools
    ? pools.map((pool: Pool) => {
        const value = pool.lpToken.symbol.toLowerCase();
        const price = prices[pool.underlying.symbol];
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
              value:
                price && positions
                  ? (
                      balances[pool.lpToken.address] ||
                      ScaledNumber.fromUnscaled(0, pool.underlying.decimals)
                    )
                      .add(
                        positions
                          .filter(
                            (position: Position) => position.depositToken === pool.lpToken.symbol
                          )
                          .reduce(
                            (a: ScaledNumber, b: Position) => a.add(b.maxTopUp),
                            ScaledNumber.fromUnscaled(0, pool.underlying.decimals)
                          )
                      )
                      .toCompactUsdValue(price)
                  : null,
            },
            {
              label: t("headers.apy"),
              value: pool.apy ? formatPercent(pool.apy) : null,
            },
            {
              label: t("headers.tvl"),
              value: price ? numberToCompactCurrency(pool.totalAssets * price) : null,
            },
          ],
        };
      })
    : [];

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
      >
        <Header id="register-topup-pool-header">
          {hasDeposits
            ? t("actions.topup.stages.pool.header")
            : t("actions.topup.stages.pool.noDepositsHeader")}
        </Header>
        {!hasDeposits && <SubHeader>{t("actions.topup.stages.pool.subHeader")}</SubHeader>}
        <RowSelector value={pool} setValue={(value: string) => setPool(value)} options={options} />
        <ButtonContainer>
          <Button
            id="register-topup-pool-button"
            primary
            medium
            width="30rem"
            click={() => {
              if (!hasSufficientBalance(selected))
                navigate(`${TOPUP_ACTION_ROUTE}/deposit/${pool}/${address}/${protocol}`);
              else navigate(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}/${pool}`);
            }}
            disabled={!pool}
            hoverText={t("actions.topup.stages.pool.incomplete")}
          >
            {t("components.continue")}
          </Button>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
};

export default TopupPool;
