import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthConfig } from './auth-config';
import { AuthService } from './auth.service';

/**
 * Add to a route to perform an authorization check using roles defined in Status Web App.
 *
 * Implements `CanActivate` to verify that the current user is a member of one or more roles
 * as defined in an `allowedRoles` field on `Route.data` for the route about to be navigated to
 *
 * Where the user is deemed unauthorized the SPA will be routed to the client-side route configured
 * using {@link AuthConfig.unauthorizedRoute}
 *
 * @example
 * ```ts
 * export const routes: Routes = [
 *   {
 *     path: 'admin-page',
 *     data: {
 *       allowedRoles: 'admin' // or ['admin',]
 *     },
 *     canActivate: [SwaRoleGuard],
 *     component: AdminComponent
 *   }
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class SwaRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private config: AuthConfig) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data['allowedRoles'];
    if (!roles) {
      return true;
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    return this.authService.hasSomeRoles$(allowedRoles).pipe(
      map(isAuthorized => isAuthorized || this.router.parseUrl(this.config.unauthorizedRoute)),
      take(1)
    );
  }
}
