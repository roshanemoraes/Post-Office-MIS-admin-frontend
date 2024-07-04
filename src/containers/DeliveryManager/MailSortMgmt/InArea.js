import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function InArea() {
  const [rows, setRows] = React.useState([]);
  const [rowsPostman, setRowsPostman] = React.useState([]);
  const [isLoadPressed, setLoadPressed] = React.useState(false);

  const columns = [
    { field: "mailId", headerName: "Mail ID", width: 75 },
    { field: "customerId", headerName: "Cus ID", width: 75 },
    { field: "addressId", headerName: "Addr. Id", width: 90 },
    { field: "mailType", headerName: "Mail Type", width: 160 },
    // { field: "in_area", headerName: "In-Area?", width: 90 },
    { field: "zone", headerName: "Zone", width: 160 },
    { field: "datePosted", headerName: "Date Posted", width: 180 },
    // {
    //   field: "reason",
    //   headerName: "Return Reason",
    //   width: 250,
    // },
    // { field: "status", headerName: "Status", width: 220 },
    // { field: "deliverDate", headerName: "Return Date", width: 180 },
  ];
  const columnsPostman = [
    { field: "id", headerName: "Assignment ID", width: 120 },
    { field: "postmanId", headerName: "Postman ID", width: 120 },
    { field: "zone", headerName: "Assigned Zone", width: 200 },
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/sort/all-pending-in-area"
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/sort/all-postman-assignments"
      );
      setRowsPostman(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadAssignments = () => {
    setLoadPressed(true);
    fetchAssignments();
  };

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
      <div style={{ marginLeft: "50px" }}>
        <div>
          <Button
            variant="primary"
            style={{ backgroundColor: "black", padding: "15px" }}
            onClick={handleLoadAssignments}
          >
            Load Assignments
          </Button>
        </div>
      </div>
      {isLoadPressed && (
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
            rows={rowsPostman}
            columns={columnsPostman}
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
      )}
    </div>
  );
}
