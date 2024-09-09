/*import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
////only 5 records are displayed in the table. handle that error
const columns = [

  {field: "mailId", headerName: "Mail ID", width: 200},
  { field: "mailType", headerName: "Mail Type", width: 150 },
  { field: "destinationAddress", headerName: "Reciever Address", width: 230 },
  { field: "recipientName", headerName: "Reciever Name", width: 200 },
  { field: "datePosted", headerName: "Posted Date", width: 250 },  
];

export default function PendingTable() {
    
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          	"https://8a488748-6746-4504-8705-1ecb6053c14a.mock.pstmn.io/Demo"  //- postman url
            //"http://localhost:8081/api/customer/list/pending/2"
        );
        console.log("request came!");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div style={{ height: 680, alignItems: "center", justifyContent: "center"}}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.mailId}
        columns={columns.map((column) => ({
          ...column,
        }))}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
                fontSize: '16px',
            },
            '& .MuiDataGrid-cell': {
                fontSize: '14px',
                color: "black",
            },
        }}
      />
    </div>
  );
}*/

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "mailId", headerName: "Mail ID", width: 200 },
  { field: "mailType", headerName: "Mail Type", width: 150 },
  { field: "destinationAddress", headerName: "Receiver Address", width: 230 },
  { field: "recipientName", headerName: "Receiver Name", width: 200 },
  { field: "datePosted", headerName: "Posted Date", width: 250 },
];

const rows = [
  {
    id: 1,
    mailId: 1,
    mailType: "Registered",
    destinationAddress: "23/45, 6th Street, Rathmalana",
    recipientName: "Rajesh Ganeshan",
    datePosted: "2022-10-10",
  },
  {
    id: 2,
    mailId: 2,
    mailType: "Normal post",
    destinationAddress: "23/45, 6th Street, Maharagama",
    recipientName: "Ramesh Yuwin",
    datePosted: "2022-10-10",
  },
  {
    id: 3,
    mailId: 3,
    mailType: "courier",
    destinationAddress: "2/4, 2nd Street, Mount Lavinia",
    recipientName: "Suresh Withana",
    datePosted: "2022-10-11",
  },
  {
    id: 4,
    mailId: 4,
    mailType: "Normal mail",
    destinationAddress: "23/45, 6th Street, Moratuwa",
    recipientName: "Mahesh Y.U.",
    datePosted: "2022-10-12",
  },
  {
    id: 5,
    mailId: 5,
    mailType: "Normal mail",
    destinationAddress: "23/45, 1st Street, Moratuwa",
    recipientName: "Ganesh Y.Y.",
    datePosted: "2022-10-13",
  },
  {
    id: 6,
    mailId: 6,
    mailType: "Courier",
    destinationAddress: "3/454, 13th Street, Rathmalana",
    recipientName: "Wimal Perera",
    datePosted: "2022-10-14",
  },
  {
    id: 7,
    mailId: 7,
    mailType: "Registered",
    destinationAddress: "2/45, 9th Street, mount Lavinia",
    recipientName: "Kaveen S.H.",
    datePosted: "2022-10-14",
  },
  {
    id: 8,
    mailId: 8,
    mailType: "Registered",
    destinationAddress: "3/145, 1st Lane, Rathmalana",
    recipientName: "Thamin Dimuth",
    datePosted: "2022-10-14",
  },
  {
    id: 9,
    mailId: 9,
    mailType: "Registered",
    destinationAddress: "2/67, Rodrigo Road, Katubedda",
    recipientName: "M.T.Dinesh",
    datePosted: "2022-10-14",
  },
  {
    id: 10,
    mailId: 10,
    mailType: "Registered",
    destinationAddress: "23/45, 6th Street, Moratuwa",
    recipientName: "Pahan Mansitha",
    datePosted: "2022-10-14",
  },
];

export default function PendingTable() {
  return (
    <div
      className="pt-1"
      style={{
        height: "550px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.mailId}
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
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
      />
    </div>
  );
}
