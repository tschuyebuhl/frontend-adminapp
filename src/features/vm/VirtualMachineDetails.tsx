import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVirtualMachine, stopVirtualMachine, startVirtualMachine } from './VirtualMachine';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Stack,
  Chip,
  ListItem,
  Paper,
} from '@mui/material';
import { VMEditDialog } from './VMEditDialog';
import { VMDeleteDialog } from './VMDeleteDialog';
import { Loading } from '../../components/Loading';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import BuildIcon from '@mui/icons-material/Build';
import TerminalIcon from '@mui/icons-material/Terminal';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export function VirtualMachineDetails() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    mb: 2,
    gap: '4px'
  };
  const buttonStyle = {
    marginBottom: '8px',
    width: '171px',
  };
  const cardStyle = {
    border: 1,
    width: '33%',
    ml: '0.3%',
    mb: 3,
  }
  const testVm = {
    Name: 'test',
    MemoryMB: 1024,
    NumCpus: 2,
    Project: 'M4B ',
    Network: '172 - Common',
    IP: '10.16.72.201',
    Disk: '100 GB',
    installedSoftware: ['zabbix','docker','postgresql','nginx']
  }
  interface ChipData {
    key: number;
    label: string;
  }
  
  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: 'Zabbix' },
    { key: 1, label: 'Docker' },
    { key: 2, label: 'PostgreSQL' },
    { key: 3, label: 'nginx' },
    { key: 4, label: 'Vector' },
  ]);

  const { name } = useParams<string>();
  let navigate = useNavigate();
  const results = useQuery(['name', name], getVirtualMachine);
  const virtualMachine = results.data;

  const [loading, setLoading] = useState(false);
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
    <Box>
      <Typography variant="h4" textAlign="center">
      {name}
      </Typography>
      <Button onClick={handleClick} variant="outlined">
        <ArrowBackIcon />
        Go back
      </Button>
      <Box sx={{display: 'flex', flexDirection: 'row',}}> 
        <Card sx={cardStyle}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Hardware
            </Typography>
              vCPU: {testVm.NumCpus}
            <Typography>
              RAM: {testVm.MemoryMB} MB
            </Typography>
            <Typography>
            </Typography>
            <Typography>
            </Typography>
            <Typography>
              Disk:  {testVm.Disk}
            </Typography>
            <Typography>
              Network:  {testVm.Network}, IP Address: {testVm.IP} 
            </Typography>
            RAM: {virtualMachine?.MemoryMB ? virtualMachine.MemoryMB / 1024 : null} GB
            vCPU: {virtualMachine?.NumCpus}

          </CardContent>
        </Card>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Project
            </Typography>
            <Typography>
            {testVm.Project}
            </Typography>
          </CardContent>

          <Paper      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
            
          {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label}
            />
          </ListItem>
        );
      })}

          </Paper>
        </Card>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Incidents
            </Typography>
            <Typography variant="h5" component="div">
              benevolent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View all incidents</Button>
          </CardActions>
        </Card>
      </Box>
      <Box sx={containerStyle}>
        <Button sx={buttonStyle} aria-label="Edit Virtual Machine" variant="contained" onClick={handleClickOpenEditDialog}>
          <EditIcon />
          Edit
        </Button>
        <Button sx={buttonStyle} aria-label="Run Playbook" variant="contained">
          <BuildIcon />
          Run Playbook
          </Button>
        <Button
           sx={buttonStyle} 
           aria-label="Clone Virtual Machine" 
           variant="contained"
           >
          <FileCopyIcon />
          Clone
          </Button>
          <Button 
            sx={buttonStyle} 
            color="primary"
            variant="contained"
            aria-label='Attach VM Console'
            >
        <TerminalIcon />
         Console
        </Button>
        </Box>

      <Box sx={containerStyle}>
        <Button
          sx={buttonStyle} 
          aria-label="Power On Virtual Machine"
          variant="contained"
          onClick={startVM}
          disabled={powerOnLoading} 
          >
        <PlayArrowIcon />
        {powerOnLoading ? <CircularProgress size={24} /> : 'Power On'}
          </Button>
        <Button
         sx={buttonStyle}
         onClick={stopVM} 
         aria-label="Power Off Virtual Machine" 
         variant="contained"
         disabled={powerOffLoading}
         >
        <StopIcon />
        {powerOffLoading ? <CircularProgress size={24} /> : 'Power Off'}
        </Button>
        <Button
         sx={buttonStyle}
         onClick={stopVM} 
         aria-label="Restart Virtual Machine" 
         variant="contained"
         disabled={restartLoading}
         >
        <RestartAltIcon />
        {restartLoading ? <CircularProgress size={24} /> : 'Restart'}
        </Button>
        <Button
          color="warning"
          variant="contained"
          aria-label="Delete Virtual Machine"
          onClick={handleClickOpenDeleteDialog}
          sx={buttonStyle} 
          >
          <DeleteIcon />
          Delete
        </Button>
      </Box>
      <VMDeleteDialog 
       setOpenDeleteDialog={setOpenDeleteDialog}
       openDeleteDialog={openDeleteDialog}/>
      <VMEditDialog 
      setOpenEditDialog={setOpenEditDialog}
      openEditDialog={openEditDialog}/>
      <Snackbar
       open={errorOpen} 
       autoHideDuration={3000}
       onClose={() => setErrorOpen(false)}
        >
        <Alert severity="error" sx={{ width: '100%' }}>
          VM is in a wrong state. Please try again later.
        </Alert>
      </Snackbar>
      <Snackbar
       open={successOpen} 
       autoHideDuration={3000}
       onClose={() => setSuccessOpen(false)}
        >
        <Alert severity="success" sx={{ width: '100%' }}>
          Operation executed successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}
