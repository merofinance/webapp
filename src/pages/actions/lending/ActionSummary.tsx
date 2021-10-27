import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";

import { selectLoans } from "../../../state/lendingSlice";
import { selectEthPrice } from "../../../state/poolsListSlice";
import Asset from "../../../components/Asset";
import { selectPool } from "../../../state/selectors";
import { GradientText } from "../../../styles/GradientText";
import { LendingProtocol, Loan } from "../../../lib/types";
import { TOPUP_ACTION_ROUTE } from "../../../lib/constants";

interface TopupParams {
  address: string;
  protocol: LendingProtocol;
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
  @media (max-width: 600px) {
    margin-top: 0.6rem;
  }
`;

interface ColumnProps {
  hideMobile?: boolean;
}

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    display: ${(props: ColumnProps) => (props.hideMobile ? "none" : "flex")};
  }
`;

const Header = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.6;

  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
`;

const Value = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
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
  const { address, protocol, poolName } = useParams<TopupParams>();
  const history = useHistory();
  const ethPrice = useSelector(selectEthPrice);
  const pool = useSelector(selectPool(poolName));
  const loans = useSelector(selectLoans(address));

  const loan = loans.filter((loan: Loan) => loan.protocol === protocol)[0];

  if (!loan || !pool) return <></>;

  return (
    <StyledActionSummary id="action-summary">
      <Column>
        <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
        <Value>{loan.protocol}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.healthFactor")}</Header>
        <Value>{loan.healthFactor.toCryptoString()}</Value>
      </Column>
      <Column hideMobile>
        <Header>{t("actions.suggestions.topup.labels.totalCollateral")}</Header>
        <Value>{loan.totalCollateralETH.toUsdValue(ethPrice)}</Value>
      </Column>
      <Column hideMobile>
        <Header>{t("actions.suggestions.topup.labels.totalLoan")}</Header>
        <Value>{loan.totalDebtETH.toUsdValue(ethPrice)}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.pool")}</Header>
        <Value>
          <Asset tiny token={pool.underlying} />
          <ChangePoolButton
            id="action-summary-change-pool"
            onClick={() => history.push(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}`)}
          >
            <ChangePoolText>{t("components.change")}</ChangePoolText>
          </ChangePoolButton>
        </Value>
      </Column>
    </StyledActionSummary>
  );
};

export default ActionSummary;
