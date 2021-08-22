import { forwardRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginOptions } from './auth.service';
import { FirstIdentityProviderSelectorService } from './first-identity-provider-selector.service';

/**
 * Options that are useful to present in any prompt displayed to the user when required to select an identity provider
 */
export type IdentityProviderSelectionOptions = Pick<LoginOptions, 'isSignUp'>;

/**
 * Selects the identity provider that should be logged in with.
 * Register your own instance of this class if you do not want to use default service
 * (`FirstIdentityProviderSelectorService`)
 *
 * @example
 * ```ts
 * // identity-provider-prompt.service.ts
 * @Injectable()
 * export class IdentityProviderPromptService implements IdentityProviderSelectorService {
 *
 *   constructor(private config: AuthConfig) { }
 *
 *   selectIdentityProvider(): Observable<string | undefined> {
 *     const idp = this.config.identityProviders[0];
 *     const ok = idp && confirm(`Sign-in with ${idp.name}`);
 *     return of(ok ? idp.id : undefined);
 *   }
 * }
 *
 * // app.module.ts...
 * imports: [
 *   AuthModule.forRoot({
 *     identityProviderSelectorType: IdentityProviderPromptService
 *   })
 * ]
 * ```
 */
@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => FirstIdentityProviderSelectorService)
})
export abstract class IdentityProviderSelectorService {
  /**
   * Return the id of the identity provider that will be used to login or `undefined` to cancel the login flow
   */
  abstract selectIdentityProvider(options: IdentityProviderSelectionOptions): Observable<string | undefined>;
}
