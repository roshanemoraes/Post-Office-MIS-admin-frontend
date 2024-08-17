import React from "react";
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import ReactDOMServer from "react-dom/server";

const PrintAllQRcodes = ({ rowsDistribution }) => {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    const qrCodeRows = rowsDistribution
      .map((row) => {
        const qrCodeValue = `ID:${row.distributionId}, ${row.vehicleId}, ${row.city}, ${row.date}`;
        const qrCodeElement = ReactDOMServer.renderToString(
          <QRCode value={qrCodeValue} size={256} level={"H"} />
        );
        return `
          <tr>
            <td style="border: 1px solid black; padding: 10px; text-align: center;">${row.city}</td>
            <td style="border: 1px solid black; padding: 10px; text-align: center;">${qrCodeElement}</td>
          </tr>
        `;
      })
      .join("");
    const qrCodeTable = `
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="width: 20%; border: 1px solid black; padding: 10px;">City</th>
          <th style="width: 80%; border: 1px solid black; padding: 10px;">QR</th>
        </tr>
        ${qrCodeRows}
      </table>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      `<html><head><title>All_QR_Codes_${dateString}</title></head><body>`
    );
    newWindow.document.write(qrCodeTable);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.focus();
    setTimeout(() => {
      newWindow.print();
      newWindow.close();
    }, 500);
  };

  return (
    <Button
      variant="primary"
      style={{ backgroundColor: "black", padding: "15px", marginLeft: "20px" }}
      onClick={handlePrint}
    >
      Print All QR Codes
    </Button>
  );
};

export default PrintAllQRcodes;
