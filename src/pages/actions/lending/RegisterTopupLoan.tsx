import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import BackButton from "../../../components/BackButton";
import RowSelector, { RowOptionType } from "../../../components/RowSelector";
import { selectEthPrice } from "../../../state/poolsListSlice";
import { Loan, selectLoans } from "../../../state/lendingSlice";

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
  margin-bottom: 1.6rem;
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisterTopupLoan = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { account } = useWeb3React();
  const loans = useSelector(selectLoans);
  const ethPrice = useSelector(selectEthPrice);
  const [protocol, setProtocol] = useState("");

  const options: RowOptionType[] = loans.map((loan: Loan) => {
    return {
      value: loan.protocol,
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
          value: loan.totalCollateralETH.toUsdValue(ethPrice),
        },
        {
          label: t("actions.suggestions.topup.labels.totalLoan"),
          value: loan.totalDebtETH.toUsdValue(ethPrice),
        },
      ],
    };
  });

  return (
    <Container>
      <BackButton />
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="2/4"
        content={
          <Content>
            <Header>{t("actions.topup.stages.loan.header")}</Header>
            <SubHeader>{t("actions.topup.stages.loan.subHeader")}</SubHeader>
            <RowSelector
              options={options}
              value={protocol}
              setValue={(value: string) => setProtocol(value)}
            />
            {/* TODO Disabled state */}
            <ButtonContainer>
              <Button
                primary
                medium
                width="44%"
                text={t("components.continue")}
                click={() => history.push(`/actions/register/topup/${account}/${protocol}`)}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupLoan;
