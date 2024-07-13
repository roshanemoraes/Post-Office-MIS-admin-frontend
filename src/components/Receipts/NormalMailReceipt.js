import { Box, Divider } from "@mui/material";
import React from "react";
import Barcode from "react-barcode";

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
          <p style={paragraph}>Receipt No: 821</p>

          <div style={{ marginBottom: "3px", marginTop: "3px" }}>
            <Divider
              variant="middle"
              sx={{
                borderBottomWidth: "3px",
                borderColor: "black",
              }}
            />
          </div>

          <p style={paragraph}>Mail ID: 341</p>
          <p style={paragraph}>Mail Type: Registered Post</p>
          <p style={{ marginBottom: "0px" }}>Recipient: A.B. Nipun Shehan</p>
          <p style={{ marginBottom: "10px" }}>Sender: C.D. Kumara Perera</p>
          <p style={{ maxWidth: "280px", wordWrap: "break-word" }}>
            To: 53, Kandy Road, Kandy
          </p>
          <p>Charge: Rs. 200</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Barcode
              value="341,821"
              width={1.8}
              height={50}
              displayValue={false}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default NormalMailReceipt;
