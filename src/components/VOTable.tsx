import { Box, Typography, Button } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import { Link } from 'react-router-dom';

export interface VOTableProps<T extends MRT_RowData> {
  title: string;
  columns: MRT_ColumnDef<T>[];
  data: T[];
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  totalItems?: number;
  detailPath: string; // e.g. '/settings/ssh-keys/' or '/ipam/'
  actionComponent?: React.ReactNode;
  actionOnClick?: () => void;
  actionEnabled?: boolean;
  actionText?: string;
}

// renderTopToolbarCustomActions={() => (
//   <Button color="secondary" onClick={handleCreateModalOpen} variant="contained">
//     Create a New VM
//   </Button>
// )}

export function VOTable<T extends MRT_RowData>({
  title,
  columns,
  data,
  pagination,
  setPagination,
  totalItems,
  detailPath,
  actionOnClick,
  actionEnabled,
  actionText,
}: VOTableProps<T>) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={data}
        manualPagination
        enableColumnResizing={false}
        enableRowActions={true}
        onPaginationChange={setPagination}
        state={{ pagination }}
        rowCount={totalItems}
        positionActionsColumn="last"
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: `Details`,
            size: 15,
          },
        }}
        renderRowActions={({ row }) => [
          <Button variant="outlined" component={Link} to={`${detailPath}${row.original.name}`}>
            Details
          </Button>,
        ]}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={actionOnClick}
            variant="contained"
            sx={{ display: actionEnabled ? 'flex' : 'none' }}
          >
            {actionText}
          </Button>
        )}
        muiPaginationProps={{
          rowsPerPageOptions: [1, 5, 10, 25],
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
