import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, ClientPrincipal } from '../auth';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a routerLink="/products" routerLinkActive="is-active">
          <span>Products</span>
        </a>
        <a routerLink="/about" routerLinkActive="is-active">
          <span>About</span>
        </a>
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <a href="/.auth/logout?post_logout_redirect_uri=/login">Logout</a>
        <a href="/.auth/purge/github">Forget me</a>
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

  constructor(private authService: AuthService) {
    this.userInfo$ = this.authService.currentUser$;
  }
}
