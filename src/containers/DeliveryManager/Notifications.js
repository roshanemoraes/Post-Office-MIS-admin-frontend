import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import { Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import ReturnToSenderNotification from "../../components/Notification/ReturnToSenderNotification";

const Notifications = () => {
  const [rows, setRows] = React.useState([]);
  const columns = [
    { field: "notificationId", headerName: "ID", width: 100 },
    { field: "message", headerName: "Message", width: 800 },
    { field: "read", headerName: "Action", width: 120 },
    { field: "date", headerName: "Date", width: 130 },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/notifications/3"
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  const fetchUnreadData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/notifications/unread/3"
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
      <ReturnToSenderNotification />
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
                backgroundColor: "#f0f0f0",
                borderColor: "#d1d1d1",
                color: "#333",
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
                backgroundColor: "#f0f0f0",
                borderColor: "#d1d1d1",
                color: "#333",
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
