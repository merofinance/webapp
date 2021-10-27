import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import { selectPool } from "../../../state/selectors";
import {
  GWEI_DECIMALS,
  GWEI_SCALE,
  TOPUP_ACTION_ROUTE,
  TOPUP_GAS_COST,
} from "../../../lib/constants";
import PoolDeposit from "../../pool/PoolDeposit";
import { useDevice } from "../../../app/hooks/use-device";
import { selectBalances } from "../../../state/userSlice";
import { ScaledNumber } from "../../../lib/scaled-number";
import { selectEthPrice, selectPrices } from "../../../state/poolsListSlice";

interface TopupParams {
  address: string;
  protocol: string;
  poolName: string;
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
  margin-bottom: 6rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisterTopupPoolDeposit = () => {
  const { t } = useTranslation();
  const { address, protocol, poolName } = useParams<TopupParams>();
  const history = useHistory();
  const { isMobile } = useDevice();
  const pool = useSelector(selectPool(poolName));
  const balances = useSelector(selectBalances);
  const prices = useSelector(selectPrices);
  const ethPrice = useSelector(selectEthPrice);

  if (!pool) {
    history.push("/");
    throw Error("Pool not found");
  }

  const hasSufficientBalance = () => {
    const lpBalance = balances[pool.lpToken.address];
    const usdBalance = lpBalance.mul(prices[pool.underlying.symbol]);
    const gasCostUsd = new ScaledNumber(
      ScaledNumber.fromUnscaled(50, GWEI_DECIMALS).value.mul(TOPUP_GAS_COST).div(GWEI_SCALE)
    ).mul(ethPrice);
    return usdBalance.gte(gasCostUsd);
  };

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
        content={
          <Content>
            <Header id="register-topup-pool-deposit">
              {t("actions.topup.stages.pool.deposit.header", { asset: pool.underlying.symbol })}
            </Header>
            <SubHeader>
              {t("actions.topup.stages.pool.deposit.subHeader", { asset: pool.underlying.symbol })}
            </SubHeader>
            <PoolDeposit compact pool={pool} />
            <ButtonContainer>
              <Button
                id="register-topup-pool-deposit-button"
                primary
                medium
                width={isMobile ? "100%" : "44%"}
                text={t("components.continue")}
                click={() => {
                  if (address && protocol)
                    history.push(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}/${poolName}`);
                  else history.goBack();
                }}
                disabled={!pool || !hasSufficientBalance()}
                hoverText={t("actions.topup.stages.pool.deposit.incomplete", {
                  asset: pool?.underlying.symbol,
                })}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupPoolDeposit;
