import React from 'react';
import { Network } from './Network';
import { Card, CardContent, Typography, Divider, Switch } from '@mui/material';

interface NetworkCardProps {
  network: Network;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ network }) => {
  return (
    <Card sx={{ marginBottom: 2, width: '80%', margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {network.name}
        </Typography>
        <Typography variant="body2">VLAN ID: {network.vlanId}</Typography>
        <Typography variant="body2">Subnet Mask: {network.subnetMask}</Typography>
        <Typography variant="body2">Gateway: {network.gateway}</Typography>
        <Typography variant="body2">Address: {network.address}</Typography>
        <Divider sx={{ margin: '8px 0' }} />
        <Typography variant="body2">
          DHCP Enabled:
          <Switch
            checked={network.dhcpEnabled}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled
          />
        </Typography>
        {network.dhcpEnabled && (
          <>
            <Typography variant="body2">DHCP Start: {network.dhcpStart}</Typography>
            <Typography variant="body2">DHCP End: {network.dhcpEnd}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkCard;
