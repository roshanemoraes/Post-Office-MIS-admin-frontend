import React, { useEffect } from "react";
import { Button, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";

export default function ReturnMailMgmt() {
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "id", headerName: "Mail ID", width: 90 },
    { field: "type", headerName: "Mail Type", width: 105 },
    { field: "zone", headerName: "Zone", width: 135 },
    { field: "city", headerName: "City", width: 135 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 200,
    },
    { field: "returnDate", headerName: "Return Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title="Info">
          <Button
            variant="contained"
            sx={{
              width: "auto", // Set width to 40px
              height: "30px",
              // my: "0px",
              // mb: "0px",
              // mr: "0px",
              backgroundColor: "#000000",
              color: "white",
              // px: "5pxh",
              fontSize: "5px",
              borderRadius: "5px",
            }}
            onClick={() => console.log("View button clicked")}
          >
            <InfoIcon />
          </Button>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/delivery-manager/return-mail/list-all"
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        height: 700,
        paddingTop: "25px",
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
  );
}
