import React, { useState, useEffect } from 'react';
import { getVirtualMachines, CreateVirtualMachineRequest, createVirtualMachine } from './VirtualMachine';
import MaterialReactTable from 'material-react-table';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { vmColumns } from './ModalColumns';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import CreateNewVirtualMachineModal from "./CreateNewVirtualMachineModal";
import { columns } from './ModalColumns';

export function VirtualMachinesList() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  const virtualMachinesQuery = useQuery(
    ['virtualMachines', { offset, limit }],
    () => getVirtualMachines({ offset, limit }),
    { refetchOnWindowFocus: false }
  );

  const { data: virtualMachines, refetch } = virtualMachinesQuery;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    setOffset(pagination.pageIndex * pagination.pageSize);
    setLimit(pagination.pageSize);
    refetch();
  }, [pagination.pageIndex, pagination.pageSize]);

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
      console.error("Error creating a new virtual machine:", error);
    }
  };

  function handleClick(name: string) {
    navigate('/virtual-machines/' + name);
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
          data={virtualMachines?.VMs? virtualMachines.VMs : []}
          manualPagination
          enableColumnResizing={false}
          enableRowActions={true}
          onPaginationChange={setPagination} 
          state={{ pagination }} 
          rowCount={virtualMachines? virtualMachines.Count : 0}
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