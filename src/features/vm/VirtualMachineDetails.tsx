import { useParams, useNavigate } from 'react-router-dom';
import { getVirtualMachine } from './VirtualMachine';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from '@mui/material';

export function VirtualMachineDetails() {
  const { name } = useParams<string>();
  let navigate = useNavigate();
  const results = useQuery(['name', name], getVirtualMachine);
  const virtualMachine = results.data;

  const [open, setOpen] = React.useState(false);

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

  function handleDelete() {
    fetch(`/api/v1/virtual-machines/${name}`, { method: 'DELETE' })
      .then(() => navigate('/virtual-machines'))
      .catch((error) => console.error(error));
    handleClose();
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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
      <Button
        color="warning"
        variant="contained"
        aria-label="Delete Virtual Machine"
        onClick={handleClickOpen}
      >
        Delete VM
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Virtual Machine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this virtual machine?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="warning" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
