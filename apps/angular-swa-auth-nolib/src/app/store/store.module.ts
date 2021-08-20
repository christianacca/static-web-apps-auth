import { NgModule } from '@angular/core';
import { DefaultDataServiceConfig, EntityDataModule, HttpUrlGenerator } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomHttpUrlGenerator } from './custom-http-url-generator';
import { defaultDataServiceConfig } from './default-data-service.config';

@NgModule({
  imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), EntityDataModule.forRoot({})],
  providers: [
    { provide: HttpUrlGenerator, useClass: CustomHttpUrlGenerator },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class AppStoreModule {}
