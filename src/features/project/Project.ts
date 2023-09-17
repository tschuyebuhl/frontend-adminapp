import { QueryKey } from '@tanstack/react-query';
import api from '../../util/api';

export interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  status: string;
}

export interface CreateProjectRequest {
  code: string;
  description: string;
  active: boolean;
  name: string;
  scmProvider: string;
}

export interface UpdateProjectRequest {
  id: string;
  code: string;
  description: string;
  active: boolean;
  name: string;
  scmProvider: string;
}

export interface ProjectResponse {
  ID: string;
  Code: string;
  Description: string;
  Active: boolean;
  Name: string;
  SCMNamespaceID: string;
  SCMProvider: string;
  Settings: any;
}

export async function getProjects(): Promise<Project[]> {
  const response = await api.get('/api/v1/projects');
  if (!Array.isArray(response.data)) {
    // Handle unexpected data shape by defaulting to an empty array
    return [];
  }
  return response.data.map((project: ProjectResponse) => ({
    id: project.ID,
    name: project.Name,
    description: project.Description,
    code: project.Code,
    status: project.Active ? 'Active' : 'Inactive',
  }));
}


export async function getProject({ queryKey, }: { queryKey: QueryKey; }): Promise<Project> {
  const code = queryKey[1];
  const response = await api.get(`/api/v1/projects/${code}`);
  const project: ProjectResponse = response.data;
  return {
    id: project.ID,
    name: project.Name,
    description: project.Description,
    code: project.Code,
    status: project.Active ? 'Active' : 'Inactive',
  };
}
export async function createProject(data: CreateProjectRequest): Promise<void> {
  await api.post('/api/v1/projects', data);
}

export async function deleteProject(code: string): Promise<void> {
  await api.delete(`/api/v1/projects/${code}`);
}

export async function updateProject(code: string, data: CreateProjectRequest): Promise<void> {
  await api.put(`/api/v1/projects/${code}`, data);
}