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
interface VMDeleteDialogProps {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
}


export function VMDeleteDialog(props: VMDeleteDialogProps) {

const { name } = useParams<string>();

const [loading, setLoading] = useState(false);
const navigate = useNavigate();


async function handleDelete() {
  setLoading(true);
  await deleteVirtualMachine(name?  name : '')
    .then(() => {
      props.setOpenDeleteDialog(false);
      navigate('/virtual-machines');
    })
    .catch((error) => console.error(error));
    setLoading(false);
    getVirtualMachines();
}



function handleCloseDeleteDialog() {
  props.setOpenDeleteDialog(false);
}


  return (
    <>
  <Dialog open={props.openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <DialogTitle>Delete Virtual Machine</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this virtual machine?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button 
    onClick={handleCloseDeleteDialog}
    variant="contained"
    color="secondary"
    >Cancel</Button>
    <Button 
    onClick={handleDelete}
    color="warning"
    variant="contained"
    disabled={loading} 
    >
    {loading ? <CircularProgress size={24} /> : 'Delete'}
    </Button>
  </DialogActions>
</Dialog>
</>
  );
}