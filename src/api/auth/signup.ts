import { client } from '../common/client';
import {type User} from '../../types/user';
import type { DefaultResponse } from '../types';

export interface SignupPayload {
    name: string;
    username: string;
    email: string;
    password: string;
}

export async function signup(payload: SignupPayload): Promise<DefaultResponse<User>> {
    return client({
        url: 'auth/signup',
        method: 'POST',
        data: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

