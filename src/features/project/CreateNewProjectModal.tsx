import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField } from '@mui/material';

interface CreateNewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateProjectRequest) => void;
}

export interface CreateProjectRequest {
  code: string;
  description: string;
  active: boolean;
  name: string;
  scm_provider: string;
}

export const CreateNewProjectModal: React.FC<CreateNewProjectModalProps> = ({ open, onClose, onSubmit }) => {
  const [values, setValues] = React.useState<CreateProjectRequest>({
    code: '',
    description: '',
    active: true,
    name: '',
    scm_provider: 'gitlab',
  });

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  const handleInputChange = (key: keyof CreateProjectRequest, value: string | boolean) => {
    setValues({ ...values, [key]: value });
  };

  const inputFields = Object.keys(values).map((key) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
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
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        {inputFields}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};
