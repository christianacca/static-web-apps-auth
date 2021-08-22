import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthConfig, IdentityProviderInteractiveSelectorService } from '@christianacca/angular-swa-auth';

@Component({
  selector: 'app-idp-selector-modal',
  template: `
    <div class="modal" [ngClass]="{ 'is-active': interactiveService.openPrompt$ | async }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ interactiveService.selectionOptions.isSignUp ? 'Sign-up' : 'Login' }}</p>
        </header>
        <app-idp-selector
          [providers]="config.identityProviders"
          (selected)="interactiveService.selectAndClose($event)"
          class="modal-card-body"
        ></app-idp-selector>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        (click)="interactiveService.selectAndClose(undefined)"
      ></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdpSelectorModalComponent {
  constructor(public config: AuthConfig, public interactiveService: IdentityProviderInteractiveSelectorService) {}
}
