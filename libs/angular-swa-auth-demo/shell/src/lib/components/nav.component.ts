import { Component, HostBinding } from '@angular/core';
import { AuthService, ClientPrincipal, managedIdentityProviders } from '@christianacca/angular-swa-auth';
import { RoutePermissions } from '@christianacca/angular-swa-auth-demo/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  template: `
    <ng-container>
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <li>
          <a routerLink="/products" routerLinkActive="is-active">
            <span>Products</span>
          </a>
        </li>
        <li *swaRoleCheck="let canOffer of routePermissions.offers; let maybeCanOffer = isPlaceholder">
          <a routerLink="/offers" routerLinkActive="is-active">
            <progress *ngIf="maybeCanOffer" class="progress is-primary is-medium" max="100" title="Offers">
              15%
            </progress>
            <span *ngIf="!maybeCanOffer" [ngClass]="!canOffer ? 'has-text-grey-lighter' : ''">Offers</span>
          </a>
        </li>
        <li *swaRoleCheck="let canAdmin of routePermissions.adminArea; let maybeCanAdmin = isPlaceholder">
          <a routerLink="/admin-area/landing" routerLinkActive="is-active">
            <progress *ngIf="maybeCanAdmin" class="progress is-primary is-medium" max="100" title="Admin Area">
              15%
            </progress>
            <span *ngIf="!maybeCanAdmin" [ngClass]="!canAdmin ? 'has-text-grey-lighter' : ''">Admin Area</span>
          </a>
        </li>
        <li>
          <a routerLink="/user-profile" routerLinkActive="is-active">
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <a routerLink="/about" routerLinkActive="is-active">
            <span>About</span>
          </a>
        </li>
      </ul>
      <p class="menu-label">Auth</p>
      <ul class="menu-list">
        <ng-container *ngIf="userInfo$ | async as user; else loginTpl">
          <li><a role="button" (click)="logout()">Logout</a></li>
          <li><a role="button" (click)="purge()">Forget me</a></li>
        </ng-container>
        <ng-template #loginTpl>
          <li><a role="button" (click)="login()" data-testid="login">Login</a></li>
          <li><a role="button" (click)="signUp()">Sign Up?</a></li>
          <li class="sub-menu">
            <p class="menu-label">Auth With {{ identityProviders.github.name }}</p>
            <ul>
              <li>
                <a role="button" (click)="login(identityProviders.github.id)" data-testid="login-with-github">Login</a>
              </li>
            </ul>
          </li>
        </ng-template>
      </ul>
    </ng-container>
    <div class="user" *ngIf="userInfo$ | async as user" data-testid="user">
      <p>Welcome</p>
      <p>{{ user.userDetails }}</p>
      <p>{{ user.identityProvider }}</p>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class NavComponent {
  identityProviders = managedIdentityProviders;
  routePermissions = RoutePermissions;
  userInfo$: Observable<ClientPrincipal | null>;

  @HostBinding('class.menu') readonly hostClass = 'menu';
  @HostBinding('attr.role') readonly role = 'navigation';
  @HostBinding('attr.aria-label') readonly roleLabel = 'Main menu';

  private redirectUrl = '/about';

  constructor(private authService: AuthService) {
    this.userInfo$ = this.authService.currentUser$;
  }

  async login(identityProvider?: string) {
    await this.authService.login({ redirectUrl: this.redirectUrl, identityProvider });
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
