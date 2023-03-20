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
