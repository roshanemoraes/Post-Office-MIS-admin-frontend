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
import InfoCard from "../../components/Layout/InfoCard";

export default function ReturnMailMgmt() {
  const [rows, setRows] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleReturnToSender = async (undeliverableId) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/delivery-manager/return-mail/add/return-to-sender",
        undeliverableId,
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

  const handleAddressUpdate = async (undeliverableId) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/delivery-manager/return-mail/add/address-update",
        undeliverableId,
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
  const handleDiscardMail = async (undeliverableId) => {
    console.log("Mail ID: ", undeliverableId);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/delivery-manager/return-mail/add/discarded-mail",
        undeliverableId,
        {
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
    { field: "type", headerName: "Mail Type", width: 150 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 170,
    },
    { field: "deliverDate", headerName: "Return Date", width: 180 },
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
              background: "#f43f5e",
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
            style={{ border: "none", background: "#fde047", minWidth: "35px" }}
            onClick={() => handleDiscardMail(params.row.undeliverableId)}
          >
            <img src={TrashIcon} alt="trashIcon" />
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
    <>
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
            <InfoCard
              backgroundColor={"#ffffff"}
              title={"ALL UNDELIVERED MAILS"}
              value={"16"}
            />
            <InfoCard
              backgroundColor={"#ffffff"}
              title={"ALL RETURN-TO-SENDER MAILS"}
              value={"6"}
            />
            <InfoCard
              backgroundColor={"#ffffff"}
              title={"ALL ADDRESS-CHANGE-REQUEST MAILS"}
              value={"8"}
            />
            <div className="flex justify-center mt-[200px] ">
              <div className="mr-3">
                <Button
                  style={{ backgroundColor: "#852318", fontSize: "13px" }}
                  variant="contained"
                >
                  Process All
                  <br />
                  Return To Sender
                </Button>
              </div>
              <div>
                <Button
                  style={{ backgroundColor: "#852318", fontSize: "13px" }}
                  variant="contained"
                >
                  Process All
                  <br />
                  Address Update
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
    </>
  );
}
