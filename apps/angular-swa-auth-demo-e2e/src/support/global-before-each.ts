import { fakeServer, mockWebpackSocket } from './commands';
import { fakeStaticWebAppAuth } from '@christianacca/angular-swa-auth-e2e-util';

beforeEach(() => {
  mockWebpackSocket();
  fakeStaticWebAppAuth();
  fakeServer();
});
