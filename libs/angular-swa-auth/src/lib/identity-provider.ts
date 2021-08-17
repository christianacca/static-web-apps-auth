export type ManagedIdentityProvider =
  | "aad"
  | "facebook"
  | "github"
  | "google"
  | "twitter"

export interface IdentityProviderInfo<T extends ManagedIdentityProvider | string = string> {
    id: T;
    name: string;
}

export const managedIdentityProviders: Record<ManagedIdentityProvider, IdentityProviderInfo<ManagedIdentityProvider>> = {
    github: {id: 'github', name: 'GitHub'},
    google: {id: 'google', name: 'Google'},
    twitter: {id: 'twitter', name: 'Twitter'},
    aad: {id: 'aad', name: 'Azure AD'},
    facebook: {id: 'facebook', name: 'Facebook'}
};