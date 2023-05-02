import React, { useState, useEffect, useMemo } from 'react';
import { getVirtualMachines, VirtualMachine } from './VirtualMachine';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import CreateNewVirtualMachineModal from "./CreateNewVirtualMachineModal";
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

const vmColumns: MRT_ColumnDef<VirtualMachine>[] = [
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
      accessorKey: 'GuestOs',
      header: 'Guest OS',
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
  const [virtualMachines, setVirtualMachines] = useState<VirtualMachine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVirtualMachines() {
      const data = await getVirtualMachines();
      setLoading(false);
      setVirtualMachines(data.map(vm => ({ ...vm })));
    }

    if (keycloak.authenticated || !strictMode) {
      fetchVirtualMachines();
    }
  }, [keycloak.authenticated]);

  function handleClick(name: string) {
    navigate('/virtual-machines/' + name);
  }

  const handleCreateNewRow = (values: VirtualMachine) => {
    // logic to add new virtual machine to the list
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  if (loading) {
    return <></>;
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
          <Button variant="outlined" href={'/virtual-machines/' + row.original.Name}>
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
            tableLayout: 'fixed',
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
