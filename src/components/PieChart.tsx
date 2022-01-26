import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

const StyledPieChart = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 21.7rem;
  background-color: rgba(13, 8, 42, 1);
  border-radius: 14px;
  padding-left: 1rem;
  width: 4rem;
  margin: auto;
`;

interface Props {
  chartData: number[];
  chartLabels: string[];
}

const PieChart = ({ chartData, chartLabels }: Props): JSX.Element => {
  const chart = useRef<ChartJS>(null);
  const [gradient, setGradient] = useState<CanvasGradient>();
  const [gradientDark, setGradientDark] = useState<CanvasGradient>();

  const loadColors = () => {
    if (!chart.current) {
      setTimeout(() => loadColors(), 50);
      return;
    }
    const { width } = chart.current.canvas.getBoundingClientRect();

    const gradient_ = chart.current.ctx.createLinearGradient(0, 0, width, 0);
    gradient_.addColorStop(0, "#C532F9");
    gradient_.addColorStop(1, "#32B2E5");
    setGradient(gradient_);

    const gradientDark_ = chart.current.ctx.createLinearGradient(0, 0, width, 0);
    gradientDark_.addColorStop(0, "rgba(197, 50, 249, 0.3)");
    gradientDark_.addColorStop(1, "rgba(50, 178, 229, 0.3)");
    setGradientDark(gradientDark_);
  };

  useLayoutEffect(() => {
    loadColors();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Dataset 1",
        data: chartData,
        backgroundColor: [gradient, gradientDark],
        borderWidth: 0,
      },
    ],
  };

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 100 + 365);

  return (
    <StyledPieChart>
      <Chart ref={chart} type="pie" data={data} options={options} />
    </StyledPieChart>
  );
};

export default PieChart;
