import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  IdentityProviderSelectionOptions,
  IdentityProviderSelectorService
} from './identity-provider-selector.service';

/**
 * An implementation of `IdentityProviderSelectorService` that orchestrates the UI workflow of showing to the user a
 * list of identity providers to select when logging in or signing up.
 *
 * @example
 * ```ts
 * // your UI prompt component. EG...
 * @Component({
 *  selector: 'app-idp-selector-modal',
 *  template: `
 *    <div class="modal" [ngClass]="{ 'is-active': interactiveService.openPrompt$ | async }">
 *      <div class="modal-background"></div>
 *      <div class="modal-card">
 *        <header class="modal-card-head">
 *          <p class="modal-card-title">{{ interactiveService.selectionOptions.isSignUp ? 'Sign-up' : 'Login' }}</p>
 *        </header>
 *        <app-idp-selector
 *          [providers]="config.identityProviders"
 *          (selected)="interactiveService.selectAndClose($event)"
 *          class="modal-card-body"
 *        ></app-idp-selector>
 *      </div>
 *      <button
 *        class="modal-close"
 *        aria-label="close"
 *        (click)="interactiveService.selectAndClose(undefined)"
 *      ></button>
 *    </div>
 *  `,
 *  changeDetection: ChangeDetectionStrategy.OnPush
 * })
 * export class IdpSelectorModalComponent {
 *  constructor(public config: AuthConfig, public interactiveService: IdentityProviderInteractiveSelectorService) {}
 * }
 *
 * // app.component.ts...
 * @Component({
 *  selector: 'app-root',
 *  template: `
 *    <app-idp-selector-modal></app-idp-selector-modal>
 *    <router-outlet></router-outlet>
 *  `
 * })
 * export class AppComponent {}
 *
 * // app.module.ts...
 * imports: [
 *   AuthModule.forRoot({
 *     identityProviderSelectorType: IdentityProviderInteractiveSelectorService
 *   })
 * ]
 * ```
 */
@Injectable()
export class IdentityProviderInteractiveSelectorService implements IdentityProviderSelectorService {
  private openPrompt = new BehaviorSubject<boolean>(false);
  /**
   * An observable that will emit true/false and should be used to show/hide a prompt asking the user
   * to select from the configured li st of identity providers
   */
  openPrompt$ = this.openPrompt.asObservable();

  /**
   * The salient options that were passed to the `AuthService.login` method
   */
  selectionOptions: IdentityProviderSelectionOptions = {};

  private selected = new Subject<string | undefined>();

  /**
   * Called with the users selection of identity provider to cause the prompt to close
   * @param identityProvider Identity Provider that was selected or `undefined` to indicate the user cancelled the login
   */
  selectAndClose(identityProvider: string | undefined) {
    this.openPrompt.next(false);
    this.selected.next(identityProvider);
  }

  selectIdentityProvider(options: IdentityProviderSelectionOptions): Observable<string | undefined> {
    this.selectionOptions = options;
    this.openPrompt.next(true);
    return this.selected.pipe(take(1));
  }
}
