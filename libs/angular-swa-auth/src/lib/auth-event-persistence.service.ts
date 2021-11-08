import { ErrorHandler, Injectable, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { AuthConfig } from './auth-config';
import { AuthEvent } from './auth-event';
import { AuthService } from './auth.service';

/**
 * Send authentication session events to your functions app api
 */
@Injectable({
  providedIn: 'root'
})
export class AuthEventPersistenceService implements OnDestroy {
  private subscription = new Subscription();
  private saves$: Observable<void>;

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

  /**
   * Start listening to the events to send them to the api
   */
  start() {
    this.subscription.add(this.saves$.subscribe());
  }

  /**
   * Send the event to the api. The default implementation is send event using the `navigator.sendBeacon`
   */
  protected sendEvent(evt: AuthEvent): Observable<void> {
    const payload = this.prepareEventPayload(evt);
    // `sendBeacon` is a more reliable way of ensuring the http request is made even when app page is unloaded
    navigator.sendBeacon(
      this.config.sessionEventsApiUrl,
      typeof payload === 'string' ? payload : JSON.stringify(payload)
    );
    return EMPTY;
  }

  /**
   * Override this method if you need to modify the data sent to the api.
   *
   * Note: the the cookie containing all the `ClientPrincipal` fields will be available also to the api function
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected prepareEventPayload(evt: AuthEvent): any {
    return AuthEvent.toAuthEventPayload(evt);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
