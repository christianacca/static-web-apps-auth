import { Routes } from '@angular/router';
import { AuthGuard, SwaRoleGuard } from '@christianacca/angular-swa-auth';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './core';
import { UnauthorizedComponent } from './unauthorized.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('@christianacca/demo-app/products').then(m => m.ProductsModule)
  },
  {
    path: 'users',
    data: {
      allowedRoles: 'admin' // or ['admin', ]
    },
    canActivate: [AuthGuard, SwaRoleGuard],
    loadChildren: () => import('@christianacca/demo-app/users').then(m => m.UsersModule)
  },
  { path: 'about', component: AboutComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent }
];
