import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import ContentSection from "../../../components/ContentSection";
import ActionSummary from "./ActionSummary";
import RegisterTopupConditionsForm from "./RegisterTopupConditionsForm";

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

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="4/4"
        content={
          <Content>
            <ActionSummary />
            <Header id="register-topup-conditions-header">
              {t("actions.topup.stages.conditions.header")}
            </Header>
            <SubHeader>{t("actions.topup.stages.conditions.subHeader")}</SubHeader>
            <RegisterTopupConditionsForm />
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupConditions;
