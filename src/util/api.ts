import axios from 'axios';
import keycloak from './keycloak';

const api = axios.create({
  // Add any global configuration for axios here, like baseURL
});

api.interceptors.request.use((config) => {
  if (keycloak.token) {
    console.log('Adding Authorization header:', `Bearer ${keycloak.token}`);
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  } else {
    console.log('Keycloak token not found');
  }
  return config;
});


export default api;
