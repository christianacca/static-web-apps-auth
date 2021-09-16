import { Component } from '@angular/core';

@Component({
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <h2 class="title">Acces denied</h2>
        <p>You are unauthorized to access this page</p>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}
