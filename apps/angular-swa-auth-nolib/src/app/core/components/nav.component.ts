import { Component, OnInit } from '@angular/core';
import { AuthService, ClientPrincipal } from '../auth';

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
        <a href="/.auth/logout?post_logout_redirect_uri=/login">Logout</a>
        <a href="/.auth/purge/github">Forget me</a>
      </div>
    </nav>
    <div class="user">
      <p>Welcome</p>
      <p>{{ userInfo.userDetails }}</p>
      <p>{{ userInfo.identityProvider }}</p>
    </div>
  `
})
export class NavComponent implements OnInit {
  userInfo!: ClientPrincipal;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.userInfo = await this.authService.userLoaded$.toPromise();
  }
}
