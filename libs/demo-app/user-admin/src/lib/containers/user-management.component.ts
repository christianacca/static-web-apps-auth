import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: ` <p>user-management works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {}
