import axios from 'axios';
import keycloak from './keycloak';

const api = axios.create({
  // Add any global configuration for axios here, like baseURL
});

api.interceptors.request.use((config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default api;
