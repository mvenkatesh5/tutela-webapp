import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompleteGraph = ({ classesPerWeek }: any) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: "top" as const,
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = [...Array(classesPerWeek.length + 2)].map((u: any, i: number) => i);

  const data = {
    labels,
    datasets: [
      {
        label: "Planned Progress",
        data: [0, ...classesPerWeek],
        borderColor: "rgba(25, 135, 84)",
        backgroundColor: "rgba(25, 135, 84, 1)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default CompleteGraph;
