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
  /**
   * An instance of the default configuration for the library
   */
  static defaults = new AuthConfig();

  /**
   * The relative url path of this app's functions api
   */
  apiUrl = 'api';

  /**
   * The identity providers available to login with. Defaults to the list of managed idp provided by azure
   * static web apps service
   * @see {managedIdentityProviders}
   */
  identityProviders: IdentityProviderInfo[] = Object.values(managedIdentityProviders);
  /**
   * The service that will select the identity provider to login with. Defaults to
   * a service that will select the first entry from `identityProviders`
   */
  identityProviderSelectorType?: Type<IdentityProviderSelectorService>;
  /**
   * Trigger login flow when there is an unauthorized response from your functions app api.
   */
  loginOnUnauthorizedApiRequests = true;
  /**
   * The relative url of your functions app api endpoint to send the authentication session events
   */
  sessionEventsApiUrl = '/api/authevents';
  /**
   * Send authentication session events to your functions app api?
   */
  sendSessionEventsToApi = false;

  /**
   * Return a clone of the current instance overriding the current fields using the `values` supplied
   * @param values Override values
   */
  with(values: Partial<AuthConfig>) {
    return {
      ...this,
      ...values,
      availableIdentityProviders: values.identityProviders ?? this.identityProviders
    };
  }
}
