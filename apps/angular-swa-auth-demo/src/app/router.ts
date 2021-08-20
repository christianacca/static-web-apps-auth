import { Routes } from '@angular/router';
import { AuthGuard } from '@ccacca/angular-swa-auth';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('@ccacca/demo-app/products').then(m => m.ProductsModule)
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
