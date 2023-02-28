import styled from "styled-components";
import dateFormat from "dateformat";
import LineChart from "../../components/LineChart";
import { DATE_FORMAT } from "../../lib/constants";

const StyledBoostChart = styled.div`
  width: 100%;
  padding: 2.1rem 1.4rem;
  padding-bottom: 0.5rem;
  border-radius: 14px;
  background: rgba(21, 14, 59, 0.5);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  margin-bottom: 2.4rem;
`;

const EndDate = styled.div`
  width: 100%;
  text-align: right;
  letter-spacing: 0.15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  padding-right: 0.5rem;
  transform: translateY(calc(-100% + 0.7rem));

  font-size: 1.2rem;
  @media (max-width: 1220px) {
    font-size: 1.1rem;
  }
`;

const BoostChart = (): JSX.Element => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 100 + 365);

  const data = Array.from(Array(365).keys()).map((key: number) => {
    const max = 5;
    return ((max - 1) / 365) * key + 1;
  });

  const labels = Array.from(Array(365).keys()).map((key: number) => {
    const today = new Date();
    today.setDate(today.getDate() - 100 + key);
    return dateFormat(today, DATE_FORMAT);
  });

  return (
    <StyledBoostChart>
      <LineChart
        dataLabel="Boost"
        showIndicator
        chartData={data}
        chartLabels={labels}
        unit="x"
        backgroundColor="rgba(13, 8, 42, 1)"
      />
      <EndDate>{dateFormat(endDate, DATE_FORMAT)}</EndDate>
    </StyledBoostChart>
  );
};

export default BoostChart;
