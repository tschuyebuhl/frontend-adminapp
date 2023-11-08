import { Snackbar, Alert, Slide } from '@mui/material';
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
    <Snackbar open={open} autoHideDuration={3500} onClose={handleClose} TransitionComponent={Slide}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
