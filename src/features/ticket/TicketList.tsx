import React, { useState, useEffect } from 'react';
import { Ticket, getTickets } from './Ticket';
import Button from '@mui/material/Button';
import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';

export function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      const data = await getTickets();
      setLoading(false);
      setTickets(
        data.map((t) => ({
          ...t,
          clickCount: 0,
        })),
      );
    }
    fetchTickets();
  }, []);

  const handleClick = (t: Ticket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.ID === t.ID ? { ...t, clickCount: ticket.clickCount + 1 } : ticket,
    );
    setTickets(updatedTickets);
  };

  if (loading) {
    return <div>Loading...</div>;
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
            <ListItemText primary={t.Title} secondary={`Clicked ${t.clickCount} times`} />
            <Box>
              <Button variant="contained" color="primary" onClick={() => handleClick(t)}>
                Edit
              </Button>
              <Button variant="contained">Details</Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
