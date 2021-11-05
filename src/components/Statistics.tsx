import React from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

interface StatisticType {
  header: string;
  tooltip: string;
  value: string;
  usd?: string;
}

const StyledStatistics = styled.div`
  width: 100%;
  display: flex;
  padding: 2.2rem 1.6rem;

  padding-bottom: 2.6rem;
  @media (max-width: 600px) {
    flex-direction: column;
    padding-bottom: 1rem;
  }
`;

const Statistic = styled.div`
  width: 28rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    margin-bottom: 1.3rem;
  }
`;

const HeaderContaner = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 0.7rem;
  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;

const Header = styled.div`
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.5;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Value = styled.div`
  font-weight: 500;
  letter-spacing: 0.15px;

  font-size: 2rem;
  line-height: 2.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Usd = styled.div`
  font-weight: 400;
  letter-spacing: 0.15px;
  opacity: 0.6;
  margin-top: 0.1rem;

  font-size: 1.7rem;
  line-height: 2.2rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

interface Props {
  statistics: StatisticType[];
}

const Statistics = ({ statistics }: Props): JSX.Element => {
  return (
    <StyledStatistics>
      {statistics.map((statistic: StatisticType) => (
        <Statistic key={statistic.header}>
          <HeaderContaner>
            <Header>{statistic.header}</Header>
            <Tooltip content={statistic.tooltip} />
          </HeaderContaner>
          <ValueContainer>
            <Value>{statistic.value}</Value>
            {statistic.usd && <Usd>{statistic.usd}</Usd>}
          </ValueContainer>
        </Statistic>
      ))}
    </StyledStatistics>
  );
};

export default Statistics;
