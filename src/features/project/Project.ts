import { QueryKey } from '@tanstack/react-query';
import api from '../../util/api';

export interface Project {
  code: string;
  name: string;
  description: string;
  endDate: string;
  status: boolean;
}

export async function getProjects(): Promise<Project[]> {
  const response = await api.get('/api/v1/projects/');
  return response.data.map((project: any) => ({
    id: project.ID,
    name: project.Name,
    description: project.Description,
    code: project.Code,
    status: project.Active ? 'Active' : 'Inactive',
  }));
}

export async function getProject({ queryKey, }: { queryKey: QueryKey; }): Promise<Project> {
  const id = queryKey[1];
  const response = await api.get(`/api/v1/projects/${id}`);
  if (response.status !== 200) {
    throw new Error(`${id} fetch not ok`);
  }
  return response.data;
}
