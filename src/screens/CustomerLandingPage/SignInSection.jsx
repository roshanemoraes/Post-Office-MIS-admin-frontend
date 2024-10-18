////////THIS IS THE SIGN IN PAGE OF THE CUSTOMER LANDING PAGE////////
import { Button } from "@mui/material";
import React from "react";

const SignInSection = () => {
  return (
    <div id="signinsection" className="border-b border-neutral-900 pb-4">
      <h1 className="my-10 text-center text-4xl">SIGN IN</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            my: "40px",
            mb: "20px",
            mr: "60px",
            backgroundColor: "#852318",
            color: "white",
            px: 5,
            fontSize: "14px",
            borderRadius: "6px",
          }}
          type="submit"
        >
          Staff
        </Button>

        <Button
          variant="contained"
          sx={{
            my: "40px",
            mb: "20px",
            mr: "60px",
            backgroundColor: "#852318",
            color: "white",
            px: 5,
            fontSize: "14px",
            borderRadius: "6px",
          }}
          type="submit"
        >
          Customer
        </Button>
      </div>
    </div>
  );
};

export default SignInSection;
