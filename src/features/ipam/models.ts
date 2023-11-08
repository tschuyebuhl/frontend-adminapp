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

export interface IP {
  address: string
  prefix: number
}

export interface NextIPResponse {
  ip_address: string
  prefix_length: number
}

export interface IPAddressResponse {
  ID: string;
  ip_address: string;
  prefix_length: number;
  State: string;
  Hostname: string;
  Description: string;
  InterfaceID: null | string; // adjust as needed
  NetworkID: string;
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
  dnsServers: string[]
}

export interface NetworkResponse {
  networks: NetworkWebModel
  total: number
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
  DNSServers: string[]
}

export interface CreateNetworkRequest {
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

export interface CreateIPAddressRequest {
  ip_address: string
  prefix_length: number
  state: string
  hostname: string
  description: string
  network: string
}




//these are UUID's. 
export interface DeleteIPAddressRequest {
  id: string
  network: string
}
