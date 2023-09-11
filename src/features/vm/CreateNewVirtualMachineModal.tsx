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
import { VirtualMachine, CreateVirtualMachineRequest, getVirtualMachines } from './VirtualMachine';
import { Host, fetchHosts } from './Host';
import { Folder, fetchFolders } from './Folder';
import { vmColumns } from './ModalColumns';
import { useFetchHostsAndFolders } from './useHostsAndFolders';

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateVirtualMachineRequest) => Promise<void>;
  columns: MRT_ColumnDef<CreateVirtualMachineRequest>[];
};
const isValidIP = (ip: string) => {
  const regex = new RegExp(
    "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
  );
  return regex.test(ip);
};

const validateForm = (values: CreateVirtualMachineRequest) => {
  const errors: { [key in keyof CreateVirtualMachineRequest]?: string } = {};
  
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.ip) {
    errors.ip = "IP address is required";
  } else if (!isValidIP(values.ip)) {
    errors.ip = "IP address is invalid";
  }

  if (!values.host) {
    errors.host = "Host is required";
  }

  if (!values.folder) {
    errors.folder = "Folder is required";
  }

  return errors;
};


const CreateNewVirtualMachineModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  // Initialize values based on columns
  const initialValues: CreateVirtualMachineRequest = {
    name: '',
    ip: '',
    host: '',
    folder: '',
    prefix: 0, // or another default
    dns_servers: [], // or another default
    gateways: [], // or another default
    domain: '', // or another default
    timezone: '', // or another default
    template_id: '', // or another default
    provider: '', // or another default
    ssh_keys: [], // or another default
  };
  
  const [values, setValues] = useState<CreateVirtualMachineRequest>(initialValues);
  

  const [errors, setErrors] = useState<{ [key in keyof CreateVirtualMachineRequest]?: string }>({});

  const { hosts, folders } = useFetchHostsAndFolders(open);


  const fetchData = async () => {
    const fetchedHosts = await fetchHosts(); 
    const fetchedFolders = await fetchFolders(); 

  };

  useEffect(() => {
    if (open) {
      fetchData();
      const errors = validateForm(values);
      setErrors(errors);
    }
  }, [open, values]);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
    onClose();
    getVirtualMachines();
  };

  const [loading, setLoading] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ margin: '0.25rem' }} textAlign="center">VM Properties</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '300px', md: '400px' },
              gap: '1.5rem',
              mt: '5px'
            }}
          >
            {vmColumns.map((column) => (
              column.accessorKey === 'host' ? (
                <FormControl fullWidth>
                  <InputLabel htmlFor="host">Host</InputLabel>
                  <Select
                    label="Host"
                    name={column.accessorKey}
                    value={values[column.accessorKey] || ''}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  >
                    {hosts.map((host) => (
                      <MenuItem key={host.ID} value={host.VsphereID}>
                        {`${host.Name}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : column.accessorKey === 'folder' ? (
                <FormControl fullWidth>
                  <InputLabel htmlFor="folder">Folder</InputLabel>
                  <Select
                    label="Folder"
                    name={column.accessorKey}
                    value={values[column.accessorKey] || ''}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  >
                    {folders.map((folder) => (
                      <MenuItem key={folder.ID} value={folder.VsphereID}>
                        {folder.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : column.accessorKey === 'dns_servers' ? (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  helperText={errors[column.accessorKey]}
                  error={Boolean(errors[column.accessorKey])}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value.split(',').map(item => item.trim()),
                    });
                  }}
                />
              ) : (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  helperText={errors[column.accessorKey ? column.accessorKey : 'name']}
                  error={Boolean(errors[column.accessorKey ? column.accessorKey : 'name'])}
                  onChange={(e) => {
                    let value: string | number = e.target.value;
                    if (column.accessorKey === 'prefix') {
                      value = Number(value);
                    }
                    setValues({ ...values, [e.target.name]: value });
                  }}
                />
              )
            ))}
          </Stack>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: '1.25rem' }}>
        <Button 
        onClick={onClose}
        color="primary"
        variant="contained"
        >
          Cancel</Button>
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

export default CreateNewVirtualMachineModal;