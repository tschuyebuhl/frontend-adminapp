import { QueryKey } from '@tanstack/react-query';
import api from '../../util/api';


export interface TemplatesResponse {
  data: APITemplate[]
  count: number
}

export interface Templates {
  data: Template[]
  count: number
}

export interface APITemplate {
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

export interface Template {
  id: string
  name: string
  description: string
  cloudProvider: string
  version: string
  osType: string
  osVersion: string
  cpuCores: number
  memoryGB: number
  storageGB: number
  externalID: string
  extraInfo: VMWareExtraInfo //could be any of extrainfos, between vmware, azure, aws, gcp
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


export async function getTemplates(params?: { offset: number; limit: number }): Promise<Templates> {
  const response = await api.get('/api/v1/templates', {
    params,
  });

  let templates: Template[] = response.data.data.map((t: APITemplate) => ({
    id: t.ID,
    name: t.Name,
    description: t.Description,
    cloudProvider: t.CloudProvider,
    version: t.Version,
    osType: t.OsType,
    osVersion: t.OsVersion,
    cpuCores: t.CPUCores,
    memoryGB: t.MemoryGB,
    storageGB: t.StorageGB,
    externalID: t.ExternalID,
    extraInfo: t.ExtraInfo,
  }));
  return {
    data: templates,
    count: response.data.total,
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
  let template: Template = {
    id: response.data.ID,
    name: response.data.Name,
    description: response.data.Description,
    cloudProvider: response.data.CloudProvider,
    version: response.data.Version,
    osType: response.data.OsType,
    osVersion: response.data.OsVersion,
    cpuCores: response.data.CPUCores,
    memoryGB: response.data.MemoryGB,
    storageGB: response.data.StorageGB,
    externalID: response.data.ExternalID,
    extraInfo: response.data.ExtraInfo,
  };
  return template;
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
