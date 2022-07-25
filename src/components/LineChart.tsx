import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { useDevice } from "../app/hooks/use-device";

ChartJS.register(...registerables);

const StyledLineChart = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(13, 8, 42, 1);
  border-radius: 14px;
  padding-left: 1rem;

  height: 21.7rem;
  @media (max-width: 1220px) {
    height: 16rem;
  }
`;

interface IndicatorProps {
  percent: number;
}

const ProgressIndicator = styled.div`
  position: absolute;
  height: 100%;
  border-right: solid 1px white;
  left: ${(props: IndicatorProps) => `${Math.round(props.percent * 100)}%`};
  top: 0;
`;

interface Props {
  chartData: number[];
  chartLabels: string[];
}

const LineChart = ({ chartData, chartLabels }: Props): JSX.Element => {
  const { isMobile } = useDevice();
  const chart = useRef<ChartJS>(null);
  const [gradient, setGradient] = useState<CanvasGradient>();
  const [fill, setFill] = useState<CanvasGradient>();
  const stkMero = 430;

  const startDate = new Date();
  startDate.setDate(new Date().getDate() - 100);

  const loadColors = () => {
    if (!chart.current) {
      setTimeout(() => loadColors(), 50);
      return;
    }
    const { height } = chart.current.canvas.getBoundingClientRect();
    const { width } = chart.current.canvas.getBoundingClientRect();

    const gradient_ = chart.current.ctx.createLinearGradient(0, 0, width, 0);
    gradient_.addColorStop(0, "#C532F9");
    gradient_.addColorStop(1, "#32B2E5");
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
      tooltip: {
        enabled: true,
        intersect: false,
        backgroundColor: "white",
        titleColor: "black",
        titleFont: {
          size: 14,
          weight: "700",
        },
        bodyColor: "black",
        bodyFont: {
          size: 12,
          weight: "700",
        },
        bodySpacing: 4,
        padding: 8,
        cornerRadius: 3,
        displayColors: false,
        boxWidth: 1000,
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
        display: true,
        beginAtZero: false,
        grid: {
          display: true,
          color: "rgba(22, 42, 85, 1)",
        },
        ticks: {
          font: {
            size: 12,
          },

          stepSize: 1,
          callback: (value: any) => {
            return `${value}x`;
          },
        },
      },
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels: chartLabels,
    color: "red",
    datasets: [
      {
        label: "Boost",
        data: chartData,
        backgroundColor: gradient,
        radius: isMobile ? 2 : 3,
        borderColor: gradient,
        borderWidth: 0,
        tension: 0.3,
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
    <StyledLineChart>
      <Chart ref={chart} type="line" data={data} options={options} />
      <ProgressIndicator percent={stkMero / 1000} />
    </StyledLineChart>
  );
};

export default LineChart;
