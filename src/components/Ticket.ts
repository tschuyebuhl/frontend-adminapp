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
  const response = await fetch('http://localhost:8080/api/v1/tickets/');
  const data = await response.json();
  return data;
}
