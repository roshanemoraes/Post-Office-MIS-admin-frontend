import React, { useEffect } from "react";
import { Button, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UpdateIcon from "../../assets/update.svg";
import ReturnToSenderIcon from "../../assets/arrow-repeat.svg";
import InfoIcon from "../../assets/info-circle.svg";
import InfoReturnMailModal from "./Modals/InfoReturnMailModal";

export default function ReturnToSender() {
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "mailId", headerName: "Mail ID", width: 100 },
    { field: "type", headerName: "Mail Type", width: 170 },
    // { field: "zone", headerName: "Zone", width: 135 },
    // { field: "city", headerName: "City", width: 135 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 350,
    },
    { field: "deliverDate", headerName: "Return Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <InfoReturnMailModal />
          {/* <Button
            title="Add to Address Update List"
            style={{
              border: "none",
              background: "red",
              minWidth: "35px",
              marginRight: "10px",
            }}
          >
            <img src={UpdateIcon} alt="updateIcon" />
          </Button>
          <Button
            title="Add to Return-to-Sender List"
            style={{ border: "none", background: "#67e8f9", minWidth: "35px" }}
          >
            <img src={ReturnToSenderIcon} alt="returnToSenderIcon" />
          </Button> */}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/delivery-manager/return-mail/return-to-sender"
        );
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  return (
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
  );
}
