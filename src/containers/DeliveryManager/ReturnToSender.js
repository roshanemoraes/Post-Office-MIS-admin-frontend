import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";
import checkIcon from "../../assets/check-circle-fill.svg";
import CustomizedSnackbars from "../../components/Custom/CustomizedSnackbars";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";

export default function ReturnToSender() {
  const [rows, setRows] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleOneReturnToSender = async (undeliverableId) => {
    console.log("Mail ID: ", undeliverableId);
    try {
      const response = await axios.post(
        `http://localhost:8081/api/delivery-manager/return-mail/return-to-sender/add/${undeliverableId}`
      );
      if (response.status === 200) {
        fetchData();
        setSnackbarMessage("Started Return-to-Sender Process.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error adding to return-to-sender list", error);
      setSnackbarMessage("Failed to start Return-to-Sender Process.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: "undeliverableId", headerName: "Return ID", width: 90 },
    { field: "mailId", headerName: "Mail ID", width: 75 },
    { field: "customer_id", headerName: "Cus ID", width: 75 },
    { field: "type", headerName: "Mail Type", width: 170 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 250,
    },
    { field: "status", headerName: "Status", width: 220 },
    { field: "deliverDate", headerName: "Return Date", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <InfoReturnMailModal data={params.row} />
          <Button
            title="Return To Sender"
            style={{
              border: "none",
              background: "#fcd34d",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() => {
              handleOneReturnToSender(params.row.undeliverableId);
            }}
          >
            <img src={checkIcon} alt="updateIcon" />
          </Button>
          {/* <Button
            title="Add to Return-to-Sender List"
            style={{ border: "none", background: "#67e8f9", minWidth: "35px" }}
          >
            <img src={ReturnToSenderIcon} alt="returnToSenderIcon" />
          </Button> */}
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/return-mail/return-to-sender"
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
        All Return-To-Sender Mails
        <img
          src={DownArrowIcon}
          alt="All In-Area Mails"
          style={{
            marginRight: "10px",
            marginLeft: "20px",
            width: "30px",
            height: "30px",
          }}
        />
      </div>
      <div
        style={{
          height: 550,
          paddingTop: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={50}
          getRowId={(row) => row.mailId}
          sx={{
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
        <CustomizedSnackbars
          open={snackbarOpen}
          autoHideDuration={3000}
          severity={snackbarSeverity}
          message={snackbarMessage}
          onClose={() => setSnackbarOpen(false)}
        />
      </div>
    </>
  );
}
