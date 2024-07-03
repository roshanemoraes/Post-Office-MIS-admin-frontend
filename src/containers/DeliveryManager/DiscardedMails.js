import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

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
        "http://localhost:8081/api/delivery-manager/return-mail/discarded-mail"
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
