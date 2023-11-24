import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import { AlertSnackbar } from '../../components/AlertSnackbar';
import { GenerateSSHKeyRequest } from './models';
import { SSHFormField } from './SSHFormField';
import { ColumnDef } from '../../models/ModalColumns';

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: GenerateSSHKeyRequest) => Promise<void>;
  columns: ColumnDef<GenerateSSHKeyRequest>[];
  onCompletion: () => void;
};

const GenerateSSHKeyModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  onCompletion,
}: CreateModalProps) => {
  // Initialize values based on columns
  const initialValues: GenerateSSHKeyRequest = {} as GenerateSSHKeyRequest;

  const [values, setValues] = useState<GenerateSSHKeyRequest>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof GenerateSSHKeyRequest]?: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('Success!');

  const success = (message?: string): void => {
    setSnackbarOpen(true);
    setSnackbarSeverity('success');
    setSnackbarMessage(message ?? 'Operation finished sucessfully.');
  };

  const error = (message?: string): void => {
    setSnackbarOpen(true);
    setSnackbarSeverity('error');
    setSnackbarMessage(message ?? 'Operation failed. Please check server logs.');
  };

  const types = [
    { id: 'rsa', name: 'RSA' },
    { id: 'ed25519', name: 'ed25519' },
  ];
  const allowedLengths = [
    { id: 1024, name: 1024 },
    { id: 2048, name: 2048 },
    { id: 4096, name: 4096 },
    { id: 8192, name: 8192 },
  ];

  const [loading, setLoading] = useState(false);

  const handleChange = async (accessorKey: string, value: any) => {
    setValues({ ...values, [accessorKey]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
      onCompletion();
      success();
    } catch (apiError) {
      console.error('There was an issue:', apiError);
      error();
    } finally {
      setLoading(false);
      //onClose();
    }
  };

  const getItems = (accessorKey: string) => {
    switch (accessorKey) {
      case 'type':
        return types;
      case 'length':
        return allowedLengths;
      default:
        return [];
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ margin: '0.25rem' }} textAlign="center">
        VM Properties
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '300px', md: '400px' },
              gap: '1.5rem',
              mt: '5px',
            }}
          >
            {columns.map((column) => (
              <SSHFormField
                key={column.accessorKey}
                column={column}
                value={values[column.accessorKey] || ''}
                onChange={handleChange}
                items={getItems(column.accessorKey)}
                errors={errors}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
      <AlertSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Dialog>
  );
};

export default GenerateSSHKeyModal;
