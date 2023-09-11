import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        {/* Add your form fields here */}
        <TextField label="Code" fullWidth value={values.code} onChange={(e) => setValues({ ...values, code: e.target.value })} />
        {/* Add other fields similarly */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};
