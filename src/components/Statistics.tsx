import React from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

interface StatisticType {
  header: string;
  tooltip: string;
  value: string;
}

const StyledStatistics = styled.div`
  width: 100%;
  display: flex;
  padding: 2.2rem 1.6rem;
  padding-bottom: 2.6rem;
`;

const Statistic = styled.div`
  width: 23.6rem;
  display: flex;
  flex-direction: column;
`;

const HeaderContaner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const Header = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.5;
`;

const Value = styled.div`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
`;

type Props = {
  statistics: StatisticType[];
};

const Statistics = ({ statistics }: Props) => {
  return (
    <StyledStatistics>
      {statistics.map((statistic: StatisticType) => (
        <Statistic key={statistic.header}>
          <HeaderContaner>
            <Header>{statistic.header}</Header>
            <Tooltip content={statistic.tooltip} />
          </HeaderContaner>
          <Value>{statistic.value}</Value>
        </Statistic>
      ))}
    </StyledStatistics>
  );
};

export default Statistics;
