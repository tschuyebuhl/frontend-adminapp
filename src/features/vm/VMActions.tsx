import { Alert, Box, Button, CircularProgress, Snackbar } from "@mui/material";
import { useState } from "react";
import { getVirtualMachine, startVirtualMachine, stopVirtualMachine } from "./VirtualMachine";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import BuildIcon from '@mui/icons-material/Build';
import TerminalIcon from '@mui/icons-material/Terminal';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { VMEditDialog } from "./VMEditDialog";
import { VMDeleteDialog } from "./VMDeleteDialog";
import { VMActionButton } from "./VMActionButton";
import { AlertSnackbar } from "./AlertSnackbar";


export default function VMActions() { 
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    mb: 2,
    gap: '4px',
  };

  const { name } = useParams<string>();
  let navigate = useNavigate();
  const results = useQuery(['name', name], getVirtualMachine);
  const virtualMachine = results.data;
  const [powerOnLoading, setPowerOnLoading] = useState(false);
  const [powerOffLoading, setPowerOffLoading] = useState(false);
  const [restartLoading, setRestartLoading] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  function handleCloseDeleteDialog() {
    setOpenDeleteDialog(false);
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
  function startVM() {
    setPowerOnLoading(true);
    let res = startVirtualMachine(name ? name : '');
    res.then((v) => {
      if (v.status === 200) {
        setPowerOnLoading(false);
        setSuccessOpen(true);
      }
    }).catch((e) => {
      setPowerOnLoading(false);
      setErrorOpen(true);
    });
  }

  function stopVM() {
    setPowerOffLoading(true);
    let res = stopVirtualMachine(name ? name : '');
    res.then((v) => {
      if (v.status === 200) {
        setPowerOffLoading(false);
        setSuccessOpen(true);
      }
    }).catch((e) => {
      setPowerOffLoading(false);
      setErrorOpen(true);
    });
  }
  return (
    <>
      <Box sx={containerStyle}>
        <VMActionButton 
          label="Edit" 
          onClick={handleClickOpenEditDialog}
          icon={EditIcon}
        />
        <VMActionButton 
          label="Playbooks" 
          icon={BuildIcon}
        />
        <VMActionButton 
          label="Clone " 
          icon={FileCopyIcon}
        />
        <VMActionButton 
          label="Console" 
          color="primary"
          icon={TerminalIcon}
        />
        <VMActionButton 
          label="Power On" 
          onClick={startVM} 
          loading={powerOnLoading} 
          icon={PlayArrowIcon}
        />
        <VMActionButton 
          label="Power Off" 
          onClick={stopVM} 
          loading={powerOffLoading} 
          icon={StopIcon}
        />
        <VMActionButton 
          label="Restart" 
          onClick={stopVM} 
          loading={restartLoading} 
          icon={RestartAltIcon}
        />
        <VMActionButton 
          label="Delete" 
          onClick={handleClickOpenDeleteDialog} 
          color="warning"
          icon={DeleteIcon}
        />
      </Box>
      <VMDeleteDialog 
        setOpenDeleteDialog={setOpenDeleteDialog}
        openDeleteDialog={openDeleteDialog}/>
      <VMEditDialog 
        setOpenEditDialog={setOpenEditDialog}
        openEditDialog={openEditDialog}/>
      <AlertSnackbar
        open={errorOpen}
        handleClose={() => setErrorOpen(false)}
        severity="error"
        message="VM is in a wrong state. Please try again later."
      />
      <AlertSnackbar
        open={successOpen}
        handleClose={() => setSuccessOpen(false)}
        severity="success"
        message="Operation executed successfully."
      />
    </>
  );
};