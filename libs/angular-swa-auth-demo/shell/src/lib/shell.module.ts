import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwaAuthModule } from '@christianacca/angular-swa-auth';
import { HeaderBarBrandComponent, HeaderBarComponent, IdpSelectorModalComponent, NavComponent } from './components';
import {
  AboutComponent,
  AdminLandingComponent,
  CONTAINERS,
  NotFoundComponent,
  ShellComponent,
  UnauthorizedComponent
} from './containers';

const PUBLIC_COMPONENTS = [IdpSelectorModalComponent, HeaderBarComponent, NavComponent];
const PRIVATE_COMPONENTS = [HeaderBarBrandComponent];

@NgModule({
  imports: [CommonModule, SwaAuthModule, RouterModule],
  declarations: [PRIVATE_COMPONENTS, PUBLIC_COMPONENTS, CONTAINERS],
  exports: [PUBLIC_COMPONENTS]
})
export class ShellModule {}

// make public (ie available outside of this library)...
export { AboutComponent, AdminLandingComponent, NotFoundComponent, ShellComponent, UnauthorizedComponent };
