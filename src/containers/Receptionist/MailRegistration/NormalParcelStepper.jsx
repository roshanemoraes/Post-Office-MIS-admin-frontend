import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { mailFormField } from "../../../data/formFields";
import { Link, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import AddressValidationModal from "../AddressValidationModal";
import SenderAddressValidationModel from "../modals/SenderAddressValidationModel";
import CostFormNew from "./CostFormNew";
import NormalParcelMailReceipt from "../../../components/Receipts/NormalParcelMailReceipt";
import { CheckCircleIcon, CircleStackIcon } from "@heroicons/react/20/solid";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = ["Recipient Details", "Sender Details", "Mail Information"];

const stepIconStyle = {
  // backgroundColor: "#e4e4e7",
  // border: "2px solid #e4e4e7", // Initial border
  // borderRadius: "10px",
  padding: "5px",
  "& .Mui-active": {
    "& .MuiStepIcon-root": {
      color: "#fbbf24",
      fontSize: "28px",
      fontColor: "#000",
    },
    "& .MuiStepIcon-text": {
      fill: "#000", // Set the text inside the icon to black
    },
  },
  "& .Mui-completed": {
    "& .MuiStepIcon-root": {
      color: "#22c55e",
      fontSize: "28px",
    },
  },
};

export default function HorizontalLinearStepper() {
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
    //checked: false,

    packageType: "",
    postage: "",
  };

  const theme = useTheme();
  const [formState, setFormState] = React.useState(initialFormState);
  const [checked, setChecked] = useState(false);
  const [cost, setCost] = useState(null);
  const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);
  const navigate = useNavigate();
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

  const handleOnValidationResult = (data, data1) => {
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
      .typeError("Recipient Name is a String"),
    recipientCity: Yup.string().required("Recipient City is required"),
    recipientAddress: Yup.string().required("Recipient Address is required"),
    recipientPostalZone: Yup.string().required(
      "Recipient Postal Zone is required"
    ),
    recipientHouseNumber: Yup.string().required(
      "Recipient House Number is required"
    ),
    senderName: Yup.string().required("Sender Name is required"),
    senderCity: Yup.string().required("Sender City is required"),
    senderAddress: Yup.string().required("Sender Address is required"),
    senderPostalZone: Yup.string().required("Sender Postal Zone is required"),
    senderHouseNumber: Yup.string().required("Sender House Number is required"),
    postage: Yup.number().required("Postage is required"),
    packageType: Yup.string().required("Package Type is required"),
  });

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };
  const handleSenderCheckBox = () => {
    setChecked(!checked);
    /*if (checked) {
      formik.senderName = "";
      formik.senderCity = "";
      formik.senderAddress = "";
      formik.senderPostalZone = "";
      formik.senderHouseNumber = "";
    }*/
    if (checked) {
      formik.setFieldValue("senderName", "");
      formik.setFieldValue("senderCity", "");
      formik.setFieldValue("senderAddress", "");
      formik.setFieldValue("senderPostalZone", "");
      formik.setFieldValue("senderHouseNumber", "");
    }
  };

  //const handleSubmit = () => {
  const formik = useFormik({
    initialValues: initialFormState,
    validationSchema: validationSchema,
    onSubmit: (value) => {
      console.log(formik.values);
      setIsRegisterCompleted(true);
      // axios
      //   .post(
      //     "http://localhost:8081/api/receptionist/post/add/normal-parcel",
      //     formState,
      //     { withCredentials: true }
      //   )
      //   .then((response) => {
      //     setIsRegisterCompleted(true);
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCostUpdate = (cost) => {
    setFormState((prevState) => ({
      ...prevState,
      postage: cost,
    }));
    setCost(cost);
    formik.setFieldValue("postage", cost);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleDone = () => {
    setActiveStep(0); // Reset the stepper to the first step
    setFormState(initialFormState);
    navigate("/admin/receptionist/normal-parcel", { replace: true });
  };

  const handleNext = () => {
    // formik.handleSubmit();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      if (!isRegisterCompleted) {
        //handleSubmit();

        formik.handleSubmit();
      } else {
        handleDone();
      }
      // Call the special function
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={stepIconStyle}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

          {activeStep === 0 && (
            <Box
              display="flex"
              //   paddingTop={2}
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
                  padding: "8px 2px 30px 2px",
                  //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  component="form"
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
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
                        type={mailFormField.recipientHouseNumber.type}
                        id={mailFormField.recipientHouseNumber.id}
                        value={formik.values.recipientHouseNumber}
                        label={mailFormField.recipientHouseNumber.label}
                        onChange={formik.handleChange}
                        //mailFormField.recipientHouseNumber.id
                        //)}
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
                        value={formik.values.recipientName}
                        label={mailFormField.recipientName.label}
                        onChange={formik.handleChange}
                        //mailFormField.recipientName.id
                        //)}
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
                        value={formik.values.recipientPostalZone}
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
                            value={
                              formik.values[
                                mailFormField.recipientPostalZone.id
                              ] || ""
                            }
                            onChange={formik.handleChange(
                              mailFormField.recipientPostalZone.id
                            )}
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
                        // onChange={(event, newValue) => {
                        //   formik.setFieldValue((oldState) => ({
                        //     ...oldState,
                        //     [mailFormField.recipientCity.id]: newValue,
                        //   }));
                        // }}
                        onChange={(event, newValue) => {
                          formik.setFieldValue(
                            mailFormField.recipientCity.id,
                            newValue
                          );
                        }}
                        value={formik.values.recipientCity}
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
                            value={
                              formik.values[mailFormField.recipientCity.id] ||
                              ""
                            }
                            onChange={formik.handleChange(
                              mailFormField.recipientCity.id
                            )}
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
                    formState={formik.values}
                    onValidationResult={handleOnValidationResult}
                  />
                  <TextField
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { fontSize: 13 },
                    }}
                    style={{ minWidth: 480 }}
                    required
                    type={mailFormField.recipientAddress.type}
                    id={mailFormField.recipientAddress.id}
                    label={mailFormField.recipientAddress.label}
                    onChange={handleChange(mailFormField.recipientAddress.id)}
                    value={formik.values.recipientAddress}
                  ></TextField>
                </Box>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box
              display="flex"
              //   paddingTop={2}
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
                  padding: "8px 2px 30px 2px",
                  //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  component="form"
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& .MuiTextField-root": {
                      fontSize: "15px",
                      marginTop: "10px",
                    },
                  }}
                >
                  <div>
                    <div className="grid sm:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                      <div className="sm:col-span-3 sm:mr-5 min-w-[150px] min-h-[60px]">
                        <TextField
                          inputProps={{ style: { fontSize: 15 } }}
                          InputLabelProps={{
                            style: { fontSize: 13 },
                          }}
                          required
                          type={mailFormField.senderHouseNumber.type}
                          id={mailFormField.senderHouseNumber.id}
                          //value={formState.senderHouseNumber}
                          value={formik.values.senderHouseNumber}
                          label={mailFormField.senderHouseNumber.label}
                          onChange={formik.handleChange}
                          // mailFormField.senderHouseNumber.id
                          //)}
                          error={
                            formik.touched.senderHouseNumber &&
                            Boolean(formik.errors.senderHouseNumber)
                          }
                          helperText={
                            formik.touched.senderHouseNumber &&
                            formik.errors.senderHouseNumber
                          }
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
                          type={mailFormField.senderName.type}
                          id={mailFormField.senderName.id}
                          value={formik.values.senderName}
                          label={mailFormField.senderName.label}
                          onChange={formik.handleChange} //(mailFormField.senderName.id)}
                          error={
                            formik.touched.senderName &&
                            Boolean(formik.errors.senderName)
                          }
                          helperText={
                            formik.touched.senderName &&
                            formik.errors.senderName
                          }
                        ></TextField>
                      </div>
                    </div>

                    <div className="grid sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8 sm:grid-cols-12 xs:grid-cols-12">
                      <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-0 xs:ml-0 min-w-[235px] min-h-[60px] bg-white-500 ">
                        <Autocomplete
                          id={mailFormField.senderPostalZone.id}
                          options={zoneList}
                          freeSolo
                          onChange={(event, newValue) => {
                            //setFormState((oldState) => ({
                            // ...oldState,
                            // [mailFormField.senderPostalZone.id]: newValue,
                            //}));
                            formik.setFieldValue(
                              mailFormField.senderPostalZone.id,
                              newValue
                            );
                          }}
                          value={formik.values.senderPostalZone}
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
                              value={
                                formik.values[
                                  mailFormField.senderPostalZone.id
                                ] || ""
                              }
                              onChange={formik.handleChange(
                                mailFormField.senderPostalZone.id
                              )}
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
                          value={formik.values.senderCity}
                          onChange={(event, newValue) => {
                            //setFormState((oldState) => ({
                            //...oldState,
                            //[mailFormField.senderCity.id]: newValue,
                            //}));
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
                              value={
                                formik.values[mailFormField.senderCity.id] || ""
                              }
                              onChange={formik.handleChange(
                                mailFormField.senderCity.id
                              )}
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
                    formState={formik.values}
                    //formState={formState}
                    onValidationSenderResult={handleSenderOnValidationResult}
                  />
                  <TextField
                    inputProps={{ readOnly: true }}
                    read
                    InputLabelProps={{
                      style: { fontSize: 13 },
                    }}
                    style={{ minWidth: 480 }}
                    required
                    type={mailFormField.senderAddress.type}
                    id={mailFormField.senderAddress.id}
                    label={mailFormField.senderAddress.label}
                    onChange={handleChange(mailFormField.senderAddress.id)}
                    value={formState.senderAddress}
                  ></TextField>
                </Box>
              </Box>
            </Box>
          )}
          {activeStep === 2 && (
            <>
              <button
                onClick={() => {
                  console.log(formik.values);
                }}
              >
                Submit
              </button>
              {isRegisterCompleted ? (
                <div className="grid grid-cols-12">
                  <div className="col-span-2"></div>
                  <div className="col-span-6" ref={componentRef}>
                    <NormalParcelMailReceipt
                      mailType={"Normal Parcel"}
                      postage={formik.values.postage}
                      recipientName={formik.values.recipientName}
                      SenderName={formik.values.senderName}
                      recipientAddress={formik.values.recipientAddress}
                      mailId={"300"}
                      receiptId={"450"}
                      packageType={formik.values.packageType}
                    />
                  </div>
                  <div className="col-span-2 mt-[20px]">
                    <Button
                      className="mt-1"
                      variant="primary"
                      style={{
                        //backgroundColor: "#fcd34d",
                        backgroundColor: "#cbd5e1",
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
              ) : (
                <div
                  className="grid grid-cols-12"
                  style={{ display: "flex", alignContent: "center" }}
                >
                  <div
                    className="col-span-5"
                    style={{ marginLeft: "30px", marginTop: "5px" }}
                  >
                    <CostFormNew
                      postType={"parcel-normal"}
                      description={"Maximum Weight: 20Kg"}
                      onCostUpdate={handleCostUpdate}
                      cost={cost}
                    />
                  </div>
                  <div
                    style={{ display: "flex" }}
                    className="col-span-5 ml-8 mt-[62px]"
                  >
                    <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
                      <InputLabel
                        id="courierProviderSelector"
                        sx={{ fontSize: "14px" }}
                      >
                        Package Type
                      </InputLabel>
                      <Select
                        sx={{ fontSize: "13px" }}
                        labelId="packageTypeSelector"
                        id="packageType"
                        name="packageType"
                        value={formik.values.packageType}
                        onChange={formik.handleChange}
                      >
                        <MenuItem sx={{ fontSize: "14px" }} value={"Fragile"}>
                          Fragile
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "14px" }}
                          value={"Not Fragile"}
                        >
                          Not Fragile
                        </MenuItem>
                      </Select>
                      {/*<ErrorMessage
                        name="packageType"
                        component="div"
                        style={{ color: "red" }}
                      />*/}
                    </FormControl>
                  </div>
                </div>
              )}
            </>
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {!isRegisterCompleted && (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}

            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button
              onClick={handleNext}
              sx={{
                backgroundColor:
                  activeStep === steps.length - 1 ? "#852318" : "#1976d2", // Green for "Register Mail", Blue for "Next"
                color: "#fff", // White text color
                "&:hover": {
                  backgroundColor:
                    activeStep === steps.length - 1 ? "#591710" : "#1565c0", // Darker shades on hover
                },
                padding: "8px 16px", // Adjust the padding
                fontWeight: "bold", // Bold text
                borderRadius: "8px", // Rounded corners
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
              }}
            >
              {activeStep === steps.length - 1 ? "Register Mail" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
{
  /*{activeStep === 2 && (
            <>
              {isRegisterCompleted ? (
                <>
                  <div
                    className="grid grid-cols-12"
                    style={{ display: "flex", alignContent: "center" }}
                  >
                    <div
                      className="col-span-5"
                      style={{ marginLeft: "30px", marginTop: "5px" }}
                    >
                      <CostFormNew
                        postType={"parcel-normal"}
                        description={"Maximum Weight: 20Kg"}
                        onCostUpdate={handleCostUpdate}
                        cost={cost}
                      />
                    </div>
                    <div
                      style={{ display: "flex" }}
                      className="col-span-5 ml-8 mt-[62px]"
                    >
                      <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
                        <InputLabel
                          id="courierProviderSelector"
                          sx={{ fontSize: "14px" }}
                        >
                          Package Type
                        </InputLabel>
                        <Select
                          sx={{ fontSize: "13px" }}
                          labelId="packageTypeSelector"
                          id="packageType"
                          value={formState.packageType}
                          onChange={handleChange("packageType")}
                        >
                          <MenuItem sx={{ fontSize: "14px" }} value={"Fragile"}>
                            Fragile
                          </MenuItem>
                          <MenuItem
                            sx={{ fontSize: "14px" }}
                            value={"Not Fragile"}
                          >
                            Not Fragile
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-2"></div>
                    <div className="col-span-6" ref={componentRef}>
                      <NormalParcelMailReceipt
                        mailType={"Normal Parcel"}
                        postage={formState.postage}
                        recipientName={formState.recipientName}
                        SenderName={formState.senderName}
                        recipientAddress={formState.recipientAddress}
                        mailId={"300"}
                        receiptId={"450"}
                        packageType={formState.packageType}
                      />
                    </div>
                    <div className="col-span-2 mt-[20px]">
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
                </>
              ) : (
                <div
                  className="grid grid-cols-12"
                  style={{ display: "flex", alignContent: "center" }}
                >
                  <div
                    className="col-span-5"
                    style={{ marginLeft: "30px", marginTop: "5px" }}
                  >
                    <CostFormNew
                      postType={"parcel-normal"}
                      description={"Maximum Weight: 20Kg"}
                      onCostUpdate={handleCostUpdate}
                      cost={cost}
                    />
                  </div>
                  <div
                    style={{ display: "flex" }}
                    className="col-span-5 ml-8 mt-[62px]"
                  >
                    <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
                      <InputLabel
                        id="courierProviderSelector"
                        sx={{ fontSize: "14px" }}
                      >
                        Package Type
                      </InputLabel>
                      <Select
                        sx={{ fontSize: "13px" }}
                        labelId="packageTypeSelector"
                        id="packageType"
                        value={formState.packageType}
                        onChange={handleChange("packageType")}
                      >
                        <MenuItem sx={{ fontSize: "14px" }} value={"Fragile"}>
                          Fragile
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "14px" }}
                          value={"Not Fragile"}
                        >
                          Not Fragile
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
            </>
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button
              onClick={handleNext}
              sx={{
                backgroundColor:
                  activeStep === steps.length - 1 ? "#852318" : "#1976d2", // Green for "Register Mail", Blue for "Next"
                color: "#fff", // White text color
                "&:hover": {
                  backgroundColor:
                    activeStep === steps.length - 1 ? "#591710" : "#1565c0", // Darker shades on hover
                },
                padding: "8px 16px", // Adjust the padding
                fontWeight: "bold", // Bold text
                borderRadius: "8px", // Rounded corners
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
              }}
            >
              {activeStep === steps.length - 1
                ? isRegisterCompleted
                  ? "Done"
                  : "Register Mail"
                : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}*/
}
