import api from '../util/api'
export interface Host {
    ID: string
    Name: string
    VsphereID: string
}

export async function fetchHosts(): Promise<Host[]> {
    const response = await api.get('/api/v1/hosts');
    return response.data;
}
