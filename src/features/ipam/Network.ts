import { QueryKey } from '@tanstack/react-query';
import api, { Pagination } from '../../util/api';

export interface Network {
  id: string
  name: string
  vlanId: number
  subnetMask: string
  gateway: string
  address: string
  dhcpEnabled: boolean
  dhcpStart: string
  dhcpEnd: string
  portGroupId: string
}

export interface CreateNetworkRequest {
  ID?: string
  Name: string
  VlanID: number
  SubnetMask: string
  Gateway: string
  Address: string
  DHCPEnabled: boolean
  DHCPStart: string
  DHCPEnd: string
}

export interface NetworkResponse {
  ID: string
  Name: string
  VlanID: number
  SubnetMask: string
  Gateway: string
  Address: string
  DHCPEnabled: boolean
  DHCPStart: string
  DHCPEnd: string
  PortGroupID: string
}

export async function getNetworks(pagination: Pagination): Promise<Network[]> {
  const response = await api.get('/api/v1/ipam', { params: pagination });
  if (!Array.isArray(response.data)) {
    // Handle unexpected data shape by defaulting to an empty array
    return [];
  }
  return response.data.map((network: NetworkResponse) => ({
    id: network.ID,
    name: network.Name,
    vlanId: network.VlanID,
    subnetMask: network.SubnetMask,
    gateway: network.Gateway,
    address: network.Address,
    dhcpEnabled: network.DHCPEnabled,
    dhcpStart: network.DHCPStart,
    dhcpEnd: network.DHCPEnd,
    portGroupId: network.PortGroupID,
  }));
}


export async function getProject({ queryKey }: { queryKey: QueryKey; }): Promise<Network> {
  const code = queryKey[1];
  const response = await api.get(`/api/v1/ipam/${code}`);
  const network: NetworkResponse = response.data;
  return {
    id: network.ID,
    name: network.Name,
    vlanId: network.VlanID,
    subnetMask: network.SubnetMask,
    gateway: network.Gateway,
    address: network.Address,
    dhcpEnabled: network.DHCPEnabled,
    dhcpStart: network.DHCPStart,
    dhcpEnd: network.DHCPEnd,
    portGroupId: network.PortGroupID,
  };
}
export async function createProject(data: CreateNetworkRequest): Promise<void> {
  await api.post('/api/v1/ipam', data);
}

export async function deleteProject(code: string): Promise<void> {
  await api.delete(`/api/v1/ipam/${code}`);
}

export async function updateProject(code: string, data: CreateNetworkRequest): Promise<void> {
  await api.put(`/api/v1/ipam/${code}`, data);
}