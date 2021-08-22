import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthConfig } from './auth-config';
import { IdentityProviderSelectorService } from './identity-provider-selector.service';

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
