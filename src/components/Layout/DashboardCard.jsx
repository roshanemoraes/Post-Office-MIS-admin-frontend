import React from "react";
import { Card, CardBody } from "react-bootstrap";

const DashboardCard = ({ backgroundColor, title, value, iconSrc }) => {
  return (
    <Card
      // border="light"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderColor: "transparent",
        backgroundColor: "transparent",
        "--bs-card-bg": "transparent",
      }}
    >
      <CardBody
        style={{
          fontWeight: "bold",
          fontFamily: "sans-serif",
          backgroundColor: backgroundColor,
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          className="flex justify-left align-items-center"
          style={{
            color: "#6b7280",
            marginBottom: "10px",
            marginLeft: "6px",
            fontSize: "12px",
          }}
        >
          {title}
        </div>
        <div
          className="grid sm:grid-cols-6 xs:grid-cols-6"
          style={{ marginBottom: "10px" }}
        >
          <div className="sm:col-span-2 xs:col-span-2 flex justify-center align-items-center">
            <img src={iconSrc} alt="Mail Icon" />
          </div>
          <div
            className="sm:col-span-4 xs:col-span-4 flex justify-center align-items-center"
            style={{ fontSize: "22px" }}
          >
            {value}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DashboardCard;
