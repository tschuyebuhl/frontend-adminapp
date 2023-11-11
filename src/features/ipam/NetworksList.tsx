import { MaterialReactTable } from 'material-react-table';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { networkColumns } from './Columns';
import { Network } from './models';

interface NetworksListProps {
  networks: Network[];
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  totalNetworks?: number;
}

export function NetworksList({
  networks,
  pagination,
  setPagination,
  totalNetworks,
}: NetworksListProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
        Networks
      </Typography>
      <MaterialReactTable
        columns={networkColumns}
        data={networks}
        manualPagination
        enableColumnResizing={false}
        enableRowActions={true}
        onPaginationChange={setPagination}
        state={{ pagination }}
        rowCount={totalNetworks}
        positionActionsColumn="last"
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Network Details',
            size: 15,
          },
        }}
        renderRowActions={({ row }) => [
          <Button variant="outlined" component={Link} to={`/ipam/${row.original.name}`}>
            Details
          </Button>,
        ]}
        muiPaginationProps={{
          rowsPerPageOptions: [5, 10, 25],
          showFirstButton: true,
          showLastButton: true,
        }}
        muiTableProps={{
          sx: {
            width: '100%',
          },
        }}
      />
    </Box>
  );
}
