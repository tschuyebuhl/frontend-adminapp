import axios from 'axios';
import keycloak from './keycloak';
import { useVCenterContext } from '../features/vcenter/vCenterContext';

export interface Pagination {
  limit: number;
  offset: number;
}
const api = axios.create({});
export default api;

api.interceptors.request.use((config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  } else {
    console.log('Keycloak token not found');
  }

  // Add the selectedVCenter header
  if (selectedVCenter) {
    config.headers['vcenter'] = selectedVCenter;
  }

  return config;
});

const selectedVCenter = 'vcenter'


//const { selectedVCenter } = useVCenterContext();
