import React, { useState, useEffect } from 'react';
import { Ticket, getTickets } from '../components/Ticket';

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
    <div>
      <h2
        className={`inline-flex flex-col text-left px-4 py-3
    rounded-md border-1 border-transparent`}
      >
        Tickets
      </h2>
      <ul>
        {tickets.map((t) => (
          <li key={t.ID}>
            {t.ID}, click count: {t.clickCount}, {t.Priority}
            <button
              className={`inline-flex flex-col text-left px-4 py-3
    rounded-md border-1 border-transparent`}
              onClick={() => handleClick(t)}
            >
              Edit
            </button>
            <button>Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
