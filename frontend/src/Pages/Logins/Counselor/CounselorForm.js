import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../Components/Media/background.jpg";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";

const CounselorForm = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    areaofexperties: "",
    yearsofexperience: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/counselor", values)
      .then((res) => {
        console.log(res);
        alert(`Counsellor Registration successful`);
        navigate("/counselor-login");
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
        <Typography variant="h5" align="center" gutterBottom>
          Counselor User Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                label="First Name"
                placeholder="Enter First Name"
                type="text"
                variant="outlined"
                fullWidth
                // margin="normal"
                value={values.firstName}
                onChange={handleChange("firstName")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                placeholder="Enter Last Name"
                fullWidth
                type="text"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange("lastName")}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                placeholder="Enter Email"
                fullWidth
                type="text"
                variant="outlined"
                value={values.email}
                onChange={handleChange("email")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Area of Expertise"
                placeholder="Enter comma separated"
                fullWidth
                type="text"
                variant="outlined"
                value={values.areaofexperties}
                onChange={handleChange("areaofexperties")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Years of Experience"
                placeholder="Enter years of experience"
                fullWidth
                type="number"
                variant="outlined"
                value={values.yearsofexperience}
                onChange={handleChange("yearsofexperience")}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                fullWidth
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
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

export default CounselorForm;
