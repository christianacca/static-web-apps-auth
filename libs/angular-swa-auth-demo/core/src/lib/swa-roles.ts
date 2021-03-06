import { AllowedRole } from '@christianacca/angular-swa-auth';

const owner: AllowedRole = 'owner';
const monitor: AllowedRole = ['monitor', owner];
const productCatalog: AllowedRole = ['product-catalog', owner];
const premiumUser: AllowedRole = ['premium-user', owner];

export const SwaRoles = {
  owner,
  monitor,
  premiumUser,
  productCatalog
};
