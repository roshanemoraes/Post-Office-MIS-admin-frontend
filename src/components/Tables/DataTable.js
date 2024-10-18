import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "role",
//     headerName: "Role",
//     width: 140,
//   },
//   { field: "fullName", headerName: "Full Name", width: 200 },
//   { field: "nic", headerName: "NIC", width: 150 },
//   {
//     field: "email",
//     headerName: "Email",
//     type: "String",
//     width: 250,
//   },
//   {
//     field: "contact",
//     headerName: "Contact",
//     width: 130,
//     // description: "This column has a value getter and is not sortable.",
//     // sortable: false,
//     // width: 160,
//     // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
//   },
// ];
const columns = [
  { field: "id", headerName: " Emp ID", width: 80 },
  { field: "roles", headerName: "Role", width: 120 },
  { field: "fullName", headerName: "Full Name", width: 210 },
  { field: "nic", headerName: "NIC", width: 130 },
  { field: "email", headerName: "Email", type: "string", width: 240 },
  { field: "contactNumber", headerName: "Contact", width: 130 },
];

export default function DataTable() {
  const [rows, setRows] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/postmaster/employee/list-employee",
        { withCredentials: true }
      );
      console.log("request came!");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ height: 680, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ backgroundColor: "white" }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
