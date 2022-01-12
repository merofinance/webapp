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
  Filler,
  ArcElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface ChartProps {
  mini?: boolean;
}

const StyledPieChart = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${(props: ChartProps) => (props.mini ? "3rem" : "21.7rem")};
  background-color: ${(props: ChartProps) => (props.mini ? "transparent" : "rgba(13, 8, 42, 1)")};
  border-radius: ${(props: ChartProps) => (props.mini ? "0" : "14px")};
  padding-left: ${(props: ChartProps) => (props.mini ? "0" : "1rem")};
  width: 4rem;
  margin: auto;
`;

interface Props {
  chartData: number[];
  chartLabels: string[];
  mini?: boolean;
}

const PieChart = ({ mini, chartData, chartLabels }: Props): JSX.Element => {
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
        enabled: !mini,
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
    <StyledPieChart mini={mini}>
      <Chart ref={chart} type="pie" data={data} options={options} />
    </StyledPieChart>
  );
};

export default PieChart;
