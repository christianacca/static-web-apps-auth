import {IdentityProviderInfo, managedIdentityProviders} from './identity-provider';
import {Injectable, Type} from "@angular/core";
import {IdentityProviderSelectorService} from "./identity-provider-selector.service";

/**
 * Library configuration
 */
@Injectable({
    providedIn: 'root'
})
export class AuthConfig {
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

    static defaults = new AuthConfig();
}
