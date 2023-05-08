import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {deleteVirtualMachine, getVirtualMachines} from './VirtualMachine';

export function VMDeleteDialog({openDeleteDialog, setOpenDeleteDialog}) {

const { name } = useParams<string>();

const [loading, setLoading] = useState(false);
const navigate = useNavigate();


async function handleDelete() {
  setLoading(true);
  await deleteVirtualMachine(name?  name : '')
    .then(() => {
      setOpenDeleteDialog(false);
      navigate('/virtual-machines');
    })
    .catch((error) => console.error(error));
    setLoading(false);
    getVirtualMachines();
}



function handleCloseDeleteDialog() {
  setOpenDeleteDialog(false);
}


  return (
    <>
  <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <DialogTitle>Delete Virtual Machine</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this virtual machine?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
    <Button 
    onClick={handleDelete}
    color="warning"
    disabled={loading} 
    >
    {loading ? <CircularProgress size={24} /> : 'Delete'}
    </Button>
  </DialogActions>
</Dialog>
</>
  );
}