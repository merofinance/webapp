import React from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

export interface OverviewRow {
  label: string;
  tooltip: string;
  value: string;
}

const StyledOverview = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.8rem;
  background-color: rgba(37, 33, 64, 0.4);
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  margin-left: 1.6rem;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 2.4rem;
  letter-spacing: 0.25px;
  margin-bottom: 0.6rem;
`;

const StatisticContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.4rem;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
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
  rows: OverviewRow[];
};

const Overview = ({ header, rows }: Props) => {
  return (
    <div>
      <StyledOverview>
        <Header>{header}</Header>
        {rows.map((row: OverviewRow) => (
          <StatisticContainer key={row.label}>
            <LabelContainer>
              <Label>{row.label}</Label>
              <Tooltip content={row.tooltip} />
            </LabelContainer>
            <Value>{row.value}</Value>
          </StatisticContainer>
        ))}
      </StyledOverview>
    </div>
  );
};

export default Overview;
