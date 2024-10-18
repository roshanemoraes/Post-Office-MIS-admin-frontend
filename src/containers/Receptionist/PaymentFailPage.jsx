import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PaymentFailPage = () => {
  const [countdown, setCountdown] = useState(8); // Countdown starts from 10 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/admin/receptionist/money-order"); // Redirect to the home page or any other route
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <>
      <Box
        display="flex"
        paddingTop={2}
        flexDirection="row"
        justifyContent="space-around"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "45%",
            minWidth: "550px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "30px 2px 30px 2px",
            marginTop: "80px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <svg
              viewBox="0 0 24 24"
              className="text-red-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.657 16.243a1 1 0 01-1.414 0L12 12.414l-4.243 4.243a1 1 0 01-1.414-1.414L10.586 11 6.343 6.757a1 1 0 011.414-1.414L12 9.586l4.243-4.243a1 1 0 011.414 1.414L13.414 11l4.243 4.243a1 1 0 010 1.414z"
              ></path>
            </svg>
          </div>
          <div>Payment Failed!</div>
          <div>Error occured while processing the Money Order.</div>
          <div className="py-10 text-center">
            <Link
              to="/admin/receptionist/money-order"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
          <div className="py-10 text-center">
            Redirecting in {countdown} seconds...
          </div>
        </Box>
      </Box>
    </>
  );
};

export default PaymentFailPage;
