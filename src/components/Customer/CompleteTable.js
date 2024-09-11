import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";

const columns = [
  { field: "mailId", headerName: " Sent Post ID", width: 200 },
  { field: "mailType", headerName: "Post Type", width: 150 },
  { field: "datePosted", headerName: "Posted Date", width: 150 },
  { field: "dateDelivered", headerName: "Received Date", width: 150 },
  { field: "recipientName", headerName: "Reciever Name", width: 200 },
  { field: "destinationAddress", headerName: "Reciever Address", width: 230 },
];

export default function CompleteTable() {
  const [rows, setRows] = React.useState([]);
  const customerId = "2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/customer/list/delivered/${customerId}` //- backend link
          //"https://cbf27527-2de2-48c0-9f43-040550208f84.mock.pstmn.io/Delivered" //postman link
        );
        console.log("request came!");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="pt-1"
      style={{ height: 550, alignItems: "center", justifyContent: "center" }}
    >
      <DataGrid
        rows={rows}
        getRowId={(row) => row.mailId}
        columns={columns.map((column) => ({
          ...column,
        }))}
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
  );
}
