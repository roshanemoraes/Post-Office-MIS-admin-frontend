import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DataGrid } from "@mui/x-data-grid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Spinner } from "react-bootstrap";
import checkIcon from "./../../assets/pencil-fill.svg";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DashboardInfoMailModel from "../../containers/Receptionist/modals/DashboardInfoMailModel";

export default function RegistrationSummary() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("Normal Posts");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = (eventKey) => {
    let mailType;
    let option;
    if (eventKey === "#/1") {
      mailType = "normal-post";
      option = "Normal Posts";
    } else if (eventKey === "#/2") {
      mailType = "normal-courier";
      option = "Normal Courier";
    } else if (eventKey === "#/3") {
      mailType = "gov-parcel";
      option = "Gov Parcel";
    } else if (eventKey === "#/4") {
      mailType = "normal-parcel";
      option = "Normal Parcel";
    }
    setSelectedOption(option);
    fetchData(mailType);
  };

  const columns_normal_posts = [
    { field: "mailId", headerName: "Mail ID", width: 100 },
    { field: "customerId", headerName: "Cus. Id", width: 100 },
    { field: "recipientId", headerName: "Recip. Id", width: 100 },
    { field: "addressId", headerName: "Addr. Id", width: 100 },
    { field: "zone", headerName: "Zone", width: 150 },
    { field: "city", headerName: "City", width: 140 },
    { field: "destinationAddress", headerName: "Address", width: 120 },
    {
      field: "route",
      headerName: "Action",
      width: 120,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <DashboardInfoMailModel data={params.row} />
          <Button
            title="Edit"
            style={{
              border: "none",
              background: "#fcd34d",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() => {
              //   handleOneReturnToSender(params.row);
            }}
          >
            <img src={checkIcon} alt="updateIcon" />
          </Button>

          {/* <SubmitRoute
              rowData={params.row}
              destinations={params.row.destinations}
            /> */}
        </div>
      ),
    },
  ];

  //   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8081/api/receptionist/summary/get-mails",
        {
          withCredentials: true,

          params: {
            mailType: type,
            datePosted: "2024-06-10",
          },
        }
      );
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching postages", error);
    } finally {
      //   await delay(250);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("normal-post");
  }, []);

  return (
    <>
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
        <div
          className="mt-1 mb-2"
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginLeft: "10px",
          }}
        >
          <DropdownButton
            id="dropdown-basic-button"
            size="sm"
            title={selectedOption}
            onSelect={handleSelect}
            variant="secondary"
          >
            <Dropdown.Item href="#/1">Normal Post</Dropdown.Item>
            <Dropdown.Item href="#/2">Normal Courier</Dropdown.Item>
            <Dropdown.Item href="#/3">Gov Parcel</Dropdown.Item>
            <Dropdown.Item href="#/4">Normal Parcel</Dropdown.Item>
          </DropdownButton>

          <div className="App" style={{ marginLeft: "20px", width: "150px" }}>
            {/* <Field
              as={TextField}
              name="employeeDateJoined"
              type="date"
              label="Date Joined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              //   onBlur={handleBlur}
              //   onChange={handleChange}
              //   error={Boolean(errors.employeeDateJoined)}
              helperText={
                <ErrorMessage name="employeeDateJoined" component="div" />
              }
            /> */}
          </div>
        </div>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <div style={{ height: 509 }}>
            <DataGrid
              rows={rows}
              columns={columns_normal_posts}
              rowHeight={40}
              getRowId={(row) => row.mailId}
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
                destinationAddress: false,
                // id: false,
              }}
              disableColumnMenu={
                {
                  // minWeight: true,
                  // maxWeight: false,
                  // destinations: true,
                  // status: false,
                  // action: true,
                }
              }
              // pageSizeOptions={[5, 5]}
            />
          </div>
        )}
      </div>
    </>
  );
}
