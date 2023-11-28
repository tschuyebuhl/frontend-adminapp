import { MRT_ColumnDef } from 'material-react-table';
import { VirtualMachine, CreateVirtualMachineRequest } from '../features/vm/VirtualMachine';

//keys: string, values of any type
export interface ColumnDef<T> extends Record<string, any> {
  header: string;
  accessorKey: Extract<keyof T, string>;
  type: 'text' | 'select' | 'number' | 'date' | 'array' | 'vSphereSelect' | 'idSelect' | 'checkbox';
  accessorFn?: (row: T) => string | number | string[] | number[];
}

export const vmColumns: ColumnDef<CreateVirtualMachineRequest>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    type: 'text',
  },
  {
    header: 'Template',
    accessorKey: 'template_id',
    type: 'select',
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
    header: 'SSH Keys',
    accessorKey: 'ssh_key',
    type: 'select',
  },
  {
    header: 'Folder',
    accessorKey: 'folder',
    type: 'select',
  },
  {
    header: 'IP',
    accessorKey: 'ip_address',
    type: 'text',
  },
  {
    header: 'Subnet Mask',
    accessorKey: 'prefix_length',
    type: 'number',
  },
  {
    header: 'DNS Servers',
    accessorKey: 'dns_servers',
    type: 'array',
  },
  {
    header: 'Gateway',
    accessorKey: 'gateway',
    type: 'text',
  },
  {
    header: 'Domain',
    accessorKey: 'domain',
    type: 'text',
  },
  {
    header: 'Timezone',
    accessorKey: 'timezone',
    type: 'text',
  },
  {
    header: 'Provider',
    accessorKey: 'provider',
    type: 'text',
  },
  {
    header: 'Size',
    accessorKey: 'size',
    type: 'text',
  },
  {
    header: 'Power on after creation',
    accessorKey: 'power_on',
    type: 'checkbox',
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
