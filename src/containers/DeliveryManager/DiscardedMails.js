import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DownArrowIcon from "../../assets/arrow-down-square-fill.svg";

export default function DiscardedMails() {
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "undeliverableId", headerName: "Return ID", width: 90 },
    { field: "mailId", headerName: "Mail ID", width: 90 },
    { field: "customer_id", headerName: "Cus ID", width: 90 },
    { field: "type", headerName: "Mail Type", width: 160 },
    {
      field: "reason",
      headerName: "Return Reason",
      width: 250,
    },
    { field: "status", headerName: "Status", width: 220 },
    { field: "deliverDate", headerName: "Return Date", width: 180 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   headerAlign: "center",
    //   renderCell: (params) => (
    //     <div>
    //       <InfoReturnMailModal data={params.row}/>
    //     </div>
    //   ),
    // },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/return-mail/discarded-mail",
        { withCredentials: true }
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

  return (
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
        All Discarded Mails
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
  );
}
