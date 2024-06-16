import {
  Box,
  Button,
  GlobalStyles,
  List,
  ListItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CustomFormControl from "./../Custom/CustomFormControl";
import CustomTextField from "./../Custom/CustomTextField";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        minWidth: "650px",
        // backgroundColor: theme.palette.background.applicationForm,
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
          fontSize: "30px",
          marginBottom: "10px",
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
          // "& .MuiTextField-root": { m: 1, minWidth: 500, fontSize: "20px" },
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
                    field.id === "recipient_city" || field.id === "sender_city"
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
            my: "15px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#C2C2C2",
              margin: "0 10px",
            }}
          ></Box>
        </Box>
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
        <Button
          variant="contained"
          sx={{
            my: "40px",
            backgroundColor: "#852318",
            color: "white",
            px: 8,
            fontSize: "14px",
            borderRadius: "6px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PostForm;
