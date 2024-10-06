import {
  Box,
  useTheme,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CostForm = ({ postType, description, onCostUpdate }) => {
  const theme = useTheme();
  const [cost, setCost] = useState(null);

  const validationSchema = Yup.object({
    weight: Yup.number()
    .typeError("Weight must be a number")
      .required("Weight is required")
      .positive("Weight must be a positive number")
      //.integer("Weight must be an integer")
      .min(1, "Weight must be at least 1 gram")
      .max(10000, "Weight must be less than or equal to 10000 grams"),
  });

  const formik = useFormik({
    initialValues: {
      weight: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.get(
          `http://localhost:8081/postage/get/${postType}?weight=${values.weight}`,
          { withCredentials: true }
        );
        console.log("response came:", response.data.price);
        setCost(response.data.price);
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "16px",
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
          fontFamily: "Helvetica Neue",
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
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
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
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="weight"
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{
              style: { fontSize: 13, width: "500px" },
            }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#852318",
            color: "white",
            mt: 3,
            px: 2,
            mb: 2,
            fontSize: "12px",
          }}
        >
          Get Postage
        </Button>
        {cost && (
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            Postage: {cost !== null ? `Rs.${cost}.00` : ""}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default CostForm;