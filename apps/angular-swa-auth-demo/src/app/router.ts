import {Routes} from '@angular/router';
import {AboutComponent} from './about.component';
import {NotFoundComponent} from './core';
import {AuthGuard} from '@ccacca/angular-swa-auth';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];
