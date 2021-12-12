import { fakeServer, mockWebpackSocket } from './commands';
import { fakeStaticWebAppAuth } from './commands/auth-library';

beforeEach(() => {
  mockWebpackSocket();
  fakeStaticWebAppAuth();
  fakeServer();
});
