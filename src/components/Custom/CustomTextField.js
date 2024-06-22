import { GlobalStyles, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";

const CustomTextField = ({
  label,
  type = "text",
  id,
  required = false,
  value,
  onChange,
}) => {
  const theme = useTheme();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleValidation = (event) => {
    if (required && !event.target.value) {
      setError(true);
      setHelperText(`${label} is required.`);
    } else {
      setError(false);
      setHelperText("");
    }
    onChange(event);
  };

  return (
    <div>
      <GlobalStyles
        styles={{
          ".MuiInputLabel-root.Mui-focused": {
            backgroundColor: "#fff",
            color: "fff",
          },
        }}
      />
      <TextField
        required={required}
        type={type}
        id={id}
        label={label}
        value={value}
        onChange={handleValidation}
        error={error}
        helperText={helperText}
        style={{
          marginRight: "0px",
          fontFamily: "Helvetica Neue",
          // m: 1,
          minWidth: 450,
          backgroundColor: theme.palette.background.inputField,
          "& .MuiOutlinedInputRoot": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.background.inputField,
            },
          },
        }}
        inputProps={{ style: { fontSize: 15, minWidth: 450 } }}
        InputLabelProps={{
          style: { fontSize: 13 },
        }}
      />
    </div>
  );
};

export default CustomTextField;
