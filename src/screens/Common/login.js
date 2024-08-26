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
import BlurBackground from "../../components/Custom/Background/BlurBackground";
import LoginNavBar from "../../components/LoginNavBar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const paperStyle = {
    padding: 20,
    height: 350,
    width: 450,
    position: "fixed",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
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
        localStorage.setItem("userRoles", JSON.stringify(response.data.role));
        localStorage.setItem(
          "userName",
          JSON.stringify(response.data.username)
        );

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
    <div>
      <LoginNavBar />
      <BlurBackground />
      {/* <div className="container-fluid bg-slate-200 px-5 d-none d-lg-block">
        <div className="row gx-0 align-items-center">
          <div className="col-lg-5 text-center text-lg-start mb-lg-0">
            <div className="d-flex">
              <a href="#" className="text-muted me-4">
                <i className="fas fa-envelope text-secondary me-2"></i>
                POST OFFICE MIS
              </a>
              <a href="#" className="text-muted me-0">
                <i className="fas fa-phone-alt text-secondary me-2"></i>
                NEGOMBO BRANCH
              </a>
            </div>
          </div>
          <div className="col-lg-3 row-cols-1 text-center mb-2 mb-lg-0">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: "45px" }}
            >
              <a
                className="btn btn-sm btn-outline-light btn-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-twitter fw-normal text-secondary"></i>
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-facebook-f fw-normal text-secondary"></i>
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-linkedin-in fw-normal text-secondary"></i>
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-instagram fw-normal text-secondary"></i>
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-square rounded-circle"
                href=""
              >
                <i className="fab fa-youtube fw-normal text-secondary"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: "45px" }}
            >
              <a href="#" className="text-muted me-2">
                {" "}
                Help
              </a>
              <small> / </small>
              <a href="#" className="text-muted mx-2">
                {" "}
                Support
              </a>
              <small> / </small>
              <a href="#" className="text-muted ms-2">
                {" "}
                Contact
              </a>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container-fluid nav-bar p-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 px-lg-5 py-3 py-lg-0">
          <a href="" className="navbar-brand p-0">
            <h2 className="display-5 text-secondary m-0">
              <img src="img/brand-logo.png" className="img-fluid" alt="" />
              Post Office MIS
            </h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <a href="index.html" className="nav-item nav-link active">
                Home
              </a>
              <a href="about.html" className="nav-item nav-link">
                About
              </a>
              <a href="service.html" className="nav-item nav-link">
                Service
              </a>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                  <span className="dropdown-toggle">Pages</span>
                </a>
                <div className="dropdown-menu m-0">
                  <a href="feature.html" className="dropdown-item">
                    Feature
                  </a>
                  <a href="countries.html" className="dropdown-item">
                    Countries
                  </a>
                  <a href="testimonial.html" className="dropdown-item">
                    Testimonial
                  </a>
                  <a href="training.html" className="dropdown-item">
                    Training
                  </a>
                  <a href="404.html" className="dropdown-item">
                    404 Page
                  </a>
                </div>
              </div>
              <a href="contact.html" className="nav-item nav-link">
                Contact
              </a>
            </div>
            <button
              className="btn btn-primary btn-md-square border-secondary mb-3 mb-md-3 mb-lg-0 me-3"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
            >
              <i className="fas fa-search"></i>
            </button>
            <a
              href=""
              className="btn btn-primary border-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0"
            >
              Get A Quote
            </a>
          </div>
        </nav>
      </div> */}
      <div className="main-container">
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          style={{ minHeight: "120px" }}
        >
          <Paper elevation={10} style={paperStyle}>
            <div
              className="mt-[10px] mb-[25px] text-center font-bold"
              style={{ fontSize: "27px" }}
            >
              ADMIN PORTAL
            </div>
            <div className="mx-[15px]">
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
                  // style={btnstyle}
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
            </div>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
