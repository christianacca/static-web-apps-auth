import { Component } from '@angular/core';
import { AuthService, ClientPrincipal } from '@christianacca/angular-swa-auth';
import { RoutePermissions } from '@christianacca/demo-app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu" *swaRoleCheck="let canAdmin of routePermissions.adminArea; let maybeCanAdmin = isPlaceholder">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a routerLink="/products" routerLinkActive="is-active">
          <span>Products</span>
        </a>
        <a routerLink="/admin-area" routerLinkActive="is-active">
          <progress *ngIf="maybeCanAdmin" class="progress is-primary is-medium" max="100">15%</progress>
          <span *ngIf="!maybeCanAdmin" [ngClass]="!canAdmin ? 'has-text-grey-lighter' : ''">Admin Area</span>
        </a>
        <a routerLink="/about" routerLinkActive="is-active">
          <span>About</span>
        </a>
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <ng-container *ngIf="userInfo$ | async as user; else loginTpl">
          <a (click)="logout()">Logout</a>
          <a (click)="purge()">Forget me</a>
        </ng-container>
        <ng-template #loginTpl>
          <a (click)="login()">Login</a>
          <a (click)="signUp()">Sign Up?</a>
        </ng-template>
      </div>
    </nav>
    <div class="user" *ngIf="userInfo$ | async as user">
      <p>Welcome</p>
      <p>{{ user.userDetails }}</p>
      <p>{{ user.identityProvider }}</p>
    </div>
  `
})
export class NavComponent {
  routePermissions = RoutePermissions;
  userInfo$: Observable<ClientPrincipal | null>;

  private redirectUrl = '/about';

  constructor(private authService: AuthService) {
    this.userInfo$ = this.authService.userLoaded$;
  }

  async login() {
    await this.authService.login({ redirectUrl: this.redirectUrl });
  }

  async logout() {
    await this.authService.logout(this.redirectUrl);
  }

  async purge() {
    await this.authService.purge();
  }

  async signUp() {
    await this.authService.login({ isSignUp: true, redirectUrl: this.redirectUrl });
  }
}
