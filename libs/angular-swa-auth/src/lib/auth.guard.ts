import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Route guard that will ensure the user is authenticated before allowing the navigation to that route
 * Where the user is not yet authenticated, trigger the login flow.
 * @see { AuthService.ensureLoggedIn}
 * @example
 * ```ts
 * export const routes: Routes = [
 *   { path: '', pathMatch: 'full', redirectTo: 'secure-page' },
 *   { path: 'secure-page', component: SecurePageComponent, canActivate: [AuthGuard] }
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.ensureLoggedIn(state.url);
  }
}
