import { MRT_ColumnDef } from 'material-react-table';
import { VirtualMachine, CreateVirtualMachineRequest } from './VirtualMachine';
import { useMemo } from 'react';

export const vmColumns: MRT_ColumnDef<CreateVirtualMachineRequest>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'IP',
    accessorKey: 'ip',
  },
  {
    header: 'Host',
    accessorKey: 'host',

  },
  {
    header: 'Folder',
    accessorKey: 'folder',
  },
  {
    header: 'Prefix',
    accessorKey: 'prefix',
  },
  {
    header: 'DNS Servers',
    accessorKey: 'dns_servers',
  },
  {
    header: 'Gateways',
    accessorKey: 'gateways',
  },
  {
    header: 'Domain',
    accessorKey: 'domain',
  },
  {
    header: 'Timezone',
    accessorKey: 'timezone',
  },
  {
    header: 'Template',
    accessorKey: 'template_id',
  },
  {
    header: 'Provider',
    accessorKey: 'provider',
  },
  {
    header: 'SSH Keys',
    accessorKey: 'ssh_keys',
  }
];

export const columns: MRT_ColumnDef<VirtualMachine>[] = [
  {
    accessorKey: 'Name',
    header: 'Name',
  },
  {
    accessorKey: 'PowerState',
    header: 'Power State',
  },
  {
    accessorKey: 'NumCpus',
    header: 'vCPU',
  },
  {
    accessorKey: 'MemoryMB',
    header: 'RAM',
  },
  {
    accessorKey: 'HostName',
    header: 'Host',
  },
  {
    accessorKey: 'CustomerName',
    header: 'Customer',
  },
];
