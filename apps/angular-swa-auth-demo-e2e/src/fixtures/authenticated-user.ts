import { ClientPrincipal } from '@christianacca/angular-swa-auth';

interface AuthResponseData {
  clientPrincipal: ClientPrincipal | null;
}

export const authenticatedUser: ClientPrincipal = {
  userId: '59cb0e9a6b6972604ad645814fdbbe70',
  userRoles: ['anonymous', 'authenticated'],
  identityProvider: 'github',
  userDetails: 'Chris'
};

export const userResponse: AuthResponseData = {
  clientPrincipal: authenticatedUser
};
