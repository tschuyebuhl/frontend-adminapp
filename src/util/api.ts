import axios from 'axios';
import keycloak from './keycloak';
import { useVCenterContext } from '../features/vcenter/vCenterContext';

//const { selectedVCenter } = useVCenterContext();
const api = axios.create({
  // Add any global configuration for axios here, like baseURL
});

const selectedVCenter = 'vcenter'
api.interceptors.request.use((config) => {
  if (keycloak.token) {
    console.log('Adding Authorization header:', `Bearer ${keycloak.token}`);
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

export default api;
