import { Component } from '@angular/core';
import {AuthService} from '@ccacca/angular-swa-auth';

@Component({
  selector: 'ccacca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-swa-auth-demo';
  user$ = this.authService.userLoaded$;
  constructor(private authService: AuthService) {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
