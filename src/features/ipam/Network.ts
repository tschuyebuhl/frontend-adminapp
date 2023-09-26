import { QueryKey } from '@tanstack/react-query';
import api, { Pagination } from '../../util/api';

export interface IPAddress {
  ID: string
  IPAddress: string
  PrefixLength: number
  Hostname: string
  Description: string
  State: string
  InterfaceID: any
  NetworkID: string
}


export interface Network {
  id: string
  name: string
  vlanId: number
  subnetMask: number
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
  SubnetMask: number
  Gateway: string
  Address: string
  DHCPEnabled: boolean
  DHCPStart: string
  DHCPEnd: string
}

export interface NetworkWebModel {
  ID: string
  Name: string
  VlanID: number
  SubnetMask: number
  Gateway: string
  Address: string
  DHCPEnabled: boolean
  DHCPStart: string
  DHCPEnd: string
  PortGroupID: string
}

export interface NetworkResponse {
  networks: NetworkWebModel
  total: number
}

export async function getNetworks(pagination: Pagination): Promise<{ networks: Network[], total: number }> {
  const response = await api.get('/api/v1/ipam/networks', { params: pagination });
  const data = response.data;

  if (!data.networks || !Array.isArray(data.networks)) {
    // Handle unexpected data shape by defaulting to an empty array and zero total
    return { networks: [], total: 0 };
  }

  const mappedNetworks = data.networks.map((network: NetworkWebModel) => ({
    id: network.ID,
    name: network.Name,
    vlanId: network.VlanID,
    subnetMask: network.SubnetMask,
    gateway: network.Gateway,
    address: network.Address,
    dhcpEnabled: network.DHCPEnabled,
    dhcpStart: network.DHCPStart,
    dhcpEnd: network.DHCPEnd,
    portGroupId: network.PortGroupID
  }));

  return { networks: mappedNetworks, total: data.total };
}

export const ipToNumber = (ip: string) => {
  const [a, b, c, d] = ip.split('.').map(Number);
  return a * Math.pow(256, 3) + b * Math.pow(256, 2) + c * 256 + d;
};

export async function getNetwork({ queryKey }: { queryKey: QueryKey; }): Promise<Network> {
  const code = queryKey[1];
  const response = await api.get(`/api/v1/ipam/networks/${code}`);
  const network: NetworkWebModel = response.data;

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

export async function getIPAddresses({ queryKey }: { queryKey: QueryKey; }): Promise<IPAddress[]> {
  const name = queryKey[1];
  const response = await api.get(`/api/v1/ipam/networks/${name}/ip-addresses`);
  const data = response.data;
  return data;
}

export async function trashFunction(name: string): Promise<IPAddress[]> {
  const response = await api.get(`/api/v1/ipam/networks/${name}/ip-addresses`);
  const data = response.data;
  return data;
}


export async function createNetwork(data: CreateNetworkRequest): Promise<void> {
  await api.post('/api/v1/ipam', data);
}

export async function deleteProject(code: string): Promise<void> {
  await api.delete(`/api/v1/ipam/${code}`);
}

export async function updateProject(code: string, data: CreateNetworkRequest): Promise<void> {
  await api.put(`/api/v1/ipam/${code}`, data);
}