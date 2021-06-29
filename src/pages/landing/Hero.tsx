import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/styles/Button";
import { Header1, Header3 } from "../../components/styles/Headers";
import { LIVE } from "../../lib/constants";

const StyledHero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--section-margin);

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Hero = () => {
  const history = useHistory();

  return (
    <StyledHero>
      <Header1>reactive liquidity</Header1>
      <Header3>
        A trustless and interest generating protocol designed to prevent collateralized loans from
        becoming liquidable.
      </Header3>
      <Button
        primary
        hero
        large
        inactive={!LIVE}
        text={LIVE ? "view pools" : "coming soon"}
        click={() => {
          if (!LIVE) return;
          history.push("/pools");
        }}
      />
    </StyledHero>
  );
};

export default Hero;
