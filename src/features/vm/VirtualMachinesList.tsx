import React, { useState, useEffect } from 'react';
import {
  getVirtualMachines,
  CreateVirtualMachineRequest,
  createVirtualMachine,
  VMResponse,
} from './VirtualMachine';
import { MaterialReactTable } from 'material-react-table';
import { useNavigate, Link } from 'react-router-dom';
import { vmColumns, columns } from '../../models/ModalColumns';

import { Box, Button, Typography } from '@mui/material';
import CreateNewVirtualMachineModal from './CreateNewVirtualMachineModal';

export function VirtualMachinesList() {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [virtualMachines, setVirtualMachines] = useState<VMResponse>();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });

  const offset = pagination.pageIndex * pagination.pageSize;
  const limit = pagination.pageSize;

  useEffect(() => {
    refetch();
  }, [offset, limit]);

  const refetch = () => {
    getVirtualMachines({ offset, limit }).then((fetchedVMs) => {
      setVirtualMachines(fetchedVMs);
    });
  };
  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateNewRow = async (values: CreateVirtualMachineRequest) => {
    try {
      await createVirtualMachine(values);
      handleCreateModalClose();
      refetch();
    } catch (error) {
      console.error('Error creating a new virtual machine:', error);
    }
  };

  function handleClick(name: string) {
    navigate('/virtual-machines/' + name);
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
        Virtual Machines
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={virtualMachines?.VMs ? virtualMachines.VMs : []}
        manualPagination
        enableColumnResizing={false}
        enableRowActions={true}
        state={{ pagination }}
        onPaginationChange={setPagination}
        rowCount={virtualMachines ? virtualMachines.Count : 0}
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
        muiPaginationProps={{
          rowsPerPageOptions: [5, 12, 10, 25],
          showFirstButton: true,
          showLastButton: true,
        }}
        muiTableProps={{
          sx: {
            width: '100%',
            //tableLayout: 'fixed',
          },
        }}
      />
      <CreateNewVirtualMachineModal
        open={createModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateNewRow}
        columns={vmColumns}
        onCompletion={refetch}
      />
    </Box>
  );
}
