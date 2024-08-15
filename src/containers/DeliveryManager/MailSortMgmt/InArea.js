import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "react-bootstrap";
import AssignIcon from "../../../assets/check-square-fill.svg";
import DownArrowIcon from "../../../assets/arrow-down-square-fill.svg";

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

  const handleAssign = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/delivery-manager/sort/assign/add",
        {
          zone: data.zone,
          postmanId: data.postmanId,
        }
      );
      fetchAssignments();
    } catch (error) {
      console.error("Error in handling assign:", error);
    }
  };

  const columnsPostman = [
    { field: "id", headerName: "Assignment ID", width: 120 },
    { field: "deliveryId", headerName: "Delivery ID", width: 120 },
    { field: "postmanId", headerName: "Postman ID", width: 120 },
    { field: "zone", headerName: "Assigned Zone", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "action",
      headerName: "Assign Mails",
      width: 120,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          {/* <InfoReturnMailModal data={params.row} /> */}
          <Button
            disabled={params.row.status === "Assigned"}
            title="Assign Mails"
            style={{
              border: "none",
              background: "#fcd34d",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() => handleAssign(params.row)}
          >
            <img src={AssignIcon} alt="updateIcon" />
          </Button>
        </div>
      ),
    },
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

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleLoadUsualAssignments = () => {
    setLoadPressed(true);
    fetchAssignments();
  };

  return (
    <div>
      <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
        <div>
          <Button
            variant="primary"
            style={{ backgroundColor: "black", padding: "15px" }}
            onClick={handleLoadUsualAssignments}
          >
            Load Usual Assignment
          </Button>
          <Button
            disabled
            variant="primary"
            style={{
              backgroundColor: "#7f1d1d",
              padding: "15px",
              marginLeft: "20px",
              borderColor: "#7f1d1d",
            }}
            // onClick={handleLoadAssignments}
          >
            Load Custom Assignment
          </Button>
        </div>
      </div>
      {!isLoadPressed && <div style={{ marginTop: "15px" }}></div>}
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
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
              id: false,
            }}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          // fontWeight: "bold",
          marginBottom: "10px",
          marginTop: "10px",
          backgroundColor: "#a3a3a3",
        }}
      >
        All In-Area Mails
        <img
          src={DownArrowIcon}
          alt="All In-Area Mails"
          style={{
            marginRight: "10px",
            marginLeft: "20px",
            width: "30px",
            height: "30px",
          }}
        />
      </div>
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
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
      <div style={{ minHeight: "70px" }}></div>
    </div>
  );
}
