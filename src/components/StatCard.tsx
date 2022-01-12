import styled from "styled-components";

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
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  font-weight: 700;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const Value = styled.div`
  font-size: 2.8rem;
  letter-spacing: 0.25px;
  font-weight: 700;
`;

const SubHeader = styled.div`
  font-size: 1.2rem;
  letter-spacing: 0.11px;
  font-weight: 400;
  margin-top: 1rem;
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
