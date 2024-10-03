import { Box, Divider } from "@mui/material";
import React from "react";
import Barcode from "react-barcode";

const MoneyOrderReceipt = ({
  formState: {
    recipientName,
    recipientNIC,
    senderName,
    senderNIC,
    transferAmount,
    charge,
  },
  receiptId,
}) => {
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
          minHeight: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "0 0 5px 0",
          // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
          <p style={paragraph}>Issued By: {localStorage.getItem("userName")}</p>
          <p style={paragraph}>Receipt No: {receiptId}</p>

          <div style={{ marginBottom: "3px", marginTop: "3px" }}>
            <Divider
              variant="middle"
              sx={{
                borderBottomWidth: "3px",
                borderColor: "black",
              }}
            />
          </div>

          <p style={{ marginBottom: "0px", marginLeft: "35px" }}>
            ===Money Order Receipt===
          </p>
          <p style={{ marginBottom: "0px" }}>
            Recipient: {recipientName ? recipientName : "N/A"}
          </p>
          <p style={{ marginBottom: "10px" }}>
            NIC: {recipientNIC ? recipientNIC : "N/A"}
          </p>
          <p style={{ marginBottom: "0px" }}>
            Sender: {senderName ? senderName : "N/A"}
          </p>
          <p style={{ marginBottom: "10px" }}>
            NIC: {senderNIC ? senderNIC : "N/A"}
          </p>

          <p style={{ marginBottom: "0px" }}>
            Transfer: {transferAmount ? `Rs. ${transferAmount}` : "N/A"}
          </p>
          <p>Charge: {charge ? `Rs. ${charge}` : "N/A"}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Barcode
              value={`${receiptId},${senderNIC},${recipientNIC}`}
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

export default MoneyOrderReceipt;
