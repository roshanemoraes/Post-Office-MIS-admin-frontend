import React, { useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "react-bootstrap";
import PrintIcon from "../../../assets/printer-fill.svg";
import SentIcon from "../../../assets/send-check-fill.svg";
import DeliveredIcon from "../../../assets/check-square-fill.svg";
import DownArrowIcon from "../../../assets/arrow-down-square-fill.svg";
import QRCode from "react-qr-code";
import ReactDOMServer from "react-dom/server";
import PrintAllQRcodes from "./PrintAllQRcodes";

export default function OutArea() {
  const [rows, setRows] = React.useState([]);
  const [rowsDistribution, setRowsDistribution] = React.useState([]);
  const qrCodeRef = useRef();

  const handlePrintQR = (city, date, distributionId, vehicleId) => {
    // const qrCodeValue = `ID:${distributionId}, VehicleId:${vehicleId}, City:${city}, Date:${date}`;
    const qrCodeValue = `ID:${distributionId}, ${vehicleId}, ${city}, ${date}`;
    const qrCodeElement = ReactDOMServer.renderToString(
      <QRCode value={qrCodeValue} size={256} level={"H"} />
    );
    const qrCodeContainer = document.createElement("div");
    qrCodeContainer.innerHTML = `
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="width: 20%; border: 1px solid black; padding: 10px;">City</th>
          <th style="width: 80%; border: 1px solid black; padding: 10px;">QR</th>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">${city}</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">${qrCodeElement}</td>
        </tr>
      </table>
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      `<html><head><title>${city}_${date}</title></head><body>`
    );
    newWindow.document.write(qrCodeContainer.innerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.focus();
    setTimeout(() => {
      newWindow.print();
      newWindow.close();
    }, 500);
  };

  const columns = [
    { field: "mailId", headerName: "Mail ID", width: 75 },
    { field: "customerId", headerName: "Cus ID", width: 75 },
    { field: "addressId", headerName: "Addr. Id", width: 90 },
    { field: "mailType", headerName: "Mail Type", width: 160 },
    { field: "city", headerName: "City", width: 160 },
    { field: "datePosted", headerName: "Date Posted", width: 180 },
  ];

  const columnsDistribution = [
    { field: "distributionId", headerName: "Distribution ID", width: 120 },
    { field: "vehicleId", headerName: "Vehicle Id", width: 100 },
    { field: "city", headerName: "City", width: 120 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <Button
            disabled={params.row.status === "Assigned"}
            title="Assign Mails"
            style={{
              border: "none",
              background: "#fcd34d",
              minWidth: "35px",
              marginRight: "10px",
            }}
            onClick={() =>
              handlePrintQR(
                params.row.city,
                params.row.date,
                params.row.distributionId,
                params.row.vehicleId
              )
            }
          >
            <img src={PrintIcon} alt="printIcon" />
          </Button>
          <div style={{ display: "none" }}>
            <div ref={qrCodeRef}></div>
          </div>

          <Button
            disabled={params.row.status === "Assigned"}
            title="Shipped"
            style={{
              border: "none",
              background: "#6ee7b7",
              minWidth: "35px",
              marginRight: "10px",
            }}
          >
            <img src={SentIcon} alt="sentIcon" />
          </Button>
          <Button
            disabled={params.row.status === "Assigned"}
            title="Delivered"
            style={{
              border: "none",
              background: "#f43f5e",
              minWidth: "35px",
              marginRight: "10px",
            }}
          >
            <img src={DeliveredIcon} alt="deliveredIcon" />
          </Button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/sort/all-pending-out-area",
        { withCredentials: true }
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchDistributions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/delivery-manager/sort/all-distribution-assignments",
        { withCredentials: true }
      );
      setRowsDistribution(response.data);
    } catch (e) {
      console.error("Error fetching distributions", e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDistributions();
  }, []);

  // const scrollToElement = () => {
  //   const element = document.getElementById("targetElement");
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  return (
    <div>
      <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
        <div>
          <Button
            disabled
            variant="primary"
            style={{ backgroundColor: "black", padding: "15px" }}
          >
            Assign Distributions
          </Button>
          <PrintAllQRcodes rowsDistribution={rowsDistribution} />
        </div>
      </div>
      <div
        style={{
          height: 550,
          paddingTop: "5px",
          display: "flex",
          marginBottom: "10px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataGrid
          rows={rowsDistribution}
          columns={columnsDistribution}
          rowHeight={50}
          getRowId={(row) => row.distributionId}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          // fontWeight: "bold",
          marginBottom: "10px",
          backgroundColor: "#a3a3a3",
        }}
      >
        All Out-Area Mails
        {/* <button onClick={scrollToElement}>
        </button> */}
        <img
          src={DownArrowIcon}
          alt="All Out-Area Mails"
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
      <div style={{ minHeight: "70px" }}></div>
      {/* <div id="targetElement"></div> */}
    </div>
  );
}
