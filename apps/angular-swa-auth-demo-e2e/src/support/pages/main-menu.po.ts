export const component = () => cy.findByRole('navigation', { name: 'Main menu' });
export const adminAreaMenuItem = () => component().link({ name: 'Admin Area' });
export const loginMenuItem = () => component().findByTestId('login');
export const logoutMenuItem = () => component().button({ name: 'Logout' });
export const purgeMenuItem = () => component().button({ name: 'Forget me' });
export const loginWithGitHubMenuItem = () => component().findByTestId('login-with-github');
export const offersMenuItem = () => component().link({ name: 'Offers' });
export const productsMenuItem = () => component().link({ name: 'Products' });
export const userProfileMenuItem = () => component().link({ name: 'My Profile' });
