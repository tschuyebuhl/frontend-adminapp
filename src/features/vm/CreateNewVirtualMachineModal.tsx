import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { CreateVirtualMachineRequest } from './VirtualMachine';
import { vmColumns } from '../../models/ModalColumns';
import { useFolders } from '../../hooks/useFolders';
import { useHosts } from '../../hooks/useHosts';
import { useTemplates } from '../../hooks/useTemplates';
import { useNetworks } from '../../hooks/useNetworks';
import { FormField } from '../../components/FormField';
import { getNextIP, networkDetails } from '../ipam/Network';
import { AlertSnackbar } from '../../components/AlertSnackbar';
import { useSSHKeys } from '../../hooks/useSSHKeys';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { getSSHKey } from '../settings/models';

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
    ip_address: '',
    host: '',
    network_id: '',
    folder: '',
    prefix_length: 0,
    dns_servers: [],
    gateway: '',
    domain: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    template_id: '',
    provider: 'vSphere',
    ssh_key: '',
    size: { memory_gb: 12, num_cpus: 4, disk_gb: 162, storage_tier: 'thin' },
    power_on: true,
  };

  const typeText = useTypingEffect((fieldName: any, value: any) => {
    setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
  }, 30);

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

    switch (accessorKey) {
      case 'network_id':
        try {
          const network = await networkDetails(value);
          const freeIP = await getNextIP(network.id);

          await typeText('ip_address', freeIP.address);
          setValues((prevValues) => ({
            ...prevValues,
            prefix_length: network.subnetMask,
            dns_servers: network.dnsServers,
          }));
          //await typeText('dns_servers', network.dnsServers.join(', '));
          await typeText('gateway', network.gateway);
          await typeText('domain', network.domain);
          success('Fetched IP Address successfully.');
        } catch (fetchError) {
          console.error('An error occurred while fetching network details or IP', fetchError);
          error('test');
        }
        break;
      case 'ssh_key':
        try {
          const sshKey = await getSSHKey(value);
          console.log(sshKey);
          setValues((prevValues) => ({
            ...prevValues,
          }));
          success('Fetched SSH Key successfully.');
        } catch (fetchError) {
          console.error('An error occurred while fetching SSH Key', fetchError);
          error('test');
        }
        break;
      case 'power_on':
        const target = event?.target as HTMLInputElement;
        const { type, checked } = target;
        const val = target.value;
        const newValue = checked;
        console.log(val);
        setValues({ ...values, [accessorKey]: newValue });
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
      onCompletion();
      console.log('values: ', values);
    } catch (e) {
      console.error('There was an issue:', e);
      error('There was an issue creating the VM.');
    } finally {
      setLoading(false);
      onClose();
    }
  };
  // when you select a network, it should populate the prefix, dns servers, gateways, and domain
  // when you select a template, it should populate the provider and ssh keys

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
      case 'ssh_key':
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

export default CreateNewVirtualMachineModal;
