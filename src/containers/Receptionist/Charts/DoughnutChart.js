import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Button, ButtonGroup } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  const data = {
    labels: [
      "Personal Mail",
      "Registered Mail",
      "COD Parcel",
      "Personal Parcel",
      "Government Parcel",
      "Money Order",
    ],
    datasets: [
      {
        label: "# of Mails",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
        display: true,
        text: "Mail Distribution by Type",
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default DoughnutChart;
