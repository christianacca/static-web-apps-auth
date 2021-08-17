import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AngularSwaAuthModule} from "@ccacca/angular-swa-auth";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularSwaAuthModule.forRoot({
      loginOnUnauthorizedApiRequests: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
