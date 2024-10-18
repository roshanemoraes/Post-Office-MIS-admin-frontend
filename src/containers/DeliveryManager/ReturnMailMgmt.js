import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UpdateIcon from "../../assets/pencil-fill.svg";
import ReturnToSenderIcon from "../../assets/arrow-up-square-fill.svg";
import TrashIcon from "../../assets/trash3-fill.svg";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";
import CustomizedSnackbars from "../../components/Custom/CustomizedSnackbars";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import MailIcon from "../../assets/icons8-mail-50.png";
import InfoIconCard from "../../components/Layout/InfoIconCard";

export default function ReturnMailMgmt() {
  const [rows, setRows] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [mailCount, setMailCount] = useState("0");
  const [isLoading, setLoading] = React.useState(false);

  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };

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
  const handleDiscardMail = async (undeliverableId) => {
    console.log("Mail ID: ", undeliverableId);
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
          <InfoReturnMailModal data={params.row} />
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

  const fetchData = async () => {
    setLoading(true);
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
            setRows(response.data);
            // console.log(response.data);
            setMailCount(response.data.length);
          }),
        process.env.REACT_APP_LOADING_DELAY
      );
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
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
                  <div className="mr-7">
                    <Button
                      style={{
                        backgroundColor: "#fcd34d",
                        fontSize: "14px",
                        color: "black",
                        textTransform: "none",
                        padding: "10px",
                      }}
                      variant="contained"
                    >
                      Process All
                      <br />
                      Return-to-Sender
                    </Button>
                  </div>
                  <div>
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
              <div className="col-span-9">
                <div className="h-[550px] pt-1 flex flex-col justify-center items-center">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={50}
                    getRowId={(row) => row.undeliverableId}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
