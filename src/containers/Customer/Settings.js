import React from "react";
import { Box } from "@mui/material";
import PostForm from "../../components/Forms/PostForm";
import ImageCarousel from "../../components/Customer/ImageCarousel";
import NewBackgnd from "../../assets/Customer/NewBackgnd.jpg";

const Settings = () => {
  return (
    <div className="absolute w-full h-[90vh]">
      {/* Background Image */}
      <img
        src={NewBackgnd}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content Box */}
      <div className="relative z-10 flex mt-[10vh] justify-center w-full min-h-[50vh]">
        <div className="grid grid-cols-2 w-11/12 max-w-4xl">
          {/* Left Grid (Post Form) */}
          <div className="col-span-1 flex items-center justify-center">
            <Box
              sx={{
                display: "flex",
                //flexDirection: "column", //removing top space POST MIS
                //alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "70vh",
                backgroundColor: "#fff",
                padding: "5%",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="w-full flex flex-col items-center">
                <div className="text-2xl text-[#060606] font-semibold my-4">
                  POST OFFICE MIS
                </div>
                <div>
                  <PostForm />
                </div>
              </div>
            </Box>
          </div>

          {/* Right Grid (Image Carousel) */}
          <div className="col-span-1 flex items-center justify-center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "70vh",
                backgroundColor: "#e5e7eb",
                padding: "5%",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              {/* Image Carousel */}
              <div style={{ width: "100%", height: "100%" }}>
                <ImageCarousel />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
