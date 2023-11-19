import { MRT_ColumnDef } from 'material-react-table';
import { VirtualMachine, CreateVirtualMachineRequest } from '../features/vm/VirtualMachine';
import { useMemo } from 'react';

//keys: string, values of any type
export interface ColumnDef<T> extends Record<string, any> {
  header: string;
  accessorKey: keyof T;
  type: 'text' | 'select' | 'number' | 'date' | 'array';
  accessorFn?: (row: T) => string | number | string[] | number[];
}

export const vmColumns: ColumnDef<CreateVirtualMachineRequest>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    type: 'text',
  },
  {
    header: 'IP',
    accessorKey: 'ip',
    type: 'text',
  },
  {
    header: 'Host',
    accessorKey: 'host',
    type: 'select',
  },
  {
    header: 'Network',
    accessorKey: 'network_id',
    type: 'select',
  },
  {
    header: 'Folder',
    accessorKey: 'folder',
    type: 'select',
  },
  {
    header: 'DNS Servers',
    accessorKey: 'dns_servers',
    type: 'text', //fetch out of network
  },
  {
    header: 'Gateway',
    accessorKey: 'gateway',
    type: 'text', //fetch out of network
  },
  {
    header: 'Domain',
    accessorKey: 'domain',
    type: 'text',
  },
  {
    header: 'Timezone',
    accessorKey: 'timezone',
    type: 'select',
  },
  {
    header: 'Template',
    accessorKey: 'template_id',
    type: 'select',
  },
  {
    header: 'Provider',
    accessorKey: 'provider',
    type: 'select',
  },
  {
    header: 'SSH Keys',
    accessorKey: 'ssh_keys',
    type: 'select',
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
