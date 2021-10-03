import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IdentityProviderInteractiveSelectorService, SwaAuthModule } from '@christianacca/angular-swa-auth';
import { ShellModule } from '@christianacca/angular-swa-auth-demo/shell';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { externalModules } from './build-specific';
import { routes } from './router';
import { AppStoreModule } from './store/store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    AppStoreModule,
    externalModules,
    SwaAuthModule.forRoot({
      sendSessionEventsToApi: true,
      identityProviderSelectorType: IdentityProviderInteractiveSelectorService,
      apiUrl: environment.API
    }),
    ShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
