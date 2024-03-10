import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import backgroundImage from "../../Components/Media/background.jpg";
import logoImage from "../../Components/Media/logo.png";
import { useNavigate } from "react-router-dom";

function CounselorIntro() {
  const navigate = useNavigate();
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
            // component={Link}
            // to={"/"}
            onClick={() => navigate("/")}
          >
            <img src={logoImage} alt="Logo" style={{ width: 100 }} />
          </Box>
          <Typography
            variant="h5"
            color={"inherit"}
            sx={{ flexGrow: 1, marginLeft: "3vw" }}
          >
            Counselor Info
          </Typography>
          <Button
            // component={Link}
            // to={"/counselor-login"}
            onClick={() => navigate("/counselor-login")}
            variant="contained"
            sx={{
              borderRadius: 10,
              color: "white",
              bgcolor: "#4a0080",
              "&:hover": { bgcolor: "#99f" },
            }}
          >
            Counselor Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Counselor Name
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
          lacinia risus. Phasellus quis dolor eget sem porta lobortis et vel
          magna. Vivamus at commodo libero. Vestibulum euismod ex at libero
          mollis, vitae tincidunt justo vestibulum. Proin auctor nisi eget arcu
          dignissim tristique. Vestibulum sed nisi felis. Nam condimentum dui at
          leo tincidunt, at aliquam justo tempor.
        </Typography>
        {/* More counselor information goes here */}
      </Container>
    </div>
  );
}

export default CounselorIntro;
