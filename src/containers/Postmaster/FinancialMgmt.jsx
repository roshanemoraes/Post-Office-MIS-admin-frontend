import React, { useState } from "react";
import { Table, Select } from "antd";
import moment from "moment";
import DownArrowIcon from "../../assets/Customer/arrow-down-square-fill.svg";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";

// Sample data for transactions
const data = {
  normalPost: [
    { key: 1, date: "2024-01-12", amount: 150 },
    { key: 2, date: "2024-02-15", amount: 200 },
    { key: 3, date: "2024-03-20", amount: 250 },
  ],
  normalCourier: [
    { key: 1, date: "2024-01-05", amount: 300 },
    { key: 2, date: "2024-02-25", amount: 100 },
    { key: 3, date: "2024-03-12", amount: 400 },
  ],
  govParcel: [
    { key: 1, date: "2024-01-18", amount: 500 },
    { key: 2, date: "2024-02-12", amount: 600 },
    { key: 3, date: "2024-03-30", amount: 700 },
  ],
  normalParcel: [
    { key: 1, date: "2024-01-08", amount: 100 },
    { key: 2, date: "2024-02-10", amount: 250 },
    { key: 3, date: "2024-03-22", amount: 300 },
  ],
  bulkMailOrders: [
    { key: 1, date: "2024-01-22", amount: 900 },
    { key: 2, date: "2024-02-27", amount: 1100 },
    { key: 3, date: "2024-03-25", amount: 950 },
  ],
};

// Define columns for all tables
const columns = [
  {
    title: "Mail_Id",
    dataIndex: "mail_id",
    key: "mail_id",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => moment(text).format("YYYY-MM-DD"),
  },
  {
    title: "Postage",
    dataIndex: "postage",
    key: "postage",
  },
];

const FinancialMgmt = () => {
  const [selectedMonth, setSelectedMonth] = useState({});

  // Function to handle month selection for a table
  const handleMonthChange = (value, tableType) => {
    setSelectedMonth((prev) => ({
      ...prev,
      [tableType]: value,
    }));
  };

  // Function to filter data by selected month
  const filterByMonth = (transactions, month) => {
    if (!selectedMonth) {
      return transactions;
    }
    return transactions.filter((transaction) =>
      moment(transaction.date).isSame(month, "month")
    );
  };

  return (
    <div className="p-4 bg-[#fef9c3]">
      <div className="text-center text-[#020617] text-5xl font-bold mt-8 mb-8">
        Financial Analysis
      </div>

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
          onChange={(value) => handleMonthChange(value, "normalPost")}
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
        <Table
          columns={columns}
          dataSource={filterByMonth(
            data.normalPost,
            selectedMonth.normalPost
              ? moment().month(selectedMonth.normalPost - 1)
              : data.normalPost
          )}
          pagination={false}
        />
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
          onChange={(value) => handleMonthChange(value, "normalCourier")}
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
        <Table
          columns={columns}
          dataSource={filterByMonth(
            data.normalCourier,
            selectedMonth.normalCourier
              ? moment().month(selectedMonth.normalCourier - 1)
              : null
          )}
          pagination={false}
        />
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
          onChange={(value) => handleMonthChange(value, "govParcel")}
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
        <Table
          columns={columns}
          dataSource={filterByMonth(
            data.govParcel,
            selectedMonth.govParcel
              ? moment().month(selectedMonth.govParcel - 1)
              : null
          )}
          pagination={false}
        />
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
          onChange={(value) => handleMonthChange(value, "normalParcel")}
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
        <Table
          columns={columns}
          dataSource={filterByMonth(
            data.normalParcel,
            selectedMonth.normalParcel
              ? moment().month(selectedMonth.normalParcel - 1)
              : null
          )}
          pagination={false}
        />
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
          onChange={(value) => handleMonthChange(value, "bulkMailOrders")}
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
        <Table
          columns={columns}
          dataSource={filterByMonth(
            data.bulkMailOrders,
            selectedMonth.bulkMailOrders
              ? moment().month(selectedMonth.bulkMailOrders - 1)
              : null
          )}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default FinancialMgmt;
