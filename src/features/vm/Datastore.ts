import api from '../../util/api'
export interface Datastore {
    ID: string
    Name: string
    VsphereID: string
}

export async function fetchDatastores(): Promise<Datastore[]> {
    const response = await api.get('/api/v1/datastores');
    return response.data;
}
