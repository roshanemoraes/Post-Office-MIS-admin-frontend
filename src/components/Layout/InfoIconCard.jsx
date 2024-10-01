import React from "react";
import { Card, CardBody } from "react-bootstrap";

const InfoIconCard = ({ backgroundColor, title, value, iconSrc }) => {
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
          //   fontWeight: "",
          fontFamily: "sans-serif",
          backgroundColor: backgroundColor,
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <div className="flex justify-center h-[100%] align-items-center">
              <img src={iconSrc} alt="Mail Icon" />
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="flex justify-center align-items-center"
              style={{
                color: "#6b7280",
                marginBottom: "4px",
                marginLeft: "6px",
                fontSize: "14px",
              }}
            >
              {title}
            </div>
            <div
              className="flex justify-center align-items-center"
              style={{ fontSize: "24px" }}
            >
              {value}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InfoIconCard;
