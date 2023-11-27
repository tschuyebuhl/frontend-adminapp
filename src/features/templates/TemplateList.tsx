import React, { useState, useEffect } from 'react';
import { Template, getTemplates } from './Template';
import Button from '@mui/material/Button';
import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';

export function TemplateList() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      const templates = await getTemplates({ offset: 0, limit: 20 }).then((res) => res.data);
      setLoading(false);
      setTemplates(
        templates.map((t: Template) => ({
          ...t,
          clickCount: 0,
        })),
      );
    }
    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Templates
      </Typography>
      <List>
        {templates.map((t) => (
          <ListItem
            key={t.id}
            disablePadding
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <ListItemText primary={t.name} secondary={`Clicked ${t.osType} times`} />
            <Box>
              <Button variant="contained">Details</Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
