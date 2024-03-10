import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import logoImage from "../../Components/Media/logo.png";
import backgroundImage from "../../Components/Media/background.jpg";

const Intro = () => {
  const navigate = useNavigate();

  const pages = ["Counselor", "Contact-Us"];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          background:
            "linear-gradient(180deg,rgba(0,0,0,.48),rgba(0,0,0,.3) 60.15%,transparent)",
        }}
      >
        <Toolbar>
          <Box
            sx={{ cursor: "pointer", marginLeft: "5vw" }}
            onClick={() => navigate("/")}
          >
            <img src={logoImage} alt="Logo" style={{ width: 100 }} />
          </Box>
          <Box style={{ flexGrow: 1, marginLeft: "3vw" }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{
                  mx: 1,
                  background: "transparent",
                  textTransform: "none",
                  borderRadius: 10,
                  bgcolor: "transparent",
                  color: "#fff",
                  opacity: "70%",
                  "&:hover": {
                    backdropFilter: "blur(100px)",
                    opacity: "100%",
                    color: "fff",
                  },
                }}
              >
                <Typography variant="body1">{page}</Typography>
              </Button>
            ))}
          </Box>
          <Button
            onClick={() => navigate("/user-login")}
            variant="contained"
            sx={{
              borderRadius: 10,
              color: "white",
              bgcolor: "#4a0080",
              "&:hover": { bgcolor: "#99f" },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          textAlign: "center",
          mt: 5,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "7rem",
            fontWeight: "bold",
            color: "black",
            fontFamily: "YourChosenFont",
          }}
        >
          Find Your <br /> Peace
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "black",
            marginTop: "20px",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          A professional and caring approach
        </Typography>
        <Button
          onClick={() => navigate("/learn-more")}
          variant="outlined"
          sx={{
            mt: 4,
            py: 2,
            px: 4,
            borderRadius: "20px",
            fontSize: "1.2rem",
            color: "#4a0080",
            borderColor: "#4a0080",
            transition: "0.3s",
            "&:hover": { bgcolor: "#4a0080", color: "white" },
          }}
        >
          Learn More
        </Button>
      </Container>
    </div>
  );
};

export default Intro;
