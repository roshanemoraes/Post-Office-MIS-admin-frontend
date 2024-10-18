/*import React from "react";
import {
  HERO_CONTENT,
  HERO_MISSION,
  HERO_VISION,
} from "./../CustomerLandingPage/Constants";
//import profilePic from "./../assets/20240520_144938.jpg";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:mt-[10px] mt-[70px] lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-16 text-6xl font-bold tracking-tight lg:mt-16 lg:text-8xl"
            >
              Negombo Post Office
            </motion.h1>
            <motion.div
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="text-2xl font-light tracking-tight"
            >
              We are providing
            </motion.div>
            <div className="sm:h-[300px] lg:min-h-[50px]  lg:h-auto">
              <motion.span
                variants={container(0.6)}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-6xl pb-2 tracking-tight text-transparent "
                style={{
                  opacity: 1,
                  willChange: "auto",
                  transform: "none",
                }}
              >
                <Typewriter
                  words={[
                    "Real Time Delivery Tracking Service",
                    "Notification Service upon mail status",
                    "Fastest Delivery Service",
                  ]}
                  loop={false} // Set to false to run through each word once
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000} // Adjust delay between words
                />
              </motion.span>
            </div>

            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-[890px] py-6 font-light tracking-tighter text-justify "
              style={{ wordSpacing: "0.3em", fontSize: "20px" }}
            >
              {HERO_CONTENT}
            </motion.p>
          </div>
        </div>
        <div className="w-full sm:ml-[100px] lg:w-1/3 lg:p-8 lg:mt-[70px] mt-[130px]">
          <div className="flex flex-col items-center">
            
            <div className="w-full my-2">
              <div className="text-3xl font-bold">MISSION: </div>
              <motion.p
                variants={container(1)}
                initial="hidden"
                animate="visible"
                className="my-2 max-w-[890px] py-6 font-light tracking-tighter text-justify"
                style={{ wordSpacing: "0.3em" }}
              >
                {HERO_MISSION}
              </motion.p>
            </div>

            
            <div className="w-full my-2">
              <div className="text-3xl font-bold">VISION: </div>

              <motion.p
                variants={container(1)}
                initial="hidden"
                animate="visible"
                className="my-2 max-w-[890px] py-6 font-light tracking-tighter text-justify"
                style={{ wordSpacing: "0.3em" }}
              >
                {HERO_VISION}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;*/

import React from "react";
import {
  HERO_CONTENT,
  HERO_MISSION,
  HERO_VISION,
} from "./../CustomerLandingPage/Constants";
//import profilePic from "./../assets/20240520_144938.jpg";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:mt-[70px] mt-[130px] lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-16 text-6xl font-bold tracking-tight lg:mt-16 lg:text-8xl text-white"
            >
              Post Office MIS
            </motion.h1>
            <motion.div
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="text-2xl font-light tracking-tight mt-[20px] text-white"
            >
              We are providing
            </motion.div>
            <div className="sm:h-[300px] lg:min-h-[50px]  lg:h-auto mb-[5px]">
              <motion.span
                variants={container(0.6)}
                initial="hidden"
                animate="visible"
                //className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-6xl pb-2 tracking-tight text-transparent "
                className="bg-gradient-to-r from-[#ff4343] via-[#ff0000] to-[#ff4343] bg-clip-text text-6xl pb-2 tracking-tight text-transparent"
                style={{
                  opacity: 1,
                  willChange: "auto",
                  transform: "none",
                }}
              >
                <Typewriter
                  words={[
                    "Fast Delivery",
                    "Real Time Notification",
                    "Delivery Tracking",
                  ]}
                  loop={false} // Set to false to run through each word once
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000} // Adjust delay between words
                />
              </motion.span>
            </div>

            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-[890px] py-6 mt-[20px] font-light text-white text-[15px] tracking-tighter text-justify"
              style={{ wordSpacing: "0.4em" }}
            >
              {HERO_CONTENT}
            </motion.p>
          </div>
        </div>
        <div className="w-full sm:ml-[100px] lg:w-1/3 lg:p-8 lg:mt-[0px] mt-[130px]">
          <div className="flex flex-col items-center">
            {/*<motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              src={profilePic}
              alt="Adam Moraes"
            ></motion.img>*/}
            {/*Mission */}
            <div className="w-full my-2">
              <div className="text-3xl font-bold text-white">MISSION: </div>
              <motion.p
                variants={container(1)}
                initial="hidden"
                animate="visible"
                className="my-2 max-w-[890px] py-6 font-light tracking-tighter text-justify"
                style={{ wordSpacing: "0.3em" }}
              >
                {HERO_MISSION}
              </motion.p>
            </div>

            {/*Vision */}
            <div className="w-full my-2">
              <div className="text-3xl font-bold text-white">VISION: </div>

              <motion.p
                variants={container(1)}
                initial="hidden"
                animate="visible"
                className="my-2 max-w-[890px] py-6 font-light tracking-tighter text-justify"
                style={{ wordSpacing: "0.3em" }}
              >
                {HERO_VISION}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <div id="about-mis"></div>
    </div>
  );
};

export default Hero;
