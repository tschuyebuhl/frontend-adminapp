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
import { Host, fetchHosts } from '../../models/Host';
import { Folder, fetchFolders } from '../../models/Folder';
import { vmColumns } from '../../models/ModalColumns';
import { useFolders } from '../../hooks/useFolders';
import { useHosts } from '../../hooks/useHosts';
import { useTemplates } from '../../hooks/useTemplates';
import { useNetworks } from '../../hooks/useNetworks';
import { FormField } from '../../components/FormField';
import { IP, Network } from '../ipam/models';
import { getNextIP, networkDetails } from '../ipam/Network';
import { AlertSnackbar } from '../../components/AlertSnackbar';
import { useSSHKeys } from '../../hooks/useSSHKeys';

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateVirtualMachineRequest) => Promise<void>;
  columns: MRT_ColumnDef<CreateVirtualMachineRequest>[];
  onCompletion: () => void;
};

const CreateNewVirtualMachineModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  onCompletion,
}: CreateModalProps) => {
  // Initialize values based on columns
  const initialValues: CreateVirtualMachineRequest = {
    name: '',
    ip: '',
    host: '',
    network_id: '',
    folder: '',
    prefix: 0,
    dns_servers: [],
    gateway: '',
    domain: '',
    timezone: '',
    template_id: '',
    provider: '',
    ssh_keys: [],
  };

  const [values, setValues] = useState<CreateVirtualMachineRequest>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof CreateVirtualMachineRequest]?: string }>({});
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

  const hosts = useHosts(open);
  const folders = useFolders(open);
  const templates = useTemplates(open);
  const networks = useNetworks(open);
  const sshKeys = useSSHKeys(open);
  const [loading, setLoading] = useState(false);

  const handleChange = async (accessorKey: string, value: any) => {
    setValues({ ...values, [accessorKey]: value });

    if (accessorKey === 'network_id') {
      try {
        const network = await networkDetails(value); // wait for the network details
        const freeIP = await getNextIP(network.id); // wait for the next IP
        console.log('dns servers: ', network.dnsServers);
        setValues((prevValues) => ({
          ...prevValues,
          ip: freeIP.address,
          dns_servers: network.dnsServers,
          gateway: network.gateway,
        }));
        success('Fetched IP Address successfully.');
      } catch (fetchError) {
        console.error('An error occurred while fetching network details or IP', fetchError);
        error('test');
      }
    }
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
      case 'ssh_keys':
        return sshKeys;
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
