import React, { useState } from "react";
import { Table, Select } from "antd";
import moment from "moment";
import axios from 'axios';
import DownArrowIcon from "../../assets/Customer/arrow-down-square-fill.svg";
import { DataGrid } from "@mui/x-data-grid";

// Define columns for all tables
const columns = [
  {
    field: "id",
    headerName: "Mail ID",
    width: 150,
  },
  {
    field: "datePosted",
    headerName: "Date Posted",
    width: 250,
   // valueFormatter: (params) => moment(params.value).format("YYYY-MM-DD"),
  },
  {
    field: "dateDelivered",
    headerName: "Date Delivered",
    width: 250,
  },
  {
    field: "postage",
    headerName: "Postage",
    width: 250,
  },
  {
    field: "city",
    headerName: "City",
    width: 250,
  },
];



const FinancialMgmt = () => {


  const [normalPostRows, setNormalPostRows] = useState("");
  const [normalCouriertRows, setCourierPostRows] = useState("");
  const [normalParcelRows, setNormalParcelRows] = useState("");
  const [govParcelRows, setGovParcelRows] = useState("");
  const [bulkMailOrdersRows, setbulkMailOrdersRows] = useState("");

  //formatting to the format of the string
  // Function to format the date as 'year:month'
  const formatDate = (val) => {
    const date = new Date();
    const year = date.getFullYear();
    
    const month = ("0" + (val)).slice(-2); // Ensures two-digit month
    return `${year}-${month}`;
  };

  // Function to handle month selection for a table
  const handleMonthChange = async(monthNum, tableType) => {
    
    const datePrefix1 =formatDate(monthNum);
    console.log(datePrefix1);
    console.log(monthNum);
    try {
      
      const response = await axios.get('http://localhost:8081/api/mails/customer/financial', {
        params: {
          datePrefix: datePrefix1,
          mailType: tableType
        }
      });
      
      console.log(response.data);
       // Check the table type and update the corresponding state
    if (tableType === "normal-post") {
      setNormalPostRows(response.data);
    } else if (tableType === "courier-post") {
      setCourierPostRows(response.data);
    } else if (tableType === "normal-parcel") {
      setNormalParcelRows(response.data);
    } else if (tableType === "gov-parcel") {
      setGovParcelRows(response.data);
    } else if (tableType === "bulk-mail-orders") {
      setbulkMailOrdersRows(response.data);
    } else {
      console.error("Unknown tableType:", tableType);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }  
    console.log(normalPostRows);
  
  };

  return (
    <>
      <div className="p-4 bg-#a3a3a3">
        {/* Table for Normal Post */}
        <div className="mt-8 bg-white p-4 shadow rounded-lg">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#a3a3a3",
            }}
          >
            Normal Post
            <img
              src={DownArrowIcon}
              alt="Pending Mails"
              style={{
                marginRight: "10px",
                marginLeft: "20px",
                width: "30px",
                height: "30px",
              }}
            />
          </div>
          <Select
            placeholder="Select Month"
            onChange={(value) => handleMonthChange(value, "normal-post")}
            style={{
              width: 200,
              marginBottom: 20,
              color: "#696969",
            }}
          >
            {moment.months().map((month, index) => (
              <Select.Option key={index} value={index + 1}>
                {month}
              </Select.Option>
            ))}
          </Select>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={normalPostRows}
              pageSize={5}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
        </div>
        {/* Table for Normal Courier */}
        <div className="mt-8 bg-white p-4 shadow rounded-lg">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#a3a3a3",
            }}
          >
            Normal Courier
            <img
              src={DownArrowIcon}
              alt="Pending Mails"
              style={{
                marginRight: "10px",
                marginLeft: "20px",
                width: "30px",
                height: "30px",
              }}
            />
          </div>
          <Select
            placeholder="Select Month"
            onChange={(value) => handleMonthChange(value, "normal-courier")}
            style={{
              width: 200,
              marginBottom: 20,
              color: "#696969",
            }}
          >
            {moment.months().map((month, index) => (
              <Select.Option key={index} value={index + 1}>
                {month}
              </Select.Option>
            ))}
          </Select>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={normalCouriertRows}
              pageSize={5}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
        </div>
        {/* Table for Gov Parcel */}
        <div className="mt-8 bg-white p-4 shadow rounded-lg">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#a3a3a3",
            }}
          >
            Gov Parcel
            <img
              src={DownArrowIcon}
              alt="Pending Mails"
              style={{
                marginRight: "10px",
                marginLeft: "20px",
                width: "30px",
                height: "30px",
              }}
            />
          </div>
          <Select
            placeholder="Select Month"
            onChange={(value) => handleMonthChange(value, "gov-parcel")}
            style={{
              width: 200,
              marginBottom: 20,
              color: "#696969",
            }}
          >
            {moment.months().map((month, index) => (
              <Select.Option key={index} value={index + 1}>
                {month}
              </Select.Option>
            ))}
          </Select>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={govParcelRows}
              pageSize={5}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
        </div>
        {/* Table for Normal Parcel */}
        <div className="mt-8 bg-white p-4 shadow rounded-lg">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#a3a3a3",
            }}
          >
            Normal Parcel
            <img
              src={DownArrowIcon}
              alt="Pending Mails"
              style={{
                marginRight: "10px",
                marginLeft: "20px",
                width: "30px",
                height: "30px",
              }}
            />
          </div>
          <Select
            placeholder="Select Month"
            onChange={(value) => handleMonthChange(value, "normal-parcel")}
            style={{
              width: 200,
              marginBottom: 20,
              color: "#696969",
            }}
          >
            {moment.months().map((month, index) => (
              <Select.Option key={index} value={index + 1}>
                {month}
              </Select.Option>
            ))}
          </Select>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={normalParcelRows}
              pageSize={5}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
        </div>

        {/* Table for Bulk Mail Orders */}
        <div className="mt-8 bg-white p-4 shadow rounded-lg">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#a3a3a3",
            }}
          >
            Bulk Mail Orders
            <img
              src={DownArrowIcon}
              alt="Pending Mails"
              style={{
                marginRight: "10px",
                marginLeft: "20px",
                width: "30px",
                height: "30px",
              }}
            />
          </div>
          <Select
            placeholder="Select Month"
            onChange={(value) => handleMonthChange(value, "bulk-mail-orders")}
            style={{
              width: 200,
              marginBottom: 20,
              color: "#696969",
            }}
          >
            {moment.months().map((month, index) => (
              <Select.Option key={index} value={index + 1}>
                {month}
              </Select.Option>
            ))}
          </Select>
          <div style={{ height: 200, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={bulkMailOrdersRows}
              pageSize={5}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
        </div>
      </div>
      <div className="min-h-[90px]"></div>
    </>
  );
};

export default FinancialMgmt;
