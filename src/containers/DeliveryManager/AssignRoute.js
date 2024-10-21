import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import SubmitRoute from "./SubmitRoute";
import ViewRouteModal from "./Modals/ViewRouteModal";

// Functional component to manage and display routes assignment
export default function AssignRoute() {
  const [rows, setRows] = React.useState([]); // State to hold rows of delivery data
  const [loading, setLoading] = React.useState(false); // State to manage loading status

  const columns = [
    { field: "deliveryId", headerName: "DID", width: 85 }, // Column for Delivery ID
    {
      field: "postmanId",
      headerName: "PID",
      width: 85,
      headerClassName: "multiline-header", // Custom class for header
    },
    { field: "zone", headerName: "Zone", width: 160 }, // Column for zone information
    {
      field: "destinations",
      headerName: "Destinations",
      width: 200, // Column for destinations
    },
    { field: "status", headerName: "Status", width: 120 }, // Column for delivery status
    {
      field: "route",
      headerName: "Route",
      width: 110,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          {/* Render the ViewRouteModal for each row, passing destinations */}
          <ViewRouteModal destinations={params.row.destinations} />

          {/* <SubmitRoute
            rowData={params.row}
            destinations={params.row.destinations}
          /> */}
        </div>
      ),
    },
  ];
  // Function to handle button click
  function handleButtonClick(row) {
    console.log("Delivery Id: ", row.id);
  }
  // Async function to handle assigning a route
  const handleAssign = async (row) => {
    // Logic for assigning a route
  };
  // to fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/route/list-all",
          { withCredentials: true } // Include credentials for cross-origin requests
        );
        setRows(response.data); // Update state with the fetched data
        console.log(response.data); // Log the fetched data for debugging
      } catch (error) {
        console.error("Error fetching users", error); // Log any errors during fetch
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <div
      style={{
        width: "100%", // Set full width for the container
        // paddingTop: "25px",
        display: "flex", // Use flexbox for layout
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? ( // Conditional rendering based on loading state
        <div
          style={{
            display: "flex", // Flexbox for aligning loading components
            alignItems: "center",
            position: "fixed", // Fixed position for loading indicator
          }}
        >
          <CircularProgress color="primary" size={40} /> {/* Loading spinner */}
          <span style={{ marginLeft: "10px" }}>Assigning...</span>{" "}
          {/* Loading text */}
        </div>
      ) : (
        <div style={{ height: 389 }}>
          {" "}
          {/* Container for DataGrid */}
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={40}
            getRowId={(row) => row.deliveryId} // Get unique row ID from deliveryId
            sx={{
              // Custom styles for DataGrid
              ".MuiDataGrid-columnSeparator": {
                display: "none", // Hide column separators
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "normal", // Allow text to wrap
                lineHeight: "normal", // Normal line height for headers
                fontSize: "14px", // Adjusts font size for header titles
              },
              "& .MuiDataGrid-columnHeader": {
                height: "unset !important", // Remove fixed height for headers
              },
              "& .MuiDataGrid-columnHeaders": {
                maxHeight: "168px !important", // Set max height for column headers
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
                paginationModel: { page: 0, pageSize: 7 }, // Set initial pagination state
              },
            }}
            columnVisibilityModel={{
              destinations: false, // Hide the destinations column
            }}
            disableColumnMenu={{
              postman_id: true, // Disable column menu for postman_id
              zone: false, // Enable column menu for zone
              destinations: true, // Disable column menu for destinations
              status: false, // Enable column menu for statu
              action: true, // Disable column menu for actions
            }}
            // pageSizeOptions={[5, 5]}
          />
        </div>
      )}
    </div>
  );
}
