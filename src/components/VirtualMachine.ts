import { QueryKey } from '@tanstack/react-query';
export interface VirtualMachine {
  ID: string;
  VsphereID: string;
  Name: string;
  PowerState: string;
  NumCpus: number;
  MemoryMB: number;
  GuestOs: string;
  HostID: string;
  CustomerID: string;
  clickCount: number;
}

export async function getVirtualMachines(): Promise<VirtualMachine[]> {
  const response = await fetch('http://localhost:8080/api/v1/virtual-machines/');
  const data = await response.json();
  return data;
}
export async function getVirtualMachine({ queryKey } : { queryKey: QueryKey }): Promise<VirtualMachine> {
  const name = queryKey[1];
  const response = await fetch('http://localhost:8080/api/v1/virtual-machines/' + name);
  if (!response.ok) {
    throw new Error(`${name} fetch not ok`);
  }
  return response.json();
}
