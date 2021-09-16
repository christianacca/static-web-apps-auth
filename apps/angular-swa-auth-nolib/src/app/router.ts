import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  {
    path: 'products',
    loadChildren: () => import('@christianacca/shared/products').then(m => m.ProductsModule)
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
