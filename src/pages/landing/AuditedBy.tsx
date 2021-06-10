import React from "react";
import styled from "styled-components";
import GradientText from "../../styles/GradientText";
import background from "../../assets/audit/background.svg";
import chainSecurity from "../../assets/audit/chain-security.svg";

const StyledAuditedBy = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const Logo = styled.img`
  position: relative;
  width: 31.4rem;
  margin-right: 3rem;
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
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 2.9rem;
`;

const ViewReport = styled(GradientText)`
  font-weight: 700;
  font-size: 1.8rem;
  cursor: pointer;
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AuditedBy = () => {
  return (
    <StyledAuditedBy>
      <Container>
        <Background src={background} />
        <Logo src={chainSecurity} />
        <Content>
          <Header>audited by</Header>
          <Description>
            Led by security experts from ETH Zurich and trusted by 85+ blockchain companies and
            corporations.
          </Description>
          <ViewReport>View Report →</ViewReport>
        </Content>
      </Container>
    </StyledAuditedBy>
  );
};

export default AuditedBy;
