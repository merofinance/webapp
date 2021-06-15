import React from "react";
import styled from "styled-components";
import GradientText from "../../components/styles/GradientText";
import background from "../../assets/audit/background.svg";
import chainSecurity from "../../assets/audit/chain-security.svg";
import chainSecurityMobile from "../../assets/audit/chain-security-mobile.svg";

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

const ViewReport = styled(GradientText)`
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

const AuditedBy = () => {
  return (
    <StyledAuditedBy>
      <Container>
        <Background src={background} />
        <Logo src={chainSecurity} />
        <Content>
          <Header>audited by</Header>
          <MobileLogo src={chainSecurityMobile} />
          <Description>
            Led by security experts from ETH Zurich and trusted by 85+ blockchain companies and
            corporations.
          </Description>
          <ViewReport
            onClick={() => {
              (window as any)
                .open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO",
                  "_blank"
                )
                .focus();
            }}
          >
            View Report →
          </ViewReport>
        </Content>
      </Container>
    </StyledAuditedBy>
  );
};

export default AuditedBy;
