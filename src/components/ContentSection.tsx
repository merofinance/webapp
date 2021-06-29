import React from "react";
import styled from "styled-components";
import Statistic, { StatisticType } from "./Statistic";

const StyledContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  background-color: rgba(21, 14, 59, 0.5);
`;

const Header = styled.h2`
  padding: 2rem 1.6rem;
  background-color: rgba(252, 40, 211, 0.05);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  font-weight: 700;
  font-size: 2.4rem;
  letter-spacing: 0.25px;
  border-top-right-radius: 1.4rem;
  border-top-left-radius: 1.4rem;
`;

type LineProps = {
  large?: boolean;
};

const Line = styled.div`
  width: 100%;
  height: ${(props: LineProps) => (props.large ? "5px" : "2px")};
  background: linear-gradient(to right, rgba(197, 50, 249, 1), rgba(50, 178, 229, 1));
  opacity: 0.2;
`;

const Statistics = styled.div`
  width: 100%;
  display: flex;
  padding: 2.2rem 1.6rem;
  padding-bottom: 2.6rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 1.6rem;
`;

type Props = {
  header: string;
  statistics: StatisticType[];
  content: JSX.Element;
};

const ContentSection = (props: Props) => {
  return (
    <StyledContentSection>
      <Header>{props.header}</Header>
      <Line large />
      <Statistics>
        {props.statistics.map((statistic: StatisticType) => (
          <Statistic statistic={statistic} />
        ))}
      </Statistics>
      <Line />
      <Content>{props.content}</Content>
    </StyledContentSection>
  );
};

export default ContentSection;
