import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
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
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
  Collapse,
  Icon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import logoImage from "../../Components/Media/logo.png";
import Survey from "../../Components/Survey/survey";
import Profile from "../../Components/Common/Profile";
import "./dashboard.css";

const settings = ["Profile", "Logout"];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidenavCollapsed, setIsSidenavCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const { type } = location.state || {};
  const firstName = data?.firstName;
  // const diagnosis = data?.diagnosis;
  const [showSurvey, setShowSurvey] = useState(true);
  const [surveyResponse, setSurveyResponse] = useState(null);
  const [expanded, setExpanded] = useState({});

  const handleSurveyResponse = useCallback((response) => {
    setSurveyResponse(response);
    setShowSurvey(false);
  }, []);

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
      setProfileOpen(true);
      handleCloseUserMenu();
    } else {
      handleCloseUserMenu();
    }
  };

  const handleCloseProfileDialog = () => {
    setProfileOpen(false);
  };

  const handleTabClick = (text) => {
    setActiveTab(text);
    console.log(`Navigate to ${text}`);
  };

  const toggleSidenav = () => {
    setIsSidenavCollapsed(!isSidenavCollapsed);
  };

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <>
            {type === "User" ? (
              <>
                {showSurvey && (
                  <Survey onSurveyResponse={handleSurveyResponse} />
                )}
                {!showSurvey && surveyResponse && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >
                    {surveyResponse.map((user, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: { xs: "100%", sm: "45%", md: "20vw" },
                          marginBottom: "20px",
                        }}
                      >
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "16px",
                          }}
                        >
                          <CardActionArea
                            onClick={() => handleExpandClick(index)}
                          >
                            <Icon
                              sx={{ position: "absolute", top: 10, right: 10 }}
                            >
                              <InfoIcon />
                            </Icon>
                            <CardContent>
                              <Typography variant="body1">
                                {user.firstName} {user.lastName}
                              </Typography>
                              <Typography variant="body1">
                                Area of Expertise: {user.areaofexpertise}
                              </Typography>
                              <Typography variant="body1">
                                Years of Experience: {user.yearsofexperience}
                              </Typography>
                            </CardContent>
                          </CardActionArea>

                          <Collapse
                            in={expanded[index] || false}
                            timeout="auto"
                            unmountOnExit
                          >
                            <CardContent>
                              {/* Detailed information about the counselor goes here */}
                              <Typography paragraph>
                                Detailed information about the counselor...
                              </Typography>
                            </CardContent>
                          </Collapse>
                          <CardActions>
                            {expanded[index] && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  console.log(
                                    `Request to ${user.firstName} ${user.lastName}`
                                  )
                                }
                              >
                                Send Request
                              </Button>
                            )}
                          </CardActions>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                )}
              </>
            ) : (
              type === "Counselor" && "Counselor"
            )}
            {type !== "User" && type !== "Counselor" && "Type not found"}
          </>
        );
      case "About Us":
        return <Typography>About Us</Typography>;
      case "Contact Us":
        return <Typography>Contact Us</Typography>;
      case "Therapy":
        return <Typography>Therapy</Typography>;
      case "Know More":
        return <Typography>Know More</Typography>;
      default:
        return (
          <iframe
            width="100%"
            height="100%"
            title="error"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showinfo=0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            style={{
              borderRadius: "20px",
              pointerEvents: "none",
            }}
          ></iframe>
        );
    }
  };

  return (
    <Box style={{ display: "flex" }}>
      <Box style={{ display: "flex" }}>
        <Box
          id="navbar"
          className={`navbar ${isSidenavCollapsed ? "collapsed" : ""}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Avatar"
            src={logoImage}
            style={{
              width: 128,
              height: 128,
            }}
          />
          <List className="navbar-list">
            {["Home", "About Us", "Contact Us", "Therapy", "Know More"].map(
              (text, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleTabClick(text)}
                  className="navbar-link"
                  sx={{
                    backgroundColor:
                      activeTab === text ? "#205d86" : "transparent",
                    "&:hover": {
                      backgroundColor: "#205d86",
                    },
                  }}
                >
                  <ListItemText
                    primary={text}
                    style={{ textAlign: "center" }}
                  />
                </ListItemButton>
              )
            )}
          </List>
        </Box>
      </Box>

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
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={toggleSidenav}>
              {isSidenavCollapsed ? <MenuIcon /> : <MenuIcon />}
            </IconButton>
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
                marginLeft: "10px",
              }}
            >
              Hi,{" "}
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
          </Box>

          <>
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
          </>
        </AppBar>

        <Box
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
        </Box>

        <Box
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
              height: "77vh",
            }}
          >
            {renderTabContent()}
          </Box>
        </Box>
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
