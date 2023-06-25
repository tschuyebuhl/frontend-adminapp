import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Typography,
  Box,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {CloneVirtualMachineRequest, cloneVirtualMachine, getVirtualMachines} from './VirtualMachine';
import { useFetchHostsAndFolders } from './useHostsAndFolders';
import { useDatastores } from './useDatastores';

interface VMCloneDialogProps {
  openCloneDialog: boolean;
  setOpenCloneDialog: (open: boolean) => void;
  onSubmit: (values: CloneVirtualMachineRequest) => void;
}


export function VMCloneDialog(props: VMCloneDialogProps) {

const { name } = useParams<string>();
const [loading, setLoading] = useState(false);
const [targetName, setTargetName] = useState<string>('');
const [targetHost, setTargetHost] = useState<string>('');
const [targetFolder, setTargetFolder] = useState<string>('');
const [targetDatastore, setTargetDatastore] = useState<string>('');

const { hosts, folders } = useFetchHostsAndFolders(props.openCloneDialog);
const { datastores } = useDatastores(props.openCloneDialog);

const navigate = useNavigate();

function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
  setTargetName(event.target.value);
}

function handleHostChange(event: SelectChangeEvent<string>) {
  setTargetHost(event.target.value);
}

function handleFolderChange(event: SelectChangeEvent<string>) {
  setTargetFolder(event.target.value);
}

function handleDatastoreChange(event: SelectChangeEvent<string>) {
  setTargetDatastore(event.target.value);
}

async function handleClone() {
  setLoading(true);
  
  const cloneRequest: CloneVirtualMachineRequest = {
    name: targetName,
    placement: {
      datastore: targetDatastore,
      host: targetHost,
      folder: targetFolder,
    }
  };

  try {
    await props.onSubmit(cloneRequest);
    props.setOpenCloneDialog(false);
    navigate('/virtual-machines');
  } catch (error) {
    console.error(error);
  }
  
  setLoading(false);
}

function handleCloseCloneDialog() {
  props.setOpenCloneDialog(false);
}

  return (
    <>
  <Dialog open={props.openCloneDialog} onClose={handleCloseCloneDialog}>
  <DialogTitle>Clone Virtual Machine</DialogTitle>
  <DialogContent>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        value={targetName}
        onChange={handleNameChange}
      />
      <Select
        label="Host"
        variant="outlined"
        margin="dense"
        value={targetHost}
        onChange={handleHostChange}
      >
        {hosts.map((host) => (
          <MenuItem key={host.VsphereID} value={host.VsphereID}>
            {host.Name}
          </MenuItem>
        ))}
      </Select>
      <Select
        label="Folder"
        variant="outlined"
        margin="dense"
        value={targetFolder}
        onChange={handleFolderChange}
      >
        {folders.map((folder) => (
          <MenuItem key={folder.VsphereID} value={folder.VsphereID}>
            {folder.Name}
          </MenuItem>
        ))}
      </Select>
      <Select
        label="Datastore"
        variant="outlined"
        margin="dense"
        value={targetDatastore}
        onChange={handleDatastoreChange}
      >
        {datastores.map((datastore) => (
          <MenuItem key={datastore.VsphereID} value={datastore.VsphereID}>
            {datastore.Name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button 
    onClick={handleCloseCloneDialog}
    variant="contained"
    color="secondary"
    >Cancel</Button>
    <Button 
    onClick={handleClone}
    color="primary"
    variant="contained"
    disabled={loading} 
    >
    {loading ? <CircularProgress size={24} /> : 'Clone'}
    </Button>
  </DialogActions>
</Dialog>
</>
  );
}