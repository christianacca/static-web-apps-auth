import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IdentityProviderInfo } from '@christianacca/angular-swa-auth';

@Component({
  selector: 'app-idp-selector',
  template: `
    <p class="menu-label">With:</p>
    <div class="menu-list">
      <a *ngFor="let provider of providers" (click)="selected.next(provider.id)">{{ provider.name }}</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdpSelectorComponent {
  @Input() providers: IdentityProviderInfo[] = [];
  @Output() selected = new EventEmitter<string>();
  @HostBinding('class.menu') readonly hostClass = true;
}
