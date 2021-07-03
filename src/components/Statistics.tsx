import React from "react";
import styled from "styled-components";
import Statistic, { StatisticType } from "./Statistic";

const StyledStatistics = styled.div`
  width: 100%;
  display: flex;
  padding: 2.2rem 1.6rem;
  padding-bottom: 2.6rem;
`;

type Props = {
  header: string;
  statistics: StatisticType[];
  content: JSX.Element;
};

const Statistics = (props: Props) => {
  return (
    <StyledStatistics>
      {props.statistics.map((statistic: StatisticType) => (
        <Statistic statistic={statistic} />
      ))}
    </StyledStatistics>
  );
};

export default Statistics;
