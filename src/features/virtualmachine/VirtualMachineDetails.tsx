import { useParams, useNavigate } from 'react-router-dom';
import { getVirtualMachine } from './VirtualMachine';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

export function VirtualMachineDetails() {
  const { name } = useParams<string>();
  let navigate = useNavigate();

  const results = useQuery(['name', name], getVirtualMachine);

  const virtualMachine = results.data;

  if (results.isLoading) {
    return <></>;
  }

  function handleClick() {
    navigate('/virtual-machines');
  }

  // @ts-ignore
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Virtual Machine Details:
      </Typography>
      <Button onClick={handleClick}>Go back</Button> <br />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Name: {virtualMachine?.Name} <br />
        RAM: {virtualMachine?.MemoryMB ? virtualMachine.MemoryMB / 1024 : null} GB <br />
        vCPU: {virtualMachine?.NumCpus} <br />
      </Typography>
      <Button>Edit VM</Button> <br />
      <Button>Run Playbook</Button> <br />
      <Button>Clone VM</Button>
    </Box>
  );
}
