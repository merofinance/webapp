import React from "react";
import styled from "styled-components";
import Button from "../../styles/Button";
import { Header3 } from "../../styles/Headers";

const StyledGetStarted = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.6rem;

  button {
    transform: translateY(6.7rem);
  }
`;

const Body = styled.p`
  max-width: 60.7rem;
  font-size: 4.8rem;
  font-weight: 700;
  line-height: 5.6rem;
  text-align: center;
`;

const GetStarted = () => {
  return (
    <StyledGetStarted>
      <Container>
        <Header3>get started</Header3>
        <Body>Deposit liquidity and start earning yield.</Body>
        <Button>view pools</Button>
      </Container>
    </StyledGetStarted>
  );
};

export default GetStarted;
