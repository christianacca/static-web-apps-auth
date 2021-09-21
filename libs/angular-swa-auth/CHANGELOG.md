# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2021-09-21

### Added

- `SwaRoleGuard`: pass allowed role(s) as query string parameters to the nominated unauthorized route

## [2.0.0] - 2021-09-14

### Added

- `SwaRoleCheckDirective`: `allowedRoles` input property supports nested array's of role names
- `SwaRoleGuard`: 
  - `allowedRoles` route data configuration supports nested array's of role names
  - new `canLoad` implementation for use with lazy loaded routes
- `AuthGuard`: new `canLoad` implementation for use with lazy loaded routes

### Fixes

- `AuthService`: `hasSomeRoles$` should complete immediately after computing its result

### Breaking changes

#### Renamed `AuthService.userLoaded$` to `currentUser$`

This is to better express intention that this observable returns the authenticated state of the current user rather than a stream of events over time.

#### `AuthService.hasSomeRoles$` observable completes

`hasSomeRoles$` now returns an `Observable` that emits a  completion notification immediately after computing its result. The implication is that consumers 
no longer need to unsubscribe from it.

#### `SwaRoleGuard` triggers sign in flow

`SwaRoleGuard` no longer redirects to unauthorized route when user is not yet authenticated but instead will prompt user to sign-in.

## [1.1.1] - 2021-09-06

### Fixes

- `SwaRoleCheckDirective`: `isPlaceholder` returns `false` too early when `userRoles` are assigned in template asynchronously

## [1.1.0] - 2021-09-05

### Added

- `SwaRoleGuard`: add to a route to perform an authorization check using roles defined in Status Web App
- `SwaRoleCheckDirective`: Structural directive to perform an authorization check using roles defined in Status Web App 

## [1.0.0] - 2021-08-26

### Added

- Initial release
