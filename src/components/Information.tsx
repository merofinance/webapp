import React from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import Tooltip from "./Tooltip";

interface OverviewRow {
  label: string;
  tooltip: string;
  value: string;
}

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StatisticContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-top: 1.4rem;
  @media (max-width: 1439px) {
    margin-top: 0.2rem;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-weight: 500;
  line-height: 2.8rem;
  letter-spacing: 0.15px;

  font-size: 2rem;
  @media (max-width: 1439px) {
    font-size: 1.4rem;
  }
`;

const Value = styled.div`
  font-weight: 500;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
  color: var(--sub);

  font-size: 2rem;
  @media (max-width: 1439px) {
    font-size: 1.4rem;
  }
`;

type Props = {
  header: string;
  rows: OverviewRow[];
};

const Information = ({ header, rows }: Props): JSX.Element => {
  return (
    <InfoCard
      header={header}
      content={
        <Statistics>
          {rows.map((row: OverviewRow) => (
            <StatisticContainer key={row.label}>
              <LabelContainer>
                <Label>{row.label}</Label>
                <Tooltip content={row.tooltip} />
              </LabelContainer>
              <Value>{row.value}</Value>
            </StatisticContainer>
          ))}
        </Statistics>
      }
    />
  );
};

export default Information;
