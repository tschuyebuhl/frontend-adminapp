import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Network } from './models';

interface NetworkTableProps {
  networks: Network[];
}

const NetworkTable: React.FC<NetworkTableProps> = ({ networks }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>VLAN ID</TableCell>
          <TableCell>Subnet Mask</TableCell>
          <TableCell>Gateway</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>DHCP</TableCell>
          <TableCell>Port Group ID</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {networks.map((network) => (
          <TableRow key={network.id}>
            <TableCell>{network.name}</TableCell>
            <TableCell>{network.vlanId}</TableCell>
            <TableCell>{network.subnetMask}</TableCell>
            <TableCell>{network.gateway}</TableCell>
            <TableCell>{network.address}</TableCell>
            <TableCell>{network.dhcpEnabled ? 'Enabled' : 'Disabled'}</TableCell>
            <TableCell>{network.portGroupId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NetworkTable;
