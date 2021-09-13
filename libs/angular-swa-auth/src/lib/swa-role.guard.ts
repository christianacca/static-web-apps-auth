import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Data,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthConfig } from './auth-config';
import { AllowedRole, AuthService } from './auth.service';

/**
 * Add to a route to perform an authorization check using roles defined in Status Web App.
 *
 * Implements `CanLoad` for use with lazy loaded routes and `CanActivate` for regular routes.
 *
 * Will first trigger the sign in flow when the user is not already authenticated. Then verifies
 * that the user is a member of one or more {@link AllowedRole}'s as defined in an `allowedRoles`
 * field on `Route.data` for the route about to be navigated to.
 *
 * Where the user is deemed unauthorized the SPA will be routed to the client-side route configured
 * using {@link AuthConfig.unauthorizedRoute}
 *
 * @see {AuthService.hasSomeRoles$}
 *
 * @example
 * ```ts
 * export const routes: Routes = [
 *   {
 *     path: 'product-admin',
 *     data: {
 *       allowedRoles: 'admin' // other ex: ['admin', 'owner']  ['admin', ['product-reader', 'owner']]
 *     },
 *     canActivate: [SwaRoleGuard],
 *     component: AdminComponent
 *   },
 *   {
 *     path: 'user-admin',
 *     data: {
 *       allowedRoles: 'owner'
 *     },
 *     canLoad: [SwaRoleGuard],
 *     loadChildren: () => import('@christianacca/demo-app/user-admin').then(m => m.UserAdminModule)
 *   }
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class SwaRoleGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router, private config: AuthConfig) {}

  private static getAllowedRoles(route: { data?: Data }): AllowedRole[] | undefined {
    const roles = route.data?.allowedRoles;
    if (!roles) {
      return undefined;
    }
    return Array.isArray(roles) ? roles : [roles];
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ensureHasRouteRoles(route, state.url);
  }

  canLoad(route: Route) {
    const navigation = this.router.getCurrentNavigation();
    const targetUrl = !navigation ? '/' : navigation.extractedUrl.toString();
    return this.ensureHasRouteRoles(route, targetUrl);
  }

  private ensureHasRouteRoles(route: { data?: Data }, targetUrl: string): Observable<boolean | UrlTree> | boolean {
    // Q: why are we calling `ensureLoggedIn` below?
    // A: Angular will execute CanLoad guards BEFORE CanActivate guards
    // Therefore this guard runs BEFORE the AuthGuard. As a consequence, this guard also
    // needs to trigger the login flow.

    const allowedRoles = SwaRoleGuard.getAllowedRoles(route);
    if (!allowedRoles) {
      return true;
    }
    const isLoggedIn$ = from(this.authService.ensureLoggedIn(targetUrl));
    return isLoggedIn$.pipe(
      switchMap(isLoggedIn => {
        if (!isLoggedIn) {
          // the user cancelled login prompt
          return of(false);
        }
        return this.ensureHasSomeRoles(allowedRoles);
      })
    );
  }

  private ensureHasSomeRoles(allowedRoles: AllowedRole[]) {
    return this.authService
      .hasSomeRoles$(allowedRoles)
      .pipe(map(isAuthorized => isAuthorized || this.router.parseUrl(this.config.unauthorizedRoute)));
  }
}
