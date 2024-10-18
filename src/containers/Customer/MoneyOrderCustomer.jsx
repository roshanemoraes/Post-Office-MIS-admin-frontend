import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import { mailFormField } from "../../data/formFields";
import axios from "axios";
import DownArrowIcon from "./../../assets/arrow-down-square-fill.svg";
import { useReactToPrint } from "react-to-print";
import { Button as MuiButton } from "@mui/material";
import MoneyOrderCustomerReceipt from "../../components/Receipts/MoneyOrderCustomerReceipt";

const MoneyOrderCustomer = () => {
  const initialFormState = {
    recipientName: "",
    recipientNIC: "",

    senderName: "",
    senderNIC: "",

    transferAmount: "",
    charge: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };

  const handlePayment = () => {
    // fetch("/api/payment", {
    //   // Your backend endpoint
    //   method: "POST",
    //   body: JSON.stringify(orderDetails),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.paymentUrl) {
    //       window.location.href = data.paymentUrl; // Redirect the user to the Stripe Checkout page
    //     }
    //   })
    //   .catch((error) => console.error("Payment creation failed", error));

    axios
      .post(
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/payment-gateway/customer/create"
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
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/receptionist/post/add/normal-post",
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
  const handleCharge = () => {
    setFormState((prevState) => ({
      ...prevState,
      charge: "400",
    }));
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
                    onClick={() => handleCharge()}
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
                    label={mailFormField.cost.label}
                    onChange={handleChange(mailFormField.cost.id)}
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

              <div className="mt-[1px]">
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
        <MoneyOrderCustomerReceipt formState={formState} receiptId={"2418"} />
      </div>
      <div className="min-h-[70px]"></div>
    </>
  );
};

export default MoneyOrderCustomer;
