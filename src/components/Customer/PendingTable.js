import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
////only 5 records are displayed in the table. handle that error
const columns = [
  { field: "mailId", headerName: "Mail ID", width: 130 },
  { field: "mailType", headerName: "Mail Type", width: 170 },
  { field: "destinationAddress", headerName: "Reciever Address", width: 320 },
  { field: "recipientName", headerName: "Reciever Name", width: 220 },
  { field: "datePosted", headerName: "Posted Date", width: 200 },
];

export default function PendingTable() {
  const [rows, setRows] = React.useState([]);
  const customerId = "2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"https://8a488748-6746-4504-8705-1ecb6053c14a.mock.pstmn.io/Demo" //- postman url
          `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/customer/list/pending/${customerId}`
        );
        console.log("request came!");
        console.log(response.data);
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ height: 550, alignItems: "center", justifyContent: "center" }}
    >
      <DataGrid
        rows={rows}
        getRowId={(row) => row.mailId}
        columns={columns.map((column) => ({
          ...column,
        }))}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            fontWeight: "bold",
            fontSize: "16px",
          },
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
            color: "black",
          },
        }}
      />
    </div>
  );
}
