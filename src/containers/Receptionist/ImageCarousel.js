import * as React from "react";

import Carousel from "react-bootstrap/Carousel";
import backgndimg1 from "./backgndimg1.jpg";
import backgndimg2 from "./backgndimg2.jpg";
import backgndimg3 from "./backgndimg3.jpg";

export default function ImageCarousel() {
  return (
    <>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block object-cover"
              style={{ width: "50%", height: "50%" }}
              src={backgndimg1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-full h-screen object-cover"
              src={backgndimg2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              classname="d-block w-full h-screen object-cover"
              src={backgndimg3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="min-h-[90px]"></div>
    </>
  );
}
