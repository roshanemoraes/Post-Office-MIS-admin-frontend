import axios from "axios"; // For making API requests
import React, { useState, useRef } from "react"; // React hooks for component state and refs
import { Button, Table } from "react-bootstrap"; // UI components from react-bootstrap
import { useReactToPrint } from "react-to-print"; // React hook for printing components
import checkIcon from "../../../assets/check-circle-fill.svg"; // Check icon image
import crossIcon from "../../../assets/x-circle-fill.svg"; // Cross icon image
import { Autocomplete, Box, TextField, Typography } from "@mui/material"; // Material UI components
import SenderAddressValidationModel from "../modals/SenderAddressValidationModel"; // Modal for sender address validation
import { mailFormField } from "../../../data/formFields";
import DownArrowIcon from "../../../assets/arrow-down-square-fill.svg";
import Invoice from "./../../../components/Forms/Invoice/Invoice";

const BulkMailHome = () => {
  // Initial state for form fields
  const initialFormState = {
    senderName: "",
    senderCity: "",
    senderAddress: "",
    senderPostalZone: "",
    senderHouseNumber: "",
    discount: 0,
    mailCount: 0,
  };
  // List of cities for autocomplete
  const cityList = ["Negombo", "Colombo", "Kochchikade", "Katunayaka"];
  // List of postal zones for autocomplete
  const zoneList = [
    "Daluwakotuwa",
    "Walihena",
    "Pallansena South",
    "Pallansena North",
  ];
  // State variables
  const [file, setFile] = useState(null); // Selected file for upload
  const [progress, setProgress] = useState({ started: false, pc: 0 }); // File upload progress
  const [msg, setMsg] = useState(null); // Message to display status
  const [formState, setFormState] = useState(initialFormState); // Form field values
  // const [verifiedAddressText, setVerifiedAddressText] = useState();
  // const [verifiedAddressId, setVerifiedAddressId] = useState();
  // const [verifiedAddressCoordinate_Lat, setVerifiedAddressCoordinate_Lat] =
  //   useState();
  // const [verifiedAddressCoordinate_Lng, setVerifiedAddressCoordinate_Lng] =
  //   useState();
  const [mailCount, setMailCount] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  const [isRegistrationConfirm, setIsRegistrationConfirm] = useState(false);

  const [discount, setDiscount] = useState(0);
  // Ref to access file input directly
  const fileInputRef = useRef();
  // Function to handle form input changes
  const handleChange = (id) => (event) => {
    setFormState({
      ...formState,
      [id]: event.target.value, // Update form state with new input value
    });
  };
  // Function to confirm registration if file has been uploaded
  const handleRegistrationConfirm = () => {
    if (isUploaded) {
      setIsRegistrationConfirm(true); // Set registration confirmation to true
    }
    console.log(formState);
    console.log("kk", isRegistrationConfirm);
    console.log(isUploaded);
  };
  // Callback function when sender address validation result is received
  const handleSenderOnValidationResult = (data) => {
    // setVerifiedAddressText(data.textForm);
    // setVerifiedAddressId(data.addressId);
    // setVerifiedAddressCoordinate_Lat(data.lat);
    // setVerifiedAddressCoordinate_Lng(data.lng);
    // Update form state with the validated address data
    setFormState((prevState) => ({
      ...prevState,
      senderAddress: data.textForm,
    }));
  };
  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      setFile(selectedFile); // Set the file in the state
      console.log("File selected:", selectedFile.name); // Log selected file name
    } else {
      console.log("No file selected"); // Log if no file is selected
    }
  };
  // Function to remove selected file and reset states
  function handleFileRemove() {
    setFile(null); // Clear file
    setMsg(null); // Clear message
    setProgress({ started: false, pc: 0 }); // Reset progress state
    setIsUploaded(false); // Reset upload state
    setMailCount(0); // Reset mail count
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset file input ref
    }
  }
  // Function to handle file upload process
  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return; // Exit if no file is selected
    }
    const fd = new FormData(); // Create FormData object for file upload
    fd.append("file", file); // Append file to FormData

    setMsg("Uploading..."); // Set upload status message
    setProgress((prevState) => {
      return { ...prevState, started: true }; // Mark upload as started
    });

    axios
      .post(
        // Send POST request to the server to upload file
        "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/receptionist/bulk-mail/upload",
        fd,
        {
          onUploadProgress: (progressEvent) => {
            setProgress((prevState) => {
              return {
                ...prevState,
                pc: progressEvent.progress * 100, // Update progress percentage
              };
            });
          },
          withCredentials: true, // Send request with credentials
          headers: {
            "Content-Type": "multipart/form-data", // Set content type
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // If upload is successful
          console.log(res.data.mailCount);
          setIsUploaded(true); // Mark as uploaded
          setMailCount(res.data.mailCount); // Set mail count

          setFormState((prevState) => ({
            ...prevState,
            discount: res.data.discount, // Update discount from response
            mailCount: res.data.mailCount, // Update mail count from response
          }));

          setDiscount(res.data.discount); // Set discount in state
          setMsg("Upload Successful"); // Set success message
        }
      })
      .catch((err) => {
        // Handle errors based on status code
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
  // Styles for centering elements
  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  };
  // Styles for aligning elements to the left
  const leftStyle = {
    display: "flex",
    justifyContent: "center",
    alignContent: "left",
  };
  // Styles for centering header text
  const centeredHeaderStyle = {
    textAlign: "center",
    verticalAlign: "middle",
  };
  // Dummy invoice info for testing purposes
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
  {
    /* Main container grid with a single column on small screens and 12 columns on larger screens */
  }
  return (
    // Component JSX goes here
    <>
      <div className="grid sm:grid-cols-12 grid-cols-1">
        {/* Left section of the grid (spans 6 columns on small screens) with a white background */}
        <div className="rounded-lg sm:col-span-6 min-h-[100px] bg-white-500  items-center justify-center">
          <Box
            display="flex"
            paddingTop={2}
            flexDirection="row"
            justifyContent="space-around"
          >
            {/* Flexbox container for aligning the form inside the grid */}
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
              {/* Title of the form */}
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
              {/* Start of the form with two input fields for house number and name */}
              <div>
                <div>
                  <div className="grid sm:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                    {/* First input field: sender's house number */}
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
                    {/* Second input field: sender's name */}
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
                  {/* Grid for the next two fields: sender's postal zone and city */}
                  <div className="grid sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8 sm:grid-cols-12 xs:grid-cols-12">
                    <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-0 xs:ml-0 min-w-[235px] min-h-[60px] bg-white-500 ">
                      {/* Autocomplete field for selecting postal zone */}
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
                          // Renders a TextField within the Autocomplete component for the sender's postal zone input
                          <TextField
                            {...params} // Passes all the autocomplete-related props to the TextField
                            label={mailFormField.senderPostalZone.label} // Sets the label for the TextField using the mailFormField object
                            InputLabelProps={{
                              style: { fontSize: 13 }, // Sets the font size for the label
                            }}
                            style={{ minWidth: 160 }} // Ensures a minimum width for the TextField
                            required
                            value={
                              formState[mailFormField.senderPostalZone.id] || "" // Sets the value of the input field based on formState, or defaults to an empty string if undefined
                            }
                            onChange={handleChange(
                              mailFormField.senderPostalZone.id // Calls the handleChange function when the input changes, updating formState for the senderPostalZone field
                            )}
                          />
                        )}
                      />
                    </div>
                    <div className="sm:col-span-6 xs:col-span-4 sm:ml-0 xs:ml-0 min-h-[60px] min-w-[235px] bg-white-500 ">
                      {/* Autocomplete field for selecting city */}
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
              {/*// This section creates a button for confirming registration.
// Button style and event handler are defined using inline styles and the `onClick` event.
// `handleRegistrationConfirm` is the function called when the button is click*/}
              <div>
                {isRegistrationConfirm && isUploaded && (
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
                )}
              </div>
              {/*// This section checks if both `isRegistrationConfirm` and `isUploaded` are true.
// If so, it displays a "Print Invoice" button with a custom style.
// `handlePrint` is the function triggered when the button is clicked.*/}
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
              {/*// A section displaying general information, such as the minimum mails required
    // and the minimum discount rate, laid out in a grid.
*/}
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
              {/*} // A heading that indicates the accepted format for the Excel file.*/}
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
              {/*// A table that outlines the accepted Excel file format for uploads.
    // Headers for Name, House No., Zone, Town, and Mail Type are included.*/}
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
                  {/*// Displays the statistics related to the uploaded file:
        // Mail Count and Discount Rate.*/}
                </Box>
              </Box>
            </div>
          )}
        </div>
      </div>
      {/*// This block renders the statistics (mail count and discount rate) 
// if `isUploaded` is true (indicating that an upload has been completed).*/}
      <div style={{ minHeight: "40px" }}></div>
      {/*// Adds a spacer div with a minimum height of 40px to provide some vertical space.*/}
      {isRegistrationConfirm && isUploaded && (
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
    // If `isRegistrationConfirm` and `isUploaded` are true, this section renders the invoice.
    // The Invoice component is displayed within a bordered div, containing discount
  );
};

export default BulkMailHome;
