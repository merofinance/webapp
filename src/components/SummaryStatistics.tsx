import styled from "styled-components";
import BasicCard, { BasicCardType } from "./BasicCard";

const StyledSummaryStatistics = styled.div`
  display: flex;
  margin: 0 8rem;
  justify-content: center;
  margin-bottom: 7.4rem;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    margin: 0;
    margin-bottom: 4rem;
  }
`;

interface Props {
  statistics: BasicCardType[];
}

const SummaryStatistics = ({ statistics }: Props): JSX.Element => {
  return (
    <StyledSummaryStatistics>
      {statistics.map((statistic: BasicCardType) => (
        <BasicCard
          key={statistic.label}
          label={statistic.label}
          value={statistic.value}
          subValue={statistic.subValue}
          buttonText={statistic.buttonText}
          buttonAction={statistic.buttonAction}
          primary={statistic.primary}
        />
      ))}
    </StyledSummaryStatistics>
  );
};

export default SummaryStatistics;
