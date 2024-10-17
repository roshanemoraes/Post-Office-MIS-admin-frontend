import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import HorizontalLinearStepper from "./MailRegistration/NormalParcelStepper";

const NormalParcelPost = () => {
  const initialFormState = {
    recipientName: "",
    recipientCity: "",
    recipientAddress: "",
    recipientPostalZone: "",
    recipientHouseNumber: "",
    recipientId: "",

    senderId: "",
    senderName: "",
    senderCity: "",
    senderAddress: "",
    senderPostalZone: "",
    senderHouseNumber: "",

    packageType: "",
    postage: "",
  };

  const theme = useTheme();
  const [verifiedAddressText, setVerifiedAddressText] = useState();
  const [verifiedAddressId, setVerifiedAddressId] = useState();
  const [verifiedAddressCoordinate_Lat, setVerifiedAddressCoordinate_Lat] =
    useState();
  const [verifiedAddressCoordinate_Lng, setVerifiedAddressCoordinate_Lng] =
    useState();

  useEffect(() => {
    if (
      verifiedAddressText ||
      verifiedAddressId ||
      verifiedAddressCoordinate_Lat ||
      verifiedAddressCoordinate_Lng
    ) {
      console.log(
        "verifiedAddressCoordinate_Lat: ",
        verifiedAddressCoordinate_Lat
      );
      console.log(
        "verifiedAddressCoordinate_Lng: ",
        verifiedAddressCoordinate_Lng
      );
      console.log("verifiedAddressId: ", verifiedAddressId);
      console.log("verifiedAddressText: ", verifiedAddressText);
    }
  }, [
    verifiedAddressCoordinate_Lat,
    verifiedAddressCoordinate_Lng,
    verifiedAddressId,
    verifiedAddressText,
  ]);

  const componentRef = useRef();

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
            width: "60%",
            minWidth: "550px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "30px 2px 30px 2px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              fontSize: "22px",
              marginBottom: "35px",
              fontFamily: "Helvetica Neue",
            }}
          >
            Normal Parcel Post
          </Typography>
          <div style={{ width: "90%" }}>
            <HorizontalLinearStepper />
          </div>
        </Box>
      </Box>
    </>
  );
};

export default NormalParcelPost;
