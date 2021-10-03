import { getUserInfo } from '@aaronpowell/static-web-apps-api-auth';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';

type AuthEventType = 'login' | 'sign-up' | 'logout' | 'purge';

interface AuthEventPayload {
  type: AuthEventType;
  userId: string;
  identityProvider: string;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { type }: AuthEventPayload = req.body;
  const userInfo = getUserInfo(req);
  context.log('AuthEvent received', { type, userInfo });
  context.res.status(201);
};

export default httpTrigger;
