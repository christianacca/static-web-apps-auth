import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
    externalModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
