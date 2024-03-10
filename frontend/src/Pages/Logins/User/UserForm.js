import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Box,
  Card,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../Components/Media/background.jpg";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";

const UserSignUp = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    medicalHistory: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user", values)
      .then((res) => {
        console.log(res);
        alert(`User Registration successful`);
        navigate("/user-login");
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (prop) => (event) => {
    let updatedValue = event.target.value;

    // Capitalize first letter if the property is firstName or lastName
    if (prop === "firstName" || prop === "lastName") {
      updatedValue = event.target.value.replace(/^\w/, (c) => c.toUpperCase());
    }

    setValues({ ...values, [prop]: updatedValue });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // padding: "20px",
      }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: "24px",
          background: "#f6f6f6",
          maxWidth: "500px",
          width: "100%",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          User Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange("firstName")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange("lastName")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                type="text"
                label="Gender"
                name="gender"
                value={values.gender}
                onChange={handleChange("gender")}
                required
                sx={{ background: "white", textAlign: "left" }}
              >
                {/* <MenuItem value="">
                  <em>Select</em>
                </MenuItem> */}
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={values.dob}
                onChange={handleChange("dob")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                placeholder="Enter Email"
                variant="outlined"
                value={values.email}
                onChange={handleChange("email")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                variant="outlined"
                value={values.password}
                onChange={handleChange("password")}
                sx={{ background: "white" }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical History"
                type="text"
                placeholder="Enter Medical History"
                variant="outlined"
                value={values.medicalHistory}
                onChange={handleChange("medicalHistory")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default UserSignUp;
