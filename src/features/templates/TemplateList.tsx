import React, { useState, useEffect } from 'react';
import { Template, getTemplates } from './Template';
import Button from '@mui/material/Button';
import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';

export function TemplateList() {
  const [tickets, setTickets] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      const data = await getTemplates({ offset: 0, limit: 20 });
      setLoading(false);
      setTickets(
        data.Templates.map((t) => ({
          ...t,
          clickCount: 0,
        })),
      );
    }
    fetchTickets();
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
        Tickets
      </Typography>
      <List>
        {tickets.map((t) => (
          <ListItem
            key={t.ID}
            disablePadding
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <ListItemText primary={t.Name} secondary={`Clicked ${t.OsType} times`} />
            <Box>
              <Button variant="contained">Details</Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
