import { MRT_ColumnDef } from 'material-react-table';
import { VirtualMachine, CreateVirtualMachineRequest } from './VirtualMachine';

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
    ];