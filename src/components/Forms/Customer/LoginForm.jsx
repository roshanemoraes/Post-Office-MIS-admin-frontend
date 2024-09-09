import React, { useState } from "react";
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

export default LoginForm;
