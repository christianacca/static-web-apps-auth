import { ErrorHandler, Injectable, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { AuthConfig } from './auth-config';
import { AuthEvent } from './auth-event';
import { AuthService } from './auth.service';
import { ClientPrincipal } from './client-principal';

type AuthEventPayload = Pick<AuthEvent, 'type'> & Pick<ClientPrincipal, 'userId' | 'identityProvider'>;

/**
 * Send authentication session events to the api
 */
@Injectable({
  providedIn: 'root'
})
export class AuthEventPersistenceService implements OnDestroy {
  private subscription = new Subscription();
  private saves$: Observable<any>;

  constructor(authService: AuthService, errorHandler: ErrorHandler, private config: AuthConfig) {
    this.saves$ = authService.sessionEvents$.pipe(
      concatMap(evt =>
        this.sendEvent(evt).pipe(
          catchError(err => {
            errorHandler.handleError(err);
            return EMPTY;
          })
        )
      )
    );
  }

  start() {
    this.subscription.add(this.saves$.subscribe());
  }

  /**
   * Send the event to the api. The default implementation is send event using the `navigator.sendBeacon`
   */
  protected sendEvent(evt: AuthEvent): Observable<void> {
    const payload = this.prepareEventPayload(evt);
    // `sendBeacon` is a more reliable way of ensuring the http request is made even when app page is unloaded
    navigator.sendBeacon(this.config.sessionEventsApiUrl, JSON.stringify(payload));
    return EMPTY;
  }

  /**
   * Override this method if you need to prepare the modify the data sent to the api.
   *
   * By default the `userId` and `identityProvider` fields to represent the user be sent be sent for GDPR/PII reasons.
   * Note: the cookie containing all the `ClientPrincipal` fields will be available also
   *
   */
  protected prepareEventPayload(evt: AuthEvent): AuthEventPayload {
    const {
      user: { userId, identityProvider },
      type
    } = evt;
    return { userId, identityProvider, type };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
