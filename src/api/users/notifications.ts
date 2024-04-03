import { client } from '../common/client';
import type { DefaultResponse } from '../types';

export interface UpdateNotificationPayload {
    notificationId: string;
}

export async function updateNotificationId(payload: UpdateNotificationPayload): Promise<DefaultResponse<void>> {
    return client({
        url: 'users/@me/update-notification-id',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: payload
    }).then((response) => response.data);
}
