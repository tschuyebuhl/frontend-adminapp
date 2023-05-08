import React, { useState, useMemo } from 'react';
import { getVirtualMachines, VirtualMachine, createVirtualMachine, CreateVirtualMachineRequest } from './VirtualMachine';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import CreateNewVirtualMachineModal from "./CreateNewVirtualMachineModal";
import { MRT_ColumnDef } from 'material-react-table';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {columns, vmColumns} from './ModalColumns';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { Loading } from '../../components/Loading';

let strictMode = false;

export function VirtualMachinesList() {
  const { keycloak } = useKeycloak();
  const [createModalOpen, setCreateModalOpen] = useState(false);


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
    getVirtualMachines();
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  if (loading) {
    <Loading />
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ mb: 1}}
        >
          Virtual Machines
        </Typography>
        <MaterialReactTable
          columns={columns}
          data={virtualMachines? virtualMachines : []}
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
              Create a New VM
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