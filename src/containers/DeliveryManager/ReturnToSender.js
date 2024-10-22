import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";
import checkIcon from "../../assets/check-circle-fill.svg";
import CustomizedSnackbars from "../../components/Custom/CustomizedSnackbars";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client"; // SockJS library for WebSocket fallback

export default function ReturnToSender() {
  // State to hold rows of undelivered mails
  const [rows, setRows] = React.useState([]);
  // Snackbar-related states for showing feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [notifications, setNotifications] = useState([]); // State to store WebSocket notifications
  const [client, setClient] = useState(null); // State to manage the WebSocket client
  // Function to handle the return-to-sender process for a single mail
  const handleOneReturnToSender = async (row) => {
    console.log("Mail ID: ", row.undeliverableId); // Log the mail ID

    try {
      // API call to add mail to the return-to-sender list
      const response = await axios.post(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/return-to-sender/add/${row.undeliverableId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchData(); // Refresh the data after successful return-to-sender
        sendNotification(
          `Mail is returned to sender due to ${row.reason}.`, // Notification message content
          row.customer_id,
          row.mailId
        );
        setSnackbarMessage("Started Return-to-Sender Process."); // Success message
        setSnackbarSeverity("success"); // Set snackbar severity to success
        setSnackbarOpen(true); // Open the snackbar to show the message
      }
    } catch (error) {
      console.error("Error adding to return-to-sender list", error); // Log any error
      setSnackbarMessage("Failed to start Return-to-Sender Process."); // Error message
      setSnackbarSeverity("error"); // Set snackbar severity to error
      setSnackbarOpen(true); // Open the snackbar to show the error message
    }
  };
  // Column definitions for the DataGrid
  const columns = [
    { field: "undeliverableId", headerName: "Return ID", width: 90 }, // Column for Return ID
    { field: "mailId", headerName: "Mail ID", width: 75 }, // Column for Mail ID
    { field: "customer_id", headerName: "Cus ID", width: 75 }, // Column for Customer ID
    { field: "type", headerName: "Mail Type", width: 130 }, // Column for Mail Type
    {
      field: "reason",
      headerName: "Return Reason",
      width: 200,
    }, // Column for the reason the mail was returned
    { field: "status", headerName: "Status", width: 220 }, // Column for mail status
    { field: "deliverDate", headerName: "Return Date", width: 180 }, // Column for the return date
    {
      // Column for action buttons (return-to-sender)
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          {/* Modal component to show detailed info about the return-to-sender mail */}
          <InfoReturnMailModal data={params.row} />
          {/* Button to trigger the return-to-sender action */}
          <Button
            title="Return To Sender"
            style={{
              border: "none",
              background: "#fcd34d",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() => {
              handleOneReturnToSender(params.row); // Trigger the return process
            }}
          >
            <img src={checkIcon} alt="updateIcon" />{" "}
            {/* Icon for return-to-sender */}
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
  // Function to fetch the undelivered mail data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/return-to-sender",
        { withCredentials: true }
      );
      setRows(response.data); // Set the rows state with the fetched data
      console.log(response.data); // Log the data
    } catch (error) {
      console.error("Error fetching users", error); // Log any error during data fetching
    }
  };
  // Effect to set up WebSocket connection and data fetching
  useEffect(() => {
    fetchData();
    // Create STOMP client for WebSocket connection
    const stompClient = new Client({
      brokerURL:
        "wss://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/ws",
      connectHeaders: {},
      webSocketFactory: () =>
        new SockJS(
          "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/ws"
        ), // Use SockJS as a WebSocket fallback
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/topic/notifications`, (message) => {
          console.log("Received message:", message);
          const notification = JSON.parse(message.body); // Parse incoming WebSocket message
          setNotifications((prev) => [notification, ...prev]); // Update notification list
        });
      },
    });
    stompClient.activate(); // Activate WebSocket connection
    setClient(stompClient); // Set the client state
    // Clean up the WebSocket connection on component unmount
    return () => stompClient.deactivate();
  }, []);
  // Function to send notifications via WebSocket
  const sendNotification = (message, customerId, mailId) => {
    if (client) {
      const notification = {
        customerId: customerId,
        message: message,
        type: "Return-to-sender",
        mailId: mailId,
      };
      client.publish({
        destination: "/app/notify", // WebSocket destination to publish the notification
        body: JSON.stringify(notification), // Convert the notification to JSON
      });
    }
  };
  {
    /* Header for the Return-to-Sender mail list */
  }
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
          backgroundColor: "#a3a3a3", // Gray background for the header
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

        {/* Snackbar for displaying notifications */}

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
