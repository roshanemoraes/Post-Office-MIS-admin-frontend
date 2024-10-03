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
      "Negombo",
      "Katunayaka",
      "Seeduwa",
      "JaEla",
    ],
    datasets: [
      {
        label: "Delivered Count",
        data: [12, 19, 3, 5, 2, 3, 5, 3, 8, 1],
        backgroundColor: "#61DBFB",
      },
      {
        label: "On-Route Count",
        data: [30, 40, 15, 10, 10, 20, 12, 16, 10, 20],
        backgroundColor: "darkblue",
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Delivered Mails vs Undelivered Mails",
        font: {
          weight: "100",
          size: 14,
        },
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
          // height: "500px",
          width: "100%",
          // paddingTop: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Bar
          data={data}
          options={options}
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            //   overflow: "hiddden",
          }}
        />
      </div>
    </>
  );
};

export default StackedBarChart;
