import React from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

export interface SummaryStatisticType {
  label: string;
  tooltip: string;
  value: string;
}

const StyledPoolsOverview = styled.div`
  display: flex;
  margin: 0 8rem;
  justify-content: center;
  margin-bottom: 7.4rem;
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
  max-width: 40.7rem;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
  color: var(--sub);
  text-transform: capitalize;
`;

const Number = styled.div`
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 4.2rem;
  letter-spacing: 0.25px;
`;

interface Props {
  statistics: SummaryStatisticType[];
}

const SummaryStatistics = ({ statistics }: Props) => {
  return (
    <StyledPoolsOverview>
      {statistics.map((statistic: SummaryStatisticType) => (
        <Container key={statistic.label}>
          <LabelContainer>
            <Label>{statistic.label}</Label>
            <Tooltip content={statistic.tooltip} />
          </LabelContainer>
          <Number>{statistic.value}</Number>
        </Container>
      ))}
    </StyledPoolsOverview>
  );
};

export default SummaryStatistics;
