import styled from "styled-components";

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
  header: string;
  value: string;
  subHeader: string;
}

const StatCard = ({ header, value, subHeader }: Props): JSX.Element => {
  return (
    <StyledStatCard>
      <Header>{header}</Header>
      <Value>{value}</Value>
      <SubHeader>{subHeader}</SubHeader>
    </StyledStatCard>
  );
};

export default StatCard;
