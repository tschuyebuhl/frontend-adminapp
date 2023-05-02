import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { VirtualMachine } from './VirtualMachine';

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: VirtualMachine) => void;
  columns: MRT_ColumnDef<VirtualMachine>[];
};

const CreateNewVirtualMachineModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any)
  );

  const [hosts, setHosts] = useState<string[]>([]);
  const [folders, setFolders] = useState<string[]>([]);

  const fetchData = async () => {
    const fetchedHosts = await fetchHosts(); // Replace with your function to fetch hosts from your API
    const fetchedFolders = await fetchFolders(); // Replace with your function to fetch folders from your API

    setHosts(fetchedHosts);
    setFolders(fetchedFolders);
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle textAlign="center">Create New Virtual Machine</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
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
                      <MenuItem key={host} value={host}>
                        {host}
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
                      <MenuItem key={folder} value={folder}>
                        {folder}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
              )
            ))}
          </Stack>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="secondary"
          onClick={handleSubmit}
          variant="contained"
          >
          Create New Virtual Machine
        </Button>
      </DialogActions>
    </Dialog>
    );
};

export default CreateNewVirtualMachineModal;