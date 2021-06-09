import React from "react";
import styled from "styled-components";
import Background from "./Background";
import Hero from "./Hero";

const StyledLanding = styled.div``;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = () => {
  return (
    <StyledLanding>
      <Background />
      <Content>
        <Hero />
      </Content>
    </StyledLanding>
  );
};

export default LandingPage;
