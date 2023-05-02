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
  HostID: string;
  CustomerID: string;
  clickCount: number;
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
