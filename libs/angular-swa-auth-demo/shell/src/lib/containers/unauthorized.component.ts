import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <h2 class="title">Acces denied</h2>
        <ng-container *ngIf="allowedRoles.length > 0; else noRoles">
          <p>To access the page you need to belong to any one of the following roles:</p>
          <br />
          <ul>
            <li *ngFor="let role of allowedRoles">{{ role }}</li>
          </ul>
        </ng-container>
        <ng-template #noRoles>
          <p>You are unauthorized to access this page</p>
        </ng-template>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {
  allowedRoles: string[];
  constructor(route: ActivatedRoute) {
    this.allowedRoles = route.snapshot.queryParamMap.getAll('allowedRoles');
  }
}
