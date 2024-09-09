import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import mailhistory from "../../assets/Customer/mail history.svg";
import addressUpdate from "../../assets/Customer/address update.svg";
import notification from "../../assets/Customer/notification.svg";
export default function ImageCarousel() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block object-cover"
            style={{ width: "100%", height: "100%" }}
            src={mailhistory}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block object-cover"
            style={{ width: "100%", height: "100%" }}
            src={addressUpdate}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block object-cover"
            style={{ width: "100%", height: "100%" }}
            src={notification}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
