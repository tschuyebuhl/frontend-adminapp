import React, { useState, useEffect, useMemo } from 'react';
import { getVirtualMachines, VirtualMachine } from './VirtualMachine';
import MaterialReactTable from 'material-react-table';
import type { MRT_ColumnDef } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';

let strictMode = false;

export function VirtualMachinesList() {
  const { keycloak } = useKeycloak();
  const [createModalOpen, setCreateModalOpen] = useState(false);
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
      {
        //accessorFn: (originalRow) => originalRow.CustomerID, //alternate way
        //id: 'CustomerID', //id required if you use accessorFn instead of accessorKey
        accessorKey: 'PowerState',
        header: 'Power State',
      },
      {
        //accessorFn: (originalRow) => originalRow.CustomerID, //alternate way
        //id: 'CustomerID', //id required if you use accessorFn instead of accessorKey
        accessorKey: 'NumCpus',
        header: 'vCPU',
      },
      {
        //accessorFn: (originalRow) => originalRow.CustomerID, //alternate way
        //id: 'CustomerID', //id required if you use accessorFn instead of accessorKey
        accessorKey: 'MemoryMB',
        header: 'RAM',
      },
      {
        //accessorFn: (originalRow) => originalRow.CustomerID, //alternate way
        //id: 'CustomerID', //id required if you use accessorFn instead of accessorKey
        accessorKey: 'HostName',
        header: 'Host',
      },
      {
        //accessorFn: (originalRow) => originalRow.CustomerID, //alternate way
        //id: 'CustomerID', //id required if you use accessorFn instead of accessorKey
        accessorKey: 'CustomerName',
        header: 'Customer',
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
        })),
      );
    }
    if(keycloak.authenticated || !strictMode) {
      fetchVirtualMachines();
    }
    }, [keycloak.authenticated]);

  function handleClick(name: string) {
    navigate('/virtual-machines/' + name);
  }

  if (loading) {
    return <></>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            >
            Create New Virtual Machine
          </Button>
          )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </Box>
  );
}
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
      }, {} as any),
      );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
            width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
            >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
              ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
    );
};
const handleCreateNewRow = (values: VirtualMachine) => {
  data.push(values);
  setTableData([...data]);
};