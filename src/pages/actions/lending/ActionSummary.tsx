import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useHistory, useParams } from "react-router";

import { selectLoans } from "../../../state/lendingSlice";
import { selectEthPrice } from "../../../state/poolsListSlice";
import Asset from "../../../components/Asset";
import { selectPool } from "../../../state/selectors";
import { GradientText } from "../../../styles/GradientText";
import { Loan } from "../../../lib/types";

interface TopupParams {
  address: string;
  protocol: string;
  poolName: string;
}

const StyledActionSummary = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1.4rem;
  padding: 1.3rem 1.4rem;
  margin-top: 1rem;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.6;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
`;

const ChangePoolButton = styled.button`
  margin-left: 0.5rem;
  cursor: pointer;
`;

const ChangePoolText = styled(GradientText)`
  font-weight: 500;
  font-size: 1rem;
`;

const ActionSummary = () => {
  const { t } = useTranslation();
  const { protocol, poolName } = useParams<TopupParams>();
  const history = useHistory();
  const ethPrice = useSelector(selectEthPrice);
  const loans = useSelector(selectLoans);
  const pool = useSelector(selectPool(poolName));
  const loan = loans.filter((l: Loan) => l.protocol === protocol)[0];

  if (!loan || !pool) return <></>;

  return (
    <StyledActionSummary>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
        <Value>{loan.protocol}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.healthFactor")}</Header>
        <Value>{loan.healthFactor.toCryptoString()}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.totalCollateral")}</Header>
        <Value>{loan.totalCollateralETH.toUsdValue(ethPrice)}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.totalLoan")}</Header>
        <Value>{loan.totalDebtETH.toUsdValue(ethPrice)}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.pool")}</Header>
        <Value>
          <Asset tiny token={pool.underlying} />
          <ChangePoolButton onClick={() => history.goBack()}>
            <ChangePoolText>{t("components.change")}</ChangePoolText>
          </ChangePoolButton>
        </Value>
      </Column>
    </StyledActionSummary>
  );
};

export default ActionSummary;
