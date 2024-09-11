import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DownArrowIcon from "../../assets/Customer/arrow-down-square-fill.svg";
import { Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
//import UpdateIcon from "../../assets/Customer/pencil-fill.svg";

const Notification = () => {
  const [rows, setRows] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "message", headerName: "Message", width: 500 },
    { field: "notificationId", headerName: "ID", width: 100 },
    { field: "type", headerName: "Type", width: 180 },
    { field: "read", headerName: "Read", width: 120 },
    { field: "mailId", headerName: "Mail Id", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      headerAlign: "center",
      // Your custom render logic if required for actions
    },
  ];

  const fetchData = async () => {
    setIsClicked(true);
    try {
      const response = await axios.get(
        "https://128ad76e-7b61-452f-979c-5e07c6fc1823.mock.pstmn.io/notifi" // Replace with your actual Postman API URL
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const fetchUnreadData = async () => {
    setIsClicked(false);
    try {
      const response = await axios
        .get
        //"https://02aa9ecd-6eb7-4330-b935-fb845b5a5218.mock.pstmn.io/" // Replace with your actual Postman API URL
        ();
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching unread notifications", error);
    }
  };

  useEffect(() => {
    fetchData();

    const stompClient = new Client({
      brokerURL: "ws://your-postman-api-url.com/ws", // Replace with your actual WebSocket URL
      connectHeaders: {},
      webSocketFactory: () => new SockJS("https://your-postman-api-url.com/ws"), // Replace with your actual SockJS URL
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/topic/notifications`, (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
          fetchData(); // Refresh data when a new notification arrives
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            marginBottom: "10px",
            marginTop: "10px",
            backgroundColor: "#a3a3a3",
          }}
        >
          Notifications
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
            display: "flex",
            alignSelf: "flex-start",
            marginLeft: "10px",
          }}
        >
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="secondary"
              onClick={fetchData}
              style={{
                backgroundColor: isClicked ? "#852318" : "#f0f0f0",
                borderColor: isClicked ? "#d1d1d1" : "black",
                color: isClicked ? "white" : "#333",
                padding: "8px 16px",
                margin: "2px",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              All
            </Button>
            <Button
              variant="secondary"
              onClick={fetchUnreadData}
              style={{
                backgroundColor: isClicked ? "#f0f0f0" : "#852318",
                borderColor: isClicked ? "black" : "#d1d1d1",
                color: isClicked ? "#333" : "white",
                padding: "8px 16px",
                margin: "2px",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Unread
            </Button>
          </ButtonGroup>
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
            getRowId={(row) => row.notificationId}
            sx={{
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell[data-field='notificationId']": {
                display: "none",
              },
              "& .MuiDataGrid-columnHeader[data-field='notificationId']": {
                display: "none",
              },
              "& .MuiDataGrid-cell[data-field='read']": {
                display: "none",
              },
              "& .MuiDataGrid-columnHeader[data-field='read']": {
                display: "none",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Notification;
