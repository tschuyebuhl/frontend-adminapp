import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://keycloak.tecna.pl/',
  realm: 'ksawery',
  clientId: 'admin-app',
};

let keycloak = new Keycloak(keycloakConfig);

export default keycloak;
