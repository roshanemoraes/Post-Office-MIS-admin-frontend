import React from "react";
import { Card, CardBody } from "react-bootstrap";
import DoughnutChart from "../../containers/DeliveryManager/Charts/DoughnutChart";

const DeliveryManagerCustomCard1 = ({
  backgroundColor,
  title,
  value,
  iconSrc,
}) => {
  return (
    <>
      <Card
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderColor: "transparent",
          backgroundColor: "transparent",
          "--bs-card-bg": "transparent",
          width: "100%",
        }}
      >
        <CardBody
          style={{
            fontFamily: "sans-serif",
            backgroundColor: backgroundColor,
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div className="grid grid-cols-6">
            <div className="col-span-2 flex justify-center items-center">
              <div className="h-[140px] w-[140px] flex justify-center items-center">
                <DoughnutChart />
              </div>
            </div>
            <div className="col-span-4">
              <div
                className="flex justify-start justify-items-start"
                style={{
                  color: "#6b7280",
                  marginBottom: "4px",
                  marginLeft: "6px",
                  fontSize: "14px",
                }}
              >
                {title}
              </div>
              <div className="ml-[26px] mt-3">
                <div
                  className="flex items-center"
                  style={{ fontSize: "18px", marginBottom: "4px" }}
                >
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: "rgba(255, 99, 132, 1)",
                      marginRight: "10px",
                    }}
                  ></div>
                  <div>Return To Sender</div>
                </div>
                <div
                  className="flex items-center"
                  style={{ fontSize: "18px", marginBottom: "4px" }}
                >
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: "rgba(54, 162, 235, 1)",
                      marginRight: "10px",
                    }}
                  ></div>
                  <div>Address Update Required</div>
                </div>
                <div
                  className="flex items-center"
                  style={{ fontSize: "18px", marginBottom: "4px" }}
                >
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: "rgba(255, 206, 86, 1)",
                      marginRight: "10px",
                    }}
                  ></div>
                  <div>Address Update Pending</div>
                </div>
                <div
                  className="flex items-center"
                  style={{ fontSize: "18px", marginBottom: "4px" }}
                >
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: "rgba(75, 192, 192, 1)",
                      marginRight: "10px",
                    }}
                  ></div>
                  <div>Discarded</div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default DeliveryManagerCustomCard1;
