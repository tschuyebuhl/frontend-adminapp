import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Tab,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getNetwork, getIPAddresses, Network } from './Network';
import { NetworkBoard } from './NetworkBoard';

export const NetworkDetails: React.FC = () => {
  const { name } = useParams<string>();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const network = useQuery(['name', name], getNetwork);
  const ips = useQuery(['code', name], getIPAddresses);

  //2^(32-24)-2
  const totalIPs = network.data?.subnetMask ? Math.pow(2, 32 - network.data.subnetMask) - 2 : 0;
  const count = ips.data?.length ?? 0;
  const percentageTaken = Math.round((count / totalIPs) * 100);

  return (
    <div>
      {network.isLoading && <CircularProgress />}
      {network.data && (
        <Card>
          <CardContent>
            <Typography variant="h5">{network.data.name}</Typography>
            <Typography>{network.data.address}</Typography>
            <Typography>{'Number of usable addresses: ' + totalIPs}</Typography>
            <Typography>{ips.data?.length ?? 0}</Typography>
            <Typography>{'Percentage taken: ' + percentageTaken + '%'}</Typography>
          </CardContent>
        </Card>
      )}

      <Typography style={{ margin: '20px 0' }}>Percentage of IP Addresses Taken:</Typography>
      <LinearProgress variant="determinate" value={percentageTaken} />

      {ips.data && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IP Address</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Hostname</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ips.data.map((ipAddress) => (
              <TableRow key={ipAddress.ID}>
                <TableCell>{ipAddress.IPAddress + '/' + ipAddress.PrefixLength}</TableCell>
                <TableCell>{ipAddress.Description}</TableCell>
                <TableCell>{ipAddress.Hostname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: '20px' }}
        onClick={() => navigate('/path/to/edit/network')}
      >
        Edit Network
      </Button>
      <NetworkBoard
        network={network.data ?? ({} as Network)}
        ipAddresses={ips.data ?? []}
        totalIPs={totalIPs}
      />
    </div>
  );
};
