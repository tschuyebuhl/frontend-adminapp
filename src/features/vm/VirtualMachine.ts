import { QueryKey } from '@tanstack/react-query';
import api from '../../util/api';

export interface VirtualMachine {
  ID: string;
  VsphereID: string;
  Name: string;
  PowerState: string;
  NumCpus: number;
  MemoryMB: number;
  GuestOs: string;
  HostName: string;
  CustomerName: string;
}
export interface CreateVirtualMachineRequest {
  name: string;
  ip: string;
  host: string;
  folder: string;
}

export async function getVirtualMachines(): Promise<VirtualMachine[]> {
  const response = await api.get('/api/v1/virtual-machines/');
  return response.data;
}

export async function getVirtualMachine({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<VirtualMachine> {
  const name = queryKey[1];
  const response = await api.get(`/api/v1/virtual-machines/${name}`);
  if (response.status !== 200) {
    throw new Error(`${name} fetch not ok`);
  }
  return response.data;
}
export const createVirtualMachine = async (newVmData: CreateVirtualMachineRequest): Promise<VirtualMachine> => {
  const response = await fetch('/api/v1/virtual-machines', { // Replace with your API endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newVmData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create a new virtual machine: ${response.statusText}`);
  }

  const createdVm = await response.json();
  return createdVm;
};
