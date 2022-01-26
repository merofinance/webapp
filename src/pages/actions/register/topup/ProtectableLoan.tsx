import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";

import Loader from "../../../../components/Loader";
import { selectEthPrice } from "../../../../state/poolsListSlice";
import Button from "../../../../components/Button";
import { Loan } from "../../../../lib/types";
import { TOPUP_ACTION_ROUTE } from "../../../../lib/constants";

const StyledProtectableLoan = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1.4rem;
  padding: 1.3rem 1.4rem;
  margin-top: 1rem;
`;

interface ColumnProps {
  hideMobile?: boolean;
}

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    flex: auto;
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

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }

  @media only percy {
    opacity: ${(props: ValueProps) => (props.hideOnSnapshot ? "0" : "1")};
  }
`;

interface Props {
  loan: Loan;
}

const ProtectableLoan = ({ loan }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const ethPrice = useSelector(selectEthPrice);

  return (
    <StyledProtectableLoan id={`${loan.protocol.toLowerCase()}-protectable-loan`}>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
        <Value>{loan.protocol}</Value>
      </Column>
      <Column hideMobile>
        <Header>{t("actions.suggestions.topup.labels.healthFactor")}</Header>
        <Value hideOnSnapshot>{loan.healthFactor.toCryptoString()}</Value>
      </Column>
      <Column hideMobile>
        <Header>{t("actions.suggestions.topup.labels.totalCollateral")}</Header>
        <Value hideOnSnapshot>
          {ethPrice ? loan.totalCollateralETH.toUsdValue(ethPrice) : <Loader />}
        </Value>
      </Column>
      <Column hideMobile>
        <Header>{t("actions.suggestions.topup.labels.totalLoan")}</Header>
        <Value hideOnSnapshot>
          {ethPrice ? loan.totalDebtETH.toUsdValue(ethPrice) : <Loader />}
        </Value>
      </Column>
      <Column>
        <Button
          id={`${loan.protocol.toLowerCase()}-protectable-loan-button`}
          medium
          background="#3A3550"
          click={() => navigate(`${TOPUP_ACTION_ROUTE}/${account}/${loan.protocol}`)}
        >
          {t("actions.suggestions.topup.register")}
        </Button>
      </Column>
    </StyledProtectableLoan>
  );
};

export default ProtectableLoan;
