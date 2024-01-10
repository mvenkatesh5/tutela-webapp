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

export const options = {
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

const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 3, 4, 5, 6, 8, 10, 2,5, 7],
      borderColor: "rgba(13, 110, 253,1)",
      backgroundColor: "rgba(13, 110, 253,1)",
    },
    {
      label: "Dataset 2",
      data: [0, 2, 3, 4, 5, 6, 8,9,6,5],
      borderColor: "rgba(25, 135, 84)",
      backgroundColor: "rgba(25, 135, 84, 1)",
    },
  ],
};

const CompleteGraph = () => {
  return <Line options={options} data={data} />;
};

export default CompleteGraph;
