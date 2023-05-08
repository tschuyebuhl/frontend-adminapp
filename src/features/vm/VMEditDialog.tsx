import {
Button,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
Box,
TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {VirtualMachine, getVirtualMachine} from './VirtualMachine';
import {useMutation, useQuery} from '@tanstack/react-query';

interface VMEditDialogProps {
openEditDialog: boolean;
setOpenEditDialog: (open: boolean) => void;
}

export function VMEditDialog({openEditDialog, setOpenEditDialog}: VMEditDialogProps) { //maybe better than just "props"?

const { name } = useParams<string>();
//let name = "test20";
let navigate = useNavigate();


const results = useQuery(['name', name], getVirtualMachine);
const virtualMachine = results.data;

const [updatedName, setUpdatedName] = useState(virtualMachine?.Name ?? '');
const [updatedMemoryMB, setUpdatedMemoryMB] = useState(
  virtualMachine?.MemoryMB ?? ''
);
const [updatedNumCpus, setUpdatedNumCpus] = useState(
  virtualMachine?.NumCpus ?? ''
);


const { mutate } = useMutation(
  () =>
    fetch(`/api/v1/virtual-machines/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: updatedName,
        MemoryMB: updatedMemoryMB,
        NumCpus: updatedNumCpus,
      }),
    }),
  {
    onSuccess: () => {
      navigate('/virtual-machines');
    },
    onError: (error) => {
      console.error(error);
    },
  }
);


function handleClickOpenEditDialog() {
  setOpenEditDialog(true);
}

function handleCloseEditDialog() {
  setOpenEditDialog(false);
}

function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
  setUpdatedName(event.target.value);
}

function handleMemoryMBChange(event: React.ChangeEvent<HTMLInputElement>) {
  setUpdatedMemoryMB(event.target.value);
}

function handleNumCpusChange(event: React.ChangeEvent<HTMLInputElement>) {
  setUpdatedNumCpus(event.target.value);
}

function handleSaveChanges() {
  mutate();
  handleCloseEditDialog();
}

  return (
  <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
  <DialogTitle>Edit Virtual Machine</DialogTitle>
  <DialogContent>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        value={updatedName}
        onChange={handleNameChange}
      />
      <TextField
        label="RAM (in MB)"
        variant="outlined"
        margin="normal"
        type="number"
        value={updatedMemoryMB}
        onChange={handleMemoryMBChange}
      />
      <TextField
        label="vCPU"
        variant="outlined"
        margin="normal"
        type="number"
        value={updatedNumCpus}
        onChange={handleNumCpusChange}
      />
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEditDialog} color="primary" variant="contained">Cancel</Button>
    <Button onClick={handleSaveChanges} color="secondary" variant="contained">
      Save Changes
    </Button>
  </DialogActions>
</Dialog>
  );
}