import React, { useState, useEffect } from "react";
import aboutImg1 from "./../CustomerLandingPage/about1.jpg";
import aboutImg2 from "./../CustomerLandingPage/about2.jpg";
import aboutImg3 from "./../CustomerLandingPage/about3.jpg";
import aboutImg4 from "./../CustomerLandingPage/about4.jpg";
import { ABOUT_TEXT, ABOUT_TEXT_2 } from "../CustomerLandingPage/Constants";
import { motion } from "framer-motion";

const images = [aboutImg1, aboutImg2, aboutImg3, aboutImg4];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Automatically move to the next image after a specified interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 2500); // Change the image every 4 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const handlePrevClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 800); // Match the duration with the CSS transition
  };

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 800); // Match the duration with the CSS transition
  };

  return (
    <div id="about-mis" className="border-b border-neutral-900 pb-4">
      <h2 className="my-20 text-center text-4xl">ABOUT POST OFFICE MIS</h2>
      <div className="flex flex-wrap">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8"
        >
          <div className="relative flex items-center justify-center h-65 overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className={`rounded-2xl w-full h-full object-cover transform transition-transform duration-500 ease-in-out ${
                isTransitioning
                  ? "scale-105 opacity-0"
                  : "scale-100 opacity-100"
              }`}
            />
            <button
              className="absolute left-0 p-2 text-white bg-black bg-opacity-50 rounded-full"
              onClick={handlePrevClick}
            >
              &#10094;
            </button>
            <button
              className="absolute right-0 p-2 text-white bg-black bg-opacity-50 rounded-full"
              onClick={handleNextClick}
            >
              &#10095;
            </button>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div
            className="flex justify-center lg:justify-start text-justify"
            style={{ wordSpacing: "0.3em" }}
          >
            <p className="my-2 max-w-xl py-6">{ABOUT_TEXT}</p>
          </div>
          <div
            className="flex justify-center lg:justify-start text-justify"
            style={{ wordSpacing: "0.3em" }}
          >
            <p className="my-2 max-w-xl py-6">{ABOUT_TEXT_2}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
