import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import logoImage from "../Components/Media/logo.png";
import Survey from "../Components/Survey/survey";
import Profile from "../Components/Common/Profile";

const settings = ["Profile", "Logout"];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false); // State for Profile dialog
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const { type } = location.state || {};
  const firstName = data?.firstName;
  const diagnosis = data?.diagnosis;

  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleMenuItemClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Profile") {
      // setProfileOpen(true); // Open Profile dialog
      console.log(type);
      console.log(data);
      handleCloseUserMenu();
    } else {
      handleCloseUserMenu();
    }
  };

  const handleCloseProfileDialog = () => {
    setProfileOpen(false);
  };

  return (
    <Box style={{ display: "flex" }}>
      <Container
        id="sidenav"
        style={{
          backgroundColor: "#3098f4",
          width: "15vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 16,
          overflowY: "auto",
        }}
      >
        <Avatar
          alt="Avatar"
          src={logoImage}
          style={{ width: 128, height: 128, marginBottom: 10, marginTop: 10 }}
        />
        <List
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          {["Home", "About Us", "Contact Us", "Therapy", "Know More"].map(
            (text, index) => (
              <ListItemButton
                key={index}
                onClick={() => console.log(`Navigate to ${text}`)}
              >
                <ListItemText primary={text} style={{ textAlign: "center" }} />
              </ListItemButton>
            )
          )}
        </List>
      </Container>

      <Box
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <AppBar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "10vh",
            position: "relative",
            borderRadius: 16,
            padding: 10,
            backgroundColor: "#d6eafd",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              fontStyle: "italic",
              letterSpacing: "1px",
              color: "#05467f",
              display: "flex",
              alignItems: "center",
            }}
          >
            Hi,
            <Typography
              variant={"inherit"}
              sx={{
                color: "#3098f4",
                marginLeft: "0.5rem",
              }}
            >
              {loading ? <Skeleton variant="text" width={100} /> : firstName}
            </Typography>
          </Typography>

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={firstName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="user-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuItemClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </AppBar>

        <div
          id="quote"
          style={{
            position: "relative",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "1.5rem",
              color: "#05467f",
              fontWeight: "200",
              fontStyle: "italic",
              letterSpacing: "1px",
            }}
          >
            Hope you're having a good day!
          </Typography>
        </div>

        <div
          id="main"
          style={{
            position: "relative",
          }}
        >
          <Box
            style={{
              backgroundColor: "#d6eafd",
              padding: "10px",
              borderRadius: "20px",
              overflowY: "auto",
              color: "#05467f",
              height: "76.5vh",
            }}
          >
            {type === "User" ? (
              diagnosis ? (
                <Typography>{diagnosis}</Typography>
              ) : (
                <Survey />
              )
            ) : (
              type === "Counselor" && "Counselor"
            )}
            {type !== "User" && type !== "Counselor" && "Type not found"}
          </Box>
        </div>
      </Box>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onClose={handleCloseProfileDialog}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Profile type={type} data={data} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
