import { Component } from '@angular/core';
import { RoutePermissions } from '@christianacca/demo-app/core';

@Component({
  template: `
    <div class="content-container" *swaRoleCheck="let canUserAdmin of routePermissions.userAdminArea">
      <div
        class="content-title-group not-found"
        *swaRoleCheck="let canProductAdmin of routePermissions.productAdminArea"
      >
        <ng-container *ngIf="canProductAdmin">
          <h2 class="title">Product admin</h2>
          <ul>
            <ng-container *swaRoleCheck="let authz of routePermissions.productCategories">
              <li *ngIf="authz">
                <a routerLink="/admin-area/product/categories">
                  <span>Category catalog</span>
                </a>
              </li>
            </ng-container>
            <ng-container *swaRoleCheck="let authz of routePermissions.productStats">
              <li *ngIf="authz">
                <a routerLink="/admin-area/product/stats">
                  <span>Product stats</span>
                </a>
              </li>
            </ng-container>
          </ul>
          <br />
        </ng-container>
        <ng-container *ngIf="canUserAdmin">
          <h2 class="title">User admin</h2>
          <ul>
            <ng-container *swaRoleCheck="let authz of routePermissions.userManagement">
              <li *ngIf="authz">
                <a routerLink="/admin-area/user/management">
                  <span>Site user manintenance</span>
                </a>
              </li>
            </ng-container>
            <ng-container *swaRoleCheck="let authz of routePermissions.userStats">
              <li *ngIf="authz">
                <a routerLink="/admin-area/user/stats">
                  <span>Site user stats</span>
                </a>
              </li>
            </ng-container>
          </ul>
        </ng-container>
      </div>
    </div>
  `
})
export class AdminLandingComponent {
  routePermissions = RoutePermissions;
}
