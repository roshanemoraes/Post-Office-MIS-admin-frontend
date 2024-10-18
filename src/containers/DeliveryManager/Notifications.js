import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import { Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import ReturnToSenderNotification from "../../components/Notification/ReturnToSenderNotification";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import UpdateIcon from "../../assets/pencil-fill.svg";
import AddressUpdateNotificationModal from "./Modals/AddressUpdateNotificationModal";
import { Button as MuiButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [rows, setRows] = React.useState([]);
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);
  const [IsClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "message", headerName: "Message", width: 500 },
    { field: "notificationId", headerName: "ID", width: 100 },
    { field: "type", headerName: "Type", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 240,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.type === "Delivery") {
          return (
            <div>
              {/* <AddressUpdateNotificationModal data={params.row} /> */}
              <MuiButton
                // disabled={row.status === "Assigned" ? true : false}
                variant="contained"
                sx={{
                  // width: "40px",
                  my: "0px",
                  mb: "0px",
                  mr: "0px",
                  backgroundColor: "#000000",
                  color: "white",
                  // px: 5,
                  fontSize: "11px",
                  borderRadius: "8px",
                }}
                onClick={handleUndeliveredMails}
              >
                Process Undelivered Mails
              </MuiButton>
            </div>
          );
        } else if (params.row.type === "Return-to-sender") {
          return <div>-</div>;
        } else {
          return null;
        }
      },
    },
  ];

  const fetchData = async () => {
    setIsClicked(true);
    const managerId = "1";
    try {
      const response = await axios.get(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/notifications/delivery-manager/today/${managerId}`,
        { withCredentials: true }
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  const handleUndeliveredMails = () => {
    navigate("/admin/delivery-manager/return-mail");
  };

  const fetchUnreadData = async () => {
    setIsClicked(false);
    try {
      const response = await axios.get(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/notifications/unread/2",
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
          fetchData();
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

  return (
    <>
      <ReturnToSenderNotification />
      {/* <AddressUpdateNotificationModal /> */}
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
              onClick={() => {
                fetchData();
              }}
              style={{
                backgroundColor: IsClicked ? "#852318" : "#f0f0f0",
                borderColor: IsClicked ? "#d1d1d1" : "black",
                color: IsClicked ? "white" : "#333",
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
              onClick={() => fetchUnreadData()}
              style={{
                backgroundColor: IsClicked ? "#f0f0f0" : "#852318",
                borderColor: IsClicked ? "black" : "#d1d1d1",
                color: IsClicked ? "#333" : "white",
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
              // "& .MuiDataGrid-cell[data-field='mailId']": {
              //   display: "none",
              // },
              // "& .MuiDataGrid-columnHeader[data-field='mailId']": {
              //   display: "none",
              // },
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

export default Notifications;
