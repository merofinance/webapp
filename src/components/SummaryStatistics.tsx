import React from "react";
import styled from "styled-components";
export interface SummaryStatisticType {
  label: string;
  value: string;
}

const StyledSummaryStatistics = styled.div`
  display: flex;
  margin: 0 8rem;
  justify-content: center;
  margin-bottom: 7.4rem;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    margin: 0;
    margin-bottom: 5rem;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #16122e;
  border-radius: 14px;
  margin: 0 0.8rem;

  max-width: 40.7rem;
  padding: 3.3rem 0;
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    padding: 2rem 0;
    margin: 0;
  }
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
  color: var(--sub);
  text-transform: capitalize;

  @media (max-width: 600px) {
  }
`;

const Number = styled.div`
  font-weight: 700;
  line-height: 4.2rem;
  letter-spacing: 0.25px;

  font-size: 2.8rem;
  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`;

interface Props {
  statistics: SummaryStatisticType[];
}

const SummaryStatistics = ({ statistics }: Props) => {
  return (
    <StyledSummaryStatistics>
      {statistics.map((statistic: SummaryStatisticType) => (
        <Container key={statistic.label}>
          <Label>{statistic.label}</Label>
          <Number>{statistic.value}</Number>
        </Container>
      ))}
    </StyledSummaryStatistics>
  );
};

export default SummaryStatistics;
