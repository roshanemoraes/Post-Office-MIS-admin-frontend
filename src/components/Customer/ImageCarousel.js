/*import * as React from "react";
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
}*/

/*import * as React from "react";
import Carousel from "react-bootstrap/Carousel";
import mailhistory from "../../assets/Customer/mail history.svg";
import addressUpdate from "../../assets/Customer/address update.svg";
import notification from "../../assets/Customer/notification.svg";
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
}*/
import * as React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import mailhistory from "../../assets/Customer/mail history.svg";
import addressUpdate from "../../assets/Customer/address update.svg";
import notification from "../../assets/Customer/notification.svg";

export default function ImageCarousel() {
  const items = [
    {
      image: mailhistory,
      alt: "First slide",
    },
    {
      image: addressUpdate,
      alt: "Second slide",
    },
    {
      image: notification,
      alt: "Third slide",
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Carousel
        indicators={false}
        navButtonsAlwaysVisible={true}
        autoPlay={true}
        animation="fade"
        duration={500}
        interval={3000}
        fullHeightHover={false}
      >
        {items.map((item, index) => (
          <Paper key={index} style={{ position: "relative", height: "100%" }}>
            <img
              src={item.image}
              alt={item.alt}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </Paper>
        ))}
      </Carousel>
    </div>
  );
}
