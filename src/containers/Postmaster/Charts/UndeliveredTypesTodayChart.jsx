import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UndeliveredTypesTodayChart = () => {
  const data = {
    labels: [
      "Pallansena South",
      "Pallansena North",
      "Dalupotha",
      "Welihena",
      "Katana",
      "Kurana",
      "Duwana",
      "Katunayaka",
      "Seeduwa",
      "JaEla",
    ],
    datasets: [
      {
        type: "bar",
        label: "Delivered Mail",
        data: [30, 40, 45, 50, 60, 55, 70, 80, 75, 65],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Undelivered Mail",
        data: [5, 10, 8, 15, 12, 7, 10, 5, 8, 12],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Total Mail",
        data: [35, 50, 53, 65, 72, 62, 80, 85, 83, 77],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Monthly Delivered vs Undelivered Mail",
        font: {
          size: 14,
          weight: "100",
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          padding: 10,
        },
      },
      y: {
        stacked: true,
        ticks: {
          padding: 10,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UndeliveredTypesTodayChart;
