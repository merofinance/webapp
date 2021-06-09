import React from "react";
import styled from "styled-components";
import Hero from "./Hero";

const StyledLanding = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = () => {
  return (
    <StyledLanding>
      <Hero />
    </StyledLanding>
  );
};

export default LandingPage;
