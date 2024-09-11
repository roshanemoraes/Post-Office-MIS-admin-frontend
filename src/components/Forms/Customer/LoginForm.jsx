/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

function LoginForm() {
  const [name, setName] = useState("");
  return (
    <div className="col-span-1 max-h-[100px] max-w-[550px]">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxHeight: "400px",
          minWidth: "300px",
          backgroundColor: "#e2e8f0",
          padding: "20px 2px 20px 2px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="text-center"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Create Account
        </div>
        <div>
          <form>
            <label className="block text-lg font-medium text-gray-700 mb-3 mt-3">
              Username*:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </label>
          </form>
        </div>
        <div>
          <form>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Password*:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </label>
          </form>
        </div>
        <div>
          <Link
            to="#"
            className="text-gray-900 hover:text-blue-600 transition-colors duration-200 mt-3 text-[12px]"
          >
            Forgot Password?
          </Link>
        </div>

        <div
          className="flex -mt-1 flex-center justify-center align-center"
          style={{
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
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
            Sign Up
          </Button>
        </div>

        <div
          className="text-center text-gray-900 text-[12px]"
          style={{
            marginTop: "10px",
            paddingBottom: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="#"
            className="text-gray-900 font-bold hover:text-blue-600 transition-colors duration-200"
          >
            Login here
          </Link>
        </div>
      </Box>
    </div>
  );
}

export default LoginForm;*/

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
        navigate("/Customer/");
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
    <div className="col-span-1 max-h-[100px] max-w-[550px]">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxHeight: "400px",
          minWidth: "300px",
          backgroundColor: "#e2e8f0",
          padding: "20px 2px 20px 2px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="text-center"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Create Account
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3 mt-3">
              Email*:
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border-2 rounded-md text-gray-900 focus:outline-none focus:border-blue-500 ${
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
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Password*:
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border-2 rounded-md text-gray-900 focus:outline-none focus:border-blue-500 ${
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
