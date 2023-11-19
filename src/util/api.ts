import axios from 'axios';
import { useVCenterContext } from '../features/vcenter/vCenterContext';
import { User } from "oidc-client-ts"

function getUser() {
  const oidcStorage = localStorage.getItem(`oidc.user:https://keycloak.tecna.pl/realms/ksawery:admin-app`)
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}
export interface Pagination {
  limit: number;
  offset: number;
}
const api = axios.create({});
export default api;

api.interceptors.request.use((config) => {
  const user = getUser();
  const token = user?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('token not found');
  }

  // Add the selectedVCenter header
  if (selectedVCenter) {
    config.headers['vcenter'] = selectedVCenter;
  }

  return config;
});

const selectedVCenter = 'vcenter'


//const { selectedVCenter } = useVCenterContext();
