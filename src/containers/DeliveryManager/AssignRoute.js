import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import SubmitRoute from "./SubmitRoute";
import ViewRouteModal from "./Modals/ViewRouteModal";

export default function AssignRoute() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const columns = [
    { field: "deliveryId", headerName: "DID", width: 85 },
    {
      field: "postmanId",
      headerName: "PID",
      width: 85,
      headerClassName: "multiline-header",
    },
    { field: "zone", headerName: "Zone", width: 160 },
    {
      field: "destinations",
      headerName: "Destinations",
      width: 200,
    },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "route",
      headerName: "Route",
      width: 110,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <ViewRouteModal destinations={params.row.destinations} />

          {/* <SubmitRoute
            rowData={params.row}
            destinations={params.row.destinations}
          /> */}
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
          "http://localhost:8081/api/delivery-manager/route/list-all",
          { withCredentials: true }
        );
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        // paddingTop: "25px",
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
          rowHeight={40}
          getRowId={(row) => row.deliveryId}
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "normal",
              fontSize: "14px", // Adjusts font size for header titles
            },
            "& .MuiDataGrid-columnHeader": {
              height: "unset !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              maxHeight: "168px !important",
              fontSize: "12px", // Adjusts font size for the column headers
            },
            "& .MuiDataGrid-cell": {
              fontSize: "12px", // Adjusts font size for the cell content
            },
            "& .MuiDataGrid-footerContainer": {
              fontSize: "12px", // Adjusts font size for the footer (if pagination is enabled)
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
          // pageSizeOptions={[5, 5]}
        />
      )}
    </div>
  );
}
