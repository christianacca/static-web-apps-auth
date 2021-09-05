import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: ` <p>user-list works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {}
