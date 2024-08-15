import React from "react";

const ItemTable = ({ items, discount, invoiceInfo }) => {
  const { InvoiceInfo, setInvoiceInfo } = React.useState(invoiceInfo);
  return (
    <>
      <div className="grid grid-cols-6 gap-0 mt-3 mb-4 pb-1 bg-[#e2e8f0]">
        <div className="col-span-2 p-1 bg-[#0369a1] text-white">Item</div>
        <div className="col-span-1 p-1 bg-[#0369a1] text-white">Qty</div>
        <div className="col-span-1 p-1 bg-[#0369a1] text-white">Rate(Rs.)</div>
        <div className="col-span-1 p-1 bg-[#0369a1] text-white">Tax</div>
        <div className="col-span-1 p-1 bg-[#0369a1] text-white">
          Amount(Rs.)
        </div>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="col-span-2 p-1">{item.item}</div>
            <div className="col-span-1 p-1">{item.quantity}</div>
            <div className="col-span-1 p-1">{item.rate}</div>
            <div className="col-span-1 p-1">{item.tax}%</div>
            <div className="col-span-1 p-1">{item.amount}</div>
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          minHeight: "2px",
          backgroundColor: "black",
        }}
      ></div>
      <div
        className="grid grid-cols-6 gap-4 p-4"
        // style={{ backgroundColor: "red" }}
      >
        <div className="col-span-3"></div>
        <div className="col-span-2">Subtotal</div>
        <div className="col-span-1">{invoiceInfo.subtotal}</div>
        <div className="col-span-3"></div>
        <div className="col-span-2">
          <div>Discount({discount}%)</div>
          <div
            style={{
              minHeight: "2px",
              backgroundColor: "black",
              marginTop: "2px",
            }}
          ></div>
        </div>
        <div className="col-span-1">
          <div>{invoiceInfo.discount}</div>
          <div
            style={{
              minHeight: "2px",
              backgroundColor: "black",
              marginTop: "2px",
            }}
          ></div>
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-2 font-bold">Total</div>
        <div className="col-span-1">{invoiceInfo.total}</div>
      </div>
    </>
  );
};

export default ItemTable;
