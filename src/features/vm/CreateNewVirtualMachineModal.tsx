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

const CreateNewVirtualMachineModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<CreateVirtualMachineRequest>(() => //maybe can use partial here?
  columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any)
  );

  const { hosts, folders } = useFetchHostsAndFolders(open);


  const fetchData = async () => {
    const fetchedHosts = await fetchHosts(); 
    const fetchedFolders = await fetchFolders(); 

  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const handleSubmit = async () => {
    console.log("handleSubmit called"); 
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
      <DialogTitle sx={{ margin: 1.27 }} textAlign="center">VM Properties</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '300px', md: '400px' },
              gap: '1.5rem',
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
          disabled={loading}
          >
          {loading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
    );
};

export default CreateNewVirtualMachineModal;