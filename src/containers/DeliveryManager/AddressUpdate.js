import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UpdateIcon from "../../assets/update.svg";
import ReturnToSenderIcon from "../../assets/arrow-repeat.svg";
import InfoIcon from "../../assets/info-circle.svg";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import checkIcon from "../../assets/bell-fill.svg";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import InfoCard from "./../../components/Layout/InfoCard";
import InfoIconCardSmall from "../../components/Layout/InfoIconCardSmall";
import MailIcon from "../../assets/icons8-mail-50.png";

export default function AddressUpdate() {
  const [rows, setRows] = React.useState([]);
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const columns = [
    { field: "undeliverableId", headerName: "Return ID", width: 90 },
    { field: "mailId", headerName: "Mail ID", width: 75 },
    { field: "customer_id", headerName: "Cus ID", width: 75 },
    { field: "type", headerName: "Mail Type", width: 130 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 180,
    },
    { field: "status", headerName: "Status", width: 220 },
    { field: "deliverDate", headerName: "Return Date", width: 125 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <InfoReturnMailModal data={params.row} />
          {params.row.status === "Address-Update" && (
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
          )}
        </div>
      ),
    },
  ];

  const handleOneReturnToSender = async (row) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/delivery-manager/return-mail/address-update/add/${row.mailId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        sendNotification(
          `Mail needs an address update due to ${row.reason}.`,
          row.customer_id,
          row.mailId,
          row.undeliverableId
        );
        setSnackbarMessage("Started Address-Update Process.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        fetchData();
      }
    } catch (error) {
      console.error("Error adding to address-update list", error);
      setSnackbarMessage("Failed to start address-update Process.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/return-mail/address-update",
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
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      onConnect: () => {
        console.log("Connected to WebSocket");
        const customerId = 2;
        stompClient.subscribe(`/topic/customer/${customerId}`, (message) => {
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

  const sendNotification = (message, customerId, mailId, undeliverableId) => {
    if (client) {
      const notification = {
        customerId: customerId,
        message: message,
        type: "Address-update",
        mailId: mailId,
        undeliverableId: undeliverableId,
      };
      client.publish({
        destination: `/app/notify/${customerId}`,
        body: JSON.stringify(notification),
      });
    }
  };
  const addressUpdateCount = rows.filter(
    (row) => row.status === "Address-Update"
  ).length;

  const addressUpdatePendingCount = rows.filter(
    (row) => row.status === "Address-Update-Pending"
  ).length;

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
        All Address-Update Mails
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
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex flex-col pt-[4.5px] ">
          <div>
            <InfoIconCardSmall
              backgroundColor={"#ffffff"}
              title={"NEW ADDRESS-UPDATE MAILS"}
              value={addressUpdateCount}
              iconSrc={MailIcon}
            />
            <div className="h-[12px]"></div>
            <InfoIconCardSmall
              backgroundColor={"#ffffff"}
              title={"UPDATE-PENDING MAILS"}
              value={addressUpdatePendingCount}
              iconSrc={MailIcon}
            />
            {/* <InfoCard
              backgroundColor={"#ffffff"}
              title={"NEW ADDRESS-UPDATE MAILS"}
              value={addressUpdateCount}
            /> */}
          </div>
          {/* <div>
            <InfoCard
              backgroundColor={"#ffffff"}
              title={"UPDATE-PENDING MAILS"}
              value={addressUpdatePendingCount}
            />
          </div> */}
          <div className="mt-[270px]">
            <div className="flex flex-col">
              <Button
                variant="contained"
                style={{ backgroundColor: "#852318" }}
              >
                PROCESS ALL NEW
                <br />
                ADDRESS UPDATE MAILS
              </Button>
            </div>
            {/* <div>
              <Button variant="contained">
                Process All
                <br />
                Return To Sender
              </Button>
            </div> */}
          </div>
        </div>

        <div
          className="col-span-10"
          style={{
            height: 550,
            paddingTop: "5px",
            marginHorizontal: "10px",
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
        </div>
      </div>
    </>
  );
}
