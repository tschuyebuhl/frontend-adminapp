import React, { useState, useEffect } from 'react';
import { getVirtualMachines, VirtualMachine } from '../components/VirtualMachine';
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
} from '@mui/material';

export function VirtualMachinesList() {
  const [virtualMachines, setVirtualMachines] = useState<VirtualMachine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVirtualMachines() {
      const data = await getVirtualMachines();
      setLoading(false);
      setVirtualMachines(
        data.map((vm) => ({
          ...vm,
          clickCount: 0,
        })),
      );
    }
    fetchVirtualMachines();
  }, []);

  const handleClick = (vm: VirtualMachine) => {
    const updatedVirtualMachines = virtualMachines.map((v) =>
      v.ID === vm.ID ? { ...v, clickCount: v.clickCount + 1 } : v,
    );
    setVirtualMachines(updatedVirtualMachines);
  };

  /*if (loading) {
    return <div></div>;
  }*/

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Virtual Machines
      </Typography>
      <List sx={{ mb: 2 }}>
        {virtualMachines.map((vm) => (
          <ListItem key={vm.ID} sx={{ py: 1 }}>
            <ListItemText primary={vm.Name} secondary={`ID: ${vm.VsphereID}`} />
            <Button variant="contained" sx={{ mr: 1 }}>
              Edit
            </Button>
            <Button variant="contained" href={`/virtual-machines/${vm.Name}`}>
              Details
            </Button>
          </ListItem>
        ))}
      </List>
      <Button>Create a new virtual machine</Button>
    </Box>
  );
}
