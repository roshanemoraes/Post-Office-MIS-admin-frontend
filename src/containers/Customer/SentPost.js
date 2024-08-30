import React from "react";
import { Box } from "@mui/material";
import CompleteTable from "../../components/Customer/CompleteTable";
import DownArrowIcon from "../../assets/Customer/arrow-down-square-fill.svg";

const SentPost = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          // fontWeight: "bold",
          marginBottom: "10px",
          marginTop: "10px",
          backgroundColor: "#a3a3a3",
        }}
      >
        Delivered Mails
        <img
          src={DownArrowIcon}
          alt="Pending Mails"
          style={{
            marginRight: "10px",
            marginLeft: "20px",
            width: "30px",
            height: "30px",
          }}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <CompleteTable />
      </Box>
      <div style={{ minHeight: "80px" }}></div>
    </div>
  );
};

export default SentPost;
