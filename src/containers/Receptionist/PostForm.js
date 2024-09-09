import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

function PostForm() {
  const [name, setName] = useState("");
  return (
    <div className="col-span-1 min-h-[500px]">
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            minHeight: "500px",
            minWidth: "550px",
            backgroundColor: "#yellow",
            padding: "30px 2px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              height: "15%",
              color: "black",
              fontSize: "25px",
              marginTop: "50px",
            }}
          >
            <div
              className="text-center"
              style={{
                fontSize: "25px",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              Create Account
            </div>
          </div>
          <div>
            <form>
              <label className="block text-lg font-medium text-gray-700 mb-5 mt-10">
                Username:
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
              <label className="block text-lg font-medium text-gray-700 mb-5">
                Password:
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
              className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </div>

          <div
            className="flex mt-0 flex-center justify-center align-center"
            style={{
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                px: 5,
                fontSize: "14px",
                mt: 5,
              }}
            >
              Sign Up
            </Button>
          </div>

          <div
            className="text-center text-gray-900"
            style={{
              marginTop: "auto",
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
      </Box>
    </div>
  );
}

export default PostForm;
