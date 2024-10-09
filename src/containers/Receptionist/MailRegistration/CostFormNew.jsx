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
import { useFormik } from "formik";
import * as Yup from "yup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CostFormNew = ({ postType, description, onCostUpdate }) => {
  const theme = useTheme();
  const [weight, setWeight] = useState(null);
  const [cost, setCost] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [type, setType] = React.useState("");

  /*const handleChange = (event) => {
    setWeight(event.target.value);
  };
  const calculateCost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/postage/get/${postType}?weight=${weight}`,
        { withCredentials: true }
      );
      console.log("response came:", response.data.price);
      setCost(response.data.price);
      onCostUpdate(response.data.price);
    } catch (error) {
      console.error("Error fetching postage", error);
    }
  };*/
  const formik = useFormik({
    initialValues: {
      weight: "",
    },
    validationSchema: Yup.object({
      weight: Yup.number()
        .typeError("Weight must be a number")
        .required("Weight is required")
        .positive("Weight must be a positive number"),
      //.integer("Weight must be an integer")
      //.min(1, "Weight must be at least 1 gram")
      //.max(10000, "Weight must be less than or equal to 10000 grams"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(
          `http://localhost:8081/postage/get/${postType}?weight=${values.weight}`,
          { withCredentials: true }
        );
        console.log("response came:", response.data.price);
        formik.setFieldValue("cost", response.data.price);

        //setCost(response.data.price);
        onCostUpdate(response.data.price);
      } catch (error) {
        console.error("Error fetching postage", error);
      }
    },
  });

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-around",
        marginTop: "16px",
        // marginLeft: "16px",
        // width: "260px",
        // height: "230px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "0 0 5px 0",
        // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* <Typography
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
      </Typography> */}

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
        onSubmit={formik.handleSubmit}
      >
        <div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            {description}
          </div>
          <TextField
            required
            id="outlined-required"
            label="Weight (grams)"
            name="weight"
            style={{
              backgroundColor: theme.palette.background.inputField,
              minWidth: 150,
            }}
            value={weight}
            onChange={formik.handleChange}
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{
              style: { fontSize: 13, width: "500px" },
            }}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
          />
        </div>
        <Button
          type="submit"
          //   variant="contained"
          sx={{
            backgroundColor: "#d1d5db",
            color: "#000",
            mt: 1,
            px: 1,
            mb: 2,
            fontSize: "12px",
            border: "2px solid #d1d5db",
            "&:hover": {
              backgroundColor: "#b0b3b8",
            },
          }}
          //onClick={calculateCost}
        >
          Get Postage
        </Button>
        {formik.values.cost && (
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            Postage:{" "}
            {formik.values.cost !== null ? `Rs.${formik.values.cost}.00` : ""}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default CostFormNew;
