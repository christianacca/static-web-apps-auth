import { AuthRoutingSpecParameters, AuthSpecSuitFactory } from '../../fixtures/auth-spec-factory';
import * as mainMenuPo from '../../support/pages/main-menu.po';
import * as productsPo from '../../support/pages/products.po';
import * as userProfile from '../../support/pages/user-profile.po';

describe('AuthGuard', () => {
  const specParams: AuthRoutingSpecParameters[] = [
    {
      menuLink: mainMenuPo.productsMenuItem,
      targetUrl: productsPo.url,
      contextLabel: 'lazy loaded route'
    },
    {
      menuLink: mainMenuPo.userProfileMenuItem,
      targetUrl: userProfile.url,
      contextLabel: 'non-lazy loaded route'
    }
  ];

  specParams.forEach(AuthSpecSuitFactory);
});
