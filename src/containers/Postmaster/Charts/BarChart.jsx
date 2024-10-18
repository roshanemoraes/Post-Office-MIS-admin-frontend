import React, { useState } from "react";
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
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const getDataForMonth = (month) => {
  const datasets = {
    January: [15, 25, 8, 3, 18, 7],
    February: [18, 20, 12, 7, 16, 5],
    March: [10, 30, 15, 10, 20, 10],
    April: [12, 25, 10, 5, 22, 8],
    May: [14, 20, 7, 9, 19, 4],
    June: [10, 30, 5, 1, 20, 3],
    July: [20, 25, 10, 15, 5, 10],
    August: [12, 19, 3, 5, 2, 3],
    September: [17, 22, 9, 7, 13, 6],
    October: [19, 28, 12, 9, 21, 8],
    November: [21, 26, 10, 11, 25, 9],
    December: [18, 24, 13, 8, 23, 6],
  };

  return {
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
        data: datasets[month],
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
};

const BarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [data, setData] = useState(getDataForMonth("August"));
  const [selectedOption, setSelectedOption] = useState("August");

  const handleSelect = (eventKey) => {
    let month;

    switch (eventKey) {
      case "#/1":
        month = "January";
        break;
      case "#/2":
        month = "February";
        break;
      case "#/3":
        month = "March";
        break;
      case "#/4":
        month = "April";
        break;
      case "#/5":
        month = "May";
        break;
      case "#/6":
        month = "June";
        break;
      case "#/7":
        month = "July";
        break;
      case "#/8":
        month = "August";
        break;
      case "#/9":
        month = "September";
        break;
      case "#/10":
        month = "October";
        break;
      case "#/11":
        month = "November";
        break;
      case "#/12":
        month = "December";
        break;
      default:
        month = "August";
    }

    setSelectedOption(month);
    setData(getDataForMonth(month));
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Mails Received In ${selectedOption}`,
        font: {
          weight: "100",
          size: 14,
        },
      },
    },
  };

  return (
    <>
      <div
        style={{ display: "flex", alignSelf: "flex-start", marginLeft: "10px" }}
      >
        <DropdownButton
          id="dropdown-basic-button"
          size="sm"
          title={selectedOption}
          onSelect={handleSelect}
          variant="secondary"
        >
          <Dropdown.Item href="#/1">January</Dropdown.Item>
          <Dropdown.Item href="#/2">February</Dropdown.Item>
          <Dropdown.Item href="#/3">March</Dropdown.Item>
          <Dropdown.Item href="#/4">April</Dropdown.Item>
          <Dropdown.Item href="#/5">May</Dropdown.Item>
          <Dropdown.Item href="#/6">June</Dropdown.Item>
          <Dropdown.Item href="#/7">July</Dropdown.Item>
          <Dropdown.Item href="#/8">August</Dropdown.Item>
          <Dropdown.Item href="#/9">September</Dropdown.Item>
          <Dropdown.Item href="#/10">October</Dropdown.Item>
          <Dropdown.Item href="#/11">November</Dropdown.Item>
          <Dropdown.Item href="#/12">December</Dropdown.Item>
        </DropdownButton>
      </div>

      <Bar data={data} options={options} />
    </>
  );
};

export default BarChart;
