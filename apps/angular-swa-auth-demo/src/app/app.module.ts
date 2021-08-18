import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SwaAuthModule } from '@ccacca/angular-swa-auth';
import { environment } from '../environments/environment';
import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';
import { externalModules } from './build-specific';
import { declarations } from './core';
import { routes } from './router';
import { AppStoreModule } from './store/store.module';

@NgModule({
  declarations: [AppComponent, AboutComponent, declarations],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    AppStoreModule,
    externalModules,
    SwaAuthModule.forRoot({
      apiUrl: environment.API
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
