import { Box, Divider } from "@mui/material";
import React from "react";
import reportWebVitals from "./../../reportWebVitals";

const NormalMailReceipt = () => {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const paragraph = {
    alignItems: "left",
    // marginTop: "5px",
    marginBottom: "0px",
  };

  return (
    <div>
      <p>Receipt is under construction...</p>
      <Box
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          //   borderColor: "black",
          //   borderWidth: "1px",
          //   alignItems: "center",
          //   justifyContent: "space-around",
          marginTop: "16px",
          marginLeft: "16px",
          width: "300px",
          height: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "0 0 5px 0",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        width={"300px"}
      >
        <div style={{ fontSize: "14px", marginLeft: "10px" }}>
          <div
            style={{
              fontSize: "15px",
              marginLeft: "2px",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                marginBottom: "8px",
                marginTop: "8px",
              }}
            >
              SL POST
            </p>
            <Divider
              variant="middle"
              sx={{
                borderBottomWidth: "3px",
                borderColor: "black",
              }}
            />
          </div>
          <p style={paragraph}>Negombo Post Office</p>
          <p style={paragraph}>Issued At: {dateString}</p>
          <p style={paragraph}>Issued By: (Receptionist_Name)</p>
          <div style={{ marginBottom: "3px", marginTop: "3px" }}>
            <Divider
              variant="middle"
              sx={{
                borderBottomWidth: "3px",
                borderColor: "black",
              }}
            />
          </div>

          <p style={paragraph}>Mail Type: (Registered Post)</p>
          <p style={paragraph}>Mail ID: (mail-id)</p>
        </div>
      </Box>
    </div>
  );
};

export default NormalMailReceipt;
