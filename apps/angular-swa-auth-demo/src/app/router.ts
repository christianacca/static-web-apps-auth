import { Routes } from '@angular/router';
import { AuthGuard, SwaRoleGuard } from '@christianacca/angular-swa-auth';
import { RoutePermissions } from '@christianacca/angular-swa-auth-demo/core';
import { AdminLandingComponent } from '@christianacca/angular-swa-auth-demo/shell';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  {
    path: 'products',
    canLoad: [AuthGuard],
    loadChildren: () => import('@christianacca/shared/products').then(m => m.ProductsModule)
  },
  {
    path: 'admin-area',
    data: {
      allowedRoles: RoutePermissions.adminArea
    },
    canActivate: [SwaRoleGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'landing' },
      { path: 'landing', component: AdminLandingComponent },
      {
        path: 'product',
        data: {
          allowedRoles: RoutePermissions.productAdminArea
        },
        canLoad: [SwaRoleGuard],
        loadChildren: () => import('@christianacca/angular-swa-auth-demo/product-admin').then(m => m.ProductAdminModule)
      },
      {
        path: 'user',
        data: {
          allowedRoles: RoutePermissions.userAdminArea
        },
        canLoad: [SwaRoleGuard],
        loadChildren: () => import('@christianacca/angular-swa-auth-demo/user-admin').then(m => m.UserAdminModule)
      }
    ]
  }
];
