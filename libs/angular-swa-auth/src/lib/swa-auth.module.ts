import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthConfig } from './auth-config';
import { authEventInitializerProvider } from './auth-event-initializer.provider';
import { AutoLoginHttpInterceptor } from './auto-login-http-interceptor.service';
import { IdentityProviderSelectorService } from './identity-provider-selector.service';

@NgModule()
export class SwaAuthModule {
  static forRoot(config?: Partial<AuthConfig>): ModuleWithProviders<SwaAuthModule> {
    const finalConfigs = config ? AuthConfig.defaults.with(config) : AuthConfig.defaults;
    const idpSelectorProvider =
      finalConfigs.identityProviderSelectorType != null
        ? [{ provide: IdentityProviderSelectorService, useClass: finalConfigs.identityProviderSelectorType }]
        : [];
    const autoLoginInterceptorProvider = finalConfigs.loginOnUnauthorizedApiRequests
      ? [{ provide: HTTP_INTERCEPTORS, useClass: AutoLoginHttpInterceptor, multi: true }]
      : [];
    const providers = [
      autoLoginInterceptorProvider,
      authEventInitializerProvider,
      idpSelectorProvider,
      { provide: AuthConfig, useValue: finalConfigs }
    ];
    return {
      ngModule: SwaAuthModule,
      providers
    };
  }
}
