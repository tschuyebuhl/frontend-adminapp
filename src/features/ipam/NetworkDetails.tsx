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
import {
  getNetwork,
  getIPAddresses,
  Network,
  CreateNetworkRequest,
  validateForm,
  updateNetwork,
  IPAddress,
  CreateIPAddressRequest,
  createIPAddress,
  validateIP,
} from './Network';
import { NetworkBoard } from './NetworkBoard';
import { ipColumns, networkColumns, networkFormColumns } from './Columns';
import FormModal from '../../components/FormModal';
import { VOButton } from '../../components/VOButton';

export const NetworkDetails: React.FC = () => {
  const { name } = useParams<string>();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [addIpModalOpen, setAddIpModalOpen] = useState(false);

  const network = useQuery(['name', name], getNetwork);
  const ips = useQuery(['code', name], getIPAddresses);
  const fetch = () => {
    getNetwork({ queryKey: ['name', name] });
  };
  const handleCreateNewRow = async (values: CreateNetworkRequest) => {
    await updateNetwork(name ?? 'undefined', values);
    navigate('/ipam/' + values.name);
  };
  const handleCreateModalClose = () => {
    setModalOpen(false);
  };
  const closeIpModal = () => {
    setAddIpModalOpen(false);
  };
  const openIpModal = () => {
    setAddIpModalOpen(true);
  };

  const createNewIP = async (values: CreateIPAddressRequest) => {
    await createIPAddress(name ?? 'undefined', values);
  };

  const totalIPs = network.data?.subnetMask ? Math.pow(2, 32 - network.data.subnetMask) - 2 : 0;
  const count = ips.data?.length ?? 0;
  const percentageTaken = Math.round((count / (totalIPs === 0 ? 1 : totalIPs)) * 100);

  return (
    <>
      {network.isLoading && <CircularProgress />}
      {network.data && (
        <Card
          sx={{
            //space it a little bit between left and right edges
            margin: '0 10px',
            //space it a little bit between top and bottom edges
            mb: 2,
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        >
          <CardContent>
            <Typography variant="h5">{network.data.name}</Typography>
            <Typography>{network.data.address}</Typography>
            <Typography>{'Number of usable addresses: ' + totalIPs}</Typography>
            <Typography>{'Number of taken addresses: ' + ips.data?.length ?? 0}</Typography>

            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: '20px' }}
              onClick={() => setModalOpen(!modalOpen)}
            >
              Edit Network
            </Button>
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
      <NetworkBoard
        network={network.data ?? ({} as Network)}
        ipAddresses={ips.data ?? []}
        totalIPs={totalIPs}
      />
      {/* can use form modal here */}
      <VOButton onClick={openIpModal} title={'Add IP'} />
      <FormModal
        title={'Add IP'}
        open={addIpModalOpen}
        onClose={closeIpModal}
        onSubmit={createNewIP}
        columns={ipColumns}
        initialValues={
          {
            ip: network.data?.address,
            network: network.data?.id,
            prefix: network.data?.subnetMask,
          } as CreateIPAddressRequest
        }
        onCompletion={fetch}
        validate={validateIP}
      />

      <FormModal
        title={'Test'}
        open={modalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateNewRow}
        columns={networkFormColumns}
        initialValues={network.data ?? ({} as Network)}
        onCompletion={fetch}
        validate={validateForm}
      />
    </>
  );
};
