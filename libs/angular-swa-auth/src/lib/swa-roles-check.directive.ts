import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { combineLatest, merge, Observable, ReplaySubject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService, hasSomeAllowedRoles } from './auth.service';

/**
 * @ignore
 */
const noExplicitRoles: string[] = [];

/**
 * Structural directive to perform an authorization check using roles defined in Status Web App
 *
 * @example
 * ```html
 * <nav class="menu" *swaRoleCheck="let isAdmin of ['admin']; let maybeAdmin = isPlaceholder">
 *   <p class="menu-label">Menu</p>
 *   <ul class="menu-list">
 *     <a routerLink="/users" routerLinkActive="is-active">
 *       <progress *ngIf="maybeAdmin" class="progress is-primary is-medium" max="100">15%</progress>
 *       <span *ngIf="!maybeAdmin" [ngClass]="!isAdmin ? 'has-text-grey-lighter' : ''">Users</span>
 *     </a>
 *   </ul>
 * </nav>
 * ```
 */
@Directive({
  selector: '[swaRoleCheck]'
})
export class SwaRoleCheckDirective implements OnInit, OnDestroy {
  @Input() set swaRoleCheckOf(value: string[]) {
    // we're ignoring null/undefined to accommodate async fetching of allowed roles in the consumer template. In this
    // scenario the async pipe will initially assign a null to our input property. We skip this so that the initial
    // placeholder authz result will be in play until the allowed roles are finally fetched
    if (value == null) return;

    this.allowedRoles.next(value);
  }

  @Input() set swaRoleCheckUserRoles(value: string[]) {
    // we're ignoring null/undefined to accommodate async fetching of user roles in the consumer template. In this
    // scenario the async pipe will initially assign a null to our input property. We skip this so that the initial
    // placeholder authz result will be in play until the user roles are finally fetched
    if (value == null) return;

    this.userRolesFromTemplate.next(value);
  }

  private allowedRoles = new ReplaySubject<string[]>(1);
  private userRolesFromTemplate = new ReplaySubject<string[]>(1);
  private subscription = new Subscription();

  private context = {
    ['$implicit']: false,
    isPlaceholder: true
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<never>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const injectedRoles$ = this.authService.userLoaded$.pipe(
      map(user => user?.userRoles),
      takeUntil(this.userRolesFromTemplate)
    );
    const userRoles$ = merge(this.userRolesFromTemplate, injectedRoles$).pipe(map(x => x ?? noExplicitRoles));

    const permissionCheck$: Observable<boolean> = combineLatest([this.allowedRoles, userRoles$]).pipe(
      map(([allowedRoles, userRoles]) => hasSomeAllowedRoles(allowedRoles, userRoles))
    );

    this.subscription = permissionCheck$.subscribe(authzResult => {
      this.context['$implicit'] = authzResult;
      this.context.isPlaceholder = false;
    });

    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
