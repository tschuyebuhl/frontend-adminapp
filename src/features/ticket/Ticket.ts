import api from '../../util/api';

export type Ticket = {
  ID: string;
  Title: string;
  Details: string;
  Priority: Priority;
  clickCount: number;
};

export enum Priority {
  very_low,
  low,
  normal,
  high,
  very_high,
  real_time,
}
export async function getTickets(): Promise<Ticket[]> {
    const response = await api.get('/api/v1/tickets/');
    return response.data;
}
