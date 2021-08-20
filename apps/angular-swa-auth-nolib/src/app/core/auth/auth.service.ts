import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ClientPrincipal } from './client-principal';

interface AuthResponseData {
  clientPrincipal: ClientPrincipal;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * An event that will emit user details is fetched from the api. The value emitted will
   * be undefined when the user is not authenticated
   *
   * Late subscribers will receive the last value emitted.
   *
   */
  userLoaded$: Observable<ClientPrincipal>;

  constructor(private httpClient: HttpClient) {
    this.userLoaded$ = this.httpClient.get<AuthResponseData>('/.auth/me').pipe(
      map(resp => resp.clientPrincipal),
      shareReplay({ bufferSize: 1, refCount: false })
    );
  }
}
