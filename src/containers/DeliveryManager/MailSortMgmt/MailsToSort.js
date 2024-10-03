import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DownArrowIcon from "../../../assets/arrow-down-square-fill.svg";

export default function MailsToSort() {
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "mailId", headerName: "Mail ID", width: 75 },
    { field: "customerId", headerName: "Cus ID", width: 75 },
    { field: "addressId", headerName: "Addr. Id", width: 90 },
    { field: "mailType", headerName: "Mail Type", width: 160 },
    { field: "in_area", headerName: "In-Area?", width: 90 },
    { field: "city", headerName: "City", width: 160 },
    { field: "datePosted", headerName: "Date Posted", width: 180 },
    // {
    //   field: "reason",
    //   headerName: "Return Reason",
    //   width: 250,
    // },
    // { field: "status", headerName: "Status", width: 220 },
    // { field: "deliverDate", headerName: "Return Date", width: 180 },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/sort/all-pending",
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
  }, []);

  return (
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
        All Mails To Sort
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
      </div>
      <div style={{ marginLeft: "50px" }}></div>
    </div>
  );
}
