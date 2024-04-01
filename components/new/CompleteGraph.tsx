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
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Weeks Elapsed',
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: 'Percentage of Classes Covered',
      },
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value: any) {
          return value + "%";
        }
      }
    },
  },
};

const weeksElapsed = Array.from({ length: 10 }, (_, i) => i + 1); // Total weeks elapsed

// Dummy data for percentage of classes covered for Dataset 1 and Dataset 2
const percentageData1 = [10, 30, 40, 50, 60, 80, 100, 20, 50, 70];
const percentageData2 = [20, 40, 60, 80, 100, 60, 80, 90, 60, 50];

// const classesPerWeek = 5; // Assumed classes per week
// Calculate the total classes needed for each dataset
// const totalClassesNeeded1 = percentageData1.map(percentage => Math.ceil(percentage / 100 * classesPerWeek));
// const totalClassesNeeded2 = percentageData2.map(percentage => Math.ceil(percentage / 100 * classesPerWeek));

// Calculate the average classes needed per week
// const averageClassesNeededPerWeek1 = totalClassesNeeded1.reduce((acc, val) => acc + val, 0) / weeksElapsed.length;
// const averageClassesNeededPerWeek2 = totalClassesNeeded2.reduce((acc, val) => acc + val, 0) / weeksElapsed.length;

// // Calculate the total classes happening per week
// const totalClassesHappeningPerWeek1 = percentageData1.reduce((acc, percentage) => acc + percentage / 100 * classesPerWeek, 0);
// const totalClassesHappeningPerWeek2 = percentageData2.reduce((acc, percentage) => acc + percentage / 100 * classesPerWeek, 0);

// // Calculate the course days left
// const courseDaysLeft1 = (1 - percentageData1[weeksElapsed.length - 1] / 100) * classesPerWeek * (10 - weeksElapsed.length);
// const courseDaysLeft2 = (1 - percentageData2[weeksElapsed.length - 1] / 100) * classesPerWeek * (10 - weeksElapsed.length);


const data = {
  labels: weeksElapsed,
  datasets: [
    {
      label: "Mathematics",
      data: percentageData1,
      borderColor: "rgba(13, 110, 253,1)",
      backgroundColor: "rgba(13, 110, 253,1)",
    },
    {
      label: "English",
      data: percentageData2,
      borderColor: "rgba(25, 135, 84)",
      backgroundColor: "rgba(25, 135, 84, 1)",
    },
  ],
};


const CompleteGraph = () => {
  return <Line options={options} data={data} />;
};

export default CompleteGraph;
