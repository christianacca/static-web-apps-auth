import { IdentityProviderInfo } from '@christianacca/angular-swa-auth';

export const component = () => cy.findByRole('dialog', { name: 'Identity Provider Selector' });
export const closeButton = () => component().findByRole('button', { name: 'close' });
export const option = (idp: IdentityProviderInfo) => component().findByRole('link', { name: idp.name });
