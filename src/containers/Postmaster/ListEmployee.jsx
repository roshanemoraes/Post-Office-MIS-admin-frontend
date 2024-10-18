import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DownArrowIcon from "./../../assets/arrow-down-square-fill.svg";
import InfoCard from "../../components/Layout/InfoCard";
import { set } from "firebase/database";

export default function ListEmployee() {
  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };

  const columns = [
    { field: "id", headerName: " Emp ID", width: 80 },
    { field: "roles", headerName: "Role", width: 120 },
    { field: "fullName", headerName: "Full Name", width: 210 },
    { field: "nic", headerName: "NIC", width: 130 },
    { field: "email", headerName: "Email", type: "string", width: 240 },
    { field: "contactNumber", headerName: "Contact", width: 130 },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      await minimumLoadingDuration(
        axios
          .get(
            "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/postmaster/employee/list-employee",
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setRows(response.data);
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
    <>
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
          <>
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
              All Registered Employees
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

            <div className="grid grid-cols-12">
              <div className="col-span-2 flex flex-col pt-[4.5px] ">
                <div>
                  <InfoCard
                    backgroundColor={"#ffffff"}
                    title={"RECEPTIONIST COUNT"}
                    value={"6"}
                  />
                </div>
                <div>
                  <InfoCard
                    backgroundColor={"#ffffff"}
                    title={"MANAGER COUNT"}
                    value={"4"}
                  />
                </div>
                <div>
                  <InfoCard
                    backgroundColor={"#ffffff"}
                    title={"POSTMAN COUNT"}
                    value={"15"}
                  />
                </div>
              </div>
              <div
                className="col-span-10"
                style={{
                  height: 514,
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
                      paginationModel: { page: 0, pageSize: 8 },
                    },
                  }}
                />
              </div>
            </div>
            <div className="ml-[50px]"></div>
          </>
        )}
      </div>
    </>
  );
}
