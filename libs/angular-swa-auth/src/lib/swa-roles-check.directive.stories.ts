import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ClientPrincipal } from './client-principal';
import { SwaRoleCheckDirective } from './swa-roles-check.directive';

const user: ClientPrincipal = {
  userId: '',
  userDetails: '',
  identityProvider: '',
  userRoles: []
};

export default {
  title: 'ResourceAuthzCheck',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            userLoaded$: new BehaviorSubject(user)
          }
        }
      ],
      declarations: [SwaRoleCheckDirective]
    })
  ]
};

export const granted = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre>{{ allowedRoles | json }}</pre>

    <h2>User roles:</h2>
    <pre>{{ userRoles | json }}</pre>

    <ng-container *swaRoleCheck="let authz of allowedRoles; userRoles: userRoles">
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  props: {
    allowedRoles: ['admin', 'app-update'],
    userRoles: ['company-read', 'app-update']
  }
});

export const denied = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre>{{ allowedRoles | json }}</pre>

    <h2>User roles:</h2>
    <pre>{{ userRoles | json }}</pre>

    <ng-container *swaRoleCheck="let authz of allowedRoles; userRoles: userRoles">
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  props: {
    allowedRoles: ['admin', 'app-update'],
    userRoles: ['company-read']
  }
});

export const noAllowedRoles = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre>{{ allowedRoles | json }}</pre>

    <h2>User roles:</h2>
    <pre>{{ userRoles | json }}</pre>

    <ng-container *swaRoleCheck="let authz of allowedRoles; userRoles: userRoles">
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  props: {
    allowedRoles: null,
    userRoles: ['company-read']
  }
});

export const emptyAllowedRoles = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre>{{ allowedRoles | json }}</pre>

    <h2>User roles:</h2>
    <pre>{{ userRoles | json }}</pre>

    <ng-container *swaRoleCheck="let authz of allowedRoles; userRoles: userRoles">
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  props: {
    allowedRoles: [],
    userRoles: ['company-read']
  }
});

export const asyncAllowedRoles = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre style="min-height: 124px">{{ allowedRoles$ | async | json }}</pre>

    <h2>User roles:</h2>
    <pre>{{ userRoles | json }}</pre>

    <ng-container *swaRoleCheck="let authz of (allowedRoles$ | async); userRoles: userRoles; let waiting=isPlaceholder">
      <h2>Waiting Authz Result: <em>{{ waiting | json }}</em></h2>
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  props: {
    allowedRoles$: of(['admin', 'app-update']).pipe(delay(1500)),
    userRoles: ['app-update']
  }
});

export const asyncUserRoles = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre>{{ allowedRoles | json }}</pre>

    <h2>User roles:</h2>
    <pre style="min-height: 103px">{{ userRoles$ | async | json }}</pre>

    <ng-container *swaRoleCheck="let authz of allowedRoles; userRoles: (userRoles$ | async); let waiting=isPlaceholder">
      <h2>Waiting Authz Result: <em>{{ waiting | json }}</em></h2>
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
      <p>
        <strong>Note</strong>: <code>AuthService.userLoaded$</code> has already synchronously supply the User roles.
        This is why "Waiting Authz Result" is always false
      </p>
    </ng-container>
  `,
  props: {
    allowedRoles: ['admin', 'app-update'],
    userRoles$: of(['app-update']).pipe(delay(1500))
  }
});

export const asyncAllowedRolesAndUserRoles = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre style="min-height: 124px">{{ allowedRoles$ | async | json }}</pre>

    <h2>User roles:</h2>
    <pre style="min-height: 103px">{{ userRoles$ | async | json }}</pre>

    <ng-container *swaRoleCheck="let authz of (allowedRoles$ | async); userRoles: (userRoles$ | async); let waiting=isPlaceholder">
      <h2>Waiting Authz Result: <em>{{ waiting | json }}</em></h2>
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  props: {
    allowedRoles$: of(['admin', 'app-update']).pipe(delay(3000)),
    userRoles$: of(['app-update']).pipe(delay(1500))
  }
});

export const dependencyInjectedUserRoles = () => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre>{{ allowedRoles | json }}</pre>

    <h2>User roles:</h2>
    <pre>{{ ['app-update'] | json }}</pre>

    <ng-container *swaRoleCheck="let authz of allowedRoles">
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  moduleMetadata: {
    providers: [
      {
        provide: AuthService,
        useValue: {
          userLoaded$: new BehaviorSubject({ ...user, userRoles: ['app-update'] })
        }
      }
    ]
  },
  props: {
    allowedRoles: ['admin', 'app-update']
  }
});

export const templateUserRolesTrumpsDependencyInjection = () => ({
  template: `
    <ng-container *swaRoleCheck="let authz of allowedRoles; userRoles: (userRoles$ | async); let waiting=isPlaceholder">
      <h2>Waiting Authz Result: <em>{{ waiting | json }}</em></h2>
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  moduleMetadata: {
    providers: [
      {
        provide: AuthService,
        useValue: {
          userLoaded$: new BehaviorSubject(user).pipe(delay(1500))
        }
      }
    ]
  },
  props: {
    allowedRoles: ['admin', 'app-update'],
    userRoles$: of(['app-update']).pipe(delay(1000))
  }
});
