import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import CustomTextField from "../../components/Custom/CustomTextField";
import { mailFormField } from "../../data/formFields";
import CostForm from "../../components/Forms/CostForm";
import AddressValidationModal from "./AddressValidationModal";
import SenderAddressValidationModel from "./modals/SenderAddressValidationModel";
import axios from "axios";
import DownArrowIcon from "./../../assets/arrow-down-square-fill.svg";
import NormalMailReceipt from "./../../components/Receipts/NormalMailReceipt";
import { useReactToPrint } from "react-to-print";
import { Button as MuiButton } from "@mui/material";
import MoneyOrderReceipt from "../../components/Receipts/MoneyOrderReceipt";

const MoneyOrders = () => {
  const initialFormState = {
    recipientName: "",
    recipientNIC: "",

    senderName: "",
    senderNIC: "",

    transferAmount: "",
    charge: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [checked, setChecked] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientCity, setRecipientCity] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [addressType, setAddressType] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedAddressText, setVerifiedAddressText] = useState();
  const [verifiedAddressId, setVerifiedAddressId] = useState();
  const [verifiedAddressCoordinate_Lat, setVerifiedAddressCoordinate_Lat] =
    useState();
  const [verifiedAddressCoordinate_Lng, setVerifiedAddressCoordinate_Lng] =
    useState();

  const [verifiedSenderAddressText, setVerifiedSenderAddressText] = useState();
  const [verifiedSenderAddressId, setVerifiedSenderAddressId] = useState();
  const [
    verifiedSenderAddressCoordinate_Lat,
    setVerifiedSenderAddressCoordinate_Lat,
  ] = useState();
  const [
    verifiedSenderAddressCoordinate_Lng,
    setVerifiedSenderAddressCoordinate_Lng,
  ] = useState();

  const cityList = ["Negombo", "Colombo", "Kochchikade", "Katunayaka"];
  const zoneList = [
    "Daluwakotuwa",
    "Walihena",
    "Pallansena South",
    "Pallansena North",
  ];

  const handleOnValidationResult = (data) => {
    setVerifiedAddressText(data.textForm);
    setVerifiedAddressId(data.addressId);
    setVerifiedAddressCoordinate_Lat(data.lat);
    setVerifiedAddressCoordinate_Lng(data.lng);
    setFormState((prevState) => ({
      ...prevState,
      recipientAddress: data.textForm,
    }));
  };

  const handleSenderOnValidationResult = (data) => {
    setVerifiedAddressText(data.textForm);
    setVerifiedAddressId(data.addressId);
    setVerifiedAddressCoordinate_Lat(data.lat);
    setVerifiedAddressCoordinate_Lng(data.lng);
    setFormState((prevState) => ({
      ...prevState,
      senderAddress: data.textForm,
    }));
  };

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

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };
  const handleSenderCheckBox = () => {
    setChecked(!checked);
    if (checked) {
      formState.senderName = "";
      formState.senderCity = "";
      formState.senderAddress = "";
      formState.senderPostalZone = "";
      formState.senderHouseNumber = "";
    }
  };

  const handleGetCharge = () => {
    setFormState((prevState) => ({
      ...prevState,
      charge: "400",
    }));
  };

  const handlePayment = () => {
    axios
      .post(
        `http://localhost:8081/api/payment-gateway/create?id=2&amount=${formState.transferAmount}`
      )
      .then((response) => {
        const data = response.data;
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl; // Redirect the user to the Stripe Checkout page
        }
      })
      .catch((error) => console.error("Payment creation failed", error));
  };

  const handleSubmit = () => {
    console.log(formState);
    axios
      .post(
        "http://localhost:8081/api/receptionist/post/add/normal-post",
        formState,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div>
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
              backgroundColor: "#f5f5f5",
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
                marginBottom: "10px",
                fontFamily: "Helvetica Neue",
              }}
            >
              Money Orders
            </Typography>
            <Box
              component="form"
              display="flex"
              alignItems="flex-start"
              sx={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column", //changed
                alignItems: "center",
                "& .MuiTextField-root": {
                  fontSize: "15px",
                  marginTop: "10px",
                },
              }}
            >
              <div className="grid sm:grid-cols-12 xs:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                <div className="sm:col-span-3 xs:col-span-3 sm:mr-5 xs:mr-5 sm:min-w-[150px] xs:min-w-[150px] sm:min-h-[60px] xs:min-h-[60px]">
                  <TextField
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{
                      style: { fontSize: 13 },
                    }}
                    required
                    type={mailFormField.senderNIC.type}
                    id={mailFormField.senderNIC.id}
                    label={mailFormField.senderNIC.label}
                    onChange={handleChange(mailFormField.senderNIC.id)}
                  ></TextField>
                </div>
                <div className="sm:col-span-7 xs:col-span-7 sm:ml-9 xs:ml-9 sm:mr-2 xs:mr-2 sm:min-w-[300px] xs:min-w-[300px] sm:min-h-[60px] xs:min-h-[60px]">
                  <TextField
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{
                      style: { fontSize: 13, width: "500px" },
                    }}
                    style={{ minWidth: 324 }}
                    required
                    type={mailFormField.senderName.type}
                    id={mailFormField.senderName.id}
                    label={mailFormField.senderName.label}
                    onChange={handleChange(mailFormField.senderName.id)}
                  ></TextField>
                </div>
              </div>
              <div>
                <div>
                  <div className="grid sm:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                    <div className="sm:col-span-3 sm:mr-5 min-w-[150px] min-h-[60px]">
                      <TextField
                        inputProps={{ style: { fontSize: 15 } }}
                        InputLabelProps={{
                          style: { fontSize: 13 },
                        }}
                        required
                        type={mailFormField.recipientNIC.type}
                        id={mailFormField.recipientNIC.id}
                        label={mailFormField.recipientNIC.label}
                        onChange={handleChange(mailFormField.recipientNIC.id)}
                      ></TextField>
                    </div>
                    <div className="sm:col-span-7 sm:ml-9 sm:mr-2 sm:min-w-[300px] sm:min-h-[60px]">
                      <TextField
                        inputProps={{ style: { fontSize: 15 } }}
                        InputLabelProps={{
                          style: { fontSize: 13, width: "500px" },
                        }}
                        style={{ minWidth: 324 }}
                        required
                        type={mailFormField.recipientName.type}
                        id={mailFormField.recipientName.id}
                        label={mailFormField.recipientName.label}
                        onChange={handleChange(mailFormField.recipientName.id)}
                      ></TextField>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <SenderAddressValidationModel
                    formState={formState}
                    onValidationSenderResult={handleSenderOnValidationResult}
                  />
                </div> */}
                <div>
                  <TextField
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{
                      style: { fontSize: 13 },
                    }}
                    style={{ minWidth: 250, marginLeft: "32px" }}
                    required
                    type={mailFormField.transferAmount.type}
                    id={mailFormField.transferAmount.id}
                    label={mailFormField.transferAmount.label}
                    onChange={handleChange(mailFormField.transferAmount.id)}
                    value={formState.senderAddress}
                  ></TextField>
                  <MuiButton
                    variant="contained"
                    sx={{
                      my: "10px",
                      mt: "20px",
                      mb: "10px",
                      mr: "0px",
                      ml: "12px",
                      backgroundColor: "#fde68a",
                      color: "black",
                      px: 2,
                      fontSize: "10px",
                      borderRadius: "6px",
                      alignSelf: "flex-start",
                      ":hover": {
                        backgroundColor: "#fcd34d",
                      },
                    }}
                    onClick={handleGetCharge}
                  >
                    Get charge
                  </MuiButton>
                </div>
                <div>
                  <TextField
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { fontSize: 13 },
                    }}
                    style={{ minWidth: 250, marginLeft: "32px" }}
                    type={mailFormField.cost.type}
                    id={mailFormField.cost.id}
                    // label={mailFormField.cost.label}
                    // onChange={handleGetCharge()}
                    // onChange={handleChange(mailFormField.cost.id)}
                    value={formState.charge}
                  ></TextField>
                </div>
                <div
                  className="bg-[#caced4] ml-[32px] mt-[20px] mb-[10px] h-[1px]"
                  style={{ width: "88%" }}
                ></div>

                <div>
                  <MuiButton
                    variant="contained"
                    sx={{
                      my: "10px",
                      mb: "10px",
                      mr: "0px",
                      mt: "25px",
                      ml: "32px",
                      backgroundColor: "#852318",
                      color: "white",
                      px: 2,
                      fontSize: "10px",
                      borderRadius: "6px",
                      alignSelf: "flex-start",
                    }}
                    onClick={handlePayment}
                  >
                    Proceed To payment
                  </MuiButton>
                </div>
              </div>
              <div className="grid grid-cols-12 mt-[40px]">
                <div className="col-span-9">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#852318",
                      color: "white",
                      px: 5,
                      ml: "50px",
                      fontSize: "14px",
                      borderRadius: "6px",
                    }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
                <div className="col-span-3 mt-[1px]">
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "#000",
                      padding: "8px",
                      borderColor: "#0891b2",
                      color: "#fff",
                      fontSize: "11px",
                      fontFamily: "arial",
                      ml: "40px",
                    }}
                    onClick={handlePrint}
                  >
                    PRINT Receipt
                  </Button>
                </div>
              </div>

              <div></div>
            </Box>
          </Box>
        </Box>
      </div>
      <div
        // className="mt-30"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          marginTop: "70px",
          // fontWeight: "bold",
          marginBottom: "10px",
          backgroundColor: "#a3a3a3",
        }}
      >
        RECEIPT
        <img
          src={DownArrowIcon}
          alt="All Out-Area Mails"
          style={{
            marginRight: "10px",
            marginLeft: "20px",
            width: "30px",
            height: "30px",
          }}
        />
      </div>
      <div ref={componentRef}>
        <MoneyOrderReceipt formState={formState} receiptId={"2418"} />
      </div>
      <div className="min-h-[70px]"></div>
    </>
  );
};

export default MoneyOrders;
