import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";

const Page404 = () => {
  return (
    <Container
      style={{
        padding: "20px 0",
        // background: "#f0f0f0",
        fontFamily: "Arvo, serif",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">404</Typography>
      <Box
        // mt={-5}
        style={{
          height: "65vh",
          //   width: "200vh",
          position: "center",
          backgroundImage:
            "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
          backgroundPosition: "center ",
          backgroundSize: "70%",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box mt={-5}>
        <Typography
          variant="h2"
          style={{ fontSize: "30px", marginBottom: "20px" }}
        >
          Looks like you're lost
        </Typography>
        <Typography
          style={{ color: "#000", fontSize: "18px", marginBottom: "20px" }}
        >
          The page you are looking for is not available!
        </Typography>
        <Button
          variant="contained"
          style={{
            color: "#fff",
            padding: "10px 20px",
            background: "#39ac31",
            textDecoration: "none",
            borderRadius: "5px",
            transition: "background 0.3s",
          }}
          href="/"
          onMouseOver={(e) => {
            e.target.style.background = "#2d7f24";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#39ac31";
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Page404;
