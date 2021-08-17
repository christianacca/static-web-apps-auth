import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AngularSwaAuthModule} from "@ccacca/angular-swa-auth";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularSwaAuthModule.forRoot({
      loginOnUnauthorizedApiRequests: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
