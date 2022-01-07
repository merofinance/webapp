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
  Filler,
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
  Filler
);

const StyledMultiplierChart = styled.div`
  width: 100%;
  padding: 2.1rem 1.4rem;
  padding-bottom: 0.5rem;
  border-radius: 14px;
  background: rgba(21, 14, 59, 0.5);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  margin-bottom: 3.1rem;
`;

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 21.7rem;
  background-color: rgba(13, 8, 42, 1);
  border-radius: 14px;
  padding-left: 1rem;
`;

interface IndicatorProps {
  percent: number;
}

const ProgressIndicator = styled.div`
  position: absolute;
  height: calc(100% - 2.4rem);
  border-right: solid 1px white;
  left: ${(props: IndicatorProps) => `${Math.round(props.percent * 100)}%`};
  top: 0;
`;

const EndDate = styled.div`
  width: 100%;
  text-align: right;
  font-size: 1.2rem;
  letter-spacing: 0.15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  padding-right: 1.6rem;
  transform: translateY(calc(-100% - 0.5rem));
`;

const MultiplierChart = (): JSX.Element => {
  const chart = useRef<ChartJS>(null);
  const [gradient, setGradient] = useState<CanvasGradient>();
  const [fill, setFill] = useState<CanvasGradient>();
  const stkBkd = 430;

  const startDate = new Date();
  startDate.setDate(new Date().getDate() - 100);

  const loadColors = () => {
    if (!chart.current) {
      setTimeout(() => loadColors(), 50);
      return;
    }
    const { height } = chart.current.canvas.getBoundingClientRect();
    const { width } = chart.current.canvas.getBoundingClientRect();

    const gradient_ = chart.current.ctx.createLinearGradient(0, 0, 0, height);
    gradient_.addColorStop(1, "#C532F9");
    gradient_.addColorStop(0, "#32B2E5");
    setGradient(gradient_);

    const offset = 16;
    const fill_ = chart.current.ctx.createLinearGradient(
      width / 2 - offset,
      0,
      width / 2 + offset,
      height
    );
    fill_.addColorStop(0, "rgba(50, 178, 229, 0.15)");
    fill_.addColorStop(1, "rgba(50, 178, 229, 0)");
    // fill_.addColorStop(0, "#C532F9");
    // fill_.addColorStop(0.48, "#C532F9");
    // fill_.addColorStop(0.49, "green");
    // fill_.addColorStop(0.5, "green");
    // fill_.addColorStop(0.51, "#32B2E5");
    // fill_.addColorStop(1, "#32B2E5");
    setFill(fill_);
  };

  useLayoutEffect(() => {
    loadColors();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: "rgba(22, 42, 85, 1)",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels: Array.from(Array(365).keys()).map((key: number) => {
      const today = new Date();
      today.setDate(today.getDate() - 100 + key);
      return dateFormat(today, "yyyy-m-d");
    }),
    color: "red",
    datasets: [
      {
        label: "stkBKD balance",
        data: Array.from(Array(365).keys()).map((key: number) => {
          const max = 5;
          return ((max - 1) / 365) * key + 1;
        }),
        backgroundColor: gradient,
        radius: 3,
        borderColor: "transparent",
        borderWidth: 20,
        fill: {
          target: "origin",
          above: fill,
        },
      },
    ],
  };

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 100 + 365);

  return (
    <StyledMultiplierChart>
      <ChartContainer>
        <Chart ref={chart} type="line" data={data} options={options} />
        <ProgressIndicator percent={stkBkd / 1000} />
      </ChartContainer>
      <EndDate>{dateFormat(endDate, "yyyy-m-d")}</EndDate>
    </StyledMultiplierChart>
  );
};

export default MultiplierChart;
