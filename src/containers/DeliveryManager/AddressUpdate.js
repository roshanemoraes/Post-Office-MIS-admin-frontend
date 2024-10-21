import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UpdateIcon from "../../assets/update.svg"; // Importing assets/icons
import ReturnToSenderIcon from "../../assets/arrow-repeat.svg"; // Importing assets/ arrow icons
import InfoIcon from "../../assets/info-circle.svg";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal"; // Importing modal component for displaying mail info
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import checkIcon from "../../assets/bell-fill.svg";
import { Client } from "@stomp/stompjs"; // Importing STOMP client for WebSocket communication
import SockJS from "sockjs-client"; // Importing SockJS for WebSocket connection
import InfoCard from "./../../components/Layout/InfoCard"; // Importing InfoCard component for displaying info
import InfoIconCardSmall from "../../components/Layout/InfoIconCardSmall"; // Importing small info card component
import MailIcon from "../../assets/icons8-mail-50.png"; // Importing mail icon
import { set } from "firebase/database"; // Importing Firebase database set function

export default function AddressUpdate() {
  const [rows, setRows] = React.useState([]); // State for storing rows of data
  const [notifications, setNotifications] = useState([]); // State for storing notifications
  const [client, setClient] = useState(null); // State for storing STOMP client
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for managing snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State for snackbar severity
  const [isLoading, setLoading] = React.useState(false); // State for managing loading status

  // Utility function to ensure a minimum loading duration
  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };
  // Define the columns for the DataGrid
  const columns = [
    { field: "undeliverableId", headerName: "Return ID", width: 90 }, // Column for return ID
    { field: "mailId", headerName: "Mail ID", width: 75 }, // Column for mail ID
    { field: "customer_id", headerName: "Cus ID", width: 75 }, // Column for customer ID
    { field: "type", headerName: "Mail Type", width: 130 }, // Column for mail type
    {
      field: "reason",
      headerName: "Return Reason",
      width: 180, // Column for return reason
    },
    { field: "status", headerName: "Status", width: 220 }, // Column for status
    { field: "deliverDate", headerName: "Return Date", width: 125 }, // Column for return date
    {
      field: "action",
      headerName: "Action", // Column for actions
      width: 100,
      headerAlign: "center",
      renderCell: (
        params // Render custom cell with action buttons
      ) => (
        <div>
          <InfoReturnMailModal data={params.row} /> // Modal for showing mail
          info
          {params.row.status === "Address-Update" && ( // Conditional rendering based on status
            <Button
              title="Return To Sender" // Tooltip for button
              style={{
                border: "none",
                background: "#fcd34d",
                minWidth: "35px", // Minimum button width
                marginRight: "10px", // Margin for spacing
              }}
              onClick={() => {
                handleOneReturnToSender(params.row); // Call handler on button click
              }}
            >
              <img src={checkIcon} alt="updateIcon" /> // Icon inside button
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Function to handle returning a mail to sender
  const handleOneReturnToSender = async (row) => {
    try {
      // Make API request to return mail to sender
      const response = await axios.post(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/address-update/add/${row.mailId}`,
        { withCredentials: true } // Include credentials for authentication
      );
      if (response.status === 200) {
        sendNotification(
          // Send notification after successful return
          `Mail needs an address update due to ${row.reason}.`,
          row.customer_id,
          row.mailId,
          row.undeliverableId
        );
        setSnackbarMessage("Started Address-Update Process."); // Set snackbar message
        setSnackbarSeverity("success"); // Set snackbar severity
        setSnackbarOpen(true); // Open snackbar
        fetchData(); // Fetch updated data
      }
    } catch (error) {
      // Log error
      console.error("Error adding to address-update list", error); // Set error message
      setSnackbarMessage("Failed to start address-update Process."); // Set snackbar severity to error
      setSnackbarSeverity("error");
      setSnackbarOpen(true); // Open snackbar
    }
  };
  // Function to fetch data from API
  const fetchData = async () => {
    setLoading(true); // Set loading state to true
    try {
      await minimumLoadingDuration(
        axios // Fetch data from API
          .get(
            "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/address-update",
            {
              withCredentials: true, // Include credentials
            }
          )
          .then((response) => {
            setRows(response.data); // Set rows state with fetched data
            // console.log(response.data);
          }),
        process.env.REACT_APP_LOADING_DELAY // Minimum loading delay
      );
    } catch (error) {
      console.error("Error fetching users", error); // Log error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  //ideal one----------------------
  useEffect(() => {
    fetchData(); // Fetch initial data

    const stompClient = new Client({
      // Create STOMP client
      brokerURL: "ws://localhost:8081/ws", // WebSocket broker URL
      connectHeaders: {},
      webSocketFactory: () =>
        new SockJS( // Create WebSocket connection
          "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/ws"
        ),
      onConnect: () => {
        console.log("Connected to WebSocket"); // Log connection status
        const customerId = 2; // Sample customer ID for subscription
        stompClient.subscribe(`/topic/customer/${customerId}`, (message) => {
          // Subscribe to customer topic
          console.log("Received message:", message); // Log received message
          const notification = JSON.parse(message.body); // Parse notification
          setNotifications((prev) => [notification, ...prev]); // Update notifications state
        });
      },
    });
    stompClient.activate(); // Activate STOMP client
    setClient(stompClient); // Store client in state

    return () => stompClient.deactivate(); // Cleanup function to deactivate client
  }, []);
  // Function to send notification via WebSocket
  const sendNotification = (message, customerId, mailId, undeliverableId) => {
    if (client) {
      // Check if client is available
      const notification = {
        // Create notification object
        customerId: customerId,
        message: message,
        type: "Address-update",
        mailId: mailId,
        undeliverableId: undeliverableId,
      };
      client.publish({
        // Publish notification to topic
        destination: `/app/notify/${customerId}`,
        body: JSON.stringify(notification), // Convert notification to JSON
      });
    }
  };
  // Count address update and pending mails
  const addressUpdateCount = rows.filter(
    (row) => row.status === "Address-Update" // Filter rows by status
  ).length;

  const addressUpdatePendingCount = rows.filter(
    (row) => row.status === "Address-Update-Pending" // Filter rows by pending status
  ).length;

  return (
    <>
      <div>
        {/* Show loading spinner if data is being fetched */}

        {isLoading ? (
          <div className="fixed top-0 left-[100px] w-full h-full bg-[#737373] bg-opacity-70 flex items-center justify-center ">
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[100px] border-8 border-gray-300 border-t-[#000] rounded-full animate-spin"></div>
              <span className="mt-4 text-[25px] text-black font-sans tracking-wide">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Header section displaying the title and down arrow icon */}
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
            {/* Main content area with statistics and data grid */}
            <div className="grid grid-cols-12">
              <div className="col-span-2 flex flex-col pt-[4.5px] ">
                <div>
                  {/* Card displaying the count of new address-update mails */}
                  <InfoIconCardSmall
                    backgroundColor={"#ffffff"}
                    title={"NEW ADDRESS-UPDATE MAILS"}
                    value={addressUpdateCount}
                    iconSrc={MailIcon}
                  />
                  <div className="h-[12px]"></div>
                  {/* Card displaying the count of update-pending mails */}
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
                {/* Button to process all new address-update mails */}
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
              {/* Data grid for displaying address-update mail details */}
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
                  getRowId={(row) => row.mailId} // Unique ID for each row
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
        )}
      </div>
    </>
  );
}
