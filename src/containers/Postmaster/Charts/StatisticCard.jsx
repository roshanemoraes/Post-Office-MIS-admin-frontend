import React from "react";
import { Card, CardBody } from "react-bootstrap";

const StatisticCard = ({ title, backgroundColor }) => {
  return (
    <div>
      <Card
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderColor: "transparent",
          backgroundColor: "transparent",
          "--bs-card-bg": "transparent",
        }}
      >
        <CardBody
          style={{
            fontFamily: "sans-serif",
            backgroundColor: backgroundColor,
            padding: "10px",
            borderRadius: "10px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {title}
        </CardBody>
      </Card>
    </div>
  );
};

export default StatisticCard;
