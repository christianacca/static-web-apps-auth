import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { AuthConfig } from './auth-config';
import { AuthEventPersistenceService } from './auth-event-persistence.service';

const startEventPersistence = (eventPersistanceService: AuthEventPersistenceService, authConfig: AuthConfig) => () => {
  if (authConfig.sendSessionEventsToApi) {
    eventPersistanceService.start();
  }
};

export const authEventInitializerProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: startEventPersistence,
  deps: [AuthEventPersistenceService, AuthConfig],
  multi: true
};
