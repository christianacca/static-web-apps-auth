// noinspection AngularMissingOrInvalidDeclarationInModule

import { Component, Input } from '@angular/core';

/**
 * Once Storybook docs tab is fixed delete this component
 * @ignore
 */
@Component({
  selector: 'swa-fake',
  template: `
    <h2><strong>Manaul workaround to story 'Show Code' not working</strong></h2>
    <ol>
      <li>Select Docs tab, then select inside the Control value 'click me', then select 'Show Code'</li>
      <li>
        Now go back to <code>SwaRoleCheckDirective</code> stories and do the same with a Control value- you should now
        see the code
      </li>
    </ol>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 10px;
      }
    `
  ]
})
export class FakeComponent {
  @Input() whatever = ['ignore'];
}
