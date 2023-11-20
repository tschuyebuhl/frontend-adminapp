import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogTitle,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import { networkDetails, getNextIP } from '../features/ipam/Network';
import { CreateVirtualMachineRequest } from '../features/vm/VirtualMachine';
import { useFolders } from '../hooks/useFolders';
import { useHosts } from '../hooks/useHosts';
import { useNetworks } from '../hooks/useNetworks';
import { useTemplates } from '../hooks/useTemplates';
import { ColumnDef, vmColumns } from '../models/ModalColumns';
import { AlertSnackbar } from './AlertSnackbar';
import { FormField } from './FormField';
type CreateModalProps<T extends MRT_RowData> = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => Promise<void>;
  columns: ColumnDef<T>[];
  onCompletion: () => void;
};

const CreateNewVirtualMachineModal = <T extends {}>({
  open,
  columns,
  onClose,
  onSubmit,
  onCompletion,
}: CreateModalProps<T>) => {
  const [values, setValues] = useState<T>();
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
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

  const [loading, setLoading] = useState(false);

  const handleChange = async (accessorKey: keyof T, value: any) => {
    setValues({ ...values, [accessorKey]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
      onCompletion();
    } catch (error) {
      console.error('There was an issue:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  //when you select a network, it should populate the prefix, dns servers, gateways, and domain
  //when you select a template, it should populate the provider and ssh keys

  const getItems = (accessorKey: string) => {
    switch (accessorKey) {
      case 'host':
        return hosts;
      case 'folder':
        return folders;
      case 'network_id':
        return networks;
      case 'template_id':
        return templates;
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
            {vmColumns.map((column) => (
              <FormField<CreateVirtualMachineRequest>
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
      <AlertSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Dialog>
  );
};

export default CreateNewVirtualMachineModal;
