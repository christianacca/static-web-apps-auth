import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AutoLoginHttpInterceptor} from './auto-login-http-interceptor.service';
import {AuthConfig} from './auth-config';
import {authEventInitializerProvider} from './auth-event-initializer.provider';
import {IdentityProviderSelectorService} from './identity-provider-selector.service';

@NgModule()
export class AngularSwaAuthModule {
  static forRoot(config?: Partial<AuthConfig>): ModuleWithProviders<AngularSwaAuthModule> {
    const idpSelectorProvider = config?.identityProviderSelectorType != null ? [
      { provide: IdentityProviderSelectorService, useClass: config.identityProviderSelectorType }
    ] : [];
    const providers = [
      { provide: HTTP_INTERCEPTORS, useClass: AutoLoginHttpInterceptor, multi: true },
      authEventInitializerProvider,
      idpSelectorProvider,
      config ? [{
        provide: AuthConfig,
        useValue: AuthConfig.defaults.with(config)
      }] : []
    ];
    return {
      ngModule: AngularSwaAuthModule,
      providers
    };
  }
}
