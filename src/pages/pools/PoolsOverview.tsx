import React from "react";
import styled from "styled-components";

const StyledPoolsOverview = styled.div`
  display: flex;
  margin: 0 8rem;
`;

const Container = styled.div`
  flex: 1;
  padding: 3.3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #16122e;
  border-radius: 14px;
  margin: 0 0.8rem;
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
  color: var(--sub);
`;

const Number = styled.div`
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 4.2rem;
  letter-spacing: 0.25px;
`;

const PoolsOverview = () => {
  return (
    <StyledPoolsOverview>
      <Container>
        <Label>Earnings Accrued</Label>
        <Number>$1243.34</Number>
      </Container>
      <Container>
        <Label>Your Deposits</Label>
        <Number>$65,530.34</Number>
      </Container>
      <Container>
        <Label>Locked in Position</Label>
        <Number>$45,200.00</Number>
      </Container>
    </StyledPoolsOverview>
  );
};

export default PoolsOverview;
