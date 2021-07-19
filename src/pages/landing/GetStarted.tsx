import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button";
import { Header2 } from "../../styles/Headers";

const StyledGetStarted = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.6rem;
  width: 111rem;
  border-radius: 1.4rem;
  background: linear-gradient(
    to right,
    rgba(34, 31, 55, 0.1) 0%,
    #221f37 50%,
    rgba(34, 31, 55, 0.1) 100%
  );

  button {
    transform: translateY(6.7rem);
  }

  @media (max-width: 600px) {
    width: 100%;

    button {
      transform: translateY(5.7rem);
    }
  }
`;

const Body = styled.p`
  max-width: 60.7rem;
  font-size: 4.8rem;
  font-weight: 700;
  line-height: 5.6rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 3.2rem;
    line-height: 3.7rem;
  }
`;

const GetStarted = () => {
  const history = useHistory();

  return (
    <StyledGetStarted>
      <Container>
        <Header2>get started</Header2>
        <Body>Deposit liquidity and start earning yield.</Body>
        <Button
          primary
          large
          inactive={!live}
          text={live ? "view pools" : "coming soon"}
          click={() => {
            if (!live) return;
            history.push("/pools");
          }}
        />
      </Container>
    </StyledGetStarted>
  );
};

export default GetStarted;
