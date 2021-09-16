import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwaRoleGuard } from '@christianacca/angular-swa-auth';
import { RoutePermissions } from '@christianacca/angular-swa-auth-demo/core';
import { CONTAINERS, UserManagementComponent, UserStatsComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'stats' },
      {
        path: 'management',
        data: {
          allowedRoles: RoutePermissions.userManagement
        },
        canActivate: [SwaRoleGuard],
        component: UserManagementComponent
      },
      {
        path: 'stats',
        data: {
          allowedRoles: RoutePermissions.userStats
        },
        canActivate: [SwaRoleGuard],
        component: UserStatsComponent
      }
    ])
  ],
  declarations: [CONTAINERS]
})
export class UserAdminModule {}
