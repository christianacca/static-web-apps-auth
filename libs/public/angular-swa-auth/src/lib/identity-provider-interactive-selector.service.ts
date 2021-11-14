import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  IdentityProviderSelectionOptions,
  IdentityProviderSelectorService
} from './identity-provider-selector.service';

/**
 * @ignore
 */
export interface IdentityProviderPromptContext {
  selectionOptions: IdentityProviderSelectionOptions;
  open: boolean;
}

/**
 * An implementation of `IdentityProviderSelectorService` that orchestrates the UI workflow of showing to the user a
 * list of identity providers to select when logging in or signing up.
 *
 * @example
 * ```ts
 * // your UI prompt component. EG...
 * import { IdentityProviderInteractiveSelectorService } from '@christianacca/angular-swa-auth';
 *
 * @Component({
 *   selector: 'app-idp-selector-modal',
 *   template: `
 *     <div *ngIf="svc.prompt$ | async as vm" class="modal" [ngClass]="{ 'is-active': vm.open }">
 *       <div class="modal-background"></div>
 *       <div class="modal-card">
 *         <header class="modal-card-head">
 *           <p class="modal-card-title">{{ vm.selectionOptions.isSignUp ? 'Sign-up' : 'Login' }}</p>
 *         </header>
 *         <nav class="menu modal-card-body">
 *           <p class="menu-label">With:</p>
 *           <div class="menu-list">
 *             <a
 *               *ngFor="let provider of vm.selectionOptions.identityProviders"
 *               (click)="svc.selectAndClose(provider.id)"
 *              >{{ provider.name }}</a
 *             >
 *           </div>
 *         </nav>
 *       </div>
 *       <button class="modal-close is-large" aria-label="close" (click)="svc.selectAndClose(undefined)"></button>
 *     </div>
 *   `,
 *   changeDetection: ChangeDetectionStrategy.OnPush
 * })
 *  export class IdpSelectorModalComponent {
 *   constructor(public svc: IdentityProviderInteractiveSelectorService) {}
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
  private prompt = new BehaviorSubject<IdentityProviderPromptContext>({
    open: false,
    selectionOptions: {
      identityProviders: []
    }
  });

  /**
   * An observable that will emit true/false and should be used to show/hide a prompt asking the user
   * to select from the configured li st of identity providers
   */
  prompt$ = this.prompt.asObservable();

  private selected = new Subject<string | undefined>();

  /**
   * Called with the users selection of identity provider to cause the prompt to close
   * @param identityProvider Identity Provider that was selected or `undefined` to indicate the user cancelled the login
   */
  selectAndClose(identityProvider: string | undefined) {
    this.prompt.next({ ...this.prompt.value, open: false });
    this.selected.next(identityProvider);
  }

  selectIdentityProvider(options: IdentityProviderSelectionOptions): Observable<string | undefined> {
    this.prompt.next({ selectionOptions: options, open: true });
    return this.selected.pipe(take(1));
  }
}
