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
import React, { useState } from "react";
import CustomTextField from "../../components/Custom/CustomTextField";
import { mailFormField } from "../../data/formFields";
import CostForm from "../../components/Forms/CostForm";
import AddressValidationModal from "./AddressValidationModal";

const PersonalMail = () => {
  const initialFormState = {
    recipientName: "",
    recipientCity: "",
    recipientAddress: "",
    recipientPostalZone: "",
    recipientHouseNumber: "",

    senderName: "",
    senderCity: "",
    senderAddress: "",
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

  const cityList = ["Negombo", "Colombo", "Kochchikade", "Katunayaka"];
  const zoneList = [
    "Daluwakotuwa",
    "Walihena",
    "Pallansena South",
    "Pallansena North",
  ];

  const handleChange = (id) => (event) => {
    const value = event.target.value;
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
    }
  };

  const handleSubmit = () => {
    console.log(formState);
    setIsSubmitted(true);
  };

  return (
    <div className="grid sm:grid-cols-12 grid-cols-1">
      <div className="rounded-lg sm:col-span-7 min-h-[100px] bg-white-500  items-center justify-center">
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
              {"Personal Mail"}
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
                  // minWidth: 80,
                  fontSize: "15px",
                  marginTop: "10px",
                },
              }}
            >
              <div className="grid sm:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                <div className="sm:col-span-3 sm:mr-5 min-w-[150px] min-h-[60px]">
                  <TextField
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{
                      style: { fontSize: 13 },
                    }}
                    required
                    type={mailFormField.recipientHouseNumber.type}
                    id={mailFormField.recipientHouseNumber.id}
                    label={mailFormField.recipientHouseNumber.label}
                    onChange={handleChange(
                      mailFormField.recipientHouseNumber.id
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
                    type={mailFormField.recipientName.type}
                    id={mailFormField.recipientName.id}
                    label={mailFormField.recipientName.label}
                    onChange={handleChange(mailFormField.recipientName.id)}
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
                      setFormState((oldState) => ({
                        ...oldState,
                        [mailFormField.recipientPostalZone.id]: newValue,
                      }));
                    }}
                    sx={{
                      "& .MuiAutocomplete-option": {
                        color: "blue", // changes the color of the options text
                      },
                      '& .MuiAutocomplete-option[data-focus="true"]': {
                        backgroundColor: "lightgray", // changes the background color of the focused option
                      },
                      '& .MuiAutocomplete-option[data-focus="true"][aria-selected="true"]':
                        {
                          backgroundColor: "lightblue", // changes the background color of the selected option
                        },
                      "& .MuiAutocomplete-popupIndicator": {
                        color: "green", // changes the color of the popup indicator
                      },
                      "& .MuiAutocomplete-clearIndicator": {
                        color: "purple", // changes the color of the clear indicator
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
                          formState[mailFormField.recipientPostalZone.id] || ""
                        }
                        onChange={handleChange(
                          mailFormField.recipientPostalZone.id
                        )}
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
                      setFormState((oldState) => ({
                        ...oldState,
                        [mailFormField.recipientCity.id]: newValue,
                      }));
                    }}
                    sx={{
                      "& .MuiAutocomplete-option": {
                        color: "blue", // changes the color of the options text
                      },
                      '& .MuiAutocomplete-option[data-focus="true"]': {
                        backgroundColor: "lightgray", // changes the background color of the focused option
                      },
                      '& .MuiAutocomplete-option[data-focus="true"][aria-selected="true"]':
                        {
                          backgroundColor: "lightblue", // changes the background color of the selected option
                        },
                      "& .MuiAutocomplete-popupIndicator": {
                        color: "green", // changes the color of the popup indicator
                      },
                      "& .MuiAutocomplete-clearIndicator": {
                        color: "purple", // changes the color of the clear indicator
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
                        value={formState[mailFormField.recipientCity.id] || ""}
                        onChange={handleChange(mailFormField.recipientCity.id)}
                      />
                    )}
                  />
                </div>
              </div>
              <AddressValidationModal formState={formState} />
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
              ></TextField>

              <FormControlLabel
                value="start"
                control={
                  <Checkbox checked={checked} onChange={handleSenderCheckBox} />
                }
                label="Enable Sender Detail"
                labelPlacement="start"
                sx={{
                  justifyContent: "flex-start",
                  marginLeft: "32px",
                  marginTop: "10px",
                  alignSelf: "flex-start",
                  "& .MuiFormControlLabel-label": {
                    // Target the label
                    fontSize: "13px", // Change this to your desired font size
                  },
                }}
              />
              {checked && (
                <div>
                  <CustomTextField
                    label={mailFormField.senderName.label}
                    id={mailFormField.senderName.id}
                    required
                    value={formState[mailFormField.senderName.id] || ""}
                    onChange={handleChange(mailFormField.senderName.id)}
                  />
                  <CustomTextField
                    label={mailFormField.senderCity.label}
                    id={mailFormField.senderCity.id}
                    required
                    value={formState[mailFormField.senderCity.id] || ""}
                    onChange={handleChange(mailFormField.senderCity.id)}
                  />
                  <CustomTextField
                    label={mailFormField.senderAddress.label}
                    id={mailFormField.senderAddress.id}
                    required
                    value={formState[mailFormField.senderAddress.id] || ""}
                    onChange={handleChange(mailFormField.senderAddress.id)}
                  />
                </div>
              )}

              <Button
                variant="contained"
                sx={{
                  my: "40px",
                  mb: "20px",
                  mr: "60px",
                  backgroundColor: "#852318",
                  color: "white",
                  px: 5,
                  fontSize: "14px",
                  borderRadius: "6px",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
      <div className="rounded-lg sm:col-span-5 min-h-[100px] m-4 bg-white-500 items-center justify-center">
        <CostForm />
      </div>
    </div>
  );
};

export default PersonalMail;
