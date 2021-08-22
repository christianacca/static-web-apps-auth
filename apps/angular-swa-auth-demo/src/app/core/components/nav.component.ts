import { Component } from '@angular/core';
import { AuthService, ClientPrincipal } from '@ccacca/angular-swa-auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a routerLink="/products" routerLinkActive="router-link-active">
          <span>Products</span>
        </a>
        <a routerLink="/about" routerLinkActive="router-link-active">
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
  userInfo$: Observable<ClientPrincipal | null>;

  private redirectUrl = '/about';

  constructor(private authService: AuthService) {
    this.userInfo$ = this.authService.userLoaded$;
  }

  login() {
    this.authService.login({ redirectUrl: this.redirectUrl });
  }

  logout() {
    this.authService.logout(this.redirectUrl);
  }

  purge() {
    this.authService.purge();
  }

  signUp() {
    this.authService.login({ isSignUp: true, redirectUrl: this.redirectUrl });
  }
}
