import { SwaRoles } from './swa-roles';

const offers = SwaRoles.premiumUser;
const productCategories = SwaRoles.productCatalog;
const productStats = [SwaRoles.productCatalog, SwaRoles.monitor];
const productAdminArea = [productCategories, productStats];
const userManagement = [SwaRoles.owner];
const userStats = SwaRoles.monitor;
const userAdminArea = [userManagement, userStats];
const adminArea = [productAdminArea, userAdminArea];

export const RoutePermissions = {
  offers,
  productCategories,
  productStats,
  productAdminArea,
  userManagement,
  userStats,
  userAdminArea,
  adminArea
};
