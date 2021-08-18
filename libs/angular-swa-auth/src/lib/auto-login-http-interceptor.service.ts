import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthConfig } from './auth-config';
import { AuthService } from './auth.service';

/**
 * Trigger login flow when there is an unauthorized response from the api
 */
@Injectable()
export class AutoLoginHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private config: AuthConfig) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldHandle(req)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError(err => {
        const swallowError$ = of(err instanceof HttpErrorResponse && err.status === 401).pipe(
          mergeMap(isUnauthorizedErr => {
            if (!isUnauthorizedErr) {
              return of(false);
            }

            // note: we are NOT using Router.url value but instead using window.location so as to optimize on
            // tree shaking. This is a workaround for angular not supporting tree shakable multi-use providers :-(
            const redirectUrl = window.location.pathname + window.location.search;
            return from(this.authService.login({ redirectUrl }));
          })
        );

        return swallowError$.pipe(mergeMap(swallow => (swallow ? EMPTY : throwError(err))));
      })
    );
  }

  private shouldHandle(req: HttpRequest<any>) {
    return req.url.toLowerCase().startsWith(this.config.apiUrl.toLowerCase());
  }
}
