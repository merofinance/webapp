import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import ContentSection from "../../../../components/ContentSection";
import Button from "../../../../components/Button";
import RowSelector from "../../../../components/RowSelector";
import { selectEthPrice, selectPools } from "../../../../state/poolsListSlice";
import { selectLoans } from "../../../../state/lendingSlice";
import LoanSearch from "./LoanSearch";
import { Loan, Optional, Position } from "../../../../lib/types";
import { selectPositions } from "../../../../state/positionsSlice";
import { RowOptionType } from "../../../../components/RowOption";
import { useNavigateToTop } from "../../../../app/hooks/use-navigate-to-top";

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.2rem;
  margin-bottom: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const SubHeader = styled.div`
  font-weight: 500;
  opacity: 0.8;

  font-size: 1.7rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
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

interface Props {
  actionType: string;
  nextRouteBase: string;
}

const TopupLoan = ({ actionType, nextRouteBase }: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigateToTop();
  const { account } = useWeb3React();
  const loans = useSelector(selectLoans(account));
  const positions = useSelector(selectPositions);
  const ethPrice = useSelector(selectEthPrice);
  const pools = useSelector(selectPools);
  const [protocol, setProtocol] = useState("");
  const [address, setAddress] = useState<Optional<string> | undefined>("");

  const positionExists = (loan: Loan) =>
    positions &&
    positions.some(
      (position: Position) => position.protocol === loan.protocol && position.account === account
    );

  const hasNoDebt = (loan: Loan) => {
    if (actionType === "topup") return false;
    return (
      loan.borrowedTokens.filter((borrowedToken) => {
        return pools?.find((pool) => pool.underlying.symbol === borrowedToken);
      }).length === 0
    );
  };

  const isAccountsLoan = address === account;
  const hasLoans = loans.length > 0;

  const options: RowOptionType[] = loans
    .filter((loan: Loan) => loan.healthFactor.toCryptoString)
    .map((loan: Loan) => {
      return {
        id: `${loan.protocol.toLowerCase()}-option`,
        value: loan.protocol,
        disabledText: positionExists(loan)
          ? t("actions.topup.stages.loan.alreadyExists")
          : hasNoDebt(loan)
          ? t("actions.topup.stages.loan.noDebt")
          : "",
        columns: [
          {
            label: t("actions.suggestions.topup.labels.protocol"),
            value: loan.protocol,
          },
          {
            label: t("actions.suggestions.topup.labels.healthFactor"),
            value: loan.healthFactor.toCryptoString(),
          },
          {
            label: t("actions.suggestions.topup.labels.totalCollateral"),
            value: ethPrice ? loan.totalCollateralETH.toCompactUsdValue(ethPrice) : null,
          },
          {
            label: t("actions.suggestions.topup.labels.totalLoan"),
            value: ethPrice ? loan.totalDebtETH.toCompactUsdValue(ethPrice) : null,
          },
        ],
      };
    });

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t(`actions.${actionType}.header`)}
        nav={t("actions.register.step", { step: "2/4" })}
      >
        {hasLoans && (
          <>
            <Header id="register-topup-loan-header">{t("actions.topup.stages.loan.header")}</Header>
            <SubHeader>{t("actions.topup.stages.loan.subHeader")}</SubHeader>
            <RowSelector
              options={options}
              value={isAccountsLoan ? protocol : ""}
              setValue={(value: string) => {
                setProtocol(value);
                setAddress(account);
              }}
            />
          </>
        )}
        <LoanSearch
          value={!isAccountsLoan ? protocol : ""}
          setValue={(value: string, newAddress: string) => {
            setProtocol(value);
            setAddress(newAddress);
          }}
          hasExistingLoans={hasLoans}
          actionType={actionType}
        />
        <ButtonContainer>
          <Button
            id="register-topup-loan-button"
            primary
            medium
            disabled={!address}
            width="30rem"
            click={() => navigate(`${nextRouteBase}/${address}/${protocol}`)}
            hoverText={t("actions.topup.stages.loan.header")}
          >
            {t("components.continue")}
          </Button>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
};

export default TopupLoan;
