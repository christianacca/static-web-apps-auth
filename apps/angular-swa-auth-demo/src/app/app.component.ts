import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-idp-selector-modal></app-idp-selector-modal>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `
  ]
})
export class AppComponent {}
