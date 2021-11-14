/**
 * The normalized details of a user
 */
export interface ClientPrincipal {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

/**
 * The role name that all unauthenticated users are a member of
 */
export const anonymousRole = 'anonymous';
/**
 * The role name that all authenticated users are a member of
 */
export const authenticatedRole = 'authenticated';
