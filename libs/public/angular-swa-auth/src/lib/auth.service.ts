import { Injectable } from '@angular/core';
import { defer, Observable, of, Subject } from 'rxjs';
import { first, map, mergeMap, shareReplay, take, tap } from 'rxjs/operators';
import { AuthConfig } from './auth-config';
import { AuthEvent } from './auth-event';
import { ClientPrincipal } from './client-principal';
import { hasSomeAllowedRoles } from './has-some-allowed-roles';
import { IdentityProviderSelectorService } from './identity-provider-selector.service';
import { StorageService } from './storage.service';

/**
 * @ignore
 */
interface AuthResponseData {
  clientPrincipal: ClientPrincipal | null;
}

/**
 * The shape for an allowed (aka required) role
 */
export type AllowedRole = string | AllowedRole[];

/**
 * Options that control the behaviour when purging user information
 */
export interface PurgeOptions {
  /**
   * Purge the data for all applications (defaults to just this application)?
   */
  globally?: boolean;
}

/**
 * Options that control the login behaviour
 */
export interface LoginOptions {
  /**
   * The identity provider to login with.
   * Defaults to the first entry in `AuthConfig.identityProviders`. This can be customized by
   * registering your own `IdentityProviderSelectorService`
   * @example
   * ```ts
   * // app.module...
   * imports: [
   *   AuthModule.forRoot({
   *     identityProviderSelectorType: YourIdentityProviderSelectorService
   *   })
   * ]
   * ```
   */
  identityProvider?: string;
  /**
   * The client-side url to redirect to after the user has been authenticated
   */
  redirectUrl?: string;
  /**
   * Is this a sign-up request or no? (defaults to `false`)
   */
  isSignUp?: boolean;
}

/**
 * @ignore
 */
const noExplicitRoles: string[] = [];
/**
 * @ignore
 */
const storageKeyPrefix = 'angular_swa_auth';

/**
 * @ignore
 */
const signingUpFlagKey = `${storageKeyPrefix}_signing_up`;

/**
 * The main service for working with authenticated users
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Return the current authenticated user or `null` when the user is not authenticated.
   *
   * The first subscriber will trigger a fetch from the built-in user api endpoint. Late subscribers will then receive
   * the last value emitted.
   *
   */
  currentUser$: Observable<ClientPrincipal | null>;

  /**
   * The identity providers available to login with.
   * Note: This is just a convenient alias of `AuthConfig.identityProviders`
   */
  readonly identityProviders = this.config.identityProviders;

  /**
   * Return whether the user is authenticated.
   *
   * This status will NOT be re-evaluated if the `userLoaded$`'s
   * authenticated session expires
   *
   */
  isAuthenticated$: Observable<boolean>;

  protected sessionEvents = new Subject<AuthEvent>();
  /**
   * Authentication session events as they occur
   */
  sessionEvents$ = this.sessionEvents.asObservable();

  private currentIdp$: Observable<string | undefined>;

  constructor(
    private config: AuthConfig,
    private storage: StorageService,
    private idpSelectorService: IdentityProviderSelectorService
  ) {
    this.currentUser$ = defer(() => this.httpGet<AuthResponseData>('/.auth/me')).pipe(
      map(resp => resp.clientPrincipal),
      tap(user => {
        if (user) {
          this.publishAuthenticatedSuccessEvents(user);
        }
      }),
      shareReplay({ bufferSize: 1, refCount: false })
    );

    this.isAuthenticated$ = this.currentUser$.pipe(
      map(user => !!user),
      shareReplay({ bufferSize: 1, refCount: false })
    );

    this.currentIdp$ = this.currentUser$.pipe(map(user => user?.identityProvider));
  }

  /**
   * Ensure that login has already occurred and therefore the user object is loaded.
   * Where login has not already occurred, then initiate the login flow.
   *
   * IMPORTANT: when login has not already occurred, the browser will be redirected to the IDP
   *
   * @param targetUrl The client-side url to redirect to after the user has been authenticated
   * @returns `true` when login has already occurred, `false` otherwise
   * @see `login`
   */
  async ensureLoggedIn(targetUrl?: string): Promise<boolean> {
    const user = await this.currentUser$.pipe(first()).toPromise();
    if (user) {
      return true;
    }

    await this.login({ redirectUrl: targetUrl });
    return false;
  }

  /**
   * Does the current user have one or more of the `allowedRoles` supplied.
   *
   * Note: because the observable returned completes, consumers do NOT have to unsubscribe from it
   *
   * @param allowedRoles The list of roles to check
   * @return {Observable<boolean>} an observable that returns true/false and then completes
   */
  hasSomeRoles$(allowedRoles: AllowedRole[]) {
    return this.currentUser$.pipe(
      map(user => hasSomeAllowedRoles(allowedRoles, user?.userRoles ?? noExplicitRoles)),
      take(1)
    );
  }

  /**
   * Trigger the login flow, redirecting the browser to the identity provider.
   * @param options The options that control the login behaviour
   * @returns {boolean} false when the identity provider to login with is not selected, true otherwise
   */
  async login(options: LoginOptions = {}): Promise<boolean> {
    const idp = options.identityProvider ?? (await this.selectIdentityProvider(options).toPromise());

    if (!idp) {
      return false;
    }

    const redirectUrl = options.redirectUrl ? window.location.origin + options.redirectUrl : undefined;
    const idpUrl = `${window.location.origin}/.auth/login/${idp}`;
    this.redirectToIdentityProvider(redirectUrl ? `${idpUrl}?post_login_redirect_uri=${redirectUrl}` : idpUrl);

    if (options.isSignUp) {
      this.setSigningUpFlag();
    }

    return true;
  }

  /**
   * Trigger the logout flow. This is a no-op when the user is not already authenticated
   * @param redirectUrl The url to redirect to after the user has been logged out
   * @returns {boolean} false when the user is not already authenticated, true otherwise
   */
  async logout(redirectUrl?: string): Promise<boolean> {
    const user = await this.currentUser$.toPromise();
    if (!user) {
      return false;
    }

    const idpUrl = `${window.location.origin}/.auth/logout`;
    this.redirectToIdentityProvider(redirectUrl ? `${idpUrl}?post_logout_redirect_uri=${redirectUrl}` : idpUrl);

    this.sessionEvents.next(AuthEvent.logout(user));

    return true;
  }

  /**
   * Purge user consent information stored at the identity provider for the currently authenticated user.
   * This is a no-op when the user is not already authenticated.
   * IMPORTANT: this will redirect the browser, landing back at the base url for the application
   * @param options The options that control the purge behaviour
   * @returns {boolean} false when the user is authenticated, true otherwise
   */
  async purge(options: PurgeOptions = {}): Promise<boolean> {
    const user = await this.currentUser$.toPromise();
    if (!user) {
      return false;
    }

    const host = options.globally ? 'identity.azurestaticapps.net' : window.location.origin;
    this.redirectToIdentityProvider(`${host}/.auth/purge/${user.identityProvider}`);

    this.sessionEvents.next(AuthEvent.purge(user));

    return true;
  }

  /**
   * Http implementation to perform a GET request to fetch json. The default implementation uses the
   * `fetch` browser api
   * @param url the url of http json endpoint
   */
  protected httpGet<T>(url: string): Promise<T> | Observable<T> {
    // note: we're using fetch api rather than angular `HttpClient` so that an app is not forced to take a
    // dependency on `HttpClientModule` which it might not need
    return fetch(url).then(resp => resp.json());
  }

  /**
   * Initiate the browser redirect to azure static web apps auth html endpoints
   * @param url The full url of the auth html endpoint to redirect the browser to
   */
  protected redirectToIdentityProvider(url: string) {
    window.location.href = url;
  }

  protected setSigningUpFlag() {
    this.storage.setItem(signingUpFlagKey, '1');
  }

  protected popSigningUpFlag() {
    return !!this.storage.popItem(signingUpFlagKey);
  }

  private publishAuthenticatedSuccessEvents(user: ClientPrincipal) {
    this.sessionEvents.next(AuthEvent.login(user));
    if (this.popSigningUpFlag()) {
      this.sessionEvents.next(AuthEvent.signUp(user));
    }
  }

  private selectIdentityProvider({ isSignUp }: LoginOptions): Observable<string | undefined> {
    const options = {
      isSignUp,
      identityProviders: this.identityProviders
    };
    return this.currentIdp$.pipe(
      mergeMap(idp => (idp ? of(idp) : this.idpSelectorService.selectIdentityProvider(options)))
    );
  }
}
