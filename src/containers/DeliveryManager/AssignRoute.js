import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import SubmitRoute from "./SubmitRoute";

export default function AssignRoute() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const columns = [
    { field: "id", headerName: "Delivery ID", width: 105 },
    { field: "postman_id", headerName: "Postman ID", width: 105 },
    { field: "zone", headerName: "Zone", width: 90 },
    {
      field: "destinations",
      headerName: "Destinations",
      width: 200,
    },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            sx={{
              width: "40px",
              my: "0px",
              mb: "0px",
              mr: "10px",
              backgroundColor: "#000000",
              color: "white",
              px: 5,
              fontSize: "11px",
              borderRadius: "8px",
            }}
            onClick={() => handleButtonClick(params.row)}
          >
            View
          </Button>

          <SubmitRoute
            rowData={params.row}
            destinations={params.row.destinations}
          />
        </div>
      ),
    },
  ];

  function handleButtonClick(row) {
    console.log("Delivery Id: ", row.id);
  }
  const handleAssign = async (row) => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://353ee19a-594e-46f9-9042-7f8470aa8dae.mock.pstmn.io/new-route-alloc"
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
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
          }}
        >
          <CircularProgress color="primary" size={40} />
          <span style={{ marginLeft: "10px" }}>Assigning...</span>
        </div>
      ) : (
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
          columnVisibilityModel={{
            destinations: false,
          }}
          disableColumnMenu={{
            postman_id: true,
            zone: false,
            destinations: true,
            status: false,
            action: true,
          }}
          // pageSizeOptions={[5, 10]}
        />
      )}
    </div>
  );
}
