import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import background from "../../assets/audit/background.svg";
import chainSecurityMobile from "../../assets/audit/chain-security-mobile.svg";
import chainSecurity from "../../assets/audit/chain-security.svg";
import { GradientLink } from "../../styles/GradientText";
import { LIVE } from "../../lib/constants";

const StyledAuditedBy = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Container = styled.div`
  position: relative;
  width: 83.2rem;
  height: 23rem;
  border-radius: 1.4rem;
  overflow: hidden;
  background-color: #19152f;
  padding: 3.1rem 3.8rem;
  display: flex;

  @media (max-width: 600px) {
    padding: 1.4rem 1.6rem;
    width: auto;
    height: auto;
  }
`;

const Logo = styled.img`
  position: relative;
  width: 31.4rem;
  margin-right: 3rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 2.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2.1rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    color: var(--sub);
    margin-bottom: 3rem;
    line-height: 1.6rem;
  }
`;

const MobileLogo = styled.img`
  width: 18.4rem;
  margin-bottom: 2.1rem;

  @media (min-width: 601px) {
    display: none;
  }
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 2.9rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const ViewReport = styled(GradientLink)`
  font-weight: 700;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 1.3rem;
  }
`;

const Background = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 130%;

  @media (max-width: 600px) {
    height: auto;
    width: 100%;
  }
`;

const AuditedBy = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledAuditedBy>
      <Container>
        <Background src={background} alt="decorative background" />
        <Logo src={chainSecurity} alt="Chain Security logo" />
        <Content>
          <Header>{LIVE ? t("auditedBy.header") : t("auditedBy.preLaunchHeader")}</Header>
          <MobileLogo src={chainSecurityMobile} alt="Chain Security logo" />
          <Description>{t("auditedBy.description")}</Description>
          {LIVE && (
            <ViewReport href="" target="_blank">
              {`${t("auditedBy.viewReport")} →`}
            </ViewReport>
          )}
        </Content>
      </Container>
    </StyledAuditedBy>
  );
};

export default AuditedBy;
