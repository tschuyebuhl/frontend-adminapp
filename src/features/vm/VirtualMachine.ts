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

export async function deleteVirtualMachine(vmName: string) {

  const response = await api.delete(`/api/v1/virtual-machines/${vmName}`);
  if (response.status !== 200) {
    throw new Error(`${vmName} delete not ok`);
  }
  return response.data;
}

export const createVirtualMachine = async (newVmData: CreateVirtualMachineRequest): Promise<VirtualMachine> => {
  const options = {
    method: 'POST',
    url: '/api/v1/virtual-machines',
    headers: {
        'content-type': 'application/json',
    },
    data: JSON.stringify(newVmData),
};
const response = await api.request(options)

  if (response.status != 201) {
    throw new Error(`Failed to create a new virtual machine: ${response.statusText}`);
  }

  const createdVm = response.data();
  return createdVm;
};
