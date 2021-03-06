export const component = () => cy.findByRole('navigation', { name: 'Main menu' });
export const adminAreaMenuItem = () => component().link('Admin Area');
export const loginMenuItem = () => component().findByTestId('login');
export const logoutMenuItem = () => component().button('Logout');
export const purgeMenuItem = () => component().button('Forget me');
export const signupMenuItem = () => component().button('Sign Up?');
export const loginWithGitHubMenuItem = () => component().findByTestId('login-with-github');
export const offersMenuItem = () => component().link('Offers');
export const productsMenuItem = () => component().link('Products');
export const userProfileMenuItem = () => component().link('My Profile');
