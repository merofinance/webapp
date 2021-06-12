import React from "react";
import styled from "styled-components";
import Button from "../../styles/Button";
import { Header2, Header4 } from "../../styles/Headers";

const StyledHero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--section-margin);
`;

const Hero = () => {
  return (
    <StyledHero>
      <Header2>reactive liquidity</Header2>
      <Header4>
        A trustless and interest generating protocol designed to prevent collateralized loans from
        becoming liquidable.
      </Header4>
      {/* TODO */}
      <Button hero>view pools</Button>
    </StyledHero>
  );
};

export default Hero;
