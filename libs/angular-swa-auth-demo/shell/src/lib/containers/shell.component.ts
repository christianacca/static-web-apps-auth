import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <app-header-bar></app-header-bar>
    <div class="section columns">
      <app-nav class="column is-2"></app-nav>
      <main class="column">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {}
