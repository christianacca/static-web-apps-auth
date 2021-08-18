import { Component, OnInit } from '@angular/core';
import { AuthService, ClientPrincipal } from '@ccacca/angular-swa-auth';

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
        <ng-container *ngIf="!userInfo; else logoutTpl">
          <ng-container *ngFor="let provider of providers">
            <a (click)="login(provider.id)">{{ provider.name }}</a>
          </ng-container>
        </ng-container>
        <ng-template #logoutTpl>
          <a (click)="logout()">Logout</a>
          <a (click)="purge()">Forget me</a>
        </ng-template>
      </div>
    </nav>
    <div class="user" *ngIf="userInfo">
      <p>Welcome</p>
      <p>{{ userInfo?.userDetails }}</p>
      <p>{{ userInfo?.identityProvider }}</p>
    </div>
  `
})
export class NavComponent implements OnInit {
  userInfo!: ClientPrincipal | null;
  providers = this.authService.identityProviders;

  private redirectUrl = '/about';

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.userInfo = await this.authService.userLoaded$.toPromise();
  }

  login(identityProvider: string) {
    this.authService.login({ identityProvider, redirectUrl: this.redirectUrl });
  }

  logout() {
    this.authService.logout(this.redirectUrl);
  }

  purge() {
    this.authService.purge();
  }
}
