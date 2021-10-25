import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AuthGuard } from '@christianacca/angular-swa-auth';
import { UserProfileComponent } from './containers/user-profile.component';

export const userProfileRoutes: Route[] = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [UserProfileComponent]
})
export class UserProfileModule {}
