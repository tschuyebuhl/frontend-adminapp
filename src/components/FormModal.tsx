import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { FormColumn } from '../types/FormColumn';
import { FormField } from './FormField';

type FormModalProps<T extends Record<string, any>> = {
  title: string;
  open: boolean;
  onClose?: () => void;
  onSubmit: (values: T) => Promise<void>;
  columns: FormColumn<T>[];
  onCompletion?: () => void;
  initialValues: T;
  validate: (values: T) => { [key in keyof T]?: string };
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

  useEffect(() => {
    if (open) {
      const errors = validate(values);
      setErrors(errors);
    }
  }, [values]);

  useEffect(() => {
    if (open) {
      setValues(initialValues);
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(values);
      if (onCompletion) {
        onCompletion();
      }
    } catch (error) {
      console.error('There was an issue:', error);
    } finally {
      setLoading(false);
      if (onClose) {
        onClose();
      }
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
                label={column.label}
                name={column.accessorKey as string}
                value={values[column.accessorKey] || ''}
                helperText={errors[column.accessorKey]}
                error={Boolean(errors[column.accessorKey])}
                onChange={(e) => {
                  let value: string | number = e.target.value;
                  if (column.type === 'number') {
                    value = Number(value);
                  }
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
          {loading ? <CircularProgress size={24} /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
