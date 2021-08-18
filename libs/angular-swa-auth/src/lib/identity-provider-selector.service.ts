import { forwardRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthConfig } from './auth-config';

/**
 * Selects the identity provider that should be logged in with
 */
@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => FirstIdentityProviderSelectorService)
})
export abstract class IdentityProviderSelectorService {
  /**
   * Return the id of the identity provider that will be used to login or `undefined` to cancel the login flow
   */
  abstract selectIdentityProvider(): Observable<string | undefined>;
}

/**
 * The default implementation of `IdentityProviderSelectorService` that will select the first entry
 * from `AuthConfig.identityProviders`
 */
@Injectable()
export class FirstIdentityProviderSelectorService implements IdentityProviderSelectorService {
  constructor(private config: AuthConfig) {}

  selectIdentityProvider(): Observable<string | undefined> {
    return of(this.config.identityProviders[0]?.id);
  }
}
