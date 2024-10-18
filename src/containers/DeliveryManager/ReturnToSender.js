import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";
import checkIcon from "../../assets/check-circle-fill.svg";
import CustomizedSnackbars from "../../components/Custom/CustomizedSnackbars";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function ReturnToSender() {
  const [rows, setRows] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);

  const handleOneReturnToSender = async (row) => {
    console.log("Mail ID: ", row.undeliverableId);
    try {
      const response = await axios.post(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/return-to-sender/add/${row.undeliverableId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchData();
        sendNotification(
          `Mail is returned to sender due to ${row.reason}.`,
          row.customer_id,
          row.mailId
        );
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
    { field: "type", headerName: "Mail Type", width: 130 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 200,
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
              handleOneReturnToSender(params.row);
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
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/return-to-sender",
        { withCredentials: true }
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchData();
    const stompClient = new Client({
      brokerURL: "ws://localhost:8081/ws",
      connectHeaders: {},
      webSocketFactory: () =>
        new SockJS(
          "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/ws"
        ),
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/topic/notifications`, (message) => {
          console.log("Received message:", message);
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
        });
      },
    });
    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, []);

  const sendNotification = (message, customerId, mailId) => {
    if (client) {
      const notification = {
        customerId: customerId,
        message: message,
        type: "Return-to-sender",
        mailId: mailId,
      };
      client.publish({
        destination: "/app/notify",
        body: JSON.stringify(notification),
      });
    }
  };

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
