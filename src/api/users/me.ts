import { User } from '../../types/user';
import { client } from '../common/client';
import type { DefaultResponse } from '../types';

export async function me(): Promise<DefaultResponse<User>> {
    return client({
        url: `users/@me`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

