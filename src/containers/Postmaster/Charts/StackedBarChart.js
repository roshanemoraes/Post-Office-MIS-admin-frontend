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
  scales,
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

const StackedBarChart = () => {
  const data = {
    labels: [
      "Pallansena South",
      "Pallansena North",
      "Dalupotha",
      "Welihena",
      "Kurana",
      "Duwana",
    ],
    datasets: [
      {
        label: "Delivered Count",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#61DBFB",
      },
      {
        label: "Undelivered Count",
        data: [30, 40, 15, 10, 10, 20],
        backgroundColor: "darkblue",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Delivered Mails vs Undelivered Mails",
      },
    },
  };

  return (
    <>
      {/* <div
        style={{ display: "flex", alignSelf: "flex-start", marginLeft: "10px" }}
      >
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">June</Button>
          <Button variant="secondary">July</Button>
          <Button variant="secondary">August</Button>
        </ButtonGroup>
      </div> */}
      <div
        style={{
          //   height: 285,
          width: "100%",
          // paddingTop: "25px",
          display: "flex",
          //   flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      ></div>

      <Bar
        data={data}
        options={options}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          //   overflow: "hiddden",
        }}
      />
    </>
  );
};

export default StackedBarChart;
