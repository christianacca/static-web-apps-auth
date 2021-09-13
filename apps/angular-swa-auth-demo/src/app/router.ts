import { Routes } from '@angular/router';
import { AuthGuard, SwaRoleGuard } from '@christianacca/angular-swa-auth';
import { RoutePermissions } from '@christianacca/demo-app/core';
import { AboutComponent } from './about.component';
import { AdminLandingComponent } from './admin-landing.component';
import { NotFoundComponent } from './core';
import { UnauthorizedComponent } from './unauthorized.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  {
    path: 'products',
    canLoad: [AuthGuard],
    loadChildren: () => import('@christianacca/demo-app/products').then(m => m.ProductsModule)
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
        loadChildren: () => import('@christianacca/demo-app/product-admin').then(m => m.ProductAdminModule)
      },
      {
        path: 'user',
        data: {
          allowedRoles: RoutePermissions.userAdminArea
        },
        canLoad: [SwaRoleGuard],
        loadChildren: () => import('@christianacca/demo-app/user-admin').then(m => m.UserAdminModule)
      }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent }
];
