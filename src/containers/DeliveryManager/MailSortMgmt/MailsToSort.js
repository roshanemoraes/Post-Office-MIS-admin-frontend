import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DownArrowIcon from "../../../assets/arrow-down-square-fill.svg";

export default function MailsToSort() {
  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const columns = [
    { field: "mailId", headerName: "Mail ID", width: 75 },
    { field: "customerId", headerName: "Cus ID", width: 75 },
    { field: "addressId", headerName: "Addr. Id", width: 90 },
    { field: "mailType", headerName: "Mail Type", width: 160 },
    { field: "in_area", headerName: "In-Area?", width: 90 },
    { field: "city", headerName: "City", width: 160 },
    { field: "datePosted", headerName: "Date Posted", width: 180 },
    // {
    //   field: "reason",
    //   headerName: "Return Reason",
    //   width: 250,
    // },
    // { field: "status", headerName: "Status", width: 220 },
    // { field: "deliverDate", headerName: "Return Date", width: 180 },
  ];
  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await minimumLoadingDuration(
        axios
          .get(
            "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/sort/all-pending",
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setRows(response.data);
            // console.log(response.data);
          }),
        process.env.REACT_APP_LOADING_DELAY
      );
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            All Mails To Sort
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
          <div style={{ marginLeft: "50px" }}></div>
        </div>
      )}
    </div>
  );
}
