import api from '../util/api'
export interface Folder {
    ID: string
    Name: string
    VsphereID: string
}

export async function fetchFolders(): Promise<Folder[]> {
    const response = await api.get('/api/v1/folders');
    return response.data;
}
