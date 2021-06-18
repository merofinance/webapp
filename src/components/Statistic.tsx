import React from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

export type StatisticType = {
  header: string;
  value: string;
  tooltip: string;
};

const StyledStatistic = styled.div`
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
  statistic: StatisticType;
};

const Statistic = (props: Props) => {
  return (
    <StyledStatistic>
      <HeaderContaner>
        <Header>{props.statistic.header}</Header>
        <Tooltip content={props.statistic.tooltip} />
      </HeaderContaner>
      <Value>{props.statistic.value}</Value>
    </StyledStatistic>
  );
};

export default Statistic;
