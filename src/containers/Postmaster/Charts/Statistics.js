import React from "react";
import BarChart from "./BarChart";
import { Box } from "@mui/material";
import StatisticCard from "./StatisticCard";
import LineChart from "./PostageYearlyChart";

const Statistics = () => {
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 sticky top-0 h-screen pt-3 px-4">
          <div className="mb-2">
            <StatisticCard
              title="Mails Received Per Month"
              backgroundColor="white"
            />
          </div>
          <div className="mb-2">
            <StatisticCard
              title="Yearly Postage Income"
              backgroundColor="white"
            />
          </div>
          <div className="mb-2">
            <StatisticCard
              title="Postage Rate Analysis"
              backgroundColor="white"
            />
          </div>
        </div>
        <div className="col-span-9 overflow-y-auto">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingTop={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                minWidth: "550px",
                height: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "30px 2px 30px 2px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <BarChart />
            </Box>
          </Box>
          <div className="mt-2"></div>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingTop={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                minWidth: "550px",
                height: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "30px 2px 30px 2px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <LineChart />
            </Box>
          </Box>
          <div className="mt-2"></div>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingTop={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                minWidth: "550px",
                height: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "30px 2px 30px 2px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
                TODAY POSTAGE INCOME
              </div>
              <LineChart />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Statistics;
