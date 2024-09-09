import React from "react";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Example data for graphs (you can adjust or add more data as needed)
const data = [
  { name: "Jan", count: 400, total: 2400 },
  { name: "Feb", count: 300, total: 2210 },
  { name: "Mar", count: 200, total: 2290 },
  { name: "Apr", count: 278, total: 2000 },
  { name: "May", count: 189, total: 2181 },
  { name: "Jun", count: 239, total: 2500 },
];

// Example data for registered mail table
const transactionData_Registered = [
  { id: "RM001", date: "01/09/2024", amount: "$200.00" },
  { id: "RM002", date: "02/09/2024", amount: "$150.00" },
  { id: "RM003", date: "03/09/2024", amount: "$180.00" },
];

// Example data for money orders
const transactionData_MoneyOrders = [
  { id: "MO001", date: "01/09/2024", amount: "$200.00" },
  { id: "MO002", date: "02/09/2024", amount: "$150.00" },
  { id: "MO003", date: "03/09/2024", amount: "$180.00" },
];
// Example data for couriers
const transactionData_Couriers = [
  { id: "C001", date: "01/09/2024", amount: "$200.00" },
  { id: "C002", date: "02/09/2024", amount: "$150.00" },
  { id: "C003", date: "03/09/2024", amount: "$180.00" },
];

// Example data for Bulk Mail
const transactionData_BulkMail = [
  { id: "BM001", date: "01/09/2024", amount: "$200.00" },
  { id: "BM002", date: "02/09/2024", amount: "$150.00" },
  { id: "BM003", date: "03/09/2024", amount: "$180.00" },
];

const FinancialMgmt = () => {
  return (
    <div className="px-4 pb-4">
      {/* Image and Heading 
      <div className="relative">
        <img
          src={imageSrc}
          alt="Financial Analysis"
          className="w-full h-64 object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/4 text-[#020617] text-7xl font-bold">
          Financial Analysis
        </h1>
      </div>*/}

      <div className="text-center text-[#020617] text-2xl font-bold mt-1 mb-1">
        FINANCIAL ANALYSIS
      </div>

      {/* Registered Mail Items Table */}
      <div className="grid grid-cols-1 mt-8 bg-white p-4 shadow rounded-lg">
        {/*<h2 className="text-xl font-semibold mb-4">Registered Mail Items</h2>*/}
        {/*Heading on each table*/}
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
          Registered Mail Items
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
        <div className="grid grid-cols-3 gap-4 font-bold bg-gray-100 p-2">
          <div>Mail ID</div>
          <div>Transaction Date</div>
          <div>Paid Amount</div>
        </div>
        {transactionData_Registered.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-4 border-b p-2">
            <div>{item.id}</div>
            <div>{item.date}</div>
            <div>{item.amount}</div>
          </div>
        ))}
      </div>

      {/* Money Orders Table */}
      <div className="grid grid-cols-1 mt-8 bg-white p-4 shadow rounded-lg">
        {/*<h2 className="text-xl font-semibold mb-4">Money Orders</h2>*/}

        {/*Heading on each table*/}
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
          Money Orders
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
        <div className="grid grid-cols-3 gap-4 font-bold bg-gray-100 p-2">
          <div>Mail ID</div>
          <div>Transaction Date</div>
          <div>Paid Amount</div>
        </div>
        {transactionData_MoneyOrders.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-4 border-b p-2">
            <div>{item.id}</div>
            <div>{item.date}</div>
            <div>{item.amount}</div>
          </div>
        ))}
      </div>

      {/* Couriers Table */}
      <div className="grid grid-cols-1 mt-8 bg-white p-4 shadow rounded-lg">
        {/*<h2 className="text-xl font-semibold mb-4">Couriers</h2>*/}

        {/*Heading on each table*/}
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
          Courier Items
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
        <div className="grid grid-cols-3 gap-4 font-bold bg-gray-100 p-2">
          <div>Mail ID</div>
          <div>Transaction Date</div>
          <div>Paid Amount</div>
        </div>
        {transactionData_Couriers.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-4 border-b p-2">
            <div>{item.id}</div>
            <div>{item.date}</div>
            <div>{item.amount}</div>
          </div>
        ))}
      </div>

      {/* Bulk Mail Orders Table */}
      <div className="grid grid-cols-1 mt-8 bg-white p-4 shadow rounded-lg">
        {/*<h2 className="text-xl font-semibold mb-4">Bulk Mail Orders</h2>*/}

        {/*Heading on each table*/}
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
        <div className="grid grid-cols-3 gap-4 font-bold bg-gray-100 p-2">
          <div>Mail ID</div>
          <div>Transaction Date</div>
          <div>Paid Amount</div>
        </div>
        {transactionData_BulkMail.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-4 border-b p-2">
            <div>{item.id}</div>
            <div>{item.date}</div>
            <div>{item.amount}</div>
          </div>
        ))}
      </div>

      {/* Graph Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {/* Card 1 */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Monthly Transactions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ minHeight: "100px" }}></div>
    </div>
  );
};

export default FinancialMgmt;
