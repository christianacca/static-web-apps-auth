# @christianacca/angular-swa-auth

Programmatically work with Azure Static Web Apps authentication in an angular app

## Features

- an [`AuthService`](https://docs.angular-swa-auth.codingdemo.co.uk/injectables/AuthService.html) facade
  - methods to programmatically trigger sign-in, sign-up, sign-out and purge flows
  - exposes convenient observables to allow your app to examine and/or react to current user and authentication session events
  - optionally send authentication session events to your functions app
- [`AuthGuard`](https://docs.angular-swa-auth.codingdemo.co.uk/guards/AuthGuard.html)
  - add to a route to trigger the sign in flow when the user is not already authenticated
- [`SwaRoleGuard`](https://docs.angular-swa-auth.codingdemo.co.uk/guards/SwaRoleGuard.html)
  - add to a route to perform an authorization check using roles defined in Status Web App
- [`SwaRoleCheckDirective`](https://docs.angular-swa-auth.codingdemo.co.uk/directives/SwaRoleCheckDirective.html)
  - structural directive to perform an authorization check using roles defined in Status Web App
- [`AutoLoginHttpInterceptor`](https://docs.angular-swa-auth.codingdemo.co.uk/interceptors/AutoLoginHttpInterceptor.html)
  - triggers the sign in flow when your functions api return an unauthenticated (401) response
- convenient types and values representing the authenticated user and identity providers
- configure the list of identity providers that should be available to your users to sign in with
- [`IdentityProviderInteractiveSelectorService`](https://docs.angular-swa-auth.codingdemo.co.uk/injectables/IdentityProviderInteractiveSelectorService.html)
  - utility service that can be used to build a UI to prompt the user to select an identity provider
  
## When to use this library?

Depending on your use case you might not need this library at all. You likely do NOT need this library if your requirements are simple:
* Your angular app is ONLY served up to authenticated users
* It's not a problem that authentication does not work for deep linking (see [issue 502](https://github.com/Azure/static-web-apps/issues/502))
* The same authorization rules apply to all client-side routes
* You don't need to inform your functions app when a user has signed in / out

If this is your app, then have a look at [angular-swa-auth-nolib](https://angular-swa-auth-nolib.codingdemo.co.uk): 
a sample app that does not use this library to implement authentication

For all other use cases, this library will likely add value.

## Usage

### 1. Install library

   ```bash
   npm install @christianacca/angular-swa-auth
   ```

### 2. Configure and use library

1. Import library in app module:

   ```ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { SwaAuthModule } from '@christianacca/angular-swa-auth';
   
   import { AppComponent } from './app.component';
   
   @NgModule({
     declarations: [AppComponent],
     imports: [
       BrowserModule,
       SwaAuthModule.forRoot({
         // overrides to the default configuration here
       })
     ],
     bootstrap: [AppComponent]
   })
   export class AppModule {}
   ```

2. Implement login/logout/purge

   The following is guidance only. For an alternative, where the user is prompted with a modal
   to select the identity provider to sign in with see [`IdentityProviderInteractiveSelectorService`](https://docs.angular-swa-auth.codingdemo.co.uk/injectables/IdentityProviderInteractiveSelectorService.html)

   ```ts
   import { Component } from '@angular/core';
   import { AuthService, ClientPrincipal } from '@christianacca/angular-swa-auth';
   import { Observable } from 'rxjs';
   
   @Component({
     selector: 'app-auth',
     template: `
       <nav class="menu auth">
         <p class="menu-label">Auth</p>
         <div class="menu-list auth">
           <ng-container *ngIf="userInfo$ | async as user; else loginTpl">
             <a (click)="logout()">Logout</a>
             <a (click)="purge()">Forget me</a>
           </ng-container>
           <ng-template #loginTpl>
             <a *ngFor="let provider of providers" (click)="login(provider.id)">{{ provider.name }}</a>
           </ng-template>
         </div>
       </nav>
     `
   })
   export class AuthComponent {
     userInfo$: Observable<ClientPrincipal | null>;
     providers = this.authService.identityProviders;

     constructor(private authService: AuthService) {
       this.userInfo$ = this.authService.userLoaded$;
     }

     login(identityProvider: string) {
       this.authService.login({ identityProvider });
     }

     logout() {
       this.authService.logout();
     }

     purge() {
       this.authService.purge();
     }
   }
   ```

3. Optionally add `AuthGuard` to your route(s)

   If your app can only be accessed by authenticated users then add the guard to the top level route. EG:

   ```ts
   import { AuthGuard } from '@christianacca/angular-swa-auth';
   
   const routes: Route[] = [
     {
       path: '',
       canActivate: [AuthGuard],
       children: [
         {
           path: 'home',
           component: ShellComponent,
           children: [
             // routes to your "content" pages in your app
           ]
         },
         { path: '', pathMatch: 'full', redirectTo: '/home' }
       ]
     }
   ];
   ```
   
4. Optionally send authentication session events to your function app api

   ```ts
     imports: [
       BrowserModule,
       SwaAuthModule.forRoot({
         sendSessionEventsToApi: true,
         sessionEventsApiUrl: '/api/authevents' // this is the default if not supplied
       })
     ]
   ```

   **IMPORTANT**: you will need to add a function to your functions app api that receives via a POST an instance of [`AuthEventPayload`](https://docs.angular-swa-auth.codingdemo.co.uk/interfaces/AuthEventPayload.html)

## More resources

- Library source code: <https://github.com/christianacca/static-web-apps-auth/tree/master/libs/angular-swa-auth>
- Library documentation: 
  - [reference](https://docs.angular-swa-auth.codingdemo.co.uk)
  - [storybook](https://stories.angular-swa-auth.codingdemo.co.uk)
- Full working demo:  
  - deployed site: [angular-swa-auth.codingdemo.co.uk](https://angular-swa-auth.codingdemo.co.uk)
  - source code: <https://github.com/christianacca/static-web-apps-auth/tree/master/apps/angular-swa-auth-demo>
- Demo app that does NOT use a library to implement simple authentication: 
  - deployed site: [angular-swa-auth-nolib](https://angular-swa-auth-nolib.codingdemo.co.uk)
  - source code: <https://github.com/christianacca/static-web-apps-auth/tree/master/apps/angular-swa-auth-nolib>
  
