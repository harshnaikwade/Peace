//temp.js
import React from "react";
import profileImage from "../Components/Media/profile.png";
// import ProfilePicture from "./Forms/UserForm";

const Temp = () => {
  // Placeholder name until the user submits the form
  const userName = "Apeksha";

  const containerStyle = {
    display: "flex",
  };

  const sidebarStyle = {
    backgroundColor: "#3098f4",
    width: "150px",
    height: "100vh",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    overflowY: "auto",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20px",
  };

  const mainContentStyle = {
    flex: "1",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const profileIconStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
  };

  const headingContainerStyle = {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: "1px",
    color: "#05467f", // Set color to black for 'Hi'
  };

  const userNameStyle = {
    color: "#3098f4", // Set color to the specified color for the username
  };

  const subHeadingStyle = {
    fontSize: "1.5rem",
    color: "#05467f",
    marginBottom: "10px",
    fontWeight: "200",
    fontStyle: "italic",
    letterSpacing: "1px",
  };

  const logoutButtonStyle = {
    backgroundColor: "#3098f4",
    color: "white",
    padding: "12px 30px",
    borderRadius: "20px",
    cursor: "pointer",
    border: "none",
    fontSize: "1.2rem",
    marginTop: "10px",
  };

  const menuItemsStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  };

  const menuItemStyle = {
    padding: "10px",
    cursor: "pointer",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "600",
  };

  // const searchInputStyle = {
  //   padding: "10px",
  //   marginRight: "10px",
  //   borderRadius: "5px",
  //   border: "1px solid #ccc",
  //   width: "200px",
  // };

  const idealMatchesSectionStyle = {
    backgroundColor: "#d6eafd",
    padding: "10px",
    borderRadius: "20px",
    overflowY: "auto",
    height: "100vh",
    color: "#05467f",
    marginTop: "10px",
  };

  const matchCardStyle = {
    backgroundColor: "white",
    padding: "10px",
    height: "5rem",
    marginBottom: "10px",
    borderRadius: "10px",
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        {/* Profile icon in the sidebar */}
        <img src={profileImage} alt="Profile Icon" style={profileIconStyle} />
        {/* <ProfilePicture /> */}

        {/* Sidebar content goes here */}
        <div style={menuItemsStyle}>
          <div style={menuItemStyle}>Home</div>
          <div style={menuItemStyle}>About Us</div>
          <div style={menuItemStyle}>Contact Us</div>
          <div style={menuItemStyle}>Therapy</div>
          <div style={menuItemStyle}>Know More</div>
        </div>

        {/* Add more sidebar content as needed */}
      </div>

      <div style={mainContentStyle}>
        {/* Heading, Logout button, and subheading above the main content */}
        <div style={headingContainerStyle}>
          <span style={headingStyle}>
            Hi, <span style={userNameStyle}>{userName}</span>
          </span>
          <button style={logoutButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h2 style={subHeadingStyle}>Hope you're having a good day!</h2>

        {/* Search bar above the Ideal Matches section */}

        {/* Main content including Ideal Matches section */}
        <div style={idealMatchesSectionStyle}>
          <h2>Here are your ideal matches...</h2>
          {/* Your content for ideal matches goes here */}
          <div style={matchCardStyle}></div>
          <div style={matchCardStyle}></div>
          {/* Add more match cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default Temp;
