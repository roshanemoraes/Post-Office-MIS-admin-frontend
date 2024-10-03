import { Box } from "@mui/material";
import React, { useState } from "react";
import ItemTable from "./ItemTable";
import DiscardedMails from "./../../../containers/DeliveryManager/DiscardedMails";

const Invoice = ({ discount, customerInfo, invoiceInfo }) => {
  const [Discount, setDiscount] = React.useState(discount);
  const [CustomerInfo, setCustomerInfo] = React.useState(customerInfo);
  const [InvoiceInfo, setInvoiceInfo] = React.useState(invoiceInfo);
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const [data, setData] = useState([
    {
      item: "Bulk Mail",
      quantity: CustomerInfo.mailCount,
      rate: 50,
      tax: 5,
      amount: (CustomerInfo.mailCount * 50 * 95) / 100,
    },
    {
      item: "Bulk Mail Tracking Fee",
      quantity: 1,
      rate: 1000,
      tax: 5,
      amount: 950,
    },
  ]);

  return (
    <div className="flex flex-col mt-4 ml-4 w-[210mm] h-[200mm] bg-white rounded-lg p-4 print:w-[210mm] print:h-[297mm] print:m-0 print:p-0 print:box-border">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <div className="font-serif min-h-[70px] text-[20px]">
            POST OFFICE MIS
          </div>
          <div>
            <div>Invoice Number: {InvoiceInfo.invoiceNumber}</div>
            <div>Date: {dateString}</div>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-end text-[40px]">
          <div className="font-serif px-2 bg-[#0369a1] text-white">INVOICE</div>
        </div>
      </div>
      <div className="mt-4 mb-4 min-h-[2px] bg-black"></div>
      <div className="grid grid-cols-2 pb-4 pt-1">
        <div className="col-span-1">
          <div className="font-bold font-times text-[21px] pb-1">
            Bill From:
          </div>
          <div>SL POST</div>
          <div>Kochchikade PO</div>
          <div>077-1234567</div>
        </div>
        <div className="col-span-1">
          <div className="font-bold font-times text-[21px] pb-1">Bill To:</div>
          <div>{customerInfo.senderName}</div>
          <div>{customerInfo.senderAddress}</div>
          {/* <div>{customerInfo.contact}</div> */}
        </div>
      </div>
      <div className="min-h-[2px] bg-black"></div>
      <div className="mt-3">
        <ItemTable items={data} discount={Discount} invoiceInfo={InvoiceInfo} />
      </div>
    </div>
  );
};

export default Invoice;
