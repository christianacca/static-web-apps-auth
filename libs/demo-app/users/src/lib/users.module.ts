import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: UserListComponent }])],
  declarations: [UserListComponent]
})
export class UsersModule {}
