import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({
  open,
  onClose,
  autoHideDuration = 4000,
  severity = "success",
  sx = { width: "100%" },
  message = "This is a success Alert inside a Snackbar!",
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={onClose} severity={severity} variant="filled" sx={sx}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
