import { QueryKey } from '@tanstack/react-query';
import api from '../../util/api';


export interface TemplateResponse {
  Data: Template[]
  Count: number
}

export interface Template {
  ID: string
  Name: string
  Description: string
  CloudProvider: string
  Version: string
  OsType: string
  OsVersion: string
  CPUCores: number
  MemoryGB: number
  StorageGB: number
  ExternalID: string
  ExtraInfo: VMWareExtraInfo //could be any of extrainfos, between vmware, azure, aws, gcp
}

//vmware
export interface VMWareExtraInfo {
  nic: string
  disk: string
  library_name: string
  datastore_id: string
  library_description: string
  item_name: string
  item_type: string
  file_name: string
  file_url: string
  item_description: string
}


export async function getTemplates(params?: { offset: number; limit: number }): Promise<{ Templates: Template[], Count: number }> {
  const response = await api.get('/api/v1/templates', {
    params,
  });
  return {
    Templates: response.data.data,
    Count: response.data.total,
  };
}


export async function getTemplate({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<Template> {
  const id = queryKey[1];
  const response = await api.get(`/api/v1/templates/${id}`);
  if (response.status !== 200) {
    throw new Error(`template with id ${id} fetch not ok`);
  }
  return response.data;
}

export async function deleteTemplate(id: string) {

  const response = await api.delete(`/api/v1/templates/${id}`);
  if (response.status !== 200) {
    throw new Error(`${id} delete not ok`);
  }
  return response.data;
}

/*
export const cloneVirtualMachine = async (vmName: string, newVmData: CloneVirtualMachineRequest): Promise<VirtualMachineResponse> => {
  const options = {
    method: 'POST',
    url: `/api/v1/virtual-machines/${vmName}/clone`,
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify(newVmData),
  };
  const response = await api.request(options)

  if (response.status != 201) {
    throw new Error(`Failed to create a new virtual machine: ${response.statusText}`);
  }

  return { vm: response.data, status: response.status };
};
*/
