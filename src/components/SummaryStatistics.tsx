import styled from "styled-components";
import { GradientText } from "../styles/GradientText";
import BasicCard, { BasicCardType } from "./BasicCard";

const MobileContainer = styled.div`
  width: 100%;
  display: none;
  flex-direction: column;
  margin-bottom: 2.4rem;
  background: #16122e;
  border-radius: 1.4rem;
  padding: 1rem 1.6rem;

  @media (max-width: 600px) {
    display: flex;
  }
`;

const MobileRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0;
`;

const Label = styled.div`
  font-size: 1.2rem;
  letter-spacing: 0.12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
`;

const ClaimButton = styled.button`
  margin-left: 0.6rem;
`;

const ClaimText = styled(GradientText)`
  font-size: 1.2rem;
  letter-spacing: 0.12px;
  font-weight: 700;
`;

const Value = styled.div`
  font-size: 1.7rem;
  letter-spacing: 0.19px;
  font-weight: 700;
`;

interface RowProps {
  items: number;
}

const RowContainer = styled.div`
  display: flex;
  margin: 0 8rem;
  justify-content: center;
  margin-bottom: 7.4rem;
  grid-template-columns: repeat(${(props: RowProps) => props.items}, 1fr);
  grid-gap: 0.9rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

interface Props {
  statistics: BasicCardType[];
}

const SummaryStatistics = ({ statistics }: Props): JSX.Element => {
  return (
    <>
      <MobileContainer>
        {statistics.map((statistic: BasicCardType) => (
          <MobileRow key={statistic.label}>
            <Label>
              {statistic.label}
              {statistic.buttonAction && statistic.buttonText && (
                <ClaimButton
                  onClick={() => {
                    if (statistic.buttonAction) statistic.buttonAction();
                  }}
                >
                  <ClaimText>{statistic.buttonText}</ClaimText>
                </ClaimButton>
              )}
            </Label>
            <Value>{statistic.value}</Value>
          </MobileRow>
        ))}
      </MobileContainer>
      <RowContainer items={statistics.length}>
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
      </RowContainer>
    </>
  );
};

export default SummaryStatistics;
