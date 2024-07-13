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
    { field: "deliveryId", headerName: "Delivery ID", width: 78 },
    {
      field: "postmanId",
      headerName: "Postman ID",
      width: 85,
      headerClassName: "multiline-header",
    },
    { field: "zone", headerName: "Zone", width: 180 },
    {
      field: "destinations",
      headerName: "Destinations",
      width: 200,
    },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "route",
      headerName: "Route",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <ViewRouteModal destinations={params.row.destinations} />

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
          "http://localhost:8081/api/delivery-manager/route/list-all"
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
        height: 410,
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
          rowHeight={50}
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
            },
            "& .MuiDataGrid-columnHeader": {
              height: "unset !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              maxHeight: "168px !important",
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
