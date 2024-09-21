import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Email } from "@mui/icons-material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Full Name", width: 200 },
  { field: "nic", headerName: "NIC", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "contactNumber", headerName: "Contact", width: 150 },
];

export default function ProfileDataTable() {
  const [rows, setRows] = React.useState([]);
  //profile data are not fetched to the frontend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/customer/list/profile/2" //- backend URL
          //'https://ca4b8d9b-5e2d-419e-a788-e0665410011f.mock.pstmn.io/Mobile'
          //"https://dd98e124-a193-432b-9b9b-af77479440a5.mock.pstmn.io/Profile"  - postman table url
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
        //getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //checkboxSelection
      />
    </div>
  );
}
