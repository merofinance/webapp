import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import RowSelector, { RowOptionType } from "../../../components/RowSelector";
import { selectEthPrice } from "../../../state/poolsListSlice";
import { selectLoans } from "../../../state/lendingSlice";
import LoanSearch from "./LoanSearch";
import { Loan, Position } from "../../../lib/types";
import { useDevice } from "../../../app/hooks/use-device";
import { selectPositions } from "../../../state/positionsSlice";

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

const RegisterTopupLoan = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { account } = useWeb3React();
  const { isMobile } = useDevice();
  const loans = useSelector(selectLoans);
  const positions = useSelector(selectPositions);
  const ethPrice = useSelector(selectEthPrice);
  const [protocol, setProtocol] = useState("");
  const [address, setAddress] = useState<string | null | undefined>("");

  const positionExists = (loan: Loan) =>
    positions.some(
      (position: Position) => position.protocol === loan.protocol && position.account === account
    );

  const isAccountsLoan = address === account;
  const hasLoans = loans.length > 0;

  const options: RowOptionType[] = loans
    .filter((loan: Loan) => loan.healthFactor.toCryptoString)
    .map((loan: Loan) => {
      return {
        id: `${loan.protocol.toLowerCase()}-option`,
        value: loan.protocol,
        disabledText: positionExists(loan) ? t("actions.topup.stages.loan.alreadyExists") : "",
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
            value: loan.totalCollateralETH.toCompactUsdValue(ethPrice),
          },
          {
            label: t("actions.suggestions.topup.labels.totalLoan"),
            value: loan.totalDebtETH.toCompactUsdValue(ethPrice),
          },
        ],
      };
    });

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="2/4"
        content={
          <Content>
            {hasLoans && (
              <>
                <Header id="register-topup-loan-header">
                  {t("actions.topup.stages.loan.header")}
                </Header>
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
            />
            <ButtonContainer>
              <Button
                id="register-topup-loan-button"
                primary
                medium
                disabled={!address}
                width={isMobile ? "100%" : "44%"}
                text={t("components.continue")}
                click={() => history.push(`/actions/register/topup/${address}/${protocol}`)}
                hoverText={t("actions.topup.stages.loan.header")}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupLoan;
