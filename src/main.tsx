import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig: AuthProviderProps = {
  authority: 'https://keycloak.tecna.pl/realms/ksawery',
  client_id: 'admin-app',
  redirect_uri: 'http://localhost:5173',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: (): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
