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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post(
        "http://localhost:8080/products/authenticate",
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setError("");
      if (response.data.role) {
        if (response.data.role.includes("ROLE_ADMIN")) {
          navigate("/postmaster");
        } else if (response.data.role.includes("ROLE_MANAGER")) {
          navigate("/delivery-manager");
        } else if (response.data.role.includes("ROLE_USER")) {
          navigate("/receptionist");
        } else {
          navigate("/login");
        }
      } else {
        console.error("No roles found in response data");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
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
          <div style={{ marginBottom: "15px", fontSize: "20px" }}>Loogin</div>
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
