import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AllowedRole, AuthService } from './auth.service';
import { ClientPrincipal } from './client-principal';
import { SwaRoleCheckDirective } from './swa-roles-check.directive';

const user: ClientPrincipal = {
  userId: '',
  userDetails: '',
  identityProvider: '',
  userRoles: []
};

export default {
  title: 'SwaRoleCheckDirective',
  component: SwaRoleCheckDirective,
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
      ]
    })
  ]
} as Meta;

interface SwaRoleCheckDirectiveArgs {
  allowedRoles: AllowedRole[] | null;
  userRoles: string[] | null;
}

const Template: Story<SwaRoleCheckDirectiveArgs> = args => ({
  props: args,
  template: `
    <ng-container *swaRoleCheck="let authz of allowedRoles; userRoles: userRoles">
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `
});

export const Granted = Template.bind({});
Granted.args = {
  allowedRoles: ['admin', 'app-update'],
  userRoles: ['company-read', 'app-update']
};

export const Denied = Template.bind({});
Denied.args = {
  allowedRoles: ['admin', 'app-update'],
  userRoles: ['company-read']
};

export const NestedAllowedRoles = Template.bind({});
NestedAllowedRoles.args = {
  allowedRoles: ['admin', ['app-update', 'admin']],
  userRoles: ['company-read', 'app-update']
};

export const NoAllowedRoles = Template.bind({});
NoAllowedRoles.args = {
  allowedRoles: null,
  userRoles: ['company-read']
};

export const EmptyAllowedRoles = Template.bind({});
EmptyAllowedRoles.args = {
  allowedRoles: [],
  userRoles: ['company-read']
};

export const AsyncAllowedRoles: Story<SwaRoleCheckDirectiveArgs> = args => ({
  template: `
    <h2>Allowed roles:</h2>
    <pre style="min-height: 124px">{{ allowedRoles$ | async | json }}</pre>

    <ng-container *swaRoleCheck="let authz of (allowedRoles$ | async); userRoles: userRoles; let waiting=isPlaceholder">
      <h2>Waiting Authz Result: <em>{{ waiting | json }}</em></h2>
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  props: {
    allowedRoles$: of(args.allowedRoles).pipe(delay(1500)),
    userRoles: args.userRoles
  }
});
AsyncAllowedRoles.args = {
  allowedRoles: ['admin', 'app-update'],
  userRoles: ['app-update']
};

export const AsyncUserRoles: Story<SwaRoleCheckDirectiveArgs> = args => ({
  template: `
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
    allowedRoles: args.allowedRoles,
    userRoles$: of(args.userRoles).pipe(delay(1500))
  }
});
AsyncUserRoles.args = {
  allowedRoles: ['admin', 'app-update'],
  userRoles: ['app-update']
};

export const AsyncAllowedRolesAndUserRoles: Story<SwaRoleCheckDirectiveArgs> = args => ({
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
    allowedRoles$: of(args.allowedRoles).pipe(delay(3000)),
    userRoles$: of(args.userRoles).pipe(delay(1500))
  }
});
AsyncAllowedRolesAndUserRoles.args = {
  allowedRoles: ['admin', 'app-update'],
  userRoles: ['app-update']
};

export const DependencyInjectedUserRoles: Story<SwaRoleCheckDirectiveArgs> = args => ({
  template: `
    <ng-container *swaRoleCheck="let authz of allowedRoles">
      <h2>Authorized: <em>{{ authz | json }}</em></h2>
    </ng-container>
  `,
  moduleMetadata: {
    providers: [
      {
        provide: AuthService,
        useValue: {
          userLoaded$: new BehaviorSubject({ ...user, userRoles: args.userRoles })
        }
      }
    ]
  },
  props: {
    allowedRoles: args.allowedRoles
  }
});
DependencyInjectedUserRoles.args = {
  allowedRoles: ['admin', 'app-update'],
  userRoles: ['app-update']
};

export const TemplateUserRolesTrumpsDependencyInjection: Story<SwaRoleCheckDirectiveArgs> = args => ({
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
    allowedRoles: args.allowedRoles,
    userRoles$: of(args.userRoles).pipe(delay(1000))
  }
});
TemplateUserRolesTrumpsDependencyInjection.args = {
  allowedRoles: ['admin', 'app-update'],
  userRoles: ['app-update']
};
