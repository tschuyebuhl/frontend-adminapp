import { MRT_ColumnDef } from "material-react-table";
import { Network } from "./Network";

export const networkColumns: MRT_ColumnDef<Network>[] = [
  {
    header: 'id',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'VLAN ID',
    accessorKey: 'vlanId',
  },
  {
    header: 'Subnet Mask',
    accessorKey: 'subnetMask',
  },
  {
    header: 'Gateway',
    accessorKey: 'gateway',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'DHCP Enabled',
    accessorKey: 'dhcpEnabled',
    Cell: ({ value }: any) => (value ? 'Enabled' : 'Disabled'),
  },
  {
    header: 'DHCP Start',
    accessorKey: 'dhcpStart',
  },
  {
    header: 'DHCP End',
    accessorKey: 'dhcpEnd',
  },
  {
    header: 'Port Group ID',
    accessorKey: 'portGroupId',
  },
];
