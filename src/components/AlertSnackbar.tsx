import { Snackbar, Alert } from '@mui/material';
import React from 'react';

interface AlertSnackbarProps {
  open: boolean;
  handleClose: () => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

export const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  open,
  handleClose,
  severity,
  message,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
