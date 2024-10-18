import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const validationSchema = Yup.object({
  employeeFullName: Yup.string()
    .min(5, "Full Name must be at least 5 characters")
    .required("Full Name is required"),
  employeeUserName: Yup.string().required("User Name is required"),
  employeeNIC: Yup.string().required("NIC is required"),
  employeeContactNumber: Yup.string()
    .matches(/^[0-9]+$/, "Enter a number")
    .required("Contact Number is required"),
  employeeEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  accountPassword: Yup.string().required("Password is required"),
  employeeDateJoined: Yup.date().required("Date Joined is required"),
  role: Yup.string().required("Role is required"),
});

const AddEmployee = () => {
  const initialValues = {
    employeeFullName: "",
    employeeUserName: "",
    employeeNIC: "",
    employeeContactNumber: "",
    employeeEmail: "",
    accountPassword: "",
    employeeDateJoined: "",
    role: "",
  };
  const [isLoading, setLoading] = React.useState(true); // Set initial loading to true

  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await minimumLoadingDuration(
        Promise.resolve(),
        process.env.REACT_APP_LOADING_DELAY
      ); // Simulate loading with a minimum of 1.2 seconds
      setLoading(false); // Set loading to false after the delay
    };
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-[100px] w-full h-full bg-[#737373] bg-opacity-70 flex items-center justify-center ">
        <div className="flex flex-col items-center">
          <div className="w-[100px] h-[100px] border-8 border-gray-300 border-t-[#000] rounded-full animate-spin"></div>
          <span className="mt-4 text-[25px] text-black font-sans tracking-wide">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const handleOnSubmit = async (values) => {
    try {
      const response = await axios.post(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/postmaster/employee/add-employee`,
        values,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Employee Added Successfully");
      }
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  const handleSubmit = (values, { setSubmitting, validateForm }) => {
    validateForm(values).then((errors) => {
      if (Object.keys(errors).length > 0) {
        console.log("Form has errors:");
        setSubmitting(false);
      } else {
        console.log("Form submitted:", values);
        handleOnSubmit(values);
      }
    });
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        paddingTop={2}
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
            Add Employee
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{
                    "& .MuiTextField-root": {
                      fontSize: "15px",
                      marginTop: "10px",
                    },
                  }}
                >
                  <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
                    <InputLabel id="roleSelector" sx={{ fontSize: "14px" }}>
                      Role
                    </InputLabel>
                    <Select
                      labelId="roleSelector"
                      id="role"
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.role)}
                    >
                      <MenuItem value={"Postmaster"}>Postmaster</MenuItem>
                      <MenuItem value={"Delivery Manager"}>
                        Delivery Manager
                      </MenuItem>
                      <MenuItem value={"Receptionist"}>Receptionist</MenuItem>
                      <MenuItem value={"Postman"}>Postman</MenuItem>
                    </Select>
                    <ErrorMessage
                      name="role"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>
                  <div>
                    <div style={{ minWidth: "500px" }}>
                      <Field
                        as={TextField}
                        name="employeeFullName"
                        type="text"
                        label="Full Name"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.employeeFullName)}
                        helperText={
                          <ErrorMessage
                            name="employeeFullName"
                            component="div"
                          />
                        }
                      />
                    </div>
                    <div>
                      <Field
                        as={TextField}
                        name="employeeUserName"
                        type="text"
                        label="User Name"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.employeeUserName)}
                        helperText={
                          <ErrorMessage
                            name="employeeUserName"
                            component="div"
                          />
                        }
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-12 xs:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                    <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-1 xs:ml-1 min-w-[235px] min-h-[60px]">
                      <Field
                        as={TextField}
                        name="employeeNIC"
                        type="text"
                        label="NIC"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.employeeNIC)}
                        helperText={
                          <ErrorMessage name="employeeNIC" component="div" />
                        }
                      />
                    </div>
                    <div className="sm:col-span-6 xs:col-span-6 sm:ml-1 xs:ml-1 sm:min-w-[235px] xs:min-w-[235px] sm:min-h-[60px] xs:min-h-[60px]">
                      <Field
                        as={TextField}
                        name="employeeContactNumber"
                        type="text"
                        label="Contact Number"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.employeeContactNumber)}
                        helperText={
                          <ErrorMessage
                            name="employeeContactNumber"
                            component="div"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div style={{ minWidth: "500px" }}>
                    <Field
                      as={TextField}
                      name="employeeEmail"
                      type="email"
                      label="Email"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(errors.employeeEmail)}
                      helperText={
                        <ErrorMessage name="employeeEmail" component="div" />
                      }
                    />
                  </div>

                  <div className="grid sm:grid-cols-12 xs:grid-cols-12 sm:ml-8 xs:ml-8 sm:mr-8 xs:mr-8">
                    <div className="sm:col-span-6 xs:col-span-6 sm:mr-3 xs:mr-3 sm:ml-1 xs:ml-1 min-w-[235px] min-h-[60px]">
                      <Field
                        as={TextField}
                        name="accountPassword"
                        type="password"
                        label="Password"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.accountPassword)}
                        helperText={
                          <ErrorMessage
                            name="accountPassword"
                            component="div"
                          />
                        }
                      />
                    </div>
                    <div className="sm:col-span-6 xs:col-span-6 sm:ml-1 xs:ml-1 sm:min-w-[235px] xs:min-w-[235px] sm:min-h-[60px] xs:min-h-[60px]">
                      <Field
                        as={TextField}
                        name="employeeDateJoined"
                        type="date"
                        label="Date Joined"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.employeeDateJoined)}
                        helperText={
                          <ErrorMessage
                            name="employeeDateJoined"
                            component="div"
                          />
                        }
                      />
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    sx={{
                      my: "40px",
                      mb: "5px",
                      backgroundColor: "#852318",
                      color: "white",
                      px: 5,
                      fontSize: "14px",
                      borderRadius: "6px",
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
};

export default AddEmployee;
