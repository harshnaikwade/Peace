import React from "react";

import { Container, Typography, TextField, Button } from "@mui/material";

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        // marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"

        // style={{ marginBottom: theme.spacing(2) }}
      >
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: 100 }}>
        <TextField
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ContactUs;
