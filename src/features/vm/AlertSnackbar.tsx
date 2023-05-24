import { Snackbar, Alert } from "@mui/material";
import { AlertSnackbarProps } from "./AlertSnackbarProps";

export const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  open,
  handleClose,
  severity,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};