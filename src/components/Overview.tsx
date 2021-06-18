import React from "react";
import styled from "styled-components";
import { StatisticType } from "./Statistic";
import Tooltip from "./Tooltip";

const StyledOverview = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.8rem;
  background-color: rgba(37, 33, 64, 0.4);
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 4.2rem;
  letter-spacing: 0.25px;
`;

const StatisticContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LabelContainer = styled.div`
  display: flex;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
`;

const Value = styled.div`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
  color: var(--sub);
`;

type Props = {
  header: string;
  statistics: StatisticType[];
};

const Overview = (props: Props) => {
  return (
    <StyledOverview>
      <Header>{props.header}</Header>
      {props.statistics.map((statistic: StatisticType) => (
        <StatisticContainer>
          <LabelContainer>
            <Label>{statistic.header}</Label>
            <Tooltip content={statistic.tooltip} />
          </LabelContainer>
          <Value>{statistic.value}</Value>
        </StatisticContainer>
      ))}
    </StyledOverview>
  );
};

export default Overview;
