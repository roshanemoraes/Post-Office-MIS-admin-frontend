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
  { field: "id", headerName: "ID", width: 100 },
  { field: "roles", headerName: "Role", width: 140 },
  { field: "fullName", headerName: "Full Name", width: 200 },
  { field: "nic", headerName: "NIC", width: 150 },
  { field: "email", headerName: "Email", type: "string", width: 250 },
  { field: "contactNumber", headerName: "Contact", width: 130 },
];


export default function DataTable() {
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://22a1e293-45bf-4bba-9b50-bb054156b76b.mock.pstmn.io/list-employee"
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
    <div style={{ height: 680, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
