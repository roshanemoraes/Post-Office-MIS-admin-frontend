import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "react-bootstrap";
import AssignIcon from "../../../assets/check-square-fill.svg";
import DownArrowIcon from "../../../assets/arrow-down-square-fill.svg";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import CustomPostmanPlan from "./CustomPostmanPlan";

export default function InArea() {
  const [rows, setRows] = React.useState([]);
  const [rowsPostman, setRowsPostman] = React.useState([]);
  const [isLoadPressed, setLoadPressed] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isAnyPlanActivated, setAnyPlanActivated] = React.useState(false);
  const [isUsualPlanActivated, setUsualPlanActivated] = React.useState(false);
  const [isCustomPlanActivated, setCustomPlanActivated] = React.useState(false);

  const columns = [
    { field: "mailId", headerName: "Mail ID", width: 75 },
    { field: "customerId", headerName: "Cus ID", width: 75 },
    { field: "addressId", headerName: "Addr. Id", width: 90 },
    { field: "mailType", headerName: "Mail Type", width: 160 },
    { field: "zone", headerName: "Zone", width: 160 },
    { field: "datePosted", headerName: "Date Posted", width: 180 },
  ];

  const handleAssign = async (data) => {
    try {
      const response = await axios.post(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/sort/assign/add",
        {
          zone: data.zone,
          postmanId: data.postmanId,
        },
        { withCredentials: true }
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

  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };

  const fetchAssignmentStatus = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      await minimumLoadingDuration(
        axios
          .get(
            "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/sort/get-assignment-plan/status",
            { withCredentials: true }
          )
          .then((response) => {
            console.log("awaaaa", response.data);
            if (response.data === "usual") {
              setAnyPlanActivated(true);
              setUsualPlanActivated(true);
              fetchAssignments();
            } else if (response.data === "custom") {
              setAnyPlanActivated(true);
              setCustomPlanActivated(true);
            }
            console.log(response.data);
          }),
        process.env.REACT_APP_LOADING_DELAY // Minimum loading duration in milliseconds
      );
    } catch (error) {
      console.error("Error fetching assignment status");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/sort/all-pending-in-area",
        { withCredentials: true }
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchAssignmentStatus();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      await minimumLoadingDuration(
        axios
          .get(
            "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/sort/all-postman-assignments",
            { withCredentials: true }
          )
          .then((response) => {
            setRowsPostman(response.data);
            setAnyPlanActivated(true);
            setUsualPlanActivated(true);
            setCustomPlanActivated(false);
          }),
        process.env.REACT_APP_LOADING_DELAY // Minimum loading duration in milliseconds
      );
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleLoadUsualAssignments = async () => {
    setLoadPressed(true);
    await fetchAssignments();
  };

  const handleLoadCustomAssignments = async () => {
    setAnyPlanActivated(true);
    setCustomPlanActivated(true);
    setUsualPlanActivated(false);
  };

  return (
    <div>
      {isLoading ? (
        <div className="fixed top-0 left-[100px] w-full h-full bg-[#737373] bg-opacity-70 flex items-center justify-center ">
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] border-8 border-gray-300 border-t-[#000] rounded-full animate-spin"></div>
            <span className="mt-4 text-[25px] text-black font-sans tracking-wide">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div>
          {!isAnyPlanActivated && (
            <Box
              display="flex"
              paddingTop={4}
              flexDirection="row"
              justifyContent="space-around"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45%",
                  minWidth: "550px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "30px 2px 30px 2px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    marginBottom: "30px",
                    fontFamily: "Helvetica Neue",
                  }}
                >
                  Today Postman Assignment Status : Pending
                </Typography>
                <div className="mb-[50px]">Select The Plan To Proceed With</div>
                <div style={{ marginBottom: "10px" }}>
                  <div>
                    <Button
                      variant="primary"
                      style={{ backgroundColor: "black", padding: "15px" }}
                      onClick={handleLoadUsualAssignments}
                    >
                      Load Usual Assignment
                    </Button>
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#7f1d1d",
                        padding: "15px",
                        marginLeft: "20px",
                        borderColor: "#7f1d1d",
                      }}
                      onClick={handleLoadCustomAssignments}
                    >
                      Load Custom Assignment
                    </Button>
                  </div>
                </div>
              </Box>
            </Box>
          )}

          {!isLoadPressed && <div style={{ marginTop: "15px" }}></div>}
          {isUsualPlanActivated && (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  marginBottom: "30px",
                  marginLeft: "20px",
                  fontFamily: "Helvetica Neue",
                }}
              >
                Selected Assignment Plan : Usual
              </Typography>
              <div
                style={{
                  height: 450,
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
            </>
          )}
          <div style={{ minHeight: "70px" }}></div>
        </div>
      )}
      {!isLoadPressed && <div style={{ marginTop: "15px" }}></div>}
      {isCustomPlanActivated && (
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
              minWidth: "550px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              // padding: "0px 2px 30px 2px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CustomPostmanPlan />
          </Box>
        </Box>
      )}
    </div>
  );
}
