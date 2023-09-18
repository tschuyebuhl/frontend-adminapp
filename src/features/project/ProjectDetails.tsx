import React, { useEffect, useState } from 'react';
import { VirtualMachine } from '../vm/VirtualMachine';
import { Application } from '../application/Application';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardContent, CardActions,
  Button, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar
} from '@mui/material';

import { getProject, deleteProject, Project } from './Project';
import Alert from '@mui/material/Alert';

type ProjectDetails = {
  ID: string,
  Code: string,
  Description: string,
  Active: boolean,
  Name: string,
  SCMNamespaceID: number,
  SCMProvider: string,
  Settings: any,
};


async function getProjectDetails(id: string): Promise<ProjectDetails> {
  // Fetch project details from API
  return {} as ProjectDetails;
}

async function getApplications(id: string): Promise<Application[]> {
  // Fetch associated applications
  return [];
}

async function getVirtualMachines(id: string): Promise<VirtualMachine[]> {
  // Fetch associated virtual machines
  return [];
}


export function ProjectDetails() {
  const { code } = useParams<{ code?: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [virtualMachines, setVirtualMachines] = useState<VirtualMachine[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const projDetails = await getProject({ queryKey: ['project', code] });
      const projApplications = await getApplications(code ?? '');
      const projVirtualMachines = await getVirtualMachines(code ?? '');

      setProject(projDetails);
      setApplications(projApplications);
      setVirtualMachines(projVirtualMachines);
    }

    fetchData();
  }, [code]);

  const handleDeleteConfirmOpen = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(code ?? '');
      setSnackbarMessage('Project deleted successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      navigate('/projects');
    } catch (error) {
      console.error("Error deleting the project:", error);
      setSnackbarMessage('Error deleting the project. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
};

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader title={project.name} />
      <CardContent>
        <Typography variant="body1">Code: {project.code}</Typography>
        <Typography variant="body1">Description: {project.description}</Typography>
        <Typography variant="body1">Status: {project.status}</Typography>
      </CardContent>

      <CardActions>
        <Button color="primary" onClick={handleDeleteConfirmOpen}>Delete</Button>
      </CardActions>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteConfirmClose}
      >
        //TODO component
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default ProjectDetails;