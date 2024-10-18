import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignInSection = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className="border-b border-neutral-900 bg-gray-800 px-[40px] pt-[30px] pb-[40px]">
      <h1 className="my-10 text-center text-4xl text-white">LIVE DEMO</h1>

      <div
        className="grid grid-cols-2 gap-8"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-span-1 text-center">
          <Button
            variant="contained"
            sx={{
              my: "40px",
              mb: "20px",
              backgroundColor: "#852318",
              color: "white",
              px: 5,
              fontSize: "14px",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#6b1918", // Darker shade for hover
              },
            }}
            type="button" // Change to button
            onClick={() => navigate("/admin/login")} // Navigate to the Postal Administration page
          >
            POSTAL ADMINISTRATION
          </Button>
          <p className="mt-2 text-neutral-300 text-lg">
            Access the Postal Administration panel to manage operations and
            oversee logistics.
          </p>
        </div>
        <div className="col-span-1 text-center">
          <Button
            variant="contained"
            sx={{
              my: "40px",
              mb: "20px",
              backgroundColor: "#852318",
              color: "white",
              px: 5,
              fontSize: "14px",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#6b1918", // Darker shade for hover
              },
            }}
            type="button" // Change to button
            onClick={() => navigate("/login")} // Navigate to the Customer Portal page
          >
            Customer PORTAL
          </Button>
          <p className="mt-2 text-neutral-300 text-lg">
            Enter the Customer Portal to track your mail and manage deliveries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInSection;
