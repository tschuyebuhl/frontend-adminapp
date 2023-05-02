import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    TextField,
    Switch,
    Typography,
} from '@mui/material';

interface Project {
    Code: string;
    Description?: string;
    Active: boolean;
    Name?: string;
    GitlabGroupURL?: string;
}

export function CreateProject() {
    const [project, setProject] = useState<Project>({
        Code: '',
        Active: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // POST request to create a new project
        try {
            const response = await fetch('/api/v1/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            });
            const data = await response.json();
            console.log('New project created:', data);
        } catch (error) {
            console.error('Error creating new project:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Create a New Project
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl fullWidth>
                        <TextField
                            label="Code"
                            name="Code"
                            value={project.Code}
                            onChange={handleChange}
                            required
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label="Name"
                            name="Name"
                            value={project.Name || ''}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label="Description"
                            name="Description"
                            value={project.Description || ''}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label="GitLab Group URL"
                            name="GitlabGroupURL"
                            value={project.GitlabGroupURL || ''}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                name="Active"
                                checked={project.Active}
                                onChange={handleChange}
                                color="primary"
                            />
                        }
                        label="Active"
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Create Project
                    </Button>
                </FormGroup>
            </form>
        </Box>
    );
}
