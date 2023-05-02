import React, { useState, useEffect, useMemo } from 'react';
import { getVirtualMachines, VirtualMachine } from './VirtualMachine';
import MaterialReactTable from 'material-react-table';
import type { MRT_ColumnDef } from 'material-react-table';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

export function VirtualMachinesList() {
  const columns = useMemo<MRT_ColumnDef<VirtualMachine>[]>(
    () => [
      {
        //accessorFn: (originalRow) => originalRow.HostID, //alternate way
        accessorKey: 'Name',
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        //accessorFn: (originalRow) => originalRow.CustomerID, //alternate way
        //id: 'CustomerID', //id required if you use accessorFn instead of accessorKey
        accessorKey: 'GuestOs',
        header: 'Guest OS',
      },
    ],
    [],
  );
  const [virtualMachines, setVirtualMachines] = useState<VirtualMachine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  function handleClick(name: string) {
    navigate('/virtual-machines/' + name);
  }

  if (loading) {
    return <></>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Virtual Machines
      </Typography>
      <MaterialReactTable
        columns={columns}
        enableColumnResizing={false}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 25],
          showFirstButton: true,
          showLastButton: true,
        }}
        data={virtualMachines}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'VM Details', //change header text
            size: 15,
          },
        }}
        positionActionsColumn="last"
        enableRowActions={true}
        renderRowActions={({ row }) => [
          <Button variant="contained" href={'/virtual-machines/' + row.original.Name}>
            Details
          </Button>,
        ]}
      />
    </Box>
  );
}
{
  /*
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
 
  );
}
   */
}
