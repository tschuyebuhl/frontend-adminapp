import { useParams, useNavigate } from 'react-router-dom';
import { getVirtualMachine } from './VirtualMachine';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

export function VirtualMachineDetails() {
  const { name } = useParams<string>();
  let navigate = useNavigate();
  const results = useQuery(['name', name], getVirtualMachine);
  const virtualMachine = results.data;
  if (results.isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  function handleClick() {
    navigate('/virtual-machines');
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Virtual Machine Details:
      </Typography>
      <Button onClick={handleClick}>Go back</Button> <br />
      <Box sx={{ mb: 2 }}>
  <Typography variant="h6">Name: {virtualMachine?.Name}</Typography>
</Box>
<Box sx={{ mb: 2 }}>
  <Typography variant="h6">
    RAM: {virtualMachine?.MemoryMB ? virtualMachine.MemoryMB / 1024 : null} GB
  </Typography>
</Box>
<Box sx={{ mb: 2 }}>
  <Typography variant="h6">vCPU: {virtualMachine?.NumCpus}</Typography>
</Box>
<Button aria-label="Edit Virtual Machine">Edit VM</Button>
<Button aria-label="Run Playbook">Run Playbook</Button>
<Button aria-label="Clone Virtual Machine">Clone VM</Button>
    </Box>
  );
}
