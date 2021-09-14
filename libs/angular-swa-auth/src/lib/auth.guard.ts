import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Add to a route to trigger the sign in flow when the user is not already authenticated
 *
 * Implements `CanLoad` for use with lazy loaded routes and `CanActivate` for regular routes.
 *
 * @see { AuthService.ensureLoggedIn }
 * @example
 * ```ts
 * export const routes: Routes = [
 *   { path: 'secure-page', component: SecurePageComponent, canActivate: [AuthGuard] },
 *   {
 *     path: 'product',
 *     canLoad: [AuthGuard],
 *     loadChildren: () => import('@christianacca/demo-app/product-admin').then(m => m.ProductAdminModule)
 *   },
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.ensureLoggedIn(state.url);
  }

  canLoad(/* route: Route, segments: UrlSegment[] */): Promise<boolean> {
    const navigation = this.router.getCurrentNavigation();
    const targetUrl = !navigation ? '/' : navigation.extractedUrl.toString();
    return this.authService.ensureLoggedIn(targetUrl);
  }
}
