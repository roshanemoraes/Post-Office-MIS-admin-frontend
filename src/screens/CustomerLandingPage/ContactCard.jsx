import React from "react";
import { Card, CardBody } from "react-bootstrap";

const ContactCard = ({ backgroundColor, title, value, iconSrc }) => {
  return (
    <Card
      // border="light"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderColor: "transparent",
        //backgroundColor: "transparent",
        backgroundColor: "#fff",
        "--bs-card-bg": "transparent",
        padding: "10px 10px 100px 10px", //t,r,b,l
        borderRadius: "10px",
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
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <div className="flex justify-center h-[100%] align-items-center">
              <img src={iconSrc} alt="Mail Icon" />
            </div>
            <div
              className="flex justify-center align-items-center"
              style={{
                color: "#7f1d1d",
                marginBottom: "4px",
                marginLeft: "6px",
                fontSize: "24px",
              }}
            >
              {title}
            </div>
            <div
              className="flex justify-center align-items-center text-[#0c0a09]"
              style={{ fontSize: "18px" }}
            >
              {value}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ContactCard;
