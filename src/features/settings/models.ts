import { MRT_ColumnDef } from "material-react-table"
import api from "../../util/api"
import { QueryKey } from "@tanstack/react-query"

export interface SSHKeyAPI {
  ID: string
  name: string
  type: "rsa" | "ed25519"
  length: number
  fingerprint: string
  public_key: string
}
export interface SSHKey {
  id: string
  name: string
  type: "rsa" | "ed25519"
  length: number
  fingerprint: string
  publicKey: string
}

export interface GenerateSSHKeyResponse extends SSHKey {
  private_key: string
}

export interface SSHKeyResponse {
  data: SSHKeyAPI[]
  total: number
}

export interface SSHKeyPageData {
  data: SSHKey[]
  total: number
}

export async function getSSHKeys(pageParams?: { offset: number; limit: number; }, filter?: {}, sort?: {}): Promise<SSHKeyPageData> {
  const params = new URLSearchParams();
  if (pageParams) {
    params.append('offset', pageParams.offset.toString());
    params.append('limit', pageParams.limit.toString());
  }
  const response = await api.get<SSHKeyResponse>('/api/v1/settings/ssh-keys', { params });
  if (!Array.isArray(response.data.data)) {
    return { data: [], total: 0 };
  }
  let keys = response.data.data.map((key: SSHKeyAPI) => ({
    id: key.ID,
    name: key.name,
    type: key.type,
    length: key.length,
    fingerprint: key.fingerprint,
    publicKey: key.public_key
  }));
  let total = response.data.total;
  return { data: keys, total };
}

export async function getSSHKey({ queryKey }: { queryKey: QueryKey; }): Promise<SSHKey> {
  const id = queryKey[1];
  const response = await api.get<SSHKeyAPI>(`/api/v1/settings/ssh-keys/${id}`);
  const actualApiData = response.data;

  let key = {
    id: actualApiData.ID,
    name: actualApiData.name,
    type: actualApiData.type,
    length: actualApiData.length,
    fingerprint: actualApiData.fingerprint,
    publicKey: actualApiData.public_key
  };
  return key;
}

export const sshKeyColumns: MRT_ColumnDef<SSHKey>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Length',
    accessorKey: 'length',
  },
  {
    header: 'Fingerprint',
    accessorKey: 'fingerprint',
  },
  {
    header: 'Public Key',
    accessorKey: 'publicKey',
  },
]; 