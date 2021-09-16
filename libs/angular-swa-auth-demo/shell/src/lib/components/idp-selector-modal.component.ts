import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IdentityProviderInteractiveSelectorService } from '@christianacca/angular-swa-auth';

@Component({
  selector: 'app-idp-selector-modal',
  template: `
    <div *ngIf="svc.prompt$ | async as vm" class="modal" [ngClass]="{ 'is-active': vm.open }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ vm.selectionOptions.isSignUp ? 'Sign-up' : 'Login' }}</p>
        </header>
        <nav class="menu modal-card-body">
          <p class="menu-label">With:</p>
          <div class="menu-list">
            <a
              *ngFor="let provider of vm.selectionOptions.identityProviders"
              (click)="svc.selectAndClose(provider.id)"
              >{{ provider.name }}</a
            >
          </div>
        </nav>
      </div>
      <button class="modal-close is-large" aria-label="close" (click)="svc.selectAndClose(undefined)"></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdpSelectorModalComponent {
  constructor(public svc: IdentityProviderInteractiveSelectorService) {}
}
