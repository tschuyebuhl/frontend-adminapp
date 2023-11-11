import React, { useState, useEffect, useMemo } from 'react';
import { getProjects, Project, createProject } from './Project';
import  { MaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import  { columns }  from './ProjectColumns';
import { CreateNewProjectModal } from './CreateNewProjectModal';
import { CreateProjectRequest } from './Project';

import { AlertSnackbar } from '../../components/AlertSnackbar';

import { Box, Button, Typography, CircularProgress } from '@mui/material';


export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [projectUpdated, setProjectUpdated] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateNewProject = async (values: CreateProjectRequest) => {
    try {
      await createProject(values);
      setCreateModalOpen(false);
      setProjectUpdated(true); 
      setSuccessOpen(true);
    } catch (error) {
      console.error("Error creating a new project:", error);
    }
  };

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setLoading(false);
      setProjects(data);
      setProjectUpdated(false); 
    }
    fetchProjects();
  }, [projectUpdated]); 


  function handleClick(name: string) {
    navigate('/projects/' + name);
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography 
        variant="h4"
        textAlign="center"
        sx={{ mb: 1}}
      >
        Projects
      </Typography>
      <MaterialReactTable
        renderTopToolbarCustomActions={() => (
          <Button color="secondary" onClick={handleCreateModalOpen} variant="contained">
            Create a New Project
          </Button>)}
        columns={columns}
        enableColumnResizing={false}
        muiPaginationProps={{
          rowsPerPageOptions: [5, 10, 25],
          showFirstButton: true,
          showLastButton: true,
        }}
        data={projects}
        muiTableProps={{
          sx: {
            tableLayout: 'auto',
            width: '100%', 
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Details',
            size: 25,
          },
        }}
        positionActionsColumn="last"
        enableRowActions={true}
        renderRowActions={({ row }) => [
          <Button variant="contained" href={'/projects/' + row.original.code}>
            Details
          </Button>,
        ]}
      />
      <CreateNewProjectModal
        open={createModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={handleCreateNewProject}
      />
      <AlertSnackbar
        open={successOpen}
        handleClose={() => setSuccessOpen(false)}
        severity="success"
        message="Operation executed successfully."
      />
    </Box>
  );
}
export default ProjectList;