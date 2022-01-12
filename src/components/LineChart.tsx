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

interface ChartProps {
  mini?: boolean;
}

const StyledLineChart = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${(props: ChartProps) => (props.mini ? "3rem" : "21.7rem")};
  background-color: ${(props: ChartProps) => (props.mini ? "transparent" : "rgba(13, 8, 42, 1)")};
  border-radius: ${(props: ChartProps) => (props.mini ? "0" : "14px")};
  padding-left: ${(props: ChartProps) => (props.mini ? "0" : "1rem")};
`;

const ChartContainer = styled.div`
  width: ${(props: ChartProps) => (props.mini ? "calc(100% + 4.5rem)" : "100%")};
  height: ${(props: ChartProps) => (props.mini ? "calc(100% + 4.5rem)" : "100%")};
`;

interface IndicatorProps {
  percent: number;
  mini?: boolean;
}

const ProgressIndicator = styled.div`
  position: absolute;
  height: ${(props: IndicatorProps) => (props.mini ? "100%" : "calc(100% - 2.4rem)")};
  border-right: solid 1px white;
  left: ${(props: IndicatorProps) => `${Math.round(props.percent * 100)}%`};
  top: 0;
`;

interface Props {
  chartData: number[];
  chartLabels: string[];
  mini?: boolean;
}

const LineChart = ({ mini, chartData, chartLabels }: Props): JSX.Element => {
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
        radius: mini ? 2 : 10,
        borderWidth: 0,
        hoverBorderWidth: 0,
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
    },
    scales: {
      y: {
        display: !mini,
        beginAtZero: false,
        grid: {
          display: !mini,
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
    layout: {
      padding: -100,
    },
  };

  const data = {
    labels: chartLabels,
    color: "red",
    datasets: [
      {
        label: "stkBKD balance",
        data: chartData,
        backgroundColor: gradient,
        radius: mini ? 1 : 3,
        borderColor: "transparent",
        borderWidth: 20,
        fill: {
          target: "origin",
          above: mini ? "transparent" : fill,
        },
      },
    ],
  };

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 100 + 365);

  return (
    <StyledLineChart mini={mini}>
      <ChartContainer mini={mini}>
        <Chart ref={chart} type="line" data={data} options={options} />
      </ChartContainer>
      <ProgressIndicator mini={mini} percent={stkBkd / 1000} />
    </StyledLineChart>
  );
};

export default LineChart;
