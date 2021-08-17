import {ClientPrincipal} from './client-principal';

export type AuthEventType = 'login' | 'sign-up' | 'logout' | 'purge';

export abstract class AuthEvent {
    abstract type: AuthEventType;
    abstract user: ClientPrincipal;

    static login(user: ClientPrincipal): AuthEvent {
        return {
            type: 'login',
            user
        };
    }

    static logout(user: ClientPrincipal): AuthEvent {
        return {
            type: 'logout',
            user
        };
    }

    static purge(user: ClientPrincipal): AuthEvent {
        return {
            type: 'purge',
            user
        };
    }

    static signUp(user: ClientPrincipal): AuthEvent {
        return {
            type: 'sign-up',
            user
        };
    }
}
