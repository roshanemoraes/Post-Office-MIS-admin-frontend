import {
  Grid,
  Paper,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlurBackground from "../../components/Custom/Background/BlurBackground";
import LoginNavBar from "../../components/LoginNavBar";
import loginImage from "../../assets/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const paperStyle = {
    padding: 20,
    height: "400px",
    // height: 400,
    width: 500,
    marginLeft: "30",
    // margin
    // marginl: "20px",

    // position: "fixed",
    // top: "45%",
    // left: "50%",
    borderRadius: "20px",
    // transform: "translate(-50%, -50%)",
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/admin/authenticate",
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setError("");
      if (response.data.role) {
        localStorage.setItem("userRoles", JSON.stringify(response.data.role));
        localStorage.setItem("userName", response.data.username);

        if (response.data.role.includes("ROLE_POSTMASTER")) {
          navigate("/admin/postmaster");
        } else if (response.data.role.includes("ROLE_MANAGER")) {
          navigate("/admin/delivery-manager");
        } else if (response.data.role.includes("ROLE_RECEPTIONIST")) {
          navigate("/admin/receptionist");
        } else {
          navigate("/admin/login");
        }
      } else {
        console.error("No roles found in response data");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };
  return (
    <div>
      <LoginNavBar />
      <BlurBackground />
      <div className="grid grid-cols-12">
        <div
          className="col-span-6 pl-[200px] pt-[30px]"
          style={
            {
              // display: "flex",
              // alignContent: "center",
              // justifyContent: "center",
              // paddingLeft: "200px",
            }
          }
        >
          <img
            src={loginImage}
            alt="Login"
            style={{
              height: "84%",
              objectFit: "contain",
              borderRadius: "20px",
            }}
          />
        </div>
        <div className="col-span-6">
          <div className="main-container" style={{ borderRadius: "20px" }}>
            <Grid
              container
              // justifyContent={"center"}
              // alignItems={"center"}
              style={{
                minHeight: "120px",
                borderRadius: "10px",
                marginTop: "110px",
                marginLeft: "30px",
              }}
            >
              <Paper elevation={10} style={paperStyle}>
                <div
                  className="mt-[20px] mb-[25px] text-center font-bold"
                  style={{ fontSize: "27px" }}
                >
                  ADMIN PORTAL
                </div>
                <div className="mx-[15px] mt-[40px]">
                  <TextField
                    label="Email"
                    value={email}
                    placeholder="Enter your email"
                    fullWidth
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      style: {
                        color: "#696969",
                      },
                    }}
                  />
                  <Box mt={3} />
                  <TextField
                    label="Password"
                    value={password}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSignIn(e);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box mt={2} />
                  <div style={{ alignItems: "right", alignSelf: "right" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: "#2E3B55",
                        color: "white",
                        margin: "10px 0px",
                      }}
                      onClick={handleSignIn}
                    >
                      Sign In
                    </Button>
                  </div>
                  {/* Error Message */}
                  {error && (
                    <Typography
                      color="error"
                      variant="body2"
                      style={{ marginTop: "10px" }}
                    >
                      {error}
                    </Typography>
                  )}
                </div>
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
