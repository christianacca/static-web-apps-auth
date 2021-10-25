import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: ` <h2>user-profile works!</h2> `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {}
