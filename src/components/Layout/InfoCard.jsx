import React from "react";
import { Card, CardBody } from "react-bootstrap";

const InfoCard = ({ backgroundColor, title, value }) => {
  return (
    <Card
      // border="light"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderColor: "transparent",
        backgroundColor: "transparent",
        marginBottom: "12px",
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
          className="flex justify-center align-items-center"
          style={{ fontSize: "22px" }}
        >
          {value}
        </div>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
