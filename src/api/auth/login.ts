import { client } from '../common/client';
import { type User } from '../../types/user';
import type { DefaultResponse } from '../types';

export interface LoginPayload {
    email: string;
    password: string;
}

export async function login(payload: LoginPayload): Promise<DefaultResponse<User>> {
    return client({
        url: 'auth/login',
        method: 'POST',
        data: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

export async function loginGoogle(token: string): Promise<DefaultResponse<User>> {
    return client({
        url: 'auth/google',
        method: 'POST',
        data: { token },
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

