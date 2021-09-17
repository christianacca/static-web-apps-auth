import { ClientPrincipal } from './client-principal';

/**
 * Type names of the authentication session events
 */
export type AuthEventType = 'login' | 'sign-up' | 'logout' | 'purge';

/**
 * An authentication session event
 */
export abstract class AuthEvent {
  abstract type: AuthEventType;
  abstract user: ClientPrincipal;

  /**
   * Creates an event object representing the user having logged in
   * @param user The current user
   */
  static login(user: ClientPrincipal): AuthEvent {
    return {
      type: 'login',
      user
    };
  }

  /**
   * Creates an event object representing the user having logged out
   * @param user The current user
   */
  static logout(user: ClientPrincipal): AuthEvent {
    return {
      type: 'logout',
      user
    };
  }

  /**
   * Creates an event object representing the user requesting to "forget me"
   * @param user The current user
   */
  static purge(user: ClientPrincipal): AuthEvent {
    return {
      type: 'purge',
      user
    };
  }

  /**
   * Creates an event object representing having signed up
   * @param user The current user
   */
  static signUp(user: ClientPrincipal): AuthEvent {
    return {
      type: 'sign-up',
      user
    };
  }
}
