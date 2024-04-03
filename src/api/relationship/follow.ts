import { client } from '../common/client';
import type { DefaultResponse } from '../types';

export interface FollowPayload {
    userId: string;
}

export interface FollowChangeRespose {
    me: Me
    followedUser: FollowedUser
}
  
export interface Me {
    followingCount: number
    followersCount: number
}
  
export interface FollowedUser {
    followingCount: number
    followersCount: number
}  

export async function follow(payload: FollowPayload): Promise<DefaultResponse<FollowChangeRespose>> {
    return client({
        url: 'relationship/follow',
        method: 'POST',
        data: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

