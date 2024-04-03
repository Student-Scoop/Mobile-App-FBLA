import { client } from '../common/client';
import type { DefaultResponse } from '../types';

export interface SearchPayload {
    query: string   
}

export interface SearchResponse {
    userId: string
    username: string
    avatar: any
    name: string
    isFollowed: boolean
}

export async function search(query: string): Promise<DefaultResponse<SearchResponse[]>> {
    return client({
        url: `relationship/search?query=${encodeURIComponent(query)}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

