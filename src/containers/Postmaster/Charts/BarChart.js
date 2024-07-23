import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, ButtonGroup } from "react-bootstrap";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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
        text: "Received Mails According To Mail Type",
      },
    },
  };

  return (
    <>
      <div
        style={{ display: "flex", alignSelf: "flex-start", marginLeft: "10px" }}
      >
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">June</Button>
          <Button variant="secondary">July</Button>
          <Button variant="secondary">August</Button>
        </ButtonGroup>
      </div>

      <Bar data={data} options={options} />
    </>
  );
};

export default BarChart;
