// src/components/Survey.js
import React, { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Card,
} from "@mui/material";
import QForm from "./qform";

const Survey = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        // width: "30%",
        height: "-webkit-fill-available",
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
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
        Hey, Lets begin to know you better...
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginTop: "20px" }}
      >
        Take Survey
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <QForm onClose={handleClose} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Card>
  );
};

export default Survey;
