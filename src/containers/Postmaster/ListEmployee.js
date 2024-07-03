import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function ListEmployee() {
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "id", headerName: " Emp ID", width: 80 },
    { field: "roles", headerName: "Role", width: 120 },
    { field: "fullName", headerName: "Full Name", width: 210 },
    { field: "nic", headerName: "NIC", width: 130 },
    { field: "email", headerName: "Email", type: "string", width: 240 },
    { field: "contactNumber", headerName: "Contact", width: 130 },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/postmaster/employee/list-employee"
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
    <div>
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
      <div style={{ marginLeft: "50px" }}></div>
    </div>
  );
}
