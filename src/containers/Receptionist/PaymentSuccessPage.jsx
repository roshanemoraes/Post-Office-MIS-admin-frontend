import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
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
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          </div>
          <div>Payment Done!</div>
          <div>Money Order has successfully placed.</div>
          <div className="py-10 text-center">
            <Link
              to="#"
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

export default PaymentSuccessPage;
