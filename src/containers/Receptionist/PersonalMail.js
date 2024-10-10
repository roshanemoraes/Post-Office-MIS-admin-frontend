import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { mailFormField } from "../../data/formFields";
import CostForm from "../../components/Forms/CostForm";
import AddressValidationModal from "./AddressValidationModal";
import SenderAddressValidationModel from "./modals/SenderAddressValidationModel";
import axios from "axios";
import DownArrowIcon from "./../../assets/arrow-down-square-fill.svg";
import NormalMailReceipt from "./../../components/Receipts/NormalMailReceipt";
import { useReactToPrint } from "react-to-print";
import { useFormik } from "formik";
import * as Yup from "yup";

const PersonalMail = () => {
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

    postage: "",
  };

  const theme = useTheme();
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
  const handleCostUpdate = (cost) => {
    setFormState((prevState) => ({
      ...prevState,
      postage: cost,
    }));
    formik.setFieldValue("postage", cost);
  };

  const handleOnValidationResult = (data, data1) => {
    console.log("data: ", data1);
    setVerifiedAddressText(data.textForm);
    setVerifiedAddressId(data.addressId);
    setVerifiedAddressCoordinate_Lat(data.lat);
    setVerifiedAddressCoordinate_Lng(data.lng);
    setFormState((prevState) => ({
      ...prevState,
      recipientAddress: data.textForm,
      recipientId: data1,
    }));
    formik.setFieldValue("recipientAddress", data.textForm);
    formik.setFieldValue("recipientId", data1);
  };

  const handleSenderOnValidationResult = (data, data1) => {
    setVerifiedAddressText(data.textForm);
    setVerifiedAddressId(data.addressId);
    setVerifiedAddressCoordinate_Lat(data.lat);
    setVerifiedAddressCoordinate_Lng(data.lng);
    setFormState((prevState) => ({
      ...prevState,
      senderAddress: data.textForm,
      senderId: data1,
    }));
    formik.setFieldValue("senderAddress", data.textForm);
    formik.setFieldValue("senderId", data1);
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

  const validationSchema = Yup.object().shape({
    recipientName: Yup.string()
      .required("Recipient Name is required")
      .typeError("Recipient Name is a string"),
    recipientCity: Yup.string().required("Recipient City is required"),
    recipientAddress: Yup.string().required("Recipient Address is required"),
    recipientPostalZone: Yup.string().required(
      "Recipient Postal Zone is required"
    ),
    recipientHouseNumber: Yup.string().required(
      "Recipient House Number is required"
    ),
    senderName: Yup.string().when("checked", {
      is: true,
      then: Yup.string().required("Sender Name is required"),
    }),
    senderCity: Yup.string().when("checked", {
      is: true,
      then: Yup.string().required("Sender City is required"),
    }),
    senderAddress: Yup.string().when("checked", {
      is: true,
      then: Yup.string().required("Sender Address is required"),
    }),
    senderPostalZone: Yup.string().when("checked", {
      is: true,
      then: Yup.string().required("Sender Postal Zone is required"),
    }),
    senderHouseNumber: Yup.string().when("checked", {
      is: true,
      then: Yup.string().required("Sender House Number is required"),
    }),
    postage: Yup.number().required("Postage is required"),
  });

  const formik = useFormik({
    initialValues: initialFormState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
      setIsSubmitted(true);
    },
  });

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };
  const handleSenderCheckBox = () => {
    setChecked(!checked);
    if (checked) {
      formik.setFieldValue("senderName", "");
      formik.setFieldValue("senderCity", "");
      formik.setFieldValue("senderAddress", "");
      formik.setFieldValue("senderPostalZone", "");
      formik.setFieldValue("senderHouseNumber", "");
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="grid sm:grid-cols-12 grid-cols-1">
        <div className="rounded-lg sm:col-span-6 min-h-[100px] bg-white-500  items-center justify-center">
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
                Normal Post
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
                // onSubmit={formik.handleSubmit}
              >
                <div className="grid sm:grid-cols-12 xs:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                  <div className="sm:col-span-3 xs:col-span-3 sm:mr-5 xs:mr-5 sm:min-w-[150px] xs:min-w-[150px] sm:min-h-[60px] xs:min-h-[60px]">
                    <TextField
                      inputProps={{ style: { fontSize: 15 } }}
                      InputLabelProps={{
                        style: { fontSize: 13 },
                      }}
                      required
                      type={mailFormField.recipientHouseNumber.type}
                      id={mailFormField.recipientHouseNumber.id}
                      label={mailFormField.recipientHouseNumber.label}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.recipientHouseNumber}
                      error={
                        formik.touched.recipientHouseNumber &&
                        Boolean(formik.errors.recipientHouseNumber)
                      }
                      helperText={
                        formik.touched.recipientHouseNumber &&
                        formik.errors.recipientHouseNumber
                      }
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
                      type={mailFormField.recipientName.type}
                      id={mailFormField.recipientName.id}
                      label={mailFormField.recipientName.label}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.recipientName}
                      error={
                        formik.touched.recipientName &&
                        Boolean(formik.errors.recipientName)
                      }
                      helperText={
                        formik.touched.recipientName &&
                        formik.errors.recipientName
                      }
                    ></TextField>
                  </div>
                </div>

                <div className="grid sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8 sm:grid-cols-12 xs:grid-cols-12">
                  <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-0 xs:ml-0 min-w-[235px] min-h-[60px] bg-white-500 ">
                    <Autocomplete
                      id={mailFormField.recipientPostalZone.id}
                      options={zoneList}
                      freeSolo
                      onChange={(event, newValue) => {
                        formik.setFieldValue(
                          mailFormField.recipientPostalZone.id,
                          newValue
                        );
                      }}
                      sx={{
                        "& .MuiAutocomplete-option": {
                          color: "blue",
                        },
                        '& .MuiAutocomplete-option[data-focus="true"]': {
                          backgroundColor: "lightgray",
                        },
                        '& .MuiAutocomplete-option[data-focus="true"][aria-selected="true"]':
                          {
                            backgroundColor: "lightblue",
                          },
                        "& .MuiAutocomplete-popupIndicator": {
                          color: "green",
                        },
                        "& .MuiAutocomplete-clearIndicator": {
                          color: "purple",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={mailFormField.recipientPostalZone.label}
                          InputLabelProps={{
                            style: { fontSize: 13 },
                          }}
                          style={{ minWidth: 160 }}
                          required
                          value={formik.values.recipientPostalZone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.recipientPostalZone &&
                            Boolean(formik.errors.recipientPostalZone)
                          }
                          helperText={
                            formik.touched.recipientPostalZone &&
                            formik.errors.recipientPostalZone
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="sm:col-span-6 xs:col-span-4 sm:ml-0 xs:ml-0 min-h-[60px] min-w-[235px] bg-white-500 ">
                    <Autocomplete
                      id={mailFormField.recipientCity.id}
                      options={cityList}
                      freeSolo
                      onChange={(event, newValue) => {
                        formik.setFieldValue(
                          mailFormField.recipientCity.id,
                          newValue
                        );
                      }}
                      sx={{
                        "& .MuiAutocomplete-option": {
                          color: "blue",
                        },
                        '& .MuiAutocomplete-option[data-focus="true"]': {
                          backgroundColor: "lightgray",
                        },
                        '& .MuiAutocomplete-option[data-focus="true"][aria-selected="true"]':
                          {
                            backgroundColor: "lightblue",
                          },
                        "& .MuiAutocomplete-clearIndicator": {
                          color: "red",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={mailFormField.recipientCity.label}
                          InputLabelProps={{
                            style: { fontSize: 13 },
                          }}
                          style={{ minWidth: 160 }}
                          required
                          value={formik.values.recipientCity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.recipientCity &&
                            Boolean(formik.errors.recipientCity)
                          }
                          helperText={
                            formik.touched.recipientCity &&
                            formik.errors.recipientCity
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <AddressValidationModal
                  formState={formState}
                  onValidationResult={handleOnValidationResult}
                />
                <TextField
                  inputProps={{ readOnly: true }}
                  read
                  InputLabelProps={{
                    style: { fontSize: 13 },
                  }}
                  style={{ minWidth: 480 }}
                  required
                  type={mailFormField.recipientAddress.type}
                  id={mailFormField.recipientAddress.id}
                  label={mailFormField.recipientAddress.label}
                  onChange={handleChange(mailFormField.recipientAddress.id)}
                  value={formState.recipientAddress}
                ></TextField>

                <FormControlLabel
                  value="start"
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleSenderCheckBox}
                    />
                  }
                  label="Enable Sender Detail ?"
                  labelPlacement="start"
                  sx={{
                    justifyContent: "flex-start",
                    marginLeft: "32px",
                    marginTop: "10px",
                    alignSelf: "flex-start",
                    "& .MuiFormControlLabel-label": {
                      fontSize: "13px",
                    },
                  }}
                />

                {checked && (
                  <div>
                    <div>
                      <div className="grid sm:grid-cols-12 xs:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                        <div className="sm:col-span-3 xs:col-span-3 sm:mr-5 xs:mr-5 sm:min-w-[150px] xs:min-w-[150px] sm:min-h-[60px] xs:min-h-[60px]">
                          <TextField
                            inputProps={{ style: { fontSize: 15 } }}
                            InputLabelProps={{
                              style: { fontSize: 13 },
                            }}
                            required
                            type={mailFormField.senderHouseNumber.type}
                            id={mailFormField.senderHouseNumber.id}
                            label={mailFormField.senderHouseNumber.label}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.senderHouseNumber}
                            error={
                              formik.touched.senderHouseNumber &&
                              Boolean(formik.errors.senderHouseNumber)
                            }
                            helperText={
                              formik.touched.senderHouseNumber &&
                              formik.errors.senderHouseNumber
                            }
                          />
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.senderName}
                            error={
                              formik.touched.senderName &&
                              Boolean(formik.errors.senderName)
                            }
                            helperText={
                              formik.touched.senderName &&
                              formik.errors.senderName
                            }
                          />
                        </div>
                      </div>

                      <div className="grid sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8 sm:grid-cols-12 xs:grid-cols-12">
                        <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-0 xs:ml-0 min-w-[235px] min-h-[60px] bg-white-500 ">
                          <Autocomplete
                            id={mailFormField.senderPostalZone.id}
                            options={zoneList}
                            freeSolo
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                mailFormField.senderPostalZone.id,
                                newValue
                              );
                            }}
                            sx={{
                              "& .MuiAutocomplete-option": {
                                color: "blue",
                              },
                              '& .MuiAutocomplete-option[data-focus="true"]': {
                                backgroundColor: "lightgray",
                              },
                              '& .MuiAutocomplete-option[data-focus="true"][aria-selected="true"]':
                                {
                                  backgroundColor: "lightblue",
                                },
                              "& .MuiAutocomplete-popupIndicator": {
                                color: "green",
                              },
                              "& .MuiAutocomplete-clearIndicator": {
                                color: "purple",
                              },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={mailFormField.senderPostalZone.label}
                                InputLabelProps={{
                                  style: { fontSize: 13 },
                                }}
                                style={{ minWidth: 160 }}
                                required
                                value={formik.values.senderPostalZone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.senderPostalZone &&
                                  Boolean(formik.errors.senderPostalZone)
                                }
                                helperText={
                                  formik.touched.senderPostalZone &&
                                  formik.errors.senderPostalZone
                                }
                              />
                            )}
                          />
                        </div>
                        <div className="sm:col-span-6 xs:col-span-4 sm:ml-0 xs:ml-0 min-h-[60px] min-w-[235px] bg-white-500 ">
                          <Autocomplete
                            id={mailFormField.senderCity.id}
                            options={cityList}
                            freeSolo
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                mailFormField.senderCity.id,
                                newValue
                              );
                            }}
                            sx={{
                              "& .MuiAutocomplete-option": {
                                color: "blue",
                              },
                              '& .MuiAutocomplete-option[data-focus="true"]': {
                                backgroundColor: "lightgray",
                              },
                              '& .MuiAutocomplete-option[data-focus="true"][aria-selected="true"]':
                                {
                                  backgroundColor: "lightblue",
                                },
                              "& .MuiAutocomplete-clearIndicator": {
                                color: "red",
                              },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={mailFormField.senderCity.label}
                                InputLabelProps={{
                                  style: { fontSize: 13 },
                                }}
                                style={{ minWidth: 160 }}
                                required
                                value={formik.values.senderCity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.senderCity &&
                                  Boolean(formik.errors.senderCity)
                                }
                                helperText={
                                  formik.touched.senderCity &&
                                  formik.errors.senderCity
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <SenderAddressValidationModel
                      formState={formState}
                      onValidationSenderResult={handleSenderOnValidationResult}
                    />
                    <TextField
                      inputProps={{ readOnly: true }}
                      read
                      InputLabelProps={{
                        style: { fontSize: 13 },
                      }}
                      style={{ minWidth: 480, marginLeft: "32px" }}
                      required
                      type={mailFormField.senderAddress.type}
                      id={mailFormField.senderAddress.id}
                      label={mailFormField.senderAddress.label}
                      onChange={handleChange(mailFormField.senderAddress.id)}
                      value={formState.senderAddress}
                    ></TextField>
                  </div>
                )}

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
                  }}
                  onClick={formik.handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
        <div className="rounded-lg sm:col-span-6 min-h-[100px] sm:m-10 bg-white-500 items-center justify-center">
          <div style={{ marginRight: "50px" }}>
            <CostForm
              postType={"normal-post"}
              description={"Maximum Weight: 2Kg"}
              onCostUpdate={handleCostUpdate}
            />
          </div>
        </div>
      </div>
      <div className="h-[10px]"></div>
      <div
        // className="mt-30"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          marginTop: "80px",
          // fontWeight: "bold",
          // marginTop: "0px",
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
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <div ref={componentRef}>
            <NormalMailReceipt
              mailType={"Normal Post"}
              postage={formState.postage}
              recipientName={formState.recipientName}
              SenderName={formState.senderName}
              recipientAddress={formState.recipientAddress}
              mailId={"300"}
              receiptId={"450"}
            />
          </div>
        </div>
        <div className="col-span-2 mt-[12px] ml-[25px]">
          <Button
            className="mt-1"
            variant="primary"
            style={{
              backgroundColor: "#fcd34d",
              padding: "8px",
              paddingLeft: "30px",
              paddingRight: "30px",
              borderColor: "#0891b2",
              fontSize: "15px",
              fontWeight: "bold",
              fontFamily: "arial",
              my: "40px",
              mb: "20px",
              mr: "60px",
            }}
            onClick={handlePrint}
          >
            PRINT
          </Button>
        </div>
      </div>

      <div className="min-h-[70px]"></div>
    </>
  );
};

export default PersonalMail;
