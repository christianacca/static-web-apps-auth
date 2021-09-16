import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: ` <p>product-stats works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStatsComponent {}
