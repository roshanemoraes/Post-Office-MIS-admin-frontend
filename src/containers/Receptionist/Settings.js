import React from "react";
import backgndimg1 from "./backgndimg1.jpg";
import { Box } from "@mui/material";
import PostForm from "./PostForm";
const Settings = () => {
  return (
    <>
      <div className="relative w-full flex justify-center max-h-[900px]">
        {/* Background Image */}
        <img
          src={backgndimg1}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content Box */}
        <div className="relative z-10 grid grid-cols-2 p-4 w-full h-full">
          <div className="col-span-1 flex items-center justify-center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                padding: "30px",
                //boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="w-2/3 p-10 flex flex-col justify-center items-center">
                <div className="text-2xl text-[#060606] font-semibold mb-6 ">
                  POST OFFICE MIS
                </div>
                <div>
                  <PostForm />
                </div>
              </div>
            </Box>
          </div>

          {/* <div className="col-span-1 flex items-center justify-center w-full h-full">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "#e5e7eb",
                padding: "30px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ width: "400px", height: "400px", padding: "30px" }}>
                <ImageCarousel />
              </div>
            </Box>
          </div> */}
        </div>
      </div>
      {/* <div className="min-h-[20px]"></div> */}
    </>
  );
};

export default Settings;
