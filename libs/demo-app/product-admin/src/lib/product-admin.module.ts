import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwaRoleGuard } from '@christianacca/angular-swa-auth';
import { RoutePermissions } from '@christianacca/demo-app/core';
import { CONTAINERS, ProductCategoriesComponent, ProductStatsComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'stats' },
      {
        path: 'categories',
        data: {
          allowedRoles: RoutePermissions.productCategories
        },
        canActivate: [SwaRoleGuard],
        component: ProductCategoriesComponent
      },
      {
        path: 'stats',
        data: {
          allowedRoles: RoutePermissions.productStats
        },
        canActivate: [SwaRoleGuard],
        component: ProductStatsComponent
      }
    ])
  ],
  declarations: [CONTAINERS]
})
export class ProductAdminModule {}
