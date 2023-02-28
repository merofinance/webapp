import styled from "styled-components";
import InfoCard from "./InfoCard";
import LineChart from "./LineChart";

const StyledInfoChart = styled.div`
  display: flex;
  margin-top: 1rem;
`;

interface Props {
  header: string;
  data: number[];
  labels: string[];
}

const InfoChart = ({ header, data, labels }: Props) => {
  return (
    <InfoCard header={header}>
      <StyledInfoChart>
        <LineChart chartData={data} chartLabels={labels} unit="%" />
      </StyledInfoChart>
    </InfoCard>
  );
};

export default InfoChart;
