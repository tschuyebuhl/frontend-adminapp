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
import { MRT_ColumnDef } from 'material-react-table';

type FormModalProps<T extends Record<string, any>> = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => Promise<void>;
  columns: MRT_ColumnDef<T>[];
  onCompletion: () => void;
  initialValues: T;
  validate: (values: T) => { [key in keyof T]?: string };
};

const isValidIP = (ip: string) => {
  const regex = new RegExp(
    '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$',
  );
  return regex.test(ip);
};

const FormModal = <T extends Record<string, any>>({
  open,
  columns,
  onClose,
  onSubmit,
  onCompletion,
  initialValues,
  validate,
  title,
}: FormModalProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

  /*const { hosts, folders } = useFetchHostsAndFolders(open);


  const fetchData = async () => {
    const fetchedHosts = await fetchHosts();
    const fetchedFolders = await fetchFolders();
  };
  */

  const fetchData = async () => {
    console.log('im so fetching right now');
  };

  useEffect(() => {
    if (open) {
      fetchData();
      const errors = validate(values);
      setErrors(errors);
    }
  }, [open, values]);

  useEffect(() => {
    if (open) {
      fetchData();
      setValues(initialValues);
      const errors = validate(values);
      setErrors(errors);
    }
  }, [open]);

  const handleSubmit = async () => {
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

  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ margin: '0.25rem' }} textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '300px', md: '400px' },
              gap: '1.5rem',
              mt: '5px',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={String(column.accessorKey)}
                label={column.header}
                name={column.accessorKey as string}
                value={values[column.accessorKey as keyof T] || ''} // <-- Add this line
                helperText={errors[column.accessorKey as keyof T]}
                error={Boolean(errors[column.accessorKey as keyof T])}
                onChange={(e) => {
                  let value: string | number = e.target.value;
                  setValues({ ...values, [e.target.name]: value });
                }}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          color="secondary"
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || Object.keys(errors).length > 0}
        >
          {loading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
