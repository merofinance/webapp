import React, { useState } from "react";
import styled from "styled-components";
import AccordionChevron from "./AccordionChevron";
import Tooltip from "./Tooltip";

interface OverviewRow {
  label: string;
  tooltip: string;
  value: string;
}

interface OverviewProps {
  open: boolean;
}

const StyledOverview = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(37, 33, 64, 0.4);
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);

  margin-left: 1.6rem;
  width: 40rem;
  padding: 2rem 1.8rem;
  @media (max-width: 993px) {
    margin-left: 0;
    width: 100%;
    margin-bottom: 2.4rem;
    padding: 1.6rem;
    transition: max-height 0.3s ease-out;
    max-height: ${(props: OverviewProps) => (props.open ? "15rem" : "4.8rem")};
    overflow: hidden;
  }
`;

const Header = styled.button`
  font-weight: 700;
  letter-spacing: 0.25px;
  text-align: left;

  font-size: 2.4rem;
  margin-bottom: 0.6rem;
  @media (max-width: 993px) {
    position: absolute;
    top: 0;
    left: 0;
    margin-bottom: 0;
    height: 4.8rem;
    width: 100%;
    font-size: 1.8rem;
    cursor: pointer;
    background: none;
    padding-left: 1.6rem;
    line-height: 42px;
  }
`;

const ChevronContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 994px) {
    display: none;
  }
`;

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 993px) {
    margin-top: 3.2rem;
  }
`;

const StatisticContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-top: 1.4rem;
  @media (max-width: 993px) {
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
  @media (max-width: 993px) {
    font-size: 1.4rem;
  }
`;

const Value = styled.div`
  font-weight: 500;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
  color: var(--sub);

  font-size: 2rem;
  @media (max-width: 993px) {
    font-size: 1.4rem;
  }
`;

type Props = {
  header: string;
  rows: OverviewRow[];
};

const Overview = ({ header, rows }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <StyledOverview open={open}>
        <ChevronContainer>
          <AccordionChevron open={open} />
        </ChevronContainer>
        <Header onClick={() => setOpen(!open)}>{header}</Header>
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
      </StyledOverview>
    </div>
  );
};

export default Overview;
