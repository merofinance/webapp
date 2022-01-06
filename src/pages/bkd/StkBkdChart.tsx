import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import dateFormat from "dateformat";
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
import { Chart } from "react-chartjs-2";
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

  const startDate = new Date();
  startDate.setDate(new Date().getDate() - 100);

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
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
    },
  };

  const data = {
    labels: Array.from(Array(365).keys()).map((key: number) => {
      const today = new Date();
      today.setDate(today.getDate() - 100 + key);
      return dateFormat(today, "yyyy-MM-dd");
    }),
    datasets: [
      {
        label: "stkBKD balance",
        data: Array.from(Array(365).keys()).map((key: number) => {
          const max = 1000;
          return ((max * 0.8) / 365) * key + max * 0.2;
        }),
        backgroundColor: gradient,
        radius: 3,
        borderColor: "transparent",
        borderWidth: 20,
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
