import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GradientText } from "../../styles/GradientText";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const StyledStkBkdChart = styled.div`
  width: 100%;
  padding: 3.2rem;
  border-radius: 14px;
  background: rgba(21, 14, 59, 0.5);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  margin-bottom: 3.1rem;
`;

const Header = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: 0.25px;
`;

const GradientHeader = styled(GradientText)`
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: 0.25px;
`;

const StkBkdChart = (): JSX.Element => {
  return (
    <StyledStkBkdChart>
      <Header>
        stkBKD balance: <GradientHeader>430</GradientHeader>
      </Header>
      <Line data={data} options={options} />
    </StyledStkBkdChart>
  );
};

export default StkBkdChart;
