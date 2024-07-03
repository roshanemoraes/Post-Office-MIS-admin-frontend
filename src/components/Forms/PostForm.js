import {
  Box,
  Button,
  GlobalStyles,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useRef } from "react";
import CustomFormControl from "./../Custom/CustomFormControl";
import CustomTextField from "./../Custom/CustomTextField";
import { useReactToPrint } from "react-to-print";

const PostForm = ({
  formTitle,
  fieldsGroups,
  selectionGroups,
  onFormSubmit,
}) => {
  const theme = useTheme();
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [recipientCity, setRecipientCity] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [recipientAddressInput, setRecipientAddressInput] = useState("");
  const [senderAddressInput, setSenderAddressInput] = useState("");
  const [addressType, setAddressType] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "TestPrint",
    onBeforePrint: () => {
      console.log("Before print");
    },
    onAfterPrint: () => {
      console.log("After print");
    },
    removeAfterPrint: true,
  });

  const handleChange = (id) => (event) => {
    const value = event.target.value;
    if (id === "recipient_city") {
      setAddressType("recipient");
      setRecipientCity(value);
    } else if (id === "sender_city") {
      setAddressType("sender");
      setSenderCity(value);
    } else {
      setFormState({
        ...formState,
        [id]: event.target.value,
      });
    }
  };

  const handleSubmit = () => {
    onFormSubmit(formState);
    setIsSubmitted(true);
  };

  const handleAddressInput = (event) => {
    const inputText = event.target.value;
    const type = addressType;

    if (type === "recipient") {
      setRecipientAddressInput(inputText);
    } else {
      setSenderAddressInput(inputText);
    }
  };

  return (
    <div
      ref={contentToPrint}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
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
            // color: theme.palette.text.typography,
            fontWeight: "bold",
            fontSize: "22px",
            marginBottom: "10px",
            fontFamily: "Helvetica Neue",
          }}
        >
          {formTitle}
        </Typography>
        <Box
          component="form"
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiTextField-root": {
              minWidth: 500,
              fontSize: "15px",
              marginTop: "10px",
            },
          }}
        >
          <GlobalStyles
            styles={{
              ".MuiInputLabel-root.Mui-focused": {
                // backgroundColor: theme.palette.text.typography,
              },
            }}
          />
          {fieldsGroups.map((group, index) => (
            <div key={index}>
              <Typography
                variant="subtitle2"
                sx={{
                  // color: theme.palette.text.typography,
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  fontFamily: "Helvetica Neue",
                  textAlign: "left",
                  width: "98%",
                  marginTop: index !== 0 ? "10px" : "0px",
                }}
              >
                {group.label}
              </Typography>
              {group.fields.map((field) => (
                <div key={field.id}>
                  <CustomTextField
                    label={field.label}
                    id={field.id}
                    required
                    key={field.id}
                    value={
                      field.id === "recipient_city"
                        ? recipientCity
                        : field.id === "sender_city"
                        ? senderCity
                        : field.id === "recipient_address"
                        ? recipientAddressInput
                        : field.id === "sender_address"
                        ? senderAddressInput
                        : formState[field.id] || ""
                    }
                    onChange={
                      field.id === "recipient_city" ||
                      field.id === "sender_city"
                        ? handleChange(field.id)
                        : field.id === "recipient_address" ||
                          field.id === "sender_address"
                        ? handleAddressInput
                        : handleChange(field.id)
                    }
                  />
                </div>
              ))}
            </div>
          ))}

          <Box
            sx={{
              my: "0px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          {selectionGroups.map((group, index) => (
            <React.Fragment key={index}>
              {group.fields.map((field) => (
                <CustomFormControl
                  label={field.label}
                  id={field.id}
                  options={field.options}
                  value={formState[field.id] || ""}
                  onChange={handleChange(field.id)}
                  key={field.id}
                />
              ))}
            </React.Fragment>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <Button
              variant="contained"
              disabled={!isSubmitted}
              onClick={() => {
                handlePrint(null, () => contentToPrint.current);
              }}
              sx={{
                my: "40px",
                mb: "20px",
                backgroundColor: "#000000",
                color: "white",
                px: 5,
                fontSize: "14px",
                borderRadius: "6px",
              }}
            >
              Print Receipt
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default PostForm;
