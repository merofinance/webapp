import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../../components/Loader";
import { selectLoans } from "../../../../state/lendingSlice";
import { selectPool, selectEthPrice } from "../../../../state/poolsListSlice";
import Asset from "../../../../components/Asset";
import { GradientText } from "../../../../styles/GradientText";
import { Loan } from "../../../../lib/types";
import { TOPUP_ACTION_ROUTE } from "../../../../lib/constants";

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

interface ValueProps {
  hideOnSnapshot?: boolean;
}

const Value = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: ${(props: ValueProps) => (props.hideOnSnapshot ? "0" : "1")};
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

const ActionSummary = (): JSX.Element => {
  const { t } = useTranslation();
  const { address, protocol, poolName } = useParams<"address" | "protocol" | "poolName">();
  const navigate = useNavigate();
  const ethPrice = useSelector(selectEthPrice);
  const pool = useSelector(selectPool(poolName));
  const loans = useSelector(selectLoans(address));

  const loan = loans.filter((loan: Loan) => loan.protocol === protocol)[0];

  return (
    <StyledActionSummary id="action-summary">
      <Column>
        <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
        <Value>{loan ? loan.protocol : <Loader />}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.healthFactor")}</Header>
        <Value hideOnSnapshot>{loan ? loan.healthFactor.toCryptoString() : <Loader />}</Value>
      </Column>
      <Column hideMobile>
        <Header>{t("actions.suggestions.topup.labels.totalCollateral")}</Header>
        <Value hideOnSnapshot>
          {loan && ethPrice ? loan.totalCollateralETH.toUsdValue(ethPrice) : <Loader />}
        </Value>
      </Column>
      <Column hideMobile>
        <Header>{t("actions.suggestions.topup.labels.totalLoan")}</Header>
        <Value hideOnSnapshot>
          {loan && ethPrice ? loan.totalDebtETH.toUsdValue(ethPrice) : <Loader />}
        </Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.pool")}</Header>
        <Value>
          {pool ? <Asset tiny token={pool.underlying} /> : <Loader />}
          <ChangePoolButton
            id="action-summary-change-pool"
            onClick={() => navigate(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}`)}
          >
            <ChangePoolText>{t("components.change")}</ChangePoolText>
          </ChangePoolButton>
        </Value>
      </Column>
    </StyledActionSummary>
  );
};

export default ActionSummary;
