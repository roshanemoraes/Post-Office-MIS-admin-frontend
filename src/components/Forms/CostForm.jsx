import {
  Box,
  useTheme,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Menu,
  Select,
} from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CostForm = ({ postType, description, onCostUpdate }) => {
  const theme = useTheme();
  const [weight, setWeight] = useState(null);
  const [cost, setCost] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [type, setType] = React.useState("");

  const handleChange = (event) => {
    setWeight(event.target.value);
  };
  const calculateCost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/postage/getPostage?weight=${weight}`,
        { withCredentials: true }
      );
      console.log("response came:", response.data.price);
      setCost(response.data.price);
      onCostUpdate(response.data.price);
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
        // marginLeft: "16px",
        // width: "260px",
        // height: "230px",
        backgroundColor: "#fff",
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
        Postage Finder
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
          <div style={{ marginBottom: "10px", marginTop: "10px" }}>
            {description}
          </div>
          <TextField
            required
            id="outlined-required"
            label="Weight (grams)"
            style={{
              backgroundColor: theme.palette.background.inputField,
              minWidth: 150,
            }}
            value={weight}
            onChange={handleChange}
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{
              style: { fontSize: 13, width: "500px" },
            }}
          />
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#852318",
            color: "white",
            mt: 1,
            px: 2,
            mb: 2,
            fontSize: "12px",
          }}
          onClick={calculateCost}
        >
          Get Postage
        </Button>
        {cost && (
          <div style={{ marginTop: "10px" }}>
            Postage: {cost !== null ? `Rs.${cost}.00` : ""}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default CostForm;
