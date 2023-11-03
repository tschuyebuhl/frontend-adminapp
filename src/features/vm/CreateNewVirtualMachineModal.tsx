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
import { vmColumns } from './ModalColumns';
import { useFolders } from './useFolders';
import { useHosts } from './useHosts';
import { useTemplates } from './useTemplates';
import { useNetworks } from './useNetworks';
import { FormField } from '../../components/FormField';

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateVirtualMachineRequest) => Promise<void>;
  columns: MRT_ColumnDef<CreateVirtualMachineRequest>[];
  onCompletion: () => void;
};
const isValidIP = (ip: string) => {
  const regex = new RegExp(
    '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$',
  );
  return regex.test(ip);
};

const validateForm = (values: CreateVirtualMachineRequest) => {
  const errors: { [key in keyof CreateVirtualMachineRequest]?: string } = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.ip) {
    errors.ip = 'IP address is required';
  } else if (!isValidIP(values.ip)) {
    errors.ip = 'IP address is invalid';
  }

  if (!values.host) {
    errors.host = 'Host is required';
  }

  if (!values.folder) {
    errors.folder = 'Folder is required';
  }

  return errors;
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
    gateways: [],
    domain: '',
    timezone: '',
    template_id: '',
    provider: '',
    ssh_keys: [],
  };

  const [values, setValues] = useState<CreateVirtualMachineRequest>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof CreateVirtualMachineRequest]?: string }>({});
  const hosts = useHosts(open);
  const folders = useFolders(open);
  const templates = useTemplates(open);
  const networks = useNetworks(open);
  const [loading, setLoading] = useState(false);

  const handleChange = (accessorKey: string, value: any) => {
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

  const getItems = (accessorKey: string) => {
    switch (accessorKey) {
      case 'host':
        return hosts;
      case 'folder':
        return folders;
      case 'template_id':
        return templates;
      case 'network_id':
        return networks;
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
              <FormField
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
    </Dialog>
  );
};

export default CreateNewVirtualMachineModal;
