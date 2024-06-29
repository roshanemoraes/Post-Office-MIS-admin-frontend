import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UpdateIcon from "../../assets/update.svg";
import ReturnToSenderIcon from "../../assets/arrow-repeat.svg";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";
import CustomizedSnackbars from "../../components/Custom/CustomizedSnackbars";

export default function ReturnMailMgmt() {
  const [rows, setRows] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleReturnToSender = async (mailId) => {
    console.log("Mail ID: ", mailId);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/delivery-manager/return-mail/add/return-to-sender",
        mailId,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        fetchData();
        setSnackbarMessage("Mail successfully added to Return-to-Sender list.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error adding to return-to-sender list", error);
      setSnackbarMessage("Failed to add mail to Return-to-Sender list.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleAddressUpdate = async (mailId) => {
    console.log("Mail ID: ", mailId);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/delivery-manager/return-mail/add/address-update",
        mailId,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        fetchData();
        setSnackbarMessage("Mail successfully added to Address-Update list.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error adding to Address-Update list", error);
      setSnackbarMessage("Failed to add mail to Address-Update list.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: "mailId", headerName: "Mail ID", width: 100 },
    { field: "type", headerName: "Mail Type", width: 170 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 350,
    },
    { field: "deliverDate", headerName: "Return Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <InfoReturnMailModal />
          <Button
            title="Add to Address-Update List"
            style={{
              border: "none",
              background: "red",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() => handleAddressUpdate(params.row.mailId)}
          >
            <img src={UpdateIcon} alt="updateIcon" />
          </Button>
          <Button
            title="Add to Return-to-Sender List"
            style={{ border: "none", background: "#67e8f9", minWidth: "35px" }}
            onClick={() => handleReturnToSender(params.row.mailId)}
          >
            <img src={ReturnToSenderIcon} alt="returnToSenderIcon" />
          </Button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/return-mail/list-all"
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
  );
}
