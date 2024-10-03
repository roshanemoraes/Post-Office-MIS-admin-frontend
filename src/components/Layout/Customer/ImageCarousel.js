/*import * as React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import mailhistory from "../../../assets/Customer/mail history.svg";
import addressUpdate from "../../../assets/Customer/address update.svg";
import notification from "../../../assets/Customer/notification.svg";
import "../../containers/Customer/NavBar.css";

export default function ImageCarousel() {
  useEffect(() => {
    // Dynamically import the Bootstrap CSS
    import("bootstrap/dist/css/bootstrap.min.css");
  });
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
}*/
import * as React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import mailhistory from "../../assets/Images/mail history.svg";
import addressUpdate from "../../assets/Images/address update.svg";
import notification from "../../assets/Images/notification.svg";
import { useEffect } from "react";
export default function ImageCarousel() {
  useEffect(() => {
    // Dynamically import the Bootstrap CSS
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);
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
