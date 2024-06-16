import {
  Grid,
  Paper,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const paperStyle = {
    padding: 20,
    height: 250,
    width: 450,
    position: "fixed",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const btnstyle = {
    margin: "10px 0px",
  };

  const handleSignIn = async (e) => {
    const response = await fetch("http://localhost:8081/authenticate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      console.error("Login failed");
      return;
    }

    const data = await response.json();
    console.log(data);
    if (data.roles) {
      if (data.roles === "ROLE_ADMIN") {
        Navigate("/postmaster");
      } else if (data.roles === "ROLE_USER") {
        Navigate("/user");
      } else {
        Navigate("/login");
      }
    } else {
      console.error("No roles found in response data");
    }
  };

  return (
    <div className="main-container">
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        style={{ minHeight: "100vh" }}
      >
        <Paper elevation={10} style={paperStyle}>
          <div style={{ marginBottom: "15px", fontSize: "20px" }}>Login</div>
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
          <Box mt={1} />
          <TextField
            label="Password"
            // id="outlined-required"
            value={password}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box mt={1} />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
