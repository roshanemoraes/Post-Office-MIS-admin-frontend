import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"; // Axios for making API requests
import UpdateIcon from "../../assets/pencil-fill.svg";
import ReturnToSenderIcon from "../../assets/arrow-up-square-fill.svg";
import TrashIcon from "../../assets/trash3-fill.svg";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";
import CustomizedSnackbars from "../../components/Custom/CustomizedSnackbars";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import MailIcon from "../../assets/icons8-mail-50.png";
import InfoIconCard from "../../components/Layout/InfoIconCard";

export default function ReturnMailMgmt() {
  const [rows, setRows] = React.useState([]); // State to store the data rows
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state to control visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message state
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity (success, error, etc.)
  const [mailCount, setMailCount] = useState("0"); // State to store the total count of undelivered mails
  const [isLoading, setLoading] = React.useState(false); // Loading state

  // Utility function to ensure a minimum loading duration (e.g., for UI loading effects)
  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };
  // Function to handle adding mail to Return-to-Sender list
  const handleReturnToSender = async (undeliverableId) => {
    try {
      const response = await axios.post(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/add/return-to-sender",
        undeliverableId,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        fetchData(); // Refresh data
        setSnackbarMessage("Mail successfully added to Return-to-Sender list.");
        setSnackbarSeverity("success"); // Set severity to success
        setSnackbarOpen(true); // Open snackbar
      }
    } catch (error) {
      console.error("Error adding to return-to-sender list", error);
      setSnackbarMessage("Failed to add mail to Return-to-Sender list."); // Set error message
      setSnackbarSeverity("error"); // Set severity to error
      setSnackbarOpen(true); // Open snackbar
    }
  };
  // Function to handle adding mail to Address-Update list
  const handleAddressUpdate = async (undeliverableId) => {
    try {
      const response = await axios.post(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/add/address-update",
        undeliverableId,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        fetchData(); // Refresh data
        setSnackbarMessage("Mail successfully added to Address-Update list."); // Set success message
        setSnackbarSeverity("success"); // Set severity to success
        setSnackbarOpen(true); // Open snackbar
      }
    } catch (error) {
      console.error("Error adding to Address-Update list", error);
      setSnackbarMessage("Failed to add mail to Address-Update list."); // Set error message
      setSnackbarSeverity("error"); // Set severity to error
      setSnackbarOpen(true);
    }
  }; // Function to handle discarding mail
  const handleDiscardMail = async (undeliverableId) => {
    console.log("Mail ID: ", undeliverableId); // Log the mail ID
    try {
      const response = await axios.post(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/add/discarded-mail",
        undeliverableId,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        fetchData();
        setSnackbarMessage("Mail successfully added to Discarded Mail list.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error adding to Discarded Mail list", error);
      setSnackbarMessage("Failed to add mail to Discarded Mail list.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  // Column definitions for the DataGrid
  const columns = [
    { field: "undeliverableId", headerName: "Return ID", width: 80 },
    { field: "mailId", headerName: "Mail ID", width: 65 },
    { field: "customer_id", headerName: "Cus ID", width: 65 },
    { field: "type", headerName: "Mail Type", width: 130 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 235,
    },
    { field: "deliverDate", headerName: "Return Date", width: 115 },
    {
      field: "action",
      headerName: "Action",
      width: 195,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          {/* Modal to view detailed info of the mail */}
          <InfoReturnMailModal data={params.row} />
          {/* Button to add mail to the Address-Update list */}
          <Button
            title="Add to Address-Update List"
            style={{
              border: "none",
              background: "#fde047",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() => handleAddressUpdate(params.row.undeliverableId)}
          >
            <img src={UpdateIcon} alt="updateIcon" />
          </Button>
          {/* Button to add mail to Return-to-Sender list */}
          <Button
            title="Add to Return-to-Sender List"
            style={{
              border: "none",
              background: "#67e8f9",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() => handleReturnToSender(params.row.undeliverableId)}
          >
            <img src={ReturnToSenderIcon} alt="returnToSenderIcon" />
          </Button>
          {/* Button to add mail to Discarded Mail list */}
          <Button
            title="Add to Discarded Mail List"
            style={{ border: "none", background: "#f43f5e", minWidth: "35px" }}
            onClick={() => handleDiscardMail(params.row.undeliverableId)}
          >
            <img src={TrashIcon} alt="trashIcon" />
          </Button>
        </div>
      ),
    },
  ];
  // Function to fetch the data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    try {
      await minimumLoadingDuration(
        axios
          .get(
            "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/",
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setRows(response.data); // Set rows with fetched data
            // console.log(response.data);
            setMailCount(response.data.length); // Set the mail count
          }),
        process.env.REACT_APP_LOADING_DELAY
      );
    } catch (error) {
      console.error("Error fetching users", error); // Handle any errors
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <div>
        {/* Loading overlay when data is being fetched */}
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
          <div>
            {/* Header section */}
            <div className="flex justify-center items-center p-2 mb-2 mt-2 bg-gray-400">
              All Undelivered Mails
              <img
                src={DownArrowIcon}
                alt="All In-Area Mails"
                className="mr-2 ml-5 w-7 h-7"
              />
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-3 flex flex-col pt-[4.5px] ml-6">
                {/* Left panel with information cards and buttons */}
                <InfoIconCard
                  backgroundColor={"#ffffff"}
                  title={"ALL UNDELIVERED MAILS TODAY"}
                  value={`${mailCount} `}
                  iconSrc={MailIcon}
                />
                <div className="h-[200px]"></div>
                {/* <InfoIconCard
              backgroundColor={"#ffffff"}
              title={"ALL RETURN-TO-SENDER MAILS"}
              value={"9756"}
              iconSrc={MailIcon}
            />
            <div className="h-[12px]"></div>
            <InfoIconCard
              backgroundColor={"#ffffff"}
              title={"ALL ADDRESS-CHANGE-REQUEST MAILS"}
              value={"9756"}
              iconSrc={MailIcon}
            /> */}
                <div className="flex justify-center mt-[200px] ">
                  {/* Button to process all undelivered mails and add them to the Return-to-Sender list */}
                  <div className="mr-7">
                    <Button
                      style={{
                        backgroundColor: "#fcd34d", // Set button background to a yellow shade
                        fontSize: "14px", // Set font size to 14px
                        color: "black", // Set font color to black
                        textTransform: "none", // Prevent text transformation (e.g., uppercase)
                        padding: "10px", // Set padding inside the button
                      }}
                      variant="contained" // Set the button variant to contained (filled button)
                    >
                      Process All
                      <br />
                      Return-to-Sender
                    </Button>
                  </div>
                  <div>
                    {/* Button to process all undelivered mails and add them to the Address-Update list */}
                    <Button
                      style={{
                        backgroundColor: "#78350f",
                        fontSize: "14px",
                        textTransform: "none",
                        padding: "10px",
                      }}
                      variant="contained"
                    >
                      Process All
                      <br />
                      Address-Update
                    </Button>
                  </div>
                </div>
              </div>
              {/* Right panel with DataGrid table displaying undelivered mails */}
              <div className="col-span-9">
                <div className="h-[550px] pt-1 flex flex-col justify-center items-center">
                  {/* DataGrid component to display the undelivered mails in a tabular format */}
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={50}
                    getRowId={(row) => row.undeliverableId}
                    sx={{
                      backgroundColor: "#f5f5f5", // Set table background to light gray
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add slight shadow around the table
                      ".MuiDataGrid-columnSeparator": {
                        display: "none", // Hide column separators
                      },
                      "&.MuiDataGrid-root": {
                        border: "none", // Remove default border
                      },
                    }}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 }, // Initialize pagination with 10 rows per page
                      },
                    }}
                  />
                  {/* Snackbar component to show success or error messages */}
                  <CustomizedSnackbars
                    open={snackbarOpen} // Control whether the snackbar is visible
                    autoHideDuration={3000} // Auto-hide the snackbar after 3 seconds
                    severity={snackbarSeverity} // Control the type of snackbar (success, error, etc.)
                    message={snackbarMessage} // Message to be displayed in the snackbar
                    onClose={() => setSnackbarOpen(false)} // Close the snackbar when the close event is triggered
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
