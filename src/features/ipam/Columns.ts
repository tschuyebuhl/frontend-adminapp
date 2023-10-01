import { MRT_ColumnDef } from "material-react-table";
import { CreateIPAddressRequest, IPAddress, Network } from "./models";
import { FormColumn } from "../../types/FormColumn";

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

export const networkFormColumns: FormColumn<Network>[] = [
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


export const ipColumns: FormColumn<CreateIPAddressRequest>[] = [
  {
    header: 'IP Address',
    label: 'IP Address',
    accessorKey: 'ip',
    type: 'string',
  },
  {
    header: 'Prefix',
    label: 'Prefix',
    accessorKey: 'prefix',
    type: 'number',
  },
  {
    header: 'State',
    label: 'State',
    accessorKey: 'state',
    type: 'string',
  },
  {
    header: 'Hostname',
    label: 'Hostname',
    accessorKey: 'hostname',
    type: 'string',
  },
  {
    header: 'Description',
    label: 'Description',
    accessorKey: 'description',
    type: 'string',
  },
]