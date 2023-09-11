import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { Project } from './Project';

 export const columns: MRT_ColumnDef<Project>[] =
    [
      {
        accessorKey: 'name',
        header: 'Project Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorKey: 'code',
        header: 'Code',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      }
      
    ];