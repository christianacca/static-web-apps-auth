export const component = () => cy.findByRole('navigation', { name: 'Main menu' });
export const adminAreaMenuItem = () => component().findByRole('link', { name: 'Admin Area' });
export const loginMenuItem = () => component().findByTestId('login');
export const logoutMenuItem = () => component().findByRole('button', { name: 'Logout' });
export const purgeMenuItem = () => component().findByRole('button', { name: 'Forget me' });
export const loginWithGitHubMenuItem = () => component().findByTestId('login-with-github');
export const offersMenuItem = () => component().findByRole('link', { name: 'Offers' });
export const productsMenuItem = () => component().findByRole('link', { name: 'Products' });
export const userProfileMenuItem = () => component().findByRole('link', { name: 'My Profile' });
