import { aliases, stubGetUser } from '../../support/commands/auth-library';
import * as mainMenuPo from '../../support/pages/main-menu.po';

describe('SwaRoleCheckDirective', () => {
  it('should return placeholder result whilst waiting for userRoles', () => {
    // given
    stubGetUser({ delay: 250 });

    // when
    cy.visit('/');

    // then
    mainMenuPo
      .component()
      .findByRole('progressbar', { name: 'Offers' })
      .as('progressBar')
      .should('exist')
      .wait(aliases.getUserRequest)
      .get('@progressBar')
      .should('not.exist');
  });
});
