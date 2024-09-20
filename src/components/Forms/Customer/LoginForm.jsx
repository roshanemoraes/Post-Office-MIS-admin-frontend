import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { basicSchema } from "../../Layout/Validations/Customer/UserValidation";

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Hardcoded credentials
      const hardcodedUsername = "test@example.com";
      const hardcodedPassword = "Password123";

      // Check if the entered credentials match the hardcoded ones
      if (
        values.email === hardcodedUsername &&
        values.password === hardcodedPassword
      ) {
        // Clear error message
        setErrorMessage("");
        // Redirect to the home page (assuming the route is '/home')
        navigate("/customer/");
      } else {
        // Set error message
        setErrorMessage("Invalid username or password");
        // Redirect to the login page (assuming the route is '/login')
        navigate("/login");
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="col-span-1 max-h-[100px] max-w-[700px]">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxHeight: "400px",
          minWidth: "300px",
          // backgroundColor: "#fff",
          padding: "2px 2px 20px 2px",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-[18px] font-[30px] text-gray-700 mb-3 mt-3">
              <div
                style={{ backgroundColor: "grey", minHeight: "1px" }}
                className="mt-[0px] mb-[30px]"
              ></div>
              <div className="text-[15px]">Email*</div>

              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mb-1 block w-full px-3 py-2 border-2 rounded-md text-gray-900 focus:outline-none focus:border-blue-500 ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </label>
          </div>
          <div>
            <label className="block text-[18px] font-[30px] text-gray-700 mb-3">
              <div className="text-[15px]">Password*</div>

              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` block w-full px-3 py-2 border-2 rounded-md text-gray-900 focus:outline-none focus:border-blue-500 ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </label>
          </div>
          <div>
            <Link
              to="#"
              className="text-gray-900 hover:text-blue-600 transition-colors duration-200 mt-3 text-[12px] aligh-center"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Display error message */}
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}

          <div
            className="flex -mt-1 flex-center justify-center align-center"
            style={{
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{
                backgroundColor: "black",
                color: "white",
                px: 4,
                py: 1,
                justifyContent: "center",
                fontSize: "14px",
                mt: 3,
              }}
            >
              Sign In
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default LoginForm;
