import { useLayoutEffect, useRef, useState } from "react";
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
import { Chart, Line } from "react-chartjs-2";
import { GradientText } from "../../styles/GradientText";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
  margin-bottom: 1.6rem;
`;

const GradientHeader = styled(GradientText)`
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: 0.25px;
`;

const StkBkdChart = (): JSX.Element => {
  const chart = useRef<ChartJS>(null);
  const [gradient, setGradient] = useState<CanvasGradient>();

  const loadGradient = () => {
    if (!chart.current) {
      setTimeout(() => loadGradient(), 50);
      return;
    }
    const gradient_ = chart.current.ctx.createLinearGradient(0, 0, 0, 400);
    gradient_.addColorStop(1, "#C532F9");
    gradient_.addColorStop(0, "#32B2E5");
    setGradient(gradient_);
  };

  useLayoutEffect(() => {
    loadGradient();
  }, []);

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
    elements: {
      point: {
        radius: 10,
        borderWidth: 0,
        hoverBorderWidth: 0,
      },
    },
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: gradient,
      },
    ],
  };

  return (
    <StyledStkBkdChart>
      <Header>
        stkBKD balance: <GradientHeader>430</GradientHeader>
      </Header>
      <Chart ref={chart} type="line" data={data} options={options} />
    </StyledStkBkdChart>
  );
};

export default StkBkdChart;
