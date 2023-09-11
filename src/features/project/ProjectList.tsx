import React, { useState, useEffect, useMemo } from 'react';
import { getProjects, Project } from './Project';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import  { columns }  from './ProjectColumns';
import { CreateNewProjectModal, CreateProjectRequest } from './CreateNewProjectModal';


import { Box, Button, Typography } from '@mui/material';


export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateNewProject = async (values: CreateProjectRequest) => {
    // Implement your project creation logic here
    // For example: await createProject(values);
    setCreateModalOpen(false);
    // Refresh your project list, for example, by re-fetching projects.
  };

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
        renderTopToolbarCustomActions={() => (
          <Button color="secondary" onClick={handleCreateModalOpen} variant="contained">
            Create a New Project
          </Button>)}
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
            header: 'Details',
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
      <CreateNewProjectModal
        open={createModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateNewProject}
      />
    </Box>
  );
}
export default ProjectList;