import { AllowedRole } from '@christianacca/angular-swa-auth';

const owner: AllowedRole = 'owner';
const monitor: AllowedRole = ['monitor', owner];
const productCatalog: AllowedRole = ['product-catalog', owner];

export const SwaRoles = {
  owner,
  monitor,
  productCatalog
};
