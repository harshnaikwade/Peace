import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Link,
  Box,
  Card,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../../Components/Media/background.jpg";

const CounselorLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5000/counselorauth", values)
  //     .then((res) => {
  //       if (res.data && res.data.message === "Authentication successful") {
  //         console.log("Login successful");
  //         const type = "Counselor";
  //         const counselorData = res.data.userData;
  //         navigate("/dashboard", { state: { data: counselorData, type } });
  //       } else {
  //         console.log("Invalid credentials");
  //         alert("Invalid credentials");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Invalid credentials");
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/counselorauth",
        values
      );

      if (
        response.data &&
        response.data.message === "Authentication successful"
      ) {
        console.log("Login successful");
        localStorage.setItem("email", values.email);
        const type = "Counselor";
        const userData = response.data.userData;
        navigate("/dashboard", { state: { data: userData, type } });
      } else {
        console.log("Invalid credentials");
        // alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access error (Invalid credentials)
        alert("Invalid credentials");
      } else if (error.response && error.response.status === 404) {
        // Handle user not found error
        alert("User not found. Please register first.");
      } else {
        // Handle other errors
        alert("Error during login. Please try again later.");
      }
    } finally {
      // Clear password field after login attempt
      setValues({ ...values, password: "" });
    }
  };

  const handleRegisterClick = () => {
    navigate("/counselor-signup");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: "24px",
          background: "#f6f6f6;",
        }}
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          // style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom>
              Counselor Sign In
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="Enter Email"
                    variant="outlined"
                    value={values.email}
                    sx={{ background: "white" }}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    variant="outlined"
                    value={values.password}
                    sx={{ background: "white" }}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Link
              component="button"
              variant="body2"
              onClick={handleRegisterClick}
            >
              New User? Register
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default CounselorLogin;
