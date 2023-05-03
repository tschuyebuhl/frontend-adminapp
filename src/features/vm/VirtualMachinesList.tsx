import React, { useState, useMemo } from 'react';
import { getVirtualMachines, VirtualMachine, createVirtualMachine, CreateVirtualMachineRequest } from './VirtualMachine';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import CreateNewVirtualMachineModal from "./CreateNewVirtualMachineModal";
import { MRT_ColumnDef } from 'material-react-table';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  CircularProgress
} from '@mui/material';

let strictMode = false;

const vmColumns: MRT_ColumnDef<CreateVirtualMachineRequest>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'IP',
    accessorKey: 'ip',
  },
  {
    header: 'Host',
    accessorKey: 'host',
  },
  {
    header: 'Folder',
    accessorKey: 'folder',
  },
];

export function VirtualMachinesList() {
  const { keycloak } = useKeycloak();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const columns = useMemo(() => [
    {
      accessorKey: 'Name',
      header: 'Name',
    },
    {
      accessorKey: 'PowerState',
      header: 'Power State',
    },
    {
      accessorKey: 'NumCpus',
      header: 'vCPU',
    },
    {
      accessorKey: 'MemoryMB',
      header: 'RAM',
    },
    {
      accessorKey: 'HostName',
      header: 'Host',
    },
    {
      accessorKey: 'CustomerName',
      header: 'Customer',
    },
  ], []);

  const navigate = useNavigate();
  const {
    data: virtualMachines,
    isLoading: loading,
  } = useQuery(['virtualMachines'], getVirtualMachines);

  function handleClick(name: string) {
    navigate('/virtual-machines/' + name);
  }

  const handleCreateNewRow = async (values: CreateVirtualMachineRequest) => {
    try {
      const createdVm = await createVirtualMachine(values);
      // setVirtualMachines((prevVms) => [...prevVms, createdVm]);
      handleCreateModalClose();
    } catch (error) {
      console.error("Error creating a new virtual machine:", error);
    }
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  if (loading) {
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

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Virtual Machines
        </Typography>
        <MaterialReactTable
          columns={columns}
          data={virtualMachines}
          enableColumnResizing={false}
          enableRowActions={true}
          positionActionsColumn="last"
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'VM Details',
              size: 15,
            },
          }}
          renderRowActions={({ row }) => [
            <Button variant="outlined" component={Link} to={`/virtual-machines/${row.original.Name}`}>
            Details
            </Button>,
          ]}
          renderTopToolbarCustomActions={() => (
            <Button color="secondary" onClick={handleCreateModalOpen} variant="contained">
              Create New Virtual Machine
            </Button>
          )}
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 25],
            showFirstButton: true,
            showLastButton: true,
          }}
          muiTableProps={{
            sx: {
            //  tableLayout: 'fixed',
            },
          }}
        />
        <CreateNewVirtualMachineModal
          open={createModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateNewRow}
          columns={vmColumns}
        />
      </Box>
  );
}