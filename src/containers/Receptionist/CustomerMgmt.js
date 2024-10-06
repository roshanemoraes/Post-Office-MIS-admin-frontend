import React, { useState } from "react";
import axios from "axios";

const CustomerMgmt = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id"); // Set searchType to match backend format
  const [data, setData] = useState(null); // Set to null to handle no results scenario

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/receptionist/customer-detail/?searchType=${searchType}&searchTerm=${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      setData(response.data);
      console.log("Customer details:", response.data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
      setData(null); // Handle no results found
    }
  };

  return (
    <>
      <div
        className="p-6 bg-gray-50 m-[25px] mr-[150px]"
        style={{ borderRadius: "10px" }}
      >
        <div className="grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="col-span-1">
            <input
              type="text"
              placeholder={`Search by ${searchType}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded "
            />
          </div>

          <div className="  col-span-2 ">
            <button
              onClick={() => setSearchType("id")}
              className={`px-4 mr-[10px] py-2 rounded ${
                searchType === "id" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Search by ID
            </button>
            <button
              onClick={() => setSearchType("nic")}
              className={`px-4 py-2 mr-[10px] rounded ${
                searchType === "nic" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Customer NIC
            </button>
            <button
              onClick={() => setSearchType("contactNumber")}
              className={`px-4 py-2 rounded ${
                searchType === "contactNumber"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Contact Number
            </button>
          </div>
          <div className=" col-span-2 ">
            <button
              onClick={handleSearch}
              className="bg-red-900 text-white px-4 py-2 rounded gap-4"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="p-4" style={{ borderRadius: "10px" }}>
        {data ? (
          <div className="p-4 bg-white rounded">
            <p>
              <strong>ID:</strong> {data.customer.id}
            </p>
            <p>
              <strong>Name:</strong> {data.customer.fullName}
            </p>
            <p>
              <strong>Address:</strong> {data.address}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
      <div className="min-h-[90px]"></div>
    </>
  );
};

export default CustomerMgmt;
