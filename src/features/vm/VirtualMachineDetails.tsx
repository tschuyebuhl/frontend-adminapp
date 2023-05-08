import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVirtualMachine } from './VirtualMachine';
import { useQuery} from '@tanstack/react-query';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { VMEditDialog } from './VMEditDialog';
import { VMDeleteDialog } from './VMDeleteDialog';
import { Loading } from '../../components/Loading';

export function VirtualMachineDetails() {
  const { name } = useParams<string>();
  let navigate = useNavigate();
  const results = useQuery(['name', name], getVirtualMachine);
  const virtualMachine = results.data;

  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  function handleCloseDeleteDialog() {
    setOpenDeleteDialog(false);
  }
  if (results.isLoading) {
      <Loading />
  }


  function handleClick() {
    navigate('/virtual-machines');
  }

  function handleClickOpenEditDialog() {
    setOpenEditDialog(true);
  }
  
  function handleClickOpenDeleteDialog() {
    setOpenDeleteDialog(true);
  }

  return (
    <Box sx={{ mb: 2}}>
      <Typography variant="h4"  sx={{ mb: 2 }}>
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
      <Button aria-label="Edit Virtual Machine" variant="outlined" onClick={handleClickOpenEditDialog}>
        Edit VM
      </Button>
      <Button aria-label="Run Playbook" variant="outlined">Run Playbook</Button>
      <Button aria-label="Clone Virtual Machine" variant="outlined">Clone VM</Button>
      <Button
        color="warning"
        variant="contained"
        aria-label="Delete Virtual Machine"
        onClick={handleClickOpenDeleteDialog}
        >
        Delete
      </Button>
      <VMDeleteDialog 
       setOpenDeleteDialog={setOpenDeleteDialog}
       openDeleteDialog={openDeleteDialog}/>
      <VMEditDialog 
      setOpenEditDialog={setOpenEditDialog}
      openEditDialog={openEditDialog}/>
    </Box>
  );
}
