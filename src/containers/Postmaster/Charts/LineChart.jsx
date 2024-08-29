import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income 2023",
        data: [30, 20, 50, 40, 60, 70, 90, 100, 80, 60, 50, 40],
        borderColor: "#61DBFB",
        backgroundColor: "rgba(97, 219, 251, 0.2)",
        fill: true,
      },
      {
        label: "Income 2022",
        data: [20, 30, 40, 50, 30, 40, 60, 70, 50, 40, 30, 20],
        borderColor: "darkblue",
        backgroundColor: "rgba(0, 0, 139, 0.2)",
        fill: true,
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
        text: "Monthly Postage Income",
        font: {
          weight: "100",
          size: 14,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Line
        data={data}
        options={options}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default LineChart;
