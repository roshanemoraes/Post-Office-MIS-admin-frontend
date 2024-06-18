import { Box, useTheme, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CostForm = ({ PostType }) => {
  const theme = useTheme();
  const [weight, setWeight] = useState("");
  const [cost, setCost] = useState(0);

  const handleChange = (event) => {
    setWeight(event.target.value);
  };
  const calculateCost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/postage/getPostage?weight=${weight}`
      );
      console.log("request came:", response.data);
      setCost(response.data.price);
    } catch (error) {
      console.error("Error fetching postage", error);
    }
  };

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "16px",
        marginLeft: "16px",
        // width: "260px",
        // height: "230px",
        // backgroundColor: theme.palette.background.applicationForm,
        borderRadius: "10px",
        padding: "0 0 5px 0",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          marginTop: "20px",
          marginBottom: "10px",
          fontSize: "22px",
          marginBottom: "10px",
          fontFamily: "Helvetica Neue",
          //   color: theme.palette.text.typography,
          fontWeight: "bold",
        }}
      >
        Postage:
      </Typography>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //   "& .MuiTextField-root": { m: 1, minWidth: 200 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Mail Weight (g)"
            style={{ backgroundColor: theme.palette.background.inputField }}
            value={weight}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#852318", color: "white", mt: 4, px: 5 }}
          onClick={calculateCost}
        >
          Calculate
        </Button>
        <div>{cost !== null ? `Rs.${cost}.00` : ""}</div>
      </Box>
    </Box>
  );
};

export default CostForm;
