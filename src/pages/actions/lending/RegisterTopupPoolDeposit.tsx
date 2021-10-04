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
import { selectBalance, selectBalances } from "../../../state/userSlice";
import { selectPositions } from "../../../state/positionsSlice";
import { ScaledNumber } from "../../../lib/scaled-number";
import { Position } from "../../../lib/types";
import { selectPool, selectPrice } from "../../../state/selectors";

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

interface Props {
  poolName: string;
}

const RegisterTopupPoolDeposit = ({ poolName }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { address, protocol } = useParams<TopupParams>();
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));
  const price = useSelector(selectPrice(pool));

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
              {t("actions.topup.stages.pool.deposit.header", { asset: pool?.underlying.symbol })}
            </Header>
            <SubHeader>
              {t("actions.topup.stages.pool.deposit.subHeader", { asset: pool?.underlying.symbol })}
            </SubHeader>

            <ButtonContainer>
              <Button
                primary
                medium
                width="44%"
                text={t("components.continue")}
                click={() =>
                  history.push(
                    `/actions/register/topup/${address}/${protocol}/${pool?.lpToken.symbol}`
                  )
                }
                disabled={!pool || Number(balance.toString()) * price < 50}
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
