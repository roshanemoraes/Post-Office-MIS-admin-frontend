import React, { useRef } from "react";
import BarChart from "./BarChart";
import { Box, Button } from "@mui/material";
import StatisticCard from "./StatisticCard";
import LineChart from "./PostageYearlyChart";
import DeliveredUndeliveredMonthlyChart from "./DeliveredUndeliveredMonthlyChart";
import UndeliveredTypesChart from "./UndeliveredTypesChart";
import { useReactToPrint } from "react-to-print";

const Statistics = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 sticky top-0 h-screen pt-3 px-4">
          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{
              // my: "10px",
              mb: "10px",
              backgroundColor: "#852318",
              color: "white",
              px: 5,
              fontSize: "14px",
              borderRadius: "6px",
            }}
            type="submit"
          >
            Print
          </Button>
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
              title="Monthly Delivered & Undelivered"
              backgroundColor="white"
            />
          </div>
          <div className="mb-2">
            <StatisticCard
              title="Undelivered Mail Types"
              backgroundColor="white"
            />
          </div>
        </div>
        <div ref={componentRef} className="col-span-9 overflow-y-auto">
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
              <DeliveredUndeliveredMonthlyChart />
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
              <UndeliveredTypesChart />
            </Box>
          </Box>
          <div className="min-h-[100px]"></div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
