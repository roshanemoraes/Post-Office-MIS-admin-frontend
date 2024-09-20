import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { TypeSpecimenOutlined } from "@mui/icons-material";

export default function PostageTable() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("Normal Posts");

  const handleSelect = (eventKey) => {
    let mailType;
    let option;
    if (eventKey === "#/1") {
      mailType = "normal-post";
      option = "Normal Posts";
    } else if (eventKey === "#/2") {
      mailType = "courier-normal";
      option = "Normal Courier";
    } else if (eventKey === "#/3") {
      mailType = "parcel-gov";
      option = "Gov Parcel";
    } else if (eventKey === "#/4") {
      mailType = "parcel-normal";
      option = "Normal Parcel";
    }
    setSelectedOption(option);
    fetchData(mailType);
  };

  const columns = [
    { field: "id", headerName: "postageId", width: 110 },
    { field: "minWeight", headerName: "Min Weight", width: 120 },
    { field: "maxWeight", headerName: "Max Weight", width: 120 },
    { field: "price", headerName: "Postage", width: 100 },
  ];

  //   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/postage/list/${type}`,
        { withCredentials: true }
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
            style={{
              //   backgroundColor: "#000", // Button background color
              color: "#ffffff", // Button font color
              //   borderColor: "#007bff", // Button border color
            }}
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
        </div>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <div style={{ height: 509 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={40}
              getRowId={(row) => row.id}
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
                  fontSize: "14px",
                },
                "& .MuiDataGrid-columnHeader": {
                  height: "unset !important",
                },
                "& .MuiDataGrid-columnHeaders": {
                  maxHeight: "168px !important",
                  fontSize: "12px",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: "12px",
                },
                "& .MuiDataGrid-footerContainer": {
                  fontSize: "12px",
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                sorting: {
                  sortModel: [{ field: "minWeight", sort: "asc" }],
                },
              }}
              columnVisibilityModel={{
                id: false,
              }}
              disableColumnMenu={{
                minWeight: true,
                maxWeight: false,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
