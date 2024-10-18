import React, { useState } from "react";
import { Button, FormCheck, Modal } from "react-bootstrap";
import { Button as MuiButton } from "@mui/material";

const ReturnToSenderNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);

  const validationResult = () => {
    console.log("Notification Preparing....");

    // setShow(true);
    // axios
    //   .post("https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/receptionist/address/validate", data)
    //   .then((response) => {
    //     console.log("validation result came, success!");
    //     setValidatedResponse(response.data);
    //     setIsValid(true);
    //     setShow(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
      {/* <MuiButton
        variant="contained"
        sx={{
          my: "10px",
          mb: "10px",
          mr: "0px",
          ml: "32px",
          backgroundColor: "#852318",
          color: "white",
          px: 2,
          fontSize: "10px",
          borderRadius: "6px",
          alignSelf: "flex-start",
        }}
        onClick={validationResult}
      >
        Send Notification
      </MuiButton> */}
    </>
  );
};

export default ReturnToSenderNotification;
