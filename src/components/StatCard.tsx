import styled from "styled-components";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export enum StatCardType {
  HISTOGRAM = "histogram",
  PIE = "pie",
}

const StyledStatCard = styled.div`
  border-radius: 1.4rem;
  background-color: #16122e;
  padding: 2.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatContainer = styled.div`
  width: 20rem;
  margin-bottom: 1.6rem;
`;

const Header = styled.div`
  letter-spacing: 0.15px;
  font-weight: 700;
  opacity: 0.8;

  font-size: 1.4rem;
  margin-bottom: 1rem;
  @media (max-width: 1220px) {
    font-size: 1.2rem;
    margin-bottom: 0.7rem;
  }
`;

const Value = styled.div`
  letter-spacing: 0.25px;
  font-weight: 700;

  font-size: 2.8rem;
  @media (max-width: 1220px) {
    font-size: 2.2rem;
  }
`;

const SubHeader = styled.div`
  letter-spacing: 0.11px;
  font-weight: 400;

  font-size: 1.2rem;
  margin-top: 1rem;
  @media (max-width: 1220px) {
    font-size: 1.1rem;
    margin-top: 0.7rem;
  }
`;

interface Props {
  type: StatCardType;
  data: number[];
  labels: string[];
  header: string;
  value: string;
  subHeader: string;
}

const StatCard = ({ type, header, value, subHeader, data, labels }: Props): JSX.Element => {
  return (
    <StyledStatCard>
      <StatContainer>
        {type === StatCardType.HISTOGRAM ? (
          <LineChart mini chartData={data} chartLabels={labels} />
        ) : (
          <PieChart mini chartData={data} chartLabels={labels} />
        )}
      </StatContainer>
      <Header>{header}</Header>
      <Value>{value}</Value>
      <SubHeader>{subHeader}</SubHeader>
    </StyledStatCard>
  );
};

export default StatCard;
