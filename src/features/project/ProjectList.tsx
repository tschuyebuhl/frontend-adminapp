import React, { useState, useEffect, useMemo } from 'react';
import { getProjects, Project } from './Project';
import MaterialReactTable from 'material-react-table';
import type { MRT_ColumnDef } from 'material-react-table';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

export function ProjectList() {
  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
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
    ],
    [],
  );

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setLoading(false);
      setProjects(data);
    }
    fetchProjects();
  }, []);

  function handleClick(name: string) {
    navigate('/projects/' + name);
  }

  if (loading) {
    return <></>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Projects
      </Typography>
      <MaterialReactTable
        columns={columns}
        enableColumnResizing={false}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 25],
          showFirstButton: true,
          showLastButton: true,
        }}
        data={projects}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Project Details', //change header text
            size: 15,
          },
        }}
        positionActionsColumn="last"
        enableRowActions={true}
        renderRowActions={({ row }) => [
          <Button variant="contained" href={'/projects/' + row.original.name}>
            Details
          </Button>,
        ]}
      />
    </Box>
  );
}
export default ProjectList;