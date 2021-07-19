import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button";
import { useIsLive } from "../../lib/hooks";
import { Header1, Header3 } from "../../styles/Headers";

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
  const live = useIsLive();

  return (
    <StyledHero>
      <Header1>reactive liquidity</Header1>
      <Header3>
        A trustless and interest generating protocol designed to prevent collateralized loans from
        becoming liquidatable.
      </Header3>
      <Button
        primary
        hero
        large
        inactive={!live}
        text={live ? "view pools" : "coming soon"}
        click={() => {
          if (!live) return;
          history.push("/pools");
        }}
      />
    </StyledHero>
  );
};

export default Hero;
