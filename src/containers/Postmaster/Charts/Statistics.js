import React from "react";
import BarChart from "./BarChart";
import { Box } from "@mui/material";
import { Button, ButtonGroup } from "react-bootstrap";

const Statistics = () => {
  return (
    <>
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
            width: "65%",
            minWidth: "550px",
            height: "460px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            padding: "30px 2px 30px 2px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BarChart />
        </Box>
      </Box>
    </>
  );
};

export default Statistics;
