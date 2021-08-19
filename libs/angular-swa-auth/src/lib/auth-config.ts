import { Injectable, Type } from '@angular/core';
import { IdentityProviderInfo, managedIdentityProviders } from './identity-provider';
import { IdentityProviderSelectorService } from './identity-provider-selector.service';

/**
 * Library configuration
 */
@Injectable({
  providedIn: 'root'
})
export class AuthConfig {
  static defaults = new AuthConfig();

  /**
   * The relative url path of this app's functions api (defaults to `api`)
   */
  apiUrl = 'api';

  /**
   * The identity providers available to login with. Defaults to the list of managed idp
   * @see {managedIdentityProviders}
   */
  identityProviders: IdentityProviderInfo[] = Object.values(managedIdentityProviders);
  /**
   * The service that will select the identity provider to login with. Defaults to
   * a service that will select the first entry from `identityProviders`
   */
  identityProviderSelectorType?: Type<IdentityProviderSelectorService>;
  /**
   * Trigger login flow when there is an unauthorized response from the api. Defaults to `true`
   *
   * Set this to false if you do not have a backend api and/or you don't use angular HttpClient. That way you
   * reduce your bundle size as you won't take a dependency on the angular `HttpClientModule`
   */
  loginOnUnauthorizedApiRequests = true;
  /**
   * Api endpoint to send authentication session events
   */
  sessionEventsApiUrl = '/api/authevents';
  /**
   * Send authentication session events to api? Defaults to `false`
   */
  sendSessionEventsToApi = false;

  with(values: Partial<AuthConfig>) {
    return {
      ...this,
      ...values,
      availableIdentityProviders: values.identityProviders ?? this.identityProviders
    };
  }
}
