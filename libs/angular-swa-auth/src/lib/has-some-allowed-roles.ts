import { AllowedRole } from './auth.service';
import { anonymousRole } from './client-principal';

/**
 * Is one or more of the `allowedRoles` in `actualRoles`. Implicitly every user (authenticated or unauthenticated)
 * is a member of the {@link anonymousRole} and that is assumed when verifying `allowedRoles`
 */
export const hasSomeAllowedRoles = (allowedRoles: AllowedRole[], actualRoles: string[]) => {
  const allowedRoleNames = flattenAllowedRoles(allowedRoles);
  return (
    allowedRoleNames.length === 0 ||
    allowedRoleNames.includes(anonymousRole) ||
    allowedRoleNames.some(r => actualRoles.includes(r))
  );
};

/**
 * @ignore
 */
export const flattenAllowedRoles = (allowedRoles: AllowedRole[]) =>
  Array.from(new Set<string>(allowedRoles.flat(10) as unknown as string[]));
