import { IPTable } from './IPTable';
import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getNetwork,
  getIPAddresses,
  validateForm,
  updateNetwork,
  createIPAddress,
  validateIP,
  deleteIPAddress,
} from './Network';
import { NetworkBoard } from './NetworkBoard';
import { ipColumns, networkColumns, networkFormColumns } from './Columns';
import FormModal from '../../components/FormModal';
import { VOButton } from '../../components/VOButton';
import {
  CreateNetworkRequest,
  CreateIPAddressRequest,
  IPAddress,
  Network,
  DeleteIPAddressRequest,
} from './models';
import { AlertSnackbar } from '../../components/AlertSnackbar';

export const NetworkDetails: React.FC = () => {
  const { name } = useParams<string>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [addIpModalOpen, setAddIpModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const network = useQuery(['name', name], getNetwork);
  const ips = useQuery(['code', name], getIPAddresses);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries(['name', name]);
      queryClient.invalidateQueries(['code', name]);
    };
  }, [queryClient, name]);

  const handleCreateNewRow = async (values: CreateNetworkRequest) => {
    await updateNetwork(name ?? 'undefined', values);
    navigate('/ipam/' + values.name);
    queryClient.invalidateQueries(['name', name]);
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
    queryClient.invalidateQueries(['code', name]);
  };

  const deleteIP = async (values: DeleteIPAddressRequest) => {
    await deleteIPAddress(values);
    queryClient.invalidateQueries(['code', name]);
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
            margin: '0 10px',
            mb: 2,
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        >
          <CardContent>
            <Typography variant="h5">{network.data.name}</Typography>
            <Typography>{'Network address: ' + network.data.address}</Typography>
            <Typography>{'VLAN ID: ' + network.data.vlanId}</Typography>
            <Typography>{'Number of usable addresses: ' + totalIPs}</Typography>
            <Typography>{'Number of taken addresses: ' + count}</Typography>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: '20px' }}
              onClick={() => setModalOpen(!modalOpen)}
            >
              Edit Network
            </Button>
          </CardContent>
          <Typography style={{ margin: '20px 0' }}>Percentage of IP Addresses Taken:</Typography>
          <LinearProgress variant="determinate" value={percentageTaken} />
        </Card>
      )}
      {ips.data && (
        <IPTable data={ips.data} deleteIP={deleteIP} setSnackbarOpen={setSnackbarOpen} />
      )}
      <NetworkBoard
        network={network.data ?? ({} as Network)}
        ipAddresses={ips.data ?? []}
        totalIPs={totalIPs}
      />
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
        validate={validateIP}
      />
      <FormModal
        title={'Test'}
        open={modalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateNewRow}
        columns={networkFormColumns}
        initialValues={network.data ?? ({} as Network)}
        validate={validateForm}
      />
      <AlertSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        severity="success"
        message="Operation executed successfully."
      />
    </>
  );
};
