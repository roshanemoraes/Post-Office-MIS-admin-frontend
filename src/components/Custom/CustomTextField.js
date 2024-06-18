import { GlobalStyles, TextField, useTheme } from "@mui/material";
import React from "react";

const CustomTextField = ({ label, id, required = false, value, onChange }) => {
  const theme = useTheme();

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
        id={id}
        label={label}
        value={value}
        onChange={onChange}
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
        inputProps={{ style: { fontSize: 15 } }}
        InputLabelProps={{
          style: { fontSize: 13 },
        }}
      />
    </div>
  );
};

export default CustomTextField;
