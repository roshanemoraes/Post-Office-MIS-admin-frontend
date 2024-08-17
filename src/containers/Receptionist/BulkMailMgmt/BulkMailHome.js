import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { Button as MuiButton } from "@mui/material";
import checkIcon from "../../../assets/check-circle-fill.svg";
import crossIcon from "../../../assets/x-circle-fill.svg";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import SenderAddressValidationModel from "../modals/SenderAddressValidationModel";
import { mailFormField } from "../../../data/formFields";
import DownArrowIcon from "../../../assets/arrow-down-square-fill.svg";
import Invoice from "./../../../components/Forms/Invoice/Invoice";

const BulkMailHome = () => {
  const initialFormState = {
    senderName: "",
    senderCity: "",
    senderAddress: "",
    senderPostalZone: "",
    senderHouseNumber: "",
    discount: 0,
    mailCount: 0,
  };

  const cityList = ["Negombo", "Colombo", "Kochchikade", "Katunayaka"];
  const zoneList = [
    "Daluwakotuwa",
    "Walihena",
    "Pallansena South",
    "Pallansena North",
  ];

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [formState, setFormState] = useState(initialFormState);
  const [verifiedAddressText, setVerifiedAddressText] = useState();
  const [verifiedAddressId, setVerifiedAddressId] = useState();
  const [verifiedAddressCoordinate_Lat, setVerifiedAddressCoordinate_Lat] =
    useState();
  const [verifiedAddressCoordinate_Lng, setVerifiedAddressCoordinate_Lng] =
    useState();
  const [mailCount, setMailCount] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isRegistrationConfirm, setIsRegistrationConfirm] = useState(false);
  const [postage, setPostage] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [customerFormInfo, setCustomerFormInfo] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const fileInputRef = useRef();

  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value,
    });
  };
  const handleRegistrationConfirm = () => {
    setIsRegistrationConfirm(true);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);
    } else {
      console.log("No file selected");
    }
  };

  function handleFileRemove() {
    setFile(null);
    setMsg(null);
    setProgress({ started: false, pc: 0 });
    setIsUploaded(false);
    setMailCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }

  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post("http://localhost:8081/api/receptionist/bulk-mail/upload", fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              pc: progressEvent.progress * 100,
            };
          });
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setIsUploaded(true);
          setMailCount(res.data.mailCount);

          setFormState((prevState) => ({
            ...prevState,
            discount: res.data.discount,
            mailCount: res.data.mailCount,
          }));

          setDiscount(res.data.discount);
          setMsg("Upload Successful");
        }
      })
      .catch((err) => {
        if (err.response?.status === 417) {
          setIsUploaded(false);
          setMsg(
            "Upload Failed: Mail Count is inadquate: " +
              err.response.data.mailCount +
              " mails"
          );
        } else if (err.response?.status === 400) {
          setIsUploaded(false);
          setMsg("Upload Failed: Unacceptable File Format");
        } else if (err.response?.status === 500) {
          setIsUploaded(false);
          setMsg("Upload Failed: Internal Server Error");
        } else {
          setIsUploaded(false);
          setMsg("Upload Failed: Unknown Error");
        }
      });
  }

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  };

  const leftStyle = {
    display: "flex",
    justifyContent: "center",
    alignContent: "left",
  };
  const centeredHeaderStyle = {
    textAlign: "center",
    verticalAlign: "middle",
  };

  const invoiceInfo = {
    invoiceNumber: 1882,
    date: "14/7/2024",
    subtotal: 249.2,
    discount: 24.92,
    total: 224.28,
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
                {"Bulk Mail Registration"}
              </Typography>
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
                        type={mailFormField.senderHouseNumber.type}
                        id={mailFormField.senderHouseNumber.id}
                        label={mailFormField.senderHouseNumber.label}
                        onChange={handleChange(
                          mailFormField.senderHouseNumber.id
                        )}
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
                        label={mailFormField.senderName.label}
                        onChange={handleChange(mailFormField.senderName.id)}
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
                          setFormState((oldState) => ({
                            ...oldState,
                            [mailFormField.senderPostalZone.id]: newValue,
                          }));
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
                            value={
                              formState[mailFormField.senderPostalZone.id] || ""
                            }
                            onChange={handleChange(
                              mailFormField.senderPostalZone.id
                            )}
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
                          setFormState((oldState) => ({
                            ...oldState,
                            [mailFormField.senderCity.id]: newValue,
                          }));
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
                            value={formState[mailFormField.senderCity.id] || ""}
                            onChange={handleChange(mailFormField.senderCity.id)}
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
              <div>
                <div style={{ marginTop: "20px" }}>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    ref={fileInputRef}
                  />
                  {!isUploaded && (
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#0891b2",
                        padding: "8px",
                        marginLeft: "20px",
                        borderColor: "#0891b2",
                        fontSize: "11px",
                        fontFamily: "arial",
                      }}
                      onClick={handleUpload}
                    >
                      UPLOAD FILE
                    </Button>
                  )}
                  {isUploaded && (
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#7f1d1d",
                        padding: "8px",
                        marginLeft: "20px",
                        borderColor: "#7f1d1d",
                        fontSize: "11px",
                        fontFamily: "arial",
                      }}
                      onClick={handleFileRemove}
                    >
                      REMOVE FILE
                    </Button>
                  )}
                </div>
                <div>
                  {msg && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        fontSize: "13px",
                        color: "gray",
                      }}
                    >
                      <span>{msg}</span>
                      {msg === "Upload Successful" && (
                        <img
                          src={checkIcon}
                          alt="checkIcon"
                          style={{
                            marginRight: "10px",
                            marginLeft: "5px",
                            width: "13px",
                            height: "13px",
                            filter:
                              "invert(34%) sepia(100%) saturate(746%) hue-rotate(88deg) brightness(119%) contrast(119%)",
                          }}
                        />
                      )}
                      {msg === "Upload Failed" && (
                        <img
                          src={crossIcon}
                          alt="crossIcon"
                          style={{
                            marginRight: "10px",
                            marginLeft: "5px",
                            width: "13px",
                            height: "13px",
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div
                className="min-h-[1px] mt-5 bg-black"
                style={{ display: "flex", minWidth: "500px" }}
              ></div>

              <div className="justify-center align-items-center">
                <Button
                  className="mt-10"
                  variant="primary"
                  style={{
                    backgroundColor: "#7f1d1d",
                    borderColor: "#7f1d1d",
                    fontSize: "14px",
                    fontFamily: "arial",
                  }}
                  onClick={handleRegistrationConfirm}
                >
                  CONFIRM REGISTRATION
                </Button>
              </div>
              <div>
                <Button
                  className="mt-3"
                  variant="primary"
                  style={{
                    backgroundColor: "#0891b2",
                    padding: "8px",
                    borderColor: "#0891b2",
                    fontSize: "11px",
                    fontFamily: "arial",
                  }}
                  onClick={handlePrint}
                  // onClick={() => getPostage(mailCount)}
                >
                  PRINT INVOICE
                </Button>
              </div>
            </Box>
          </Box>
        </div>
        <div className="rounded-lg sm:col-span-6 min-h-[100px] bg-white-500 items-center justify-center">
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
                General Standard
              </Typography>
              <div className="grid sm:grid-cols-6 xs:grid-cols-6">
                <div
                  className="sm:col-span-3 xs:col-span-3"
                  style={centerStyle}
                >
                  Minimum Mails Required
                </div>
                <div className="sm:col-span-3 xs:col-span-3" style={leftStyle}>
                  200
                </div>
                <div className="sm:col-span-3 xs:col-span-3" style={leftStyle}>
                  Minimum Discount Rate
                </div>
                <div className="sm:col-span-3 xs:col-span-3" style={leftStyle}>
                  5%
                </div>
              </div>
              <div
                style={{
                  alignSelf: "flex-start",
                  marginLeft: "20px",
                  marginTop: "20px",
                  marginBottom: "15px",
                }}
              >
                {" "}
                Accepted Excel File Format:
              </div>
              <div style={{ width: "80%" }}>
                <Table
                  bordered
                  hover
                  variant="light"
                  className="white-border-table"
                >
                  <thead>
                    <tr>
                      <th style={centeredHeaderStyle}>Name</th>
                      <th style={centeredHeaderStyle}>House No.</th>
                      <th style={centeredHeaderStyle}>Zone</th>
                      <th style={centeredHeaderStyle}>Town</th>
                      <th style={centeredHeaderStyle}>
                        Mail <br />
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={centeredHeaderStyle}>-</td>
                      <td style={centeredHeaderStyle}>-</td>
                      <td style={centeredHeaderStyle}>-</td>
                      <td style={centeredHeaderStyle}>-</td>
                      <td style={centeredHeaderStyle}>-</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Box>
          </Box>
          {isUploaded && (
            <div className="mt-5">
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
                    Upload Statistics
                  </Typography>
                  <div className="grid sm:grid-cols-6 xs:grid-cols-6">
                    <div
                      className="sm:col-span-3 xs:col-span-3"
                      style={centerStyle}
                    >
                      Mail Count
                    </div>
                    <div
                      className="sm:col-span-3 xs:col-span-3"
                      style={leftStyle}
                    >
                      {mailCount}
                    </div>
                    <div
                      className="sm:col-span-3 xs:col-span-3"
                      style={leftStyle}
                    >
                      Discount Rate
                    </div>
                    <div
                      className="sm:col-span-3 xs:col-span-3"
                      style={leftStyle}
                    >
                      {discount}%
                    </div>
                  </div>
                </Box>
              </Box>
            </div>
          )}
        </div>
      </div>
      <div style={{ minHeight: "40px" }}></div>

      {isRegistrationConfirm && (
        <div>
          <div
            // className="mt-30"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              // fontWeight: "bold",
              marginBottom: "10px",
              backgroundColor: "#a3a3a3",
            }}
          >
            INVOICE
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
          <div
            ref={componentRef}
            style={{
              borderColor: "black",
              borderWidth: "1px",
              borderStyle: "solid",
              display: "flex",
              justifyItems: "center",
            }}
          >
            <Invoice
              discount={formState.discount}
              customerInfo={formState}
              invoiceInfo={invoiceInfo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BulkMailHome;
