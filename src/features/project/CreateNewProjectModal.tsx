import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Stack, Switch, TextField } from '@mui/material';
import { CreateProjectRequest } from './Project';

interface CreateNewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateProjectRequest) => void;
}


export const CreateNewProjectModal: React.FC<CreateNewProjectModalProps> = ({ open, onClose, onSubmit }) => {
  const [values, setValues] = React.useState<CreateProjectRequest>({
    name: '',
    code: '',
    description: '',
    scmProvider: 'gitlab',
    active: true,
  });

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  const handleInputChange = (key: keyof CreateProjectRequest, value: string | boolean) => {
    setValues({ ...values, [key]: value });
  };

  const fieldLabels: Record<string, string> = {
    code: "Code",
    description: "Description",
    active: "Active",
    name: "Name",
    scmProvider: "SCM Provider"
  };

  const getLabel = (key: string): string => {
    return fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const inputFields = Object.keys(values).map((key) => {
    const label = getLabel(key);
    if (typeof values[key as keyof CreateProjectRequest] === 'boolean') {
      return (
        <div key={key}>
          <label>{label}</label>
          <Switch
            checked={values[key as keyof CreateProjectRequest] as boolean}
            onChange={(e) => handleInputChange(key as keyof CreateProjectRequest, e.target.checked)}
          />
        </div>
      );
    }
  
    if (key === 'scmProvider') {
      return (
        <div key={key}>
          <label>{label}</label> 
          <Select
            value={values.scmProvider}
            onChange={(e) => handleInputChange('scmProvider', e.target.value)}
          >
            <MenuItem value="gitlab">GitLab</MenuItem>
            <MenuItem value="github">GitHub</MenuItem>
            <MenuItem value="bitbucket">Bitbucket</MenuItem>
          </Select>
        </div>
      );
    }
    return (
      <TextField
        key={key}
        label={label}
        fullWidth
        value={values[key as keyof CreateProjectRequest]}
        onChange={(e) => handleInputChange(key as keyof CreateProjectRequest, e.target.value)}
      />
    );
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ margin: '0.25rem' }} textAlign="center">Create a new project</DialogTitle>      
      <DialogContent>
      <Stack
       sx={{
         width: '100%',
         minWidth: { xs: '300px', sm: '300px', md: '400px' },
         gap: '1.5rem',
         mt: '5px'
       }}
       >
        {inputFields}
        </Stack>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};
