import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: ` <p>user-stats works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserStatsComponent {}
