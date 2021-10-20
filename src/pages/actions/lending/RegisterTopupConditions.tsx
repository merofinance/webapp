import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { useBackd } from "../../../app/hooks/use-backd";
import { useWeb3Updated } from "../../../app/hooks/use-web3-updated";

import ContentSection from "../../../components/ContentSection";
import { Loan, PlainLoan } from "../../../lib/types";
import { fromPlainLoan } from "../../../state/lendingSlice";
import ActionSummary from "./ActionSummary";
import RegisterTopupConditionsForm from "./RegisterTopupConditionsForm";

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
  font-weight: 600;
  letter-spacing: 0.25px;
  margin-top: 3rem;

  font-size: 2.2rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const SubHeader = styled.div`
  font-weight: 500;
  opacity: 0.8;

  font-size: 1.7rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
`;

const RegisterTopupConditions = () => {
  const { t } = useTranslation();
  const { address, protocol } = useParams<TopupParams>();
  const history = useHistory();
  const backd = useBackd();
  const { account } = useWeb3React();
  const update = useWeb3Updated();
  const [loan, setLoan] = useState<Loan | null>(null);

  const redirectToRegister = () => history.push("/actions/register/topup");

  const getLoan = async () => {
    if (!account || !backd) return;
    let plainLoan: PlainLoan | null = null;
    if (protocol === "Aave") plainLoan = await backd.getAave(address);
    else if (protocol === "Compound") plainLoan = await backd.getCompound(address);
    if (!plainLoan) redirectToRegister();
    else setLoan(fromPlainLoan(plainLoan));
  };

  useEffect(() => {
    getLoan();
  }, [update]);

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="4/4"
        content={
          <Content>
            <ActionSummary loan={loan} />
            <Header id="register-topup-conditions-header">
              {t("actions.topup.stages.conditions.header")}
            </Header>
            <SubHeader>{t("actions.topup.stages.conditions.subHeader")}</SubHeader>
            <RegisterTopupConditionsForm loan={loan} />
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupConditions;
