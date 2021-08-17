import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EMPTY, from, Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {AuthConfig} from './auth-config';

@Injectable()
export class AutoLoginHttpInterceptor implements HttpInterceptor {

    constructor(private route: Router, private authService: AuthService, private config: AuthConfig) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      if (!this.config.loginOnUnauthorizedApiRequests) { return next.handle(req); }

      return next.handle(req).pipe(
        catchError(err => {
          
          const swallowError$ = of(err instanceof HttpErrorResponse && err.status === 401).pipe(
            mergeMap(isUnauthorizedErr => {
              if (!isUnauthorizedErr) { return of(false); }

              const redirectUrl = this.route.url.toString();
              return from(this.authService.login({redirectUrl}));
            })
          )
          
          return swallowError$.pipe(
            mergeMap(swallow => swallow ? EMPTY : throwError(err))
          );
        })
      );
    }
}
